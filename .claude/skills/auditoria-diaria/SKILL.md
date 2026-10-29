---
name: auditoria-diaria
description: Auditoría diaria de yuno-art.com centrada en marketing y conversión. Comprueba que el flujo de compra funcione (producto → carrito → checkout, sin pagar), detecta problemas visuales, de SEO y de medición, y propone mejoras de marketing priorizadas. Úsalo cuando pidan auditar, revisar o comprobar la web o la tienda, o en la ejecución diaria programada.
---

# Auditoría diaria de yuno-art.com

Objetivo: que cada día la tienda **venda sin fallos** y que el equipo reciba una lista corta de mejoras de marketing con impacto en ventas. Escribe el informe en español.

Contexto del negocio: tienda Shopify en inglés y en USD. Vende ropa y regalos personalizados (camisetas, gorras, polos, tazas, vasos térmicos, tarjetas grabadas, transfers DTF, uniformes de empresa) con un personalizador en la ficha de producto para subir el diseño. Los clientes son particulares (regalos, cumpleaños) y empresas (uniformes, logos). Redes: Instagram @yunoart26, TikTok @yunoart25.

## Reglas de seguridad

- **Nunca completes un pago ni envíes un pedido.** El flujo de compra se prueba solo hasta que carga el checkout; no rellenes datos personales ni de tarjeta.
- No envíes formularios de contacto ni de newsletter con datos reales.
- Si la web no responde por la red del entorno (error 403 o ENOTFOUND al conectar), dilo y para: hay que permitir `yuno-art.com` en la configuración de red del entorno. No inventes resultados.

## 1. Ejecutar la auditoría automática

```bash
node .claude/skills/auditoria-diaria/scripts/audit.js https://yuno-art.com audits/$(date +%F)
```

Genera `audits/AAAA-MM-DD/report.json` y capturas en `audits/AAAA-MM-DD/screens/` (inicio en escritorio y móvil, producto, carrito, checkout). El script detecta la plataforma (Shopify, WooCommerce…), rastrea hasta 40 páginas, comprueba enlaces e imágenes rotas, metadatos, píxeles de seguimiento y señales de confianza, y prueba el flujo de compra.

## 2. Revisar las capturas con tus propios ojos

Abre cada captura con la herramienta Read y evalúa lo que un script no ve:

- **Primera impresión (home):** ¿se entiende en 3 segundos qué vende Yuno Art? ¿Hay un llamado a la acción claro encima del pliegue? La home en móvil es muy larga (unas 45 pantallas): vigila que no crezca más.
- **Fotografía:** trabajos reales de clientes (prueba social), fondos consistentes, producto puesto o en uso.
- **Ficha de producto:** el precio y el botón "Add to cart" deben verse pronto en móvil. Al 29-10-2026 aparecían a unas 4 pantallas de scroll, debajo del personalizador. Comprueba también el plazo de producción y envío, el pedido mínimo para empresas y las reseñas cerca del botón.
- **Móvil:** texto legible, botones grandes, nada cortado.
- **Checkout:** métodos de pago visibles (Shop Pay, Apple Pay, Google Pay, PayPal), coste de envío claro antes de pagar.

## 3. Comparar con el día anterior

Busca la carpeta anterior más reciente en `audits/` y compara `issues` y `purchaseFlow`. Señala lo **nuevo**, lo **resuelto** y lo que **sigue pendiente** (y cuántos días lleva).

## 4. Redactar el informe

Guárdalo como `audits/AAAA-MM-DD/informe.md` con esta estructura:

```markdown
# Auditoría Yuno Art — AAAA-MM-DD

## Estado de compras: ✅ OK / ❌ FALLA
(paso que falla, captura y causa probable)

## Cambios desde ayer
- Nuevo: …
- Resuelto: …

## Top 5 mejoras de marketing de hoy
1. [Impacto alto · esfuerzo bajo] Qué cambiar, dónde y por qué ayuda a vender.

## Incidencias técnicas, visuales y SEO
(tabla: severidad · área · página · problema)

## Señales de marketing
(analytics, píxel de Meta, newsletter, reseñas, envíos, devoluciones, cookies, redes)
```

Prioriza siempre por **impacto en ventas ÷ esfuerzo**. Algunas palancas de marketing para una tienda de personalización:

- Captación de email con incentivo (10 % en el primer pedido) y secuencia de bienvenida; recordatorios para fechas clave (Navidad, Día de la Madre, graduaciones).
- Prueba social: reseñas con fotos de clientes, logos de empresas que ya compraron uniformes.
- Página o formulario de presupuesto para empresas (pedidos por volumen, descuentos por cantidad visibles).
- Plazos claros: "Order by X for delivery by Y" en temporada de regalos.
- Medición: GA4 con eventos de ecommerce (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`), píxel de Meta y de TikTok con API de conversiones, UTM en campañas.
- SEO: datos estructurados `Product` con precio y disponibilidad, meta description en todas las páginas, `og:image` atractiva para compartir.
- Recuperación de carritos abandonados (sobre todo de quien subió un diseño y no compró) y envío gratis a partir de un importe.

## 5. Avisar

Si el flujo de compra falla o aparece una incidencia **crítica** o **alta** nueva, ponla en la primera línea de tu respuesta para que se vea enseguida. Si todo está bien, basta con un resumen de 3 líneas y el enlace al informe.
