---
name: auditoria-diaria
description: Auditoría diaria de yuno-art.com centrada en marketing y conversión. Comprueba que el flujo de compra funcione (producto → carrito → checkout, sin pagar), detecta problemas visuales, de SEO y de medición, y propone mejoras de marketing priorizadas. Úsalo cuando pidan auditar, revisar o comprobar la web o la tienda, o en la ejecución diaria programada.
---

# Auditoría diaria de yuno-art.com

Objetivo: que cada día la tienda **venda sin fallos** y que el equipo reciba una lista corta de mejoras de marketing con impacto en ventas. Escribe el informe en español.

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

- **Primera impresión (home):** ¿se entiende en 3 segundos qué es Yuno Art y qué vende? ¿Hay un llamado a la acción claro encima del pliegue?
- **Fotografía de las obras:** calidad, consistencia de fondos y encuadres, obra en contexto (en una pared o un salón).
- **Ficha de producto:** precio, medidas, técnica, plazo de envío, botón de compra visible sin hacer scroll en móvil, reseñas y garantía cerca del botón.
- **Móvil:** texto legible, botones grandes, nada cortado.
- **Checkout:** métodos de pago visibles (Bizum, PayPal, Apple Pay ayudan en España), coste de envío claro antes de pagar.

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

Prioriza siempre por **impacto en ventas ÷ esfuerzo**. Algunas palancas de marketing para una tienda de arte:

- Captación de email con incentivo (descuento en la primera compra o acceso anticipado a nuevas obras) y secuencia de bienvenida.
- Prueba social: reseñas con fotos de clientes con la obra colgada, prensa, exposiciones.
- Urgencia y escasez honestas: "obra única", "edición limitada de 50", stock real.
- Historia de la artista o el artista y del proceso (vídeo corto), que justifica el precio.
- Medición: GA4 con eventos de ecommerce (`view_item`, `add_to_cart`, `begin_checkout`, `purchase`), píxel de Meta y API de conversiones, UTM en campañas.
- SEO: datos estructurados `Product` con precio y disponibilidad, títulos con técnica y estilo, `og:image` atractiva para compartir por Instagram y WhatsApp.
- Recuperación de carritos abandonados y envío gratis a partir de un importe.

## 5. Avisar

Si el flujo de compra falla o aparece una incidencia **crítica** o **alta** nueva, ponla en la primera línea de tu respuesta para que se vea enseguida. Si todo está bien, basta con un resumen de 3 líneas y el enlace al informe.
