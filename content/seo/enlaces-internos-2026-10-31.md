# Auditoría de enlaces internos – yuno-art.com (31-10-2026)

Método: rastreé las 37 URL del sitemap y las 5 vistas de servicio de la home (`?view=yuno-…`) con un navegador real y crucé todos los enlaces entre sí. "Contenido" = enlaces dentro del cuerpo de la página (sin contar cabecera, menú y pie).

## 1. Páginas huérfanas (0 enlaces entrantes)

| Página | Qué es | Recomendación |
|---|---|---|
| /pages/business-packages | Los 5 paquetes para empresas | **Enlazar** (sección 3) |
| /collections/create-your-own | Las 13 piezas personalizables con el diseñador | **Enlazar** (sección 3) |
| /collections/custom-tumbler-personalized-photo-logo-or-text | Colección con 1 solo producto (el vaso) | No enlazar: duplica la ficha del vaso. Redirigir a /products/insulated-tumbler |
| /products/mug | Producto antiguo de Kickflip, $14.99, texto de plantilla | No enlazar. Pasar a borrador y redirigir a /products/classic-11-oz-mug |
| /collections/frontpage | Colección automática de Shopify | No enlazar (es interna de Shopify) |
| /collections/custom-embroidery-logo-orders-business-apparel-branding | Bordado (reactivado el 04-11-2026) | Enlazada desde la guía 1 y desde Yuno |
| /pages/data-sharing-opt-out | Página legal de privacidad | Enlazar en el pie como "Your privacy choices" (lo piden las leyes de privacidad de varios estados) |

## 2. Páginas casi huérfanas (1 enlace entrante)

| Página | Único enlace desde | Recomendación |
|---|---|---|
| /blogs/news/corporate-holiday-gifts-katy | El listado del blog | **Enlazar** (sección 3) – es la guía clave de noviembre |
| /products/ready-to-press-catalog-dtf-sheet | Vista DTF de la home | **Enlazar** desde la guía 1 |
| /products/customize-your-t-shirt | – | Producto antiguo duplicado ($19.99, texto de plantilla): pasar a borrador y redirigir a /products/essential-cotton-tee |
| /collections/custom-t-shirts | La landing de Katy | **Error: la colección está vacía** ("No products found") y la landing de Katy la enlaza como "Shop custom t-shirts". Cambiar ese enlace (sección 3) |

Además: el blog (/blogs/news) no aparece en el menú ni en el pie; solo se llega desde los propios artículos. Conviene añadir "Guides" al menú o al pie.

## 3. Dónde poner cada enlace y con qué texto

### → /pages/business-packages

1. **Landing de Katy**, sección "For Katy businesses", tras el párrafo *"Restaurants, contractors, landscapers, clinics, real estate teams, cleaning companies: a uniform with your logo makes your business look established and easy to recognize."*
   Añadir: *"Need everything at once? See our **business packages** with uniforms, NFC cards and gifts in one order."*
   Texto del enlace: **business packages**
2. **Guía 3 (regalos de Navidad)**, sección "Ordering for your business?", al final del párrafo de KATYBIZ10:
   Añadir: *"Want it all in one order? Our **holiday gift package for 25 people** combines engraved tumblers and bamboo pens."*
   Texto del enlace: **holiday gift package for 25 people**
3. **Ficha de las tarjetas NFC**, párrafo *"Popular idea: a Google Review card for your counter…"*
   Añadir: *"It's included in our **Business Image Kit**, with an acrylic sign and 50 NFC cards."*
   Texto del enlace: **Business Image Kit**
4. **Colección Corporate Holiday Gifts**, primer párrafo *"Thank your clients and your team with a gift they will actually use…"*
   Añadir: *"…or choose one of our **ready-made business packages**."*
5. **Fichas de bolígrafos de bambú y llaveros**, en la línea de usos (*"Perfect for trade shows…"*):
   Texto del enlace: **trade show kit** (100 bolígrafos + 100 llaveros + letrero).

### → /collections/create-your-own

1. **Guía 2 (preparar el logo)**, sección 1: *"Our design tool accepts PNG, JPG/JPEG, SVG and PDF files up to 20 MB."*
   Enlazar **Our design tool**.
2. **Guía 1 (DTF vs bordado…)**, sección "Ordering for a team or business?": *"Most of our products have volume pricing…"*
   Enlazar **Most of our products**. Y cambiar el botón final "Start your design →" de /collections/all a esta colección.
3. **Landing de Katy**: los enlaces "Start your design online →" y "Choose a product from our online shop" van ahora a /collections/all, que mezcla productos sin diseñador. Apuntarlos aquí.

### → /blogs/news/corporate-holiday-gifts-katy

1. **Landing de Katy**, viñeta *"Corporate holiday gifts: tumblers, mugs, caps and hoodies with your logo…"*
   Añadir: *"…or read **5 holiday gift ideas for Katy businesses**."*
2. **Colección Corporate Holiday Gifts**, párrafo *"Ordering for the holidays? Place your order early…"*
   Añadir: *"Need ideas? Read our **holiday gift guide with prices**."*
3. **Guía 1**, sección de grabado láser: *"Perfect for: tumblers, corporate gifts and business cards that people keep."*
   Enlazar **corporate gifts**.
4. **Página Business Packages**, paquete "Corporate Holiday Gifts (25 people)":
   Añadir: *"See **5 gift ideas with prices**."*

### → /products/ready-to-press-catalog-dtf-sheet

1. **Guía 1**, sección DTF: *"If you press your own garments, you can also order custom DTF transfers by size and quantity."*
   Añadir: *"…or pick a **ready-to-press design sheet for $1.99**."*

### Arreglo: enlace roto en la landing de Katy

Viñeta *"Custom t-shirts and hoodies: full-color DTF prints…"*: el enlace **Shop custom t-shirts** va a una colección vacía. Cambiarlo a /products/essential-cotton-tee (o a /collections/create-your-own).

### Extra: texto desactualizado en las fichas con diseñador

Las fichas con el diseñador Yuno Studio dicen *"Also in development: cards with an NFC chip."* Las tarjetas NFC ya están a la venta: cambiarlo por *"New: **NFC business cards** with your logo"* con enlace a /products/nfc-business-cards (texto del tema, requiere publicar tema).
