# Auditoría de la web publicada · www.construccionesanaid.com · 17/10/2026

> Revisión completa de la web provisional en producción (`main` en `1d3bf18`, desplegada el
> 15-10-2026 en Dokploy), hecha sobre la web en vivo y cruzada con el código de `origin/main`,
> `docs/DECISIONES.md` (decisiones 1-78) y la revisión del 06-10-2026. Método de la skill
> `auditoria-web-pymexpert` (siete bloques) más la capa SEO/GEO de `seo-geo-pymes`.
>
> Qué se hizo: rastreo de las 16 páginas del sitemap, las 4 legales, la de agradecimiento y
> 22 rutas antiguas o sensibles (metadatos, encabezados, JSON-LD, enlaces, formularios, textos);
> Lighthouse 13.5 desde PageSpeed Insights (móvil); cabeceras, TLS, HTTP/2, DNS de correo,
> ubicación del servidor y peso real de las imágenes; en el navegador, a 1366, 375 y 320 px:
> teclado real (Tab, Intro, Escape), menú móvil, formulario, ajuste de ancho y capturas.
>
> **Qué no se hizo:** no se envió ningún formulario en producción (habría generado un correo
> real); axe no se pudo inyectar por la CSP de la web, así que la accesibilidad automática es la
> de Lighthouse (que ejecuta axe); no hay prueba con lector de pantalla. **No es asesoría
> jurídica.**

---

## 1. Veredicto

**La web publicada está sana y se puede dejar tal cual mientras se termina la completa.** De
los 22 puntos que se revisan en cada bloque, 19 están bien. No hay nada inventado, nada que
contradiga el modelo (el contrato lo firma el profesional asignado; Construcciones Anaid analiza,
asigna y coordina), ningún enlace roto, ninguna página huérfana y ningún resto de las funciones
retiradas accesible: las rutas antiguas devuelven 404 con `noindex`.

Lighthouse móvil, 17-10-2026, portada:

| Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|:--:|:--:|:--:|:--:|
| 96 | 100 | 100 | 100 |

FCP 0,9 s · LCP 2,7 s · TBT 0 ms · CLS 0 · Speed Index 0,9 s (Moto G Power emulado, 4G lenta).

Lo que hay que corregir, por orden:

1. **Una contradicción de contenido**: la portada dice que «la mayoría de obras no pasan de 60
   días» y la página de reforma integral que «un piso medio puede durar entre 2 y 4 meses».
2. **Un recorte a 320 px en `/contacto`**: la columna de teléfono, WhatsApp y correo mide 335 px
   y el correo sale cortado. A 375 px cabe.
3. **Metadatos que se cortan o faltan**: tres descripciones pasan de 160 caracteres y la imagen
   para compartir (`og:image`) solo existe en la portada, y pesa 780 KB.
4. **Detalles de accesibilidad y seguridad**: el foco se pierde al cerrar el menú con Escape; la
   CSP lleva `'unsafe-eval'`, que en producción no hace falta.
5. **Restos del aviso legal**: cita «solicitud de proyecto» y «registro profesional», formularios
   que la provisional no tiene.

Todo lo anterior cabe en una tanda de unas dos horas y una sola PR a `main`. Fuera del código
quedan las palancas de visibilidad que dependen de Luis: verificar el Perfil de Empresa de
Google, pedir la indexación de las seis URL que faltan y dar de alta Bing Webmaster Tools.

---

## 2. Lo verificado, bloque a bloque

### 2.1 Verdad del contenido

| Comprobación | Resultado |
|---|---|
| Modelo de intermediación | Coherente en portada, servicios, cómo trabajamos, zonas, aviso legal, privacidad y datos para Google. «El contrato de obra lo firmas con el profesional asignado» aparece en todas las páginas de servicio y zona (decisión 76) |
| Palabras vetadas | «Constructora» solo en el aviso legal, negándolo. «Anaid Grupo», «S.L.» y el NIF de la sociedad: 0 apariciones. «Homologada», «garantizado», «el primero»: 0 |
| Sede | Valdeavero solo en aviso legal y privacidad (decisión 11). Ni en pie, ni en contacto, ni en los datos para Google |
| Promesas | «48 horas laborables» en todas partes (decisión 67); horario único L-J 8-18 y V 8-15 en texto y datos para Google (decisión 77); sin precios, sin calidades, sin presupuesto automático (decisión 61) |
| Experiencia | «Más de 20 años en el sector»: coherente con la decisión 33 (desde 2003) |
| Opiniones y cifras | Sin testimonios, sin porcentajes, sin obras con lugar o plazo inventados |
| Fotos | Galería y hero con obras reales de la red (decisión 4); el chalé de fondo es de banco, decorativo (decisión 44) |
| Correo público | info@ en pie, contacto, legales y datos para Google (decisión 70) |

### 2.2 Formularios y datos

| Comprobación | Resultado |
|---|---|
| Ruta | Un solo formulario (6 páginas lo incluyen) hacia `/api/contacto`; `/api/lead` ya no existe (404) |
| Servidor | Valida nombre, teléfono (9-15 dígitos), correo, tipo, mensaje y casilla; sanea saltos de línea y etiquetas; comprueba el origen exacto; campo trampa que responde «ok» sin enviar; 5 envíos cada 15 minutos por IP (último salto de `X-Forwarded-For`); SMTP de Hostinger por 465 con tiempos máximos; solo responde «enviado» si el servidor de correo acepta; si no, error visible con teléfono y WhatsApp; 503 si faltan credenciales |
| Cliente | Etiquetas vinculadas a los 7 campos, `autocomplete`, campos de 50 px y 16 px (sin zoom en iPhone), desplegable con opción inicial deshabilitada, `role="alert"` en el error, redirección a `/gracias/contacto` (200, `noindex`) |
| Correo del dominio | MX en Hostinger; SPF `include:_spf.mail.hostinger.com ~all`; DKIM configurado (selector de Hostinger); DMARC `p=none` |
| Producción | Según el registro del 15-10, el formulario funciona desde que se corrigió `SMTP_PASS` en Dokploy. No se ha vuelto a enviar hoy |

### 2.3 Navegación y SEO técnico

| Comprobación | Resultado |
|---|---|
| Rutas | 16 indexables + 4 legales + agradecimiento, todas 200. `http` → `https` y apex → `www` con 308 |
| Enlaces | 0 rotos. 0 páginas huérfanas (todas las del sitemap reciben enlaces de otras). Anclas del menú (`#galeria`, `#preguntas-frecuentes`, `#contacto`) existen en la portada |
| Rutas retiradas | `/en`, `/unete-red`, `/solicitar-proyecto`, `/ia-analisis-proyecto`, `/guias-precios`, `/panel`, `/inversores`: 404 con `noindex` y título propio (decisión 75) |
| Encabezados | Un H1 por página, sin saltos de nivel, en las 21 páginas |
| Metadatos | `title` entre 31 y 59 caracteres; canonical absoluto, `lang="es"`, viewport y `robots` correctos en todas; legales y agradecimiento con `noindex` y fuera del sitemap |
| Datos estructurados | Portada: `HomeAndConstructionBusiness` (teléfono, correo, horario, `areaServed`, `sameAs` con YouTube, LinkedIn y Facebook, catálogo de servicios) + `FAQPage` (8 preguntas, las mismas que se ven). Servicios: `Service` + `BreadcrumbList` + `FAQPage`. Zonas: `LocalBusiness` por municipio + `BreadcrumbList`. Contacto: `LocalBusiness` con horario. Cómo trabajamos: `FAQPage`. Sin dirección ni `priceRange` en ninguno (decisión 9). Ningún `FAQPage` duplicado |
| robots y sitemap | `robots.txt` permite todo salvo `/api/` y enlaza el sitemap; sitemap con las 16 URL |
| Iconos | `favicon.ico`, `icon.png` y `apple-icon.png` (monograma CA, decisión 74) |

### 2.4 Accesibilidad (objetivo WCAG 2.2 AA)

| Comprobación | Resultado |
|---|---|
| Lighthouse (axe) | 100 en portada: 29 auditorías aprobadas, 0 fallos, sin problemas de contraste detectables |
| Primer Tab | «Saltar al contenido» visible (anillo de 2,4 px azul con banda blanca), nada lo tapa |
| Menú móvil | `aria-label`, `aria-expanded` y `aria-controls`; se abre con Intro; Tab entra en el panel con foco visible; Escape lo cierra |
| Formulario | Etiquetas vinculadas, obligatorios marcados, tamaños correctos, error anunciado |
| Ajuste a 320 px | Portada y páginas de servicio sin desplazamiento ni cortes; cabecera completa (el botón del menú termina en 315 px). **Contacto no** (ver hallazgo A1) |
| Objetivos táctiles | Los enlaces de 16 px de alto («Consultar por este servicio», «Quiero una así») tienen espacio libre alrededor: cumplen por la excepción de separación de 2.5.8; Lighthouse los aprueba |
| Declaración | `/accesibilidad` enlazada en el pie, honesta sobre la revisión interna; fechada el 06-10 |

### 2.5 IA y legal

| Comprobación | Resultado |
|---|---|
| IA | No hay IA en la web provisional y la privacidad lo dice expresamente («no usamos inteligencia artificial ni decisiones automáticas») |
| Aviso legal | Titular persona física con NIF y domicilio, nombre comercial, teléfono, correo; naturaleza del servicio (intermediación), exclusión de responsabilidad por la obra, jurisdicción del consumidor; crédito de PyMExpert; fecha 15-10-2026 |
| Privacidad | Resumen arriba; responsable; datos por canal; bases legales (6.1.b, 6.1.f, 6.1.c); cesión al profesional asignado; Hostinger con servidor en Fráncfort (**verificado**: la IP 76.13.129.218 es de Hostinger en Fráncfort); WhatsApp/Meta con Marco de Privacidad de Datos; plazos (12 meses sin obra, 5 años con obra, IP 15 minutos); derechos sin pedir DNI por defecto; menores; fecha 15-10 |
| Primera capa | Junto a cada formulario: responsable, finalidad, base, destinatarios, derechos y enlace |
| Cookies | **Ninguna**: sin `Set-Cookie`, sin scripts de terceros, sin almacenamiento local; política que lo dice y sin aviso (guía de la AEPD). El `dataLayer` de medición existe en memoria pero no carga GTM mientras el ID sea el de relleno |

### 2.6 Seguridad y limpieza

| Comprobación | Resultado |
|---|---|
| TLS | Let's Encrypt, válido hasta el 12-12-2026 (renovación automática de Traefik: comprobar la primera, hacia mediados de noviembre); HTTP/2 activo y HTTP/3 anunciado |
| Cabeceras | HSTS 2 años con `preload`, CSP activa, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. Sin `X-Powered-By` ni `Server` |
| Código publicado | Sin paneles, sin `/en`, sin contraseñas por defecto, sin webhook; credenciales por variables de Dokploy |
| API | Origen comparado de forma exacta, límite por IP, saneado, sin datos de la persona en los registros de error |

### 2.7 Rendimiento

| Comprobación | Resultado |
|---|---|
| Lighthouse móvil | 96. Oportunidades pequeñas: entrega de imágenes (31 KiB), JavaScript antiguo (14 KiB), bloqueo del renderizado (130 ms), JavaScript sin usar (28 KiB) |
| Imágenes | Originales de 720-820 KB en JPG, pero `next/image` sirve WebP de 43-72 KB a 1080 px. El logo PNG de 214 KB se sirve como WebP de 9 KB |
| Servidor | TTFB 150 ms; HTML de portada 157 KB (25 KB comprimido con gzip) |

---

## 3. Hallazgos, por prioridad

### Importantes (corregir en la próxima PR)

**C1. Plazos contradictorios.** Portada y cómo trabajamos (FAQ «¿Cuánto dura una obra?»): «la
mayoría de obras no pasan de 60 días». `/servicios/reforma-integral-madrid` (FAQ «¿Cuánto dura
una reforma integral?»): «un piso medio en Madrid puede durar entre 2 y 4 meses». Las dos no
pueden ser verdad a la vez sin matiz. Decisión de Luis: o la FAQ general distingue («las de baño
y cocina no suelen pasar de 60 días; una integral, de 2 a 4 meses») o se cambia una de las dos
cifras. Está en `FAQS` de `src/lib/constants.ts` y en la FAQ de la página de reforma integral.

**A1. `/contacto` se corta a 320 px** (WCAG 1.4.10). La columna de tarjetas (`div.space-y-6`)
mide 335 px y termina en 367 px en una pantalla de 320: el correo
`info@construccionesanaid.com` sale recortado y, como el `body` lleva `overflow-x: hidden`, no
hay barra para verlo. Causa: el hijo del `grid` no encoge por debajo de su contenido y el correo
no parte. Arreglo en `src/app/(es)/contacto/page.tsx`: `min-w-0` en las dos columnas del grid y
`break-all` (o `[overflow-wrap:anywhere]`) en el párrafo del correo. A 375 px cabe (367 < 375).
Captura: `docs/capturas/2026-10-17_320_contacto-correo-cortado.jpg`.

**S1. Tres descripciones se cortan en Google y cinco se quedan cortas.**

| Página | Caracteres | Qué hacer |
|---|:--:|---|
| `/` | 185 | Recortar a ≤160 (por ejemplo, quitar «en toda» y «de profesionales») |
| `/zonas` | 168 | Quitar dos municipios de la lista o acortar el arranque |
| `/contacto` | 167 | Quitar «para tu reforma en la Comunidad de Madrid» |
| `/servicios/climatizacion-madrid` | 111 | Hay sitio para «48 horas laborables» o «Comunidad de Madrid» |
| `/servicios/fontanero-madrid` | 121 | Ídem |
| `/servicios/electricista-madrid` | 123 | Ídem |
| `/servicios/arquitecto-reformas-madrid` | 125 | Ídem |
| `/servicios/pequenas-obras-madrid` | 125 | Ídem |

**S2. Imagen para compartir solo en la portada, y pesada.** Al compartir cualquier página
interior por WhatsApp o LinkedIn no sale imagen (`twitter:card` queda en `summary`). La de
portada es el JPG original `obra-salon.jpg`: 1376×768 y 780 KB. Arreglo: una imagen de
1200×630 de menos de 300 KB (o un `opengraph-image.tsx`) declarada en el `openGraph` del layout
raíz; como las páginas no definen `openGraph` propio, la heredan todas.

**SEC1. CSP con `'unsafe-eval'`.** Lighthouse la señala como no efectiva contra XSS. Con Next 16
en producción `'unsafe-eval'` no hace falta (solo en desarrollo): quitarlo y comprobar la consola.
`'unsafe-inline'` sí lo necesita Next hoy; pasar a nonces es trabajo de segunda fase.

### Pulido (misma PR si da tiempo)

**A2. Foco perdido al cerrar el menú con Escape.** Tras abrir con Intro y pulsar Escape, el
foco queda en `body` en vez de volver al botón «Abrir menú». Arreglo en `Header.tsx`: `ref` al
botón y `focus()` al cerrar por teclado.

**L1. Restos en el aviso legal.** El punto 3 habla de «formularios de contacto, solicitud de
proyecto o registro profesional» y el 2 de «enviar solicitudes de proyecto a través de sus
formularios». La provisional solo tiene el formulario de consulta. Lección 21 de la skill: al
retirar una función, buscarla por nombre en todo el sitio.

**S3. Separador del título.** La portada usa «|» (`Reformas en Madrid con trato directo |
Construcciones Anaid`) y el resto «·» (plantilla). Unificar.

**C3. «Nuestro equipo».** El paso 02 de la portada y «Cómo se clasifica una solicitud» dicen
«nuestro equipo estudia» y «nuestro equipo analiza». Hoy lo hace Luis en persona; «una persona»
(como ya dice la FAQ) es más exacto y encaja con la privacidad.

**C4. «Orientación inicial… es una estimación».** `/como-funciona` explica la diferencia entre
la orientación inicial de Construcciones Anaid (una estimación) y el presupuesto final. La
provisional no da estimaciones ni precios (decisión 61). O se retira ese bloque hasta la versión
completa o se reformula («te decimos si tu proyecto encaja y qué profesional necesita»).

**C5. H1 de `/servicios`.** «Servicios que podemos ayudarte a canalizar» es jerga y no lleva la
búsqueda. El `title` ya dice «Servicios de reformas en Madrid»: usar eso.

**S4. `lastmod` del sitemap.** `new Date()` en el build: las 16 URL declaran la misma fecha
(15-10 17:42). Mejor la fecha real de cada página o ninguna.

**S5. Datos estructurados opcionales.** `/servicios` y `/zonas` no llevan ninguno (un
`BreadcrumbList` bastaría). Las tres zonas reutilizan el `@id` `#localbusiness` con una `url`
distinta cada una: poner la `url` del sitio y la de la zona en `mainEntityOfPage`.

**SEC4. Limpieza.** `EMAIL_ADMIN` (admin@) definido y sin uso; `remotePatterns` de
`next.config.ts` todavía permite imágenes de `anaidgrupo.com`, la marca antigua.

**F2. Anuncios del formulario.** El `role="alert"` solo existe cuando hay error y el estado
«Enviando…» no se anuncia. Funciona, pero un contenedor `aria-live` fijo es más fiable con
lectores de pantalla.

**P1. Calidad de las imágenes.** El hero usa `quality={95}` y la galería `quality={98}`. Con
75-80 el LCP (2,7 s, en el límite de «necesita mejora») baja sin pérdida visible.

### Para decidir con Luis

**C2. Afirmaciones de las zonas que hoy no se pueden demostrar.** «Trabajamos en todas las
urbanizaciones y zonas de Pozuelo: La Finca, Monte Alina, Monte Gancedo, Húmera, Somosaguas…»,
«Profesionales validados con experiencia previa en comunidades y urbanizaciones de Pozuelo»
(y el equivalente en Las Rozas y Majadahonda), «Zonas premium: municipios con alta renta media»,
«Núcleo operativo: Alcalá de Henares». Con una red que arranca con cinco autónomos, conviene
confirmarlo o suavizarlo («llegamos a todas las urbanizaciones de Pozuelo»; «profesionales con
experiencia en vivienda unifamiliar»). «Validado» y «estrictamente seleccionado» son primos de
«homologada» (retirada en la decisión 76): preguntar si se mantienen.

**L2. Registros del servidor.** La privacidad dice que la IP se usa «solo para limitar los envíos
repetidos del formulario» y que se guarda 15 minutos. Traefik y Hostinger guardan registros de
acceso con IP de forma habitual. Si es así, añadir «y los registros técnicos del servidor» con
su plazo.

**F1. Peticiones sin cabecera `Origin`.** El API deja pasar las peticiones que no traen
`Origin` ni `Referer` (un script, por ejemplo). Lo mitigan el límite por IP y el campo trampa, y
Turnstile vuelve con la versión completa. Opción: exigir `Origin` en producción (todos los
navegadores lo envían en un POST con JSON).

**E1. DMARC en `p=none`.** Correcto para empezar. Añadir `rua=mailto:info@…` para recibir
informes y, tras un mes limpio, pasar a `p=quarantine`.

**L3. Licencia de la foto del chalé.** Sigue pendiente de comprobar (documento de cumplimiento
del 06-10).

---

## 4. Visibilidad: SEO, GEO y marca

- **Google aún no muestra nada del dominio** (búsqueda de «Construcciones Anaid» y del dominio
  el 17-10): es normal dos días después de publicar. Según el registro del 15-10, el sitemap está
  «Correcto» en Search Console y se pidió la indexación de 10 URL; **faltan fontanero,
  climatización, pequeñas obras y las tres zonas** cuando se renueve la cuota diaria.
- **Bing Webmaster Tools** no consta: se importa desde Search Console en cinco minutos y
  alimenta también a Copilot y a los buscadores de IA que usan el índice de Bing.
- **Perfil de Empresa de Google sin verificar** (17-10): es la pieza que falta para el bloque
  local, porque la web no publica dirección a propósito. Cuando esté, añadir su enlace a `sameAs`.
- **Identidad antigua en la red**: al buscar la marca aparece «Anaid Grupo Empresarial S.L.» en
  un directorio de reformas (Reformas Garbón, Alcalá de Henares, 4,0 sobre 5, dato de hace más
  de un año). No confunde a Google con la web nueva, pero conviene tenerlo localizado por si hay
  que pedir su retirada o actualización.
- **GEO**: sin `llms.txt` (404). Con el modelo de intermediación, los 8 servicios, las zonas, el
  horario, el contacto y lo que NO hace, es media hora de trabajo y evita que un asistente de IA
  describa a Construcciones Anaid como constructora. Las FAQ con `FAQPage` y las frases
  autocontenidas («Te respondemos en menos de 48 horas laborables», «el contrato lo firmas con el
  profesional asignado») ya son citables.

---

## 5. Plan

### Esta semana · en código, una PR a `main` (unas dos horas)
1. A1 contacto a 320 px · A2 foco del menú · C1 plazos (tras la decisión de Luis).
2. S1 descripciones · S2 imagen para compartir · S3 separador del título.
3. L1 aviso legal · SEC1 quitar `'unsafe-eval'` · SEC4 limpieza · C3 y C5 textos.
4. Tras desplegar: volver a pasar Lighthouse, comprobar `/contacto` a 320 px y actualizar la
   fecha de `/accesibilidad`.

### Esta semana · fuera del código (Luis, una hora)
5. Verificar el Perfil de Empresa de Google.
6. Pedir la indexación de las 6 URL restantes en Search Console.
7. Alta en Bing Webmaster Tools importando desde Search Console.
8. DMARC con `rua` (lo hace Luis en el DNS de Hostinger o lo preparo con su visto bueno).
9. Responder C2, L2 y F1.

### Segunda fase (con la versión completa)
10. CSP con nonces y COOP; `aria-live` fijo en el formulario; `lastmod` real; calidad de imágenes
    a 75-80; `llms.txt`; `BreadcrumbList` en `/servicios` y `/zonas`; prueba con lector de
    pantalla (NVDA) y, si se quiere declarar conformidad plena, auditoría externa.
11. Al publicar la completa: quitar el aviso de mejoras, restaurar las páginas retiradas (200) y
    repetir esta auditoría.

---

## 6. Capturas (17-10-2026, producción)

- `docs/capturas/2026-10-17_1366_portada-publicada.jpg`
- `docs/capturas/2026-10-17_375_portada-publicada.jpg`
- `docs/capturas/2026-10-17_1366_contacto-publicada.jpg`
- `docs/capturas/2026-10-17_375_contacto-publicada.jpg`
- `docs/capturas/2026-10-17_320_contacto-correo-cortado.jpg` (hallazgo A1)
- `docs/capturas/2026-10-17_320_reforma-integral.jpg` (cabecera y migas completas a 320 px)

## 7. Fuentes y herramientas

- Lighthouse 13.5 vía PageSpeed Insights (móvil), 17-10-2026 16:43:
  https://pagespeed.web.dev/analysis/https-www-construccionesanaid-com/u3m90jprbn?form_factor=mobile&hl=es
- Ubicación del servidor: ipinfo.io sobre 76.13.129.218 (Hostinger International, Fráncfort).
- DNS: `nslookup` (MX, SPF, DMARC, DKIM); TLS y ALPN: `openssl s_client`.
- Búsquedas de marca y dominio (17-10-2026): sin resultados de la web; directorio con la
  sociedad antigua: https://reformasgarbon.es/anaid-grupo-empresarial-s-l-reformas/
- Normativa de referencia: `docs/cumplimiento-ia-accesibilidad.md` (06-10-2026) y
  `references/ia-y-legal.md` de la skill, ambos con la cautela de comprobar fechas en vivo.
