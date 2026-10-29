# Auditoría de la web publicada · www.construccionesanaid.com · 29-10-2026

Revisión completa de la web en producción (main `e625c70`, PR #21 desplegada), hecha el 29 de
octubre de 2026 con la skill `auditoria-web-pymexpert`: rastreo de las 20 URL, Lighthouse en local
sobre cuatro páginas, navegador real a 1366 y 375 px, prueba de cookies y formulario sin enviar
nada, y contraste del texto publicado con `docs/DECISIONES.md`. Informe hermano de los de
PyMExpert y Mandrinados Anaid del mismo día. Sustituye, como foto del estado, al del 17-10.

## Resumen

Es la web más completa de las tres en lo técnico: CSP real, HSTS con preload, cookies sin
rastro de Google hasta aceptar, formulario protegido, sitemap con fechas reales y 100 en
accesibilidad, buenas prácticas y SEO en las cuatro páginas medidas. Lo que la frena no es el
código: es la galería «Obras de nuestra red» con fotos que no son obras de la red, la ficha de
Google sin verificar (sin reseñas) y unas páginas de servicio cortas para competir en Madrid.

| Página | Vista | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|---|
| Portada | Móvil | 90 | 100 | 100 | 100 |
| Portada | Escritorio | 100 | 100 | 100 | 100 |
| /servicios/reforma-integral-madrid | Móvil | 87 | 100 | 100 | 100 |
| /contacto | Móvil | 90 | 100 | 100 | 100 |

Lighthouse se ejecutó en el PC de Luis con Chrome sin ventana. El antivirus local inyecta en cada
página un script, un CSS y tres fuentes con rutas aleatorias (404 en el servidor), así que el
rendimiento móvil real está por encima de la tabla (PSI dio 96 en portada el 28-10).

## Puntos fuertes

- **Verdad del contenido.** Todo lo decidido está en la web y nada lo contradice: «constructora»
  solo aparece en el aviso legal para negarlo, Valdeavero solo en aviso legal y privacidad, el
  móvil nuevo 664 415 523 en los 65 sitios donde toca, plazos por tamaño (60 días / 2-4 meses) en
  portada, reforma integral y cómo trabajamos, «de nuestra red» en vez de «validado» o
  «verificado», ni rastro de «nuestro equipo», «Anaid Grupo», «lorem» ni «próximamente», sin
  reseñas inventadas, y la privacidad dice la verdad sobre la IA (no se usa con los datos del
  cliente) y sobre la IP (15 minutos en memoria, sin registros de acceso).
- **SEO técnico.** 16 URL indexables con `lastmod` real por página (28-10), legales `noindex` y
  fuera del sitemap, un H1 por página, títulos de 31-60 y descripciones de 132-159 en las
  indexables, canónicas correctas, la antigua `/servicios/pequenas-obras-madrid` redirige (308) a
  `/servicios`, 404 real con `noindex`, www y HTTPS con 301, `robots.txt` con rastreadores de IA,
  `llms.txt` y `llms-full.txt`, imagen propia para compartir (1200×630), y datos estructurados
  coherentes: `HomeAndConstructionBusiness` + `FAQPage` en portada, `Service` + `BreadcrumbList`
  + `FAQPage` en los ocho servicios, negocio + migas en las tres zonas.
- **Seguridad.** La mejor de las tres webs: CSP real (`script-src 'self' 'unsafe-inline'` más GTM),
  HSTS de dos años con `includeSubDomains; preload`, `X-Frame-Options: DENY`, `nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, sin `X-Powered-By` ni
  `Server`; `/api/contacto` rechaza orígenes ajenos (403), el `GET` (405), solo JSON y 16 KB, con
  tope global y por IP (PR #20).
- **Cookies.** Con el almacenamiento limpio aparece el aviso «Transparencia de cookies (RGPD /
  AEPD)», no se carga nada de Google hasta «Aceptar», «Rechazar» tiene el mismo tamaño y color,
  hay «Configurar cookies» en el pie y la decisión se guarda con fecha.
- **Accesibilidad.** 100 en las cuatro páginas, enlace «Saltar al contenido», foco visible con
  teclado en la cabecera, el menú móvil se cierra con Escape y devuelve el foco al botón (arreglo
  del 17-10 comprobado), formulario con validación nativa que lleva el foco al primer campo vacío,
  contacto legible a 320 px.
- **Rendimiento.** 100 en escritorio; en móvil la portada carga el chalé en AVIF a 20 KB (PR #21),
  TBT de 60-180 ms y CLS 0 en todas las páginas.

## A mejorar

### Importante

1. **Galería «Obras de nuestra red» sin obras de la red.** Las cuatro fotos (salón, cocina, baño,
   suite) son imágenes de muestra, no trabajos de los profesionales de la red, y el título lo
   afirma. Mientras no haya fotos reales con lugar y plazo (pendiente de Luis desde el 17-10),
   cambiar el título a algo honesto («Así pueden quedar: ejemplos de acabados») o retirar el
   bloque. Es el único punto de verdad del contenido que queda abierto.
2. **Ficha de Google sin verificar, sin reseñas.** Sin la verificación por vídeo (pendiente desde
   el 19-10) un cliente que busca «Construcciones Anaid» sigue cayendo en la ficha antigua de
   Alcalá, y la web no puede enlazar reseñas ni mostrar `AggregateRating`. Es la pieza con más
   efecto en captación y la única que no depende de código.
3. **Páginas de servicio cortas para competir.** Siete de los ocho servicios tienen 700-790
   palabras con la misma estructura y el mismo cierre; solo piscinas (1.291) desarrolla el tema.
   Para pelear «reforma de baño Madrid» o «electricista Madrid» hacen falta secciones propias
   (qué incluye, pasos reales, plazos por caso, errores habituales, preguntas distintas por
   servicio) y, a medio plazo, más municipios con contenido real que las tres zonas actuales
   (Pozuelo, Las Rozas, Majadahonda, 680-720 palabras).
4. **Rendimiento móvil, segunda vuelta.** LCP de 3,5-3,6 s en las tres páginas móviles medidas
   (siempre la foto de cabecera) y una CSS que bloquea 420-570 ms. Tras la PR #21 queda poco
   margen en la imagen (11 KB); lo que resta es la CSS inicial (33 KB sin usar según Lighthouse) y
   14 KB de JavaScript antiguo en el chunk principal. Objetivo: LCP < 2,5 s en móvil.

### Pulido

5. **Nombre accesible del teléfono.** El enlace de llamada lleva `aria-label` («Llamar
   directamente al 664 415 523») que no contiene el texto visible tal cual en todas las vistas;
   Lighthouse lo marca en portada (único aviso de accesibilidad). Hacer que el `aria-label`
   empiece por el texto visible o quitarlo y dejar el texto.
6. **Descripciones de aviso legal (104) y cookies (108)** por debajo de 120 caracteres; sin
   efecto en Google (`noindex`), pero se ven al compartir.
7. **`/zonas` y `/contacto`** con 400 y 281 palabras: poca sustancia para una página indexable.
   Un párrafo de verdad sobre cómo se cubre la Comunidad de Madrid y otro sobre qué pasa tras
   enviar el formulario bastarían.
8. **`security.txt`** no existe. Opcional.

### Fuera de la web, pero cuentan

- Bing Webmaster Tools: el sitemap quedó en «Processing» el 17-10; falta comprobar que pasó a
  «Success» con 16 URL.
- DMARC sigue en `p=none` con informes a luis@pymexpert.com; hacia el 17-11, `p=quarantine`.
- Search Console: las 6 URL pedidas el 17-10 (servicios y zonas) deberían estar indexadas ya;
  comprobar en Páginas.

## Comprobaciones hechas

- Rastreo propio de las 20 URL (códigos, redirecciones, títulos, descripciones, H1, canónicas,
  Open Graph, JSON-LD, imágenes sin `alt`, anclas rotas, enlaces internos y externos, cabeceras):
  sin enlaces rotos, sin páginas huérfanas, sin páginas fuera del sitemap.
- `robots.txt`, `sitemap.xml` (16 URL con `lastmod`), 404 real, URL antiguas, `/.env`,
  `/.git/HEAD`, `/index.html`, `llms.txt`, `llms-full.txt`, favicon e iconos.
- API: `POST` con cuerpo inválido y origen ajeno a `/api/contacto` (403), `GET` (405).
- Lighthouse 13.5 en local: portada móvil y escritorio, reforma integral y contacto en móvil.
- Navegador real: portada a 1366 px (foco con teclado) y a 375 px (menú y Escape, aviso de
  cookies con almacenamiento limpio, rechazo, envío vacío del formulario sin ninguna petición al
  servidor).
- Texto visible de todas las páginas buscado contra `docs/DECISIONES.md` (constructora,
  Valdeavero, teléfonos, plazos, «validado», «nuestro equipo», reseñas, IA, precios).

Ningún cambio aplicado: este documento es solo el informe.
