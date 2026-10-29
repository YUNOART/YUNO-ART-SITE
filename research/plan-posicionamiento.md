# Plan para llevar yuno-art.com hacia el modelo de Ninja Transfers

Fecha: 29-10-2026. Basado en los sitemaps de las dos webs y en la auditoría de Yuno del mismo día.

## 1. Dónde estamos

| | Ninja Transfers | Yuno Art |
|---|---|---|
| Productos | 7.114 | 19 |
| Colecciones | 523 | 7 (2 son las automáticas de Shopify) |
| Páginas | 235 (138 son guías) | 2 (contacto y privacidad) |
| Artículos de blog | 19 en 9 blogs temáticos | 0 (el blog `news` existe, vacío) |
| Idiomas | inglés, español, francés, Canadá | inglés |
| Herramientas | estudio de diseño, gang sheet, mockups, IA, quitar fondo | personalizador en ficha de producto ✅ |
| Fidelización | puntos, referidos, mayoristas | — |
| SEO local | /pages/texas | — |

Lo que Yuno ya tiene y Ninja valora: personalizador propio en la ficha, checkout con Shop Pay, Apple Pay, Google Pay y PayPal, newsletter, reseñas y banner de cookies.

Problemas de Yuno que hay que arreglar antes de crecer:
- `/products/copy-of-t-shirt-with-pocket-1`: URL de producto duplicado. Hay que renombrarla o borrarla.
- `/products/yuno-art-customization-service-internal`: producto interno visible para Google. Hay que ocultarlo.
- Precio y "Add to cart" aparecen a unas 4 pantallas de scroll en móvil.
- Faltan meta descriptions, og:image y datos estructurados de producto.
- No se pudo comprobar que la medición (GA4, píxel de Meta y de TikTok) esté instalada.

## 2. Estrategia: no copiar el tamaño, copiar el modelo

Ninja gana por volumen: miles de productos y cientos de guías acumuladas durante años. Competir de frente por "DTF transfers" no es realista a corto plazo. Hay que ganar primero en lo que ellos no cubren bien:

1. **Búsquedas locales en Katy y el oeste de Houston:** "custom shirts Katy TX", "embroidery Katy", "DTF transfers Katy", "custom shirts near me". Ninja ya ataca Texas con /pages/texas (entrega al día siguiente en todo el estado), pero no tiene dirección en Katy. Una tienda con dirección real, recogida en persona y reseñas en Google Maps les gana en las búsquedas "near me".
2. **Producto terminado, no solo el transfer:** Ninja vende sobre todo transfers y prendas en blanco para que otros las personalicen. Yuno entrega la prenda ya terminada (bordado, grabado, sublimación). Eso apunta a otro cliente: empresas, familias y eventos.
3. **Nichos con intención de compra:** uniformes por sector (restaurantes, construcción, clínicas), camisetas de cumpleaños, reuniones familiares, despedidas de soltera, equipos deportivos locales.

## 3. Nueva estructura de la web

```
yuno-art.com
├── Shop
│   ├── Custom T-Shirts / Hoodies / Polos / Hats            (por prenda)
│   ├── Drinkware: mugs, tumblers                           (ya existe)
│   ├── Engraving: metal business cards, gifts
│   └── DTF Transfers: custom + ready-to-press catalog
├── Ocasiones                                               (como las 97 colecciones temáticas de Ninja)
│   ├── Birthday shirts · Family reunion · Bachelorette
│   ├── Christmas · Halloween · Mother's/Father's Day
│   └── Team & sports
├── Empresas
│   ├── Work uniforms por sector (restaurantes, construcción, salud, limpieza)
│   ├── Formulario de presupuesto y precios por volumen
│   └── Casos de clientes (Quality Line, etc.)
├── Aprende                                                 (el motor de SEO de Ninja)
│   ├── Cómo cuidar tu prenda personalizada
│   ├── DTF vs bordado vs sublimación: cuál elegir
│   ├── Cómo preparar tu logo para imprimir
│   └── Guía de tallas y colocación del diseño
├── Katy, TX: landing local con dirección, mapa, zonas cercanas (Cinco Ranch, Fulshear, Brookshire, Cypress, oeste de Houston)
└── Sobre nosotros · Reseñas · FAQ · Envíos y devoluciones · Contacto
```

## 4. Hoja de ruta

### Mes 1: arreglar la base (quick wins)
- [ ] Ocultar el producto interno y arreglar el duplicado `copy-of-…`.
- [ ] Subir precio y "Add to cart" en la ficha móvil.
- [ ] Meta description y og:image en la home y en las páginas clave.
- [ ] Verificar GA4 y los píxeles de Meta y TikTok en *Configuración → Eventos de clientes*.
- [ ] Alta en **Google Search Console** y **Google Business Profile** (imprescindible para el SEO local).
- [ ] Crear las páginas About, FAQ y Envíos y devoluciones.

### Meses 2-3: estructura y ocasiones
- [ ] Crear el menú nuevo (Shop · Ocasiones · Empresas · Aprende).
- [ ] 6 colecciones de ocasión con texto propio (150-300 palabras cada una) y fotos reales.
- [ ] Página de empresas con formulario de presupuesto y tabla de descuentos por cantidad.
- [ ] Landing "Custom Shirts & Embroidery in Katy, TX" (`/pages/katy-tx`), con negocios y escuelas de la zona como público: uniformes, spirit wear y equipos deportivos.

### Meses 3-6: contenido (el motor de Ninja)
- [ ] **2 guías al mes** en el blog, cada una con enlaces a sus colecciones.
- [ ] Un vídeo corto por guía para TikTok e Instagram, con enlace a la guía.
- [ ] Pedir reseñas con foto tras cada pedido; responder siempre en Google Business.

### Meses 6-12: escalar
- [ ] Programa de puntos y de referidos (Ninja tiene los dos).
- [ ] Versión en español de la web si tu clientela lo pide (Ninja ya tiene `/es`).
- [ ] Catálogo de diseños listos para planchar por temática.
- [ ] Más landings locales: Houston, Cypress, Fulshear, Sugar Land.

## 5. Organización del equipo (semanal)

| Día | Tarea | Responsable |
|---|---|---|
| Diario | Auditoría automática (skill `auditoria-diaria`): compras, errores, SEO | Claude |
| Lunes | Revisar el informe y elegir 1-2 mejoras de la semana | Dueña o dueño |
| Martes | Fotografiar los trabajos de la semana (prueba social, contenido) | Producción |
| Miércoles | Publicar o actualizar una guía o colección | Marketing (Claude puede redactar borradores) |
| Jueves-viernes | 3 vídeos cortos a partir de los trabajos y la guía | Redes |
| Mensual | Revisar Search Console: búsquedas que crecen, páginas en posición 5-20 que se pueden mejorar | Marketing |

## 6. Cómo medir que nos acercamos

| Indicador | Hoy | Meta a 6 meses | Meta a 12 meses |
|---|---|---|---|
| Páginas indexadas | ~30 | 80 | 150 |
| Guías publicadas | 0 | 10 | 24 |
| Colecciones temáticas | 5 | 15 | 30 |
| Reseñas en Google Business | ? | 30 | 100 |
| Búsquedas locales en top 3 | ? | 3 | 10 |

Para conocer las posiciones reales (ranking de Yuno y de Ninja por palabra clave) hace falta Search Console de Yuno y una herramienta SEO como Ahrefs o Similarweb. Las dos tienen conector en Claude, pero necesitan autorización.
