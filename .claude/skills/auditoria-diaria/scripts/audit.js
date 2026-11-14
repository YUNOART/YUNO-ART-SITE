#!/usr/bin/env node
// Auditoría automática de yuno-art.com: salud técnica, señales de marketing
// y flujo de compra hasta el checkout (nunca paga).
//
// Uso: node audit.js [url] [carpeta-salida]
// Salida: <carpeta>/report.json y capturas en <carpeta>/screens/

const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = (process.argv[2] || 'https://yuno-art.com').replace(/\/$/, '');
const OUT = process.argv[3] || path.join('audits', new Date().toISOString().slice(0, 10));
const MAX_PAGES = 40;

fs.mkdirSync(path.join(OUT, 'screens'), { recursive: true });

const report = {
  url: BASE,
  date: new Date().toISOString(),
  platform: null,
  pages: [],
  brokenLinks: [],
  purchaseFlow: { steps: [], ok: false },
  marketing: {},
  issues: [],
};

const issue = (severity, area, message, where) =>
  report.issues.push({ severity, area, message, where });

async function inspectPage(page, url) {
  const consoleErrors = [];
  const failedRequests = [];
  page.removeAllListeners('console');
  page.removeAllListeners('requestfailed');
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text().slice(0, 200)));
  page.on('requestfailed', (r) => failedRequests.push(r.url()));

  const t0 = Date.now();
  let status = null;
  try {
    const res = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    status = res ? res.status() : null;
  } catch (e) {
    issue('alta', 'técnico', `No carga: ${e.message.split('\n')[0]}`, url);
    return null;
  }
  const loadMs = Date.now() - t0;
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const meta = (sel) => document.querySelector(sel)?.getAttribute('content') || null;
    const imgs = [...document.images];
    return {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      lang: document.documentElement.lang || null,
      h1: [...document.querySelectorAll('h1')].map((h) => h.innerText.trim()).slice(0, 3),
      og: {
        title: meta('meta[property="og:title"]'),
        description: meta('meta[property="og:description"]'),
        image: meta('meta[property="og:image"]'),
      },
      twitterCard: meta('meta[name="twitter:card"]'),
      jsonLdTypes: [...document.querySelectorAll('script[type="application/ld+json"]')]
        .flatMap((s) => {
          try {
            const j = JSON.parse(s.textContent);
            return [].concat(j['@graph'] || j).map((x) => x['@type']);
          } catch { return ['JSON-LD inválido']; }
        }),
      imagesTotal: imgs.length,
      brokenImages: imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src).slice(0, 10),
      imagesWithoutAlt: imgs.filter((i) => !i.alt).length,
      links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
      html: document.documentElement.outerHTML.slice(0, 400000),
      text: document.body.innerText.slice(0, 20000),
    };
  });

  const html = data.html;
  const text = data.text.toLowerCase();
  const signals = {
    googleAnalytics: /gtag\(|googletagmanager\.com\/gtag|google-analytics\.com/.test(html),
    googleTagManager: /googletagmanager\.com\/gtm\.js/.test(html),
    metaPixel: /connect\.facebook\.net\/.*fbevents\.js|fbq\(/.test(html),
    tiktokPixel: /analytics\.tiktok\.com/.test(html),
    pinterestTag: /pintrk\(/.test(html),
    cookieBanner: /cookie/i.test(data.text) && /(aceptar|accept|rechazar|configurar)/i.test(data.text),
    newsletter: !!(await page.$('input[type="email"]')),
    whatsapp: /wa\.me|api\.whatsapp\.com/.test(html),
    instagram: /instagram\.com\//.test(html),
    reviews: /(reseña|opinion|opiniones|review|valoraci|estrellas|judge\.me|trustpilot|yotpo|okendo)/i.test(html),
    shippingInfo: /(envío|envio|shipping)/.test(text),
    returnsInfo: /(devoluci|returns|reembolso)/.test(text),
    secureBadges: /(pago seguro|secure|ssl|visa|mastercard|paypal|bizum)/.test(text),
  };

  return { url, status, loadMs, consoleErrors, failedRequests: failedRequests.slice(0, 10), signals, ...data, html: undefined, text: undefined };
}

async function detectPlatform(page) {
  const html = await page.content();
  if (/cdn\.shopify\.com|Shopify\.theme/.test(html)) return 'shopify';
  if (/woocommerce|wp-content/.test(html)) return 'woocommerce';
  if (/wix\.com|wixstatic/.test(html)) return 'wix';
  if (/squarespace/.test(html)) return 'squarespace';
  if (/prestashop/i.test(html)) return 'prestashop';
  return 'desconocida';
}

async function purchaseFlow(context) {
  const flow = report.purchaseFlow;
  const step = (name, ok, detail) => flow.steps.push({ name, ok, detail });
  const page = await context.newPage();

  // 1. Buscar productos candidatos
  let candidates = [];
  if (report.platform === 'shopify') {
    try {
      // fetch desde la página para que pase por el mismo proxy que el navegador
      await page.goto(BASE, { waitUntil: 'domcontentloaded' });
      const prods = await page.evaluate(() => fetch('/products.json?limit=250').then((r) => r.json()).then((j) => j.products || []));
      const available = prods.filter((p) => p.variants.some((v) => v.available));
      candidates = available.map((p) => `${BASE}/products/${p.handle}`);
      step('Catálogo (products.json)', prods.length > 0, `${prods.length} productos, ${available.length} disponibles`);
    } catch (e) { step('Catálogo (products.json)', false, e.message); }
  }
  if (!candidates.length) {
    candidates = [...new Set(report.pages.flatMap((p) => p.links)
      .filter((l) => l.startsWith(BASE) && /\/(products?|producto|tienda\/|shop\/|obra|artwork)/i.test(l)))];
  }
  if (!candidates.length) { step('Encontrar producto', false, 'No se encontró ninguna ficha de producto'); return; }

  // 2-3. Probar fichas hasta encontrar una que se pueda añadir al carrito sin personalizar.
  // Las que exigen subir un diseño se anotan aparte: puede ser intencionado o un error.
  const addSelector = [
    'button[name="add"]', 'form[action*="/cart/add"] [type="submit"]',
    'button.single_add_to_cart_button',
    'button:has-text("Añadir al carrito")', 'button:has-text("Agregar al carrito")',
    'button:has-text("Add to cart")', 'button:has-text("Comprar")',
  ].join(', ');
  flow.blocked = [];
  let added = false;
  for (const url of candidates.slice(0, 6)) {
    await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1500);
    const price = await page.evaluate(() => {
      const m = document.body.innerText.match(/(\d[\d.,]*\s?€|€\s?\d[\d.,]*|\$\s?\d[\d.,]*)/);
      return m ? m[0] : null;
    });
    if (!price) issue('alta', 'compras', 'Ficha sin precio visible', url);
    const addBtn = page.locator(addSelector).filter({ visible: true }).first();
    if (!(await addBtn.count())) { flow.blocked.push({ url, reason: 'sin botón de compra' }); continue; }
    if (await addBtn.isDisabled()) { flow.blocked.push({ url, reason: 'botón deshabilitado (¿exige subir diseño o está agotado?)' }); continue; }
    await page.screenshot({ path: path.join(OUT, 'screens', 'producto.png'), fullPage: true });
    step('Ficha de producto con precio', !!price, `${url} · ${price || 'sin precio'}`);
    await addBtn.click();
    await page.waitForTimeout(3000);
    step('Botón añadir al carrito', true, 'Pulsado');
    added = true;
    break;
  }
  for (const b of flow.blocked) issue('media', 'compras', `No se puede añadir al carrito directamente: ${b.reason}`, b.url);
  if (!added) { step('Botón añadir al carrito', false, `Ninguno de ${Math.min(6, candidates.length)} productos probados se pudo añadir`); return; }

  // 4. Carrito
  const cartPath = report.platform === 'woocommerce' ? '/carrito' : '/cart';
  const cartRes = await page.goto(BASE + cartPath, { waitUntil: 'load', timeout: 45000 }).catch(() => null);
  if (!cartRes || cartRes.status() >= 400) { step('Página de carrito', false, `${cartPath} no carga`); return; }
  await page.screenshot({ path: path.join(OUT, 'screens', 'carrito.png'), fullPage: true });
  let inCart = false;
  if (report.platform === 'shopify') {
    const cart = await page.evaluate(() => fetch('/cart.js').then((r) => r.json()).catch(() => null));
    inCart = !!cart && cart.item_count > 0;
  } else {
    inCart = !/(vacío|vacio|empty)/i.test(await page.innerText('body'));
  }
  step('Producto en el carrito', inCart, inCart ? 'OK' : 'El carrito parece vacío');
  if (!inCart) return;

  // 5. Checkout (solo carga; nunca se rellenan datos de pago)
  const checkoutPath = report.platform === 'woocommerce' ? '/finalizar-compra' : '/checkout';
  const res = await page.goto(BASE + checkoutPath, { waitUntil: 'load', timeout: 60000 }).catch((e) => e);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUT, 'screens', 'checkout.png'), fullPage: true });
  const checkoutOk = !(res instanceof Error) && (await page.locator('input[type="email"], input[name*="email"], input[autocomplete="email"]').count()) > 0;
  step('Checkout carga con formulario', checkoutOk, page.url());
  const methods = await page.evaluate(() => {
    const t = document.body.innerText.toLowerCase();
    return ['paypal', 'bizum', 'apple pay', 'google pay', 'shop pay', 'klarna', 'visa', 'mastercard', 'stripe']
      .filter((m) => t.includes(m) || document.documentElement.innerHTML.toLowerCase().includes(m.replace(' ', '')));
  });
  step('Métodos de pago detectados', methods.length > 0, methods.join(', ') || 'ninguno visible');

  flow.ok = flow.steps.every((s) => s.ok);
  await page.close();
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ locale: 'es-ES' });
  const page = await context.newPage();

  // Rastreo de páginas internas
  const queue = [BASE + '/'];
  const seen = new Set();
  while (queue.length && seen.size < MAX_PAGES) {
    const url = queue.shift().split('#')[0];
    if (seen.has(url)) continue;
    seen.add(url);
    const info = await inspectPage(page, url);
    if (!info) continue;
    if (!report.platform) report.platform = await detectPlatform(page);
    if (info.status >= 400) { issue('alta', 'técnico', `HTTP ${info.status}`, url); continue; }
    report.pages.push(info);
    for (const l of info.links) {
      const clean = l.split('#')[0].split('?')[0];
      if (clean.startsWith(BASE) && !seen.has(clean) && !/\.(jpg|png|pdf|webp)$|\/cart|\/checkout|\/account|\/carrito/i.test(clean)) queue.push(clean);
    }
  }
  if (report.pages[0]) await page.goto(BASE, { waitUntil: 'load' }).then(() => page.screenshot({ path: path.join(OUT, 'screens', 'home-desktop.png'), fullPage: true }));

  // Enlaces rotos (incluye externos)
  const allLinks = [...new Set(report.pages.flatMap((p) => p.links.map((l) => l.split('#')[0])))]
    .filter((l) => /^https?:/.test(l)).slice(0, 300);
  for (const l of allLinks) {
    try {
      const r = await context.request.head(l, { timeout: 15000, maxRedirects: 5 });
      if (r.status() >= 400 && r.status() !== 405 && r.status() !== 403) report.brokenLinks.push({ url: l, status: r.status() });
    } catch { /* timeouts de terceros no se cuentan como rotos */ }
  }
  report.brokenLinks.forEach((b) => issue('media', 'técnico', `Enlace roto (${b.status})`, b.url));

  // Revisión por página
  for (const p of report.pages) {
    if (!p.title) issue('media', 'SEO', 'Sin <title>', p.url);
    if (!p.description) issue('media', 'SEO', 'Sin meta description', p.url);
    if (p.h1.length !== 1) issue('baja', 'SEO', `${p.h1.length} etiquetas H1`, p.url);
    if (!p.og.image) issue('media', 'marketing', 'Sin og:image (vista previa pobre al compartir en redes/WhatsApp)', p.url);
    if (p.brokenImages.length) issue('alta', 'visual', `${p.brokenImages.length} imágenes rotas`, p.url);
    if (p.imagesWithoutAlt) issue('baja', 'SEO', `${p.imagesWithoutAlt} imágenes sin alt`, p.url);
    if (p.loadMs > 5000) issue('media', 'rendimiento', `Carga lenta: ${p.loadMs} ms`, p.url);
    if (p.consoleErrors.length) issue('baja', 'técnico', `${p.consoleErrors.length} errores JS en consola`, p.url);
  }
  const products = report.pages.filter((p) => /\/products?\//.test(p.url));
  if (products.length && !products.some((p) => p.jsonLdTypes.includes('Product')))
    issue('media', 'SEO', 'Las fichas de producto no tienen datos estructurados Product (sin precio/stock en Google)', products[0].url);

  // Señales de marketing agregadas (presentes en alguna página)
  const s = {};
  for (const p of report.pages) for (const [k, v] of Object.entries(p.signals)) s[k] = s[k] || v;
  report.marketing = s;
  // Shopify carga los píxeles de apps (Google, Meta) en un sandbox que no aparece en el HTML
  const sandboxed = report.platform === 'shopify';
  const verify = sandboxed ? ' (verificar en Shopify > Configuración > Eventos de clientes)' : '';
  if (!s.googleAnalytics && !s.googleTagManager) issue(sandboxed ? 'media' : 'alta', 'marketing', 'No se detecta Google Analytics/GTM' + verify);
  if (!s.metaPixel) issue('media', 'marketing', 'No se detecta el píxel de Meta (Instagram/Facebook Ads)' + verify);
  if (!s.newsletter) issue('alta', 'marketing', 'No hay captación de email (newsletter)');
  if (!s.reviews) issue('media', 'marketing', 'No hay reseñas ni prueba social visible');
  if (!s.shippingInfo) issue('media', 'marketing', 'No se menciona información de envío');
  if (!s.returnsInfo) issue('baja', 'marketing', 'No se menciona política de devoluciones');
  if (!s.cookieBanner) issue('media', 'legal', 'No se detecta banner de cookies (RGPD)');

  // Galerías y filtros: categorías vacías "(0)" y tarjetas sin imagen (se pintan con JS, el rastreo no las ve)
  const galleryPages = [BASE + '/?view=yuno-dtf-transfers', BASE + '/'];
  for (const gUrl of galleryPages) {
    try {
      await page.goto(gUrl, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3000);
      for (let y = 0; y < 12; y++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(250); }
      await page.waitForTimeout(1500);
      const g = await page.evaluate(() => {
        const visible = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return !el.hidden && s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
        const emptyFilters = [...document.querySelectorAll('button, a, [role="tab"], [data-gallery-filter]')]
          .filter((el) => visible(el) && /\(\s*0\s*\)\s*$/.test(el.textContent.trim()))
          .map((el) => el.textContent.trim().replace(/\s+/g, ' '));
        const noImage = [...document.querySelectorAll('.yuno-dtf-gallery__card')].filter(visible).filter((card) => {
          const art = card.querySelector('.yuno-dtf-gallery__art');
          const img = card.querySelector('img');
          const hasBg = art && getComputedStyle(art).backgroundImage !== 'none';
          const hasImg = img && img.complete && img.naturalWidth > 0;
          return !hasBg && !hasImg;
        }).map((card) => card.querySelector('h3')?.textContent.trim() || 'tarjeta sin título');
        return { emptyFilters, noImage };
      });
      if (g.emptyFilters.length) issue('media', 'visual', `${g.emptyFilters.length} filtros/categorías vacíos visibles (0 diseños): ${g.emptyFilters.join(' | ')}`, gUrl);
      if (g.noImage.length) issue('alta', 'visual', `${g.noImage.length} tarjetas de diseño sin imagen: ${g.noImage.slice(0, 10).join(', ')}`, gUrl);
    } catch (e) { issue('baja', 'técnico', `No se pudo revisar la galería: ${e.message.split('\n')[0]}`, gUrl); }
  }

  // Móvil
  const mobile = await browser.newContext({ ...devices['iPhone 13'], locale: 'es-ES' });
  const mp = await mobile.newPage();
  await mp.goto(BASE, { waitUntil: 'load' }).catch(() => {});
  await mp.waitForTimeout(1500);
  await mp.screenshot({ path: path.join(OUT, 'screens', 'home-movil.png'), fullPage: true });
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  if (overflow) issue('media', 'visual', 'Scroll horizontal en móvil (algo se sale de la pantalla)', BASE);
  await mobile.close();

  // Flujo de compra
  try { await purchaseFlow(context); }
  catch (e) { report.purchaseFlow.steps.push({ name: 'Error inesperado', ok: false, detail: e.message.split('\n')[0] }); }
  if (!report.purchaseFlow.ok) issue('crítica', 'compras', 'El flujo de compra falla en algún paso', report.purchaseFlow.steps.find((x) => !x.ok)?.name);

  for (const p of report.pages) delete p.links;
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`Plataforma: ${report.platform} | Páginas: ${report.pages.length} | Incidencias: ${report.issues.length} | Compra OK: ${report.purchaseFlow.ok}`);
  console.log(`Informe: ${path.join(OUT, 'report.json')}`);
  await browser.close();
})();
