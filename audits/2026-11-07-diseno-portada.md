# Auditoría de diseño · Portada yuno-art.com · 07-11-2026

Herramienta: `/impeccable audit` (detector automático en Chromium real + revisión de capturas a 1440×900 y iPhone 13).
Tema: "YUNO | Embroidery back | Nov 4" · sección `sections/yuno-home-v2.liquid`. Solo informe; no se cambió nada.

## Puntuación

| # | Dimensión | Nota | Hallazgo principal |
|---|---|---|---|
| 1 | Accesibilidad | 3/4 | Botones de WhatsApp: texto blanco sobre verde #25D366 = contraste 2.0:1 (mínimo 4.5:1) |
| 2 | Rendimiento | 2/4 | Móvil: ~3.8 MB, 264 peticiones, carga completa en ~4 s; 2 carruseles animados sin fin |
| 3 | Colores y estilos | 2/4 | Colores escritos a mano en las secciones propias; texto con degradado en 11 sitios |
| 4 | Móvil (responsive) | 3/4 | Sin scroll horizontal; el botón flotante de WhatsApp tapa el botón principal en el primer pantallazo |
| 5 | Coherencia del diseño | 2/4 | Demasiados recursos a la vez: degradados, 2 mascotas, 2 carruseles, fuente monoespaciada en todo el texto |
| | **Total** | **12/20** | **Aceptable: necesita una pasada de pulido** |

## Veredicto de coherencia
**No pasa del todo.** La portada tiene una propuesta clara y local (Katy, maqueta gratis, sin mínimo, fotos reales de trabajos), y eso es lo mejor que tiene. Pero la capa visual mezcla demasiadas cosas: texto con degradado arcoíris en titulares y cifras, dos Yunos en el primer pantallazo, dos cintas que se mueven sin parar, globos de chat y una fuente tipo máquina de escribir para todos los párrafos. Juntas, hacen que la página se parezca a muchas webs genéricas y le quitan protagonismo a las fotos reales, que son lo que vende.

## Hallazgos por prioridad

**P1 · Contraste del botón de WhatsApp**
- Dónde: botón "WhatsApp us" del bloque final y botón flotante (`a.yh-btn--wa`, `a.yuno-wa`).
- Impacto: texto blanco sobre verde claro = 2.0:1; cuesta leerlo al sol en el móvil. Incumple WCAG AA 1.4.3.
- Arreglo: texto en negro/azul muy oscuro sobre el verde, o verde más oscuro (#128C7E) con texto blanco.
- Comando: `/impeccable colorize`

**P1 · El botón flotante de WhatsApp tapa el botón principal en el móvil**
- Dónde: primer pantallazo en iPhone; el círculo verde queda encima de "Uniforms for your business".
- Impacto: el visitante toca WhatsApp sin querer o no ve completo el botón principal.
- Arreglo: dejar margen inferior en la portada móvil o mostrar el botón flotante solo después de hacer scroll.
- Comando: `/impeccable adapt`

**P2 · Texto con degradado en 11 sitios**
- Dónde: "your team / your school / your event" del titular, las 4 cifras (1 · 3–5 · 100 % · 5.0★) y otros.
- Impacto: es el recurso más típico de webs hechas con plantillas/IA; además se lee peor y no tiene contraste garantizado.
- Arreglo: dejar el degradado solo en el logo; titulares y cifras en un color sólido de la marca.
- Comando: `/impeccable quieter`

**P2 · Fuente monoespaciada (Anonymous Pro) con letras separadas en todos los párrafos**
- Dónde: párrafos, etiquetas, menú, botones; la barra superior con espaciado 0.06em.
- Impacto: en el móvil los párrafos se leen lento y ocupan el doble de líneas (el texto del hero ocupa 4 líneas anchas).
- Arreglo: Figtree (la de los titulares) también para el texto; la monoespaciada solo para detalles cortos si se quiere conservar ese toque.
- Comando: `/impeccable typeset`

**P2 · Dos Yunos y globos de chat en el primer pantallazo**
- Dónde: Yuno grande con regalo + Yuno pequeño con globo ("Hi! I'm Yuno… Chat on WhatsApp") en escritorio; en el móvil el globo aparece encima del texto y de las fotos mientras se hace scroll.
- Impacto: compiten con el titular y tapan las fotos de productos; parece desordenado.
- Arreglo: un solo Yuno por pantalla; el globo, solo una vez y sin tapar texto.
- Comando: `/impeccable distill`

**P2 · Peso de la página en el móvil**
- Dónde: toda la portada: ~3.8 MB, 264 peticiones, ~4 s hasta terminar de cargar (escritorio ~3 MB, 2.5 s).
- Impacto: en datos móviles la primera impresión tarda; Google lo tiene en cuenta.
- Arreglo: imágenes del collage en WebP y tamaño justo, quitar scripts que no usa la portada, revisar apps (Kickflip/Qikify) que cargan en todas las páginas.
- Comando: `/impeccable optimize`

**P2 · Dos cintas animadas sin fin**
- Dónde: cinta de servicios ("NFC BUSINESS CARDS · LIGHT-UP LOGO PENS…") y galería "Made by us".
- Impacto: movimiento constante que distrae; la galería de trabajos reales es mejor quieta y deslizable a mano.
- Comando: `/impeccable animate`

**P3 · Detalles**
- Saltos con "rebote" en la animación de Yuno (`cubic-bezier(0.2, 1.4, …)`): mejor una entrada suave.
- Palabras sueltas en la última línea de 3 párrafos ("start.", "quantities.", "shop.").
- Solo hay una reseña en la portada (Lixander, MDJ): falta la nueva de 5 estrellas de Helen Beatriz.
- Bloque final: texto blanco sobre degradado naranja-verde; comprobar contraste en la parte clara.

## Lo que funciona bien
- Propuesta clara en 3 segundos: qué hacéis, para quién, dónde y la maqueta gratis.
- Fotos reales de trabajos en el collage, en las categorías y en la galería.
- Todas las imágenes tienen texto alternativo; 58 de 65 cargan en diferido.
- Un solo H1 y títulos en orden; respeta "reducir movimiento" del sistema.
- Sin scroll horizontal en el móvil; botones grandes y fáciles de tocar.
- Pasos 1-2-3 y llamada final muy claros.

## Falsos positivos descartados
- "H2 vacío": es el aviso del carrito (oculto) del tema Dawn.
- "Enlaces sin texto" en el móvil: son los del menú lateral cerrado.
- Elementos fuera del ancho: son las cintas animadas, recortadas por su contenedor (no hay scroll horizontal).

## Acciones recomendadas
1. **[P1] `/impeccable colorize`**: contraste de los botones de WhatsApp.
2. **[P1] `/impeccable adapt`**: botón flotante y globo de Yuno en el móvil.
3. **[P2] `/impeccable quieter`**: quitar el texto con degradado y dejar un solo Yuno.
4. **[P2] `/impeccable typeset`**: Figtree para los párrafos.
5. **[P2] `/impeccable optimize`**: peso de imágenes y scripts.
6. **[P2] `/impeccable animate`**: cintas animadas y rebote de Yuno.
7. **`/impeccable polish`**: pasada final.

Todo en una copia del tema; la usuaria publica.

## Arreglos aplicados (07-11) · tema "YUNO | Design polish | Nov 7" (sin publicar)
1. Botones de WhatsApp (bloque final y flotante): verde de marca con texto oscuro #05210F → contraste ≈ 9:1.
2. Botón flotante de WhatsApp oculto mientras se ven los botones del hero (aparece al hacer scroll); el Yuno de la esquina solo aparece cuando el hero ya no se ve y se oculta al volver arriba. Entrada suave sin rebote.
3. Sin texto con degradado: palabra rotativa del titular en morado sólido #6A1FD6, cifras en tinta, separadores de la cinta en cian; bloque final en fondo oscuro sólido (antes degradado animado con texto blanco a 2.3:1).
4. Párrafos y textos en Figtree (misma familia que los titulares) en toda la web, sin espaciado extra entre letras.
5. Un solo Yuno en el primer pantallazo; lista de ventajas del hero con ancho limitado para que no quede debajo de Yuno.

Detector después de los arreglos: 23 → 4 avisos (2 cintas animadas, placeholder del email del pie a 4.3:1, el globo de Yuno del hero sobre una etiqueta del collage cuando pasa).
