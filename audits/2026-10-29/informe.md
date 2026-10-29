# Auditoría Yuno Art — 2026-10-29

## Estado de compras: ✅ OK

Producto → carrito → checkout funciona (probado con "Outlash 2017 Hooded Performance Shirt", $16). El checkout carga con Shop Pay, Apple Pay, Google Pay, PayPal y tarjeta. No se hizo ningún pago.

A revisar (puede ser intencionado):
- **Ready-to-Press Catalog DTF Sheet ($1.99):** "Add to cart" está bloqueado hasta subir un diseño. Por el nombre parece un diseño de catálogo, así que no debería pedir que el cliente suba nada.
- **Premium Polo — Embroidery ($20):** no tiene botón de compra.

## Primera auditoría: punto de partida

19 productos publicados y disponibles. 15 páginas revisadas.

## Top 5 mejoras de marketing de hoy

1. **[Alto · bajo] Precio y "Add to cart" más arriba en móvil.** En la ficha de producto aparecen a unas 4 pantallas de scroll, debajo del personalizador. Muestra precio, valoraciones y "Add to cart" (o "Start designing") justo después del título.
2. **[Alto · bajo] Verificar la medición.** No se detectan Google Analytics ni el píxel de Meta o TikTok en el código. En Shopify pueden estar instalados como apps (no se ven desde fuera): compruébalo en Configuración → Eventos de clientes. Sin ellos no sabes qué campaña de Instagram o TikTok vende.
3. **[Alto · medio] Home mucho más corta.** En móvil mide unas 45 pantallas y tiene 12 secciones. Deja: hero → categorías → trabajos reales → cómo funciona → reseñas → newsletter, y mueve el resto a páginas propias ("Work Uniforms & Company Branding" merece su propia página de presupuesto para empresas).
4. **[Medio · bajo] Meta description y og:image en la home.** La home no tiene descripción para Google ni imagen al compartir el enlace por WhatsApp o Instagram. Configúralo en Tienda online → Preferencias.
5. **[Medio · bajo] Datos estructurados de producto.** Las fichas no tienen schema `Product`, así que Google no puede mostrar precio y disponibilidad en los resultados. La mayoría de temas de Shopify 2.0 lo incluyen: revisa si el tema personalizado lo eliminó.

## Incidencias técnicas, visuales y SEO

| Severidad | Área | Página | Problema |
|---|---|---|---|
| alta | visual | Home | 1 imagen vacía (`src` en blanco) |
| media | compras | DTF Sheet, Polo Embroidery | No se pueden añadir al carrito directamente |
| media | SEO | Home, Contact, Privacy | Sin meta description |
| media | marketing | Home, Contact, Privacy | Sin og:image |
| baja | SEO | Home y fichas | 2 etiquetas H1 (en la home una está vacía; en las fichas sobra "Art That Speaks Louder.") |
| baja | SEO | Fichas | ~10 imágenes sin texto alternativo por ficha |
| baja | técnico | Home y algunas fichas | Errores de JavaScript en consola |
| baja | visual | Logo | El logo tiene un fondo gris cuadrado (JPG sin transparencia), se nota sobre el fondo de la cabecera |

## Señales de marketing

| Señal | Estado |
|---|---|
| Google Analytics / GTM | ⚠️ no detectado (verificar en Shopify) |
| Píxel de Meta / TikTok | ⚠️ no detectado (verificar en Shopify) |
| Newsletter | ✅ |
| Reseñas | ✅ |
| Envíos y devoluciones | ✅ |
| Banner de cookies | ✅ |
| Instagram / TikTok enlazados | ✅ |
| WhatsApp | ❌ no hay botón (útil para presupuestos rápidos) |
