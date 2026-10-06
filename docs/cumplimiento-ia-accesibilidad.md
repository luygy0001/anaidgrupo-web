# Cumplimiento: IA y accesibilidad (revisión del 06-10-2026)

Revisión técnica interna. **No es asesoramiento jurídico**: antes de publicar, conviene que un
profesional valide los textos legales (privacidad, aviso legal, cookies).

## 1. Marco aplicable a 06-10-2026

| Norma | Situación | ¿Aplica a esta web? |
|---|---|---|
| Reglamento (UE) 2024/1689 de IA (AI Act) | Prácticas prohibidas y alfabetización (art. 4) desde 02-02-2025; transparencia (art. 50) desde **02-08-2026**. El Ómnibus Digital (Reglamento (UE) 2026/1744, en vigor desde 27-07-2026) **solo aplazó el alto riesgo** (anexo III → 02-12-2027; anexo I → 02-08-2028). | Sí, como **responsable del despliegue** de un sistema de IA de riesgo mínimo (presupuestos). No es alto riesgo ni práctica prohibida. |
| Ley Orgánica española para el buen uso y la gobernanza de la IA | Proyecto aprobado por el Consejo de Ministros el 26-05-2026; **en tramitación en el Congreso** (no vigente). AESIA es la autoridad de vigilancia del art. 50. | Aún no. Revisar cuando se apruebe. |
| RGPD (arts. 13 y 22) | Vigente. | Sí: informar del uso de IA y de las decisiones automatizadas, con derecho a intervención humana. |
| Ley 11/2023 (transpone el Acta Europea de Accesibilidad, Directiva 2019/882) | Exigible desde 28-06-2025 para servicios como el comercio electrónico. **Las microempresas que prestan servicios están exentas** (menos de 10 personas y menos de 2 M€). | Probablemente exenta (Luis es autónomo). Aun así, Luis decide cumplir: objetivo **WCAG 2.2 AA**. |
| EN 301 549 V4.1.1 | Norma armonizada adoptada el 24-08-2026, alineada con **WCAG 2.2 A y AA**. | Referencia técnica de la auditoría. |

## 2. Accesibilidad: hallazgos y estado

Auditoría con axe-core 4.10.2 (reglas WCAG 2.2 A/AA y buenas prácticas) en 15 páginas a 1366, 375
y 320 px, más pruebas manuales con teclado real.

| Hallazgo | Criterio WCAG | Estado |
|---|---|---|
| Botones de WhatsApp con contraste 1,98:1; ámbar pequeño 3,2:1; verde 3,65:1 | 1.4.3 | Corregido (commit 967a628) |
| Foco invisible sobre fondos oscuros | 2.4.7 / 1.4.11 | Corregido: anillo azul con banda blanca |
| Sin enlace «Saltar al contenido» | 2.4.1 | Corregido |
| Menú móvil sin estado abierto/cerrado; Escape no lo cerraba | 4.1.2 / 2.1.1 | Corregido |
| Botones de fotos y de perfil sin estado seleccionado | 4.1.2 | Corregido (aria-pressed) |
| Interruptores de cookies sin nombre accesible ni foco visible | 4.1.2 / 2.4.7 | Corregido |
| El aviso de cookies tapaba el elemento con foco | 2.4.11 (nuevo en 2.2) | Corregido: primero en el orden de tabulación, Escape lo cierra sin consentir, reserva de espacio |
| Titular y menú cortados a 320 px | 1.4.10 | Corregido |
| Sin preferencia de movimiento reducido | 2.3.3 (AAA, buena práctica) | Corregido |
| Etiquetas del formulario de portada no vinculadas a sus campos; errores sin anunciar | 1.3.1 / 3.3.2 / 4.1.3 | **Pendiente: se resuelve en el formulario nuevo** |
| Declaración de accesibilidad | Buena práctica | Creada en /accesibilidad |

Resultado tras los arreglos: **0 infracciones de axe** en todas las páginas revisadas, también con el
aviso de cookies abierto. Pendiente para más adelante: prueba con lector de pantalla real (NVDA o
VoiceOver) y, si se quiere declarar conformidad plena, auditoría externa.

## 3. IA: hallazgos y estado

| Hallazgo | Norma | Estado |
|---|---|---|
| /ia-analisis-proyecto describía funciones no confirmadas (fotos, puntuación, urgencia) y negaba que la IA genere presupuestos | Transparencia (AI Act art. 50; RGPD art. 13); prácticas comerciales leales | Corregido (commit 5c5cfa4): cuenta qué hace la IA, qué es automático y qué decide una persona |
| La portada hablaba de «automatización» sin decir que es IA | Transparencia | Corregido |
| La regla de los 150 € es una decisión automatizada (el presupuesto ya no: lo revisa una persona) | RGPD art. 22 | Resuelto: la web y la política de privacidad explican la regla y el derecho a revisión humana (06-10-2026) |
| Política de privacidad: menciona un chat y un panel que ya no existen; no nombra la IA, Turnstile, n8n ni Google | RGPD art. 13 | Resuelto (06-10-2026): nombra a Hostinger (Fráncfort), Google, Anthropic, Cloudflare y WhatsApp, las transferencias y los plazos; primera capa en los cuatro formularios |
| Si WhatsApp lo contestara una IA, habría que decirlo al empezar la conversación | AI Act art. 50.1 | Resuelto: lo contesta Luis (persona); no aplica mientras sea así |
| El presupuesto que envía n8n debe indicar que está elaborado con IA | Buena práctica de transparencia | Se documenta en el contrato de datos de n8n |
| Formación en IA de quien usa el sistema (Luis y profesionales que reciben los resúmenes) | AI Act art. 4 | Obligación interna: dejar constancia de la formación |
| Imagen de fondo de la portada (chalé): si está generada con IA y se presenta como obra real | AI Act art. 50.4 / publicidad engañosa | Resuelto: foto de banco de imágenes, decorativa (comprobar licencia de uso comercial) |

## 4. Preguntas abiertas para Luis

1. ~~¿WhatsApp lo responderá una IA o una persona?~~ Una persona (Luis).
2. ~~¿Qué proveedor de IA usa n8n? ¿En qué región está el VPS?~~ API de Claude (Anthropic); VPS de Hostinger en Fráncfort (Alemania).
3. ~~¿El presupuesto se envía sin que lo revise una persona antes?~~ No: queda en borrador y lo revisa Luis antes de enviarlo (decisión 45).
4. ~~¿La foto del chalé es una obra real o generada?~~ Banco de imágenes.

## Fuentes

- Ómnibus Digital y calendario del AI Act: https://adequa.eu/el-reglamento-omnibus-digital-sobre-ia-ya-esta-en-vigor-asi-queda-el-calendario-de-obligaciones-del-reglamento-europeo-de-inteligencia-artificial/
- Artículo 50 sin aplazar desde el 02-08-2026: https://www.praxikon.com/en/posts/article-50-transparency-deadline-2-august-2026
- Proyecto de Ley Orgánica de IA en el Congreso: https://finreg360.com/alerta/el-congreso-inicia-el-tramite-del-proyecto-de-ley-organica-para-el-buen-uso-y-la-gobernanza-de-la-inteligencia-artificial/
- Ley 11/2023 y exención de microempresas: https://www.fieldfisher.com/es-es/locations/espana/actualidad/accesibilidad-obligatoria-claves-de-la-transposicion-accesibility-act
- EN 301 549 V4.1.1 y WCAG 2.2: https://www.dwt.com/insights/2026/09/european-accessibility-act-ict-standards-update
- Plazos de conservación de datos de Anthropic (30 días): https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data
- Condiciones comerciales de Anthropic (Anthropic Ireland para el EEE, sin entrenamiento, acuerdo de tratamiento incluido): https://www.anthropic.com/legal/commercial-terms
- Centros de datos de VPS de Hostinger (Francia, Alemania, Lituania, Reino Unido; no España): https://www.hostinger.com/support/1583267-where-are-your-servers-located
- Datos que recoge Turnstile y papel de Cloudflare: https://www.cloudflare.com/turnstile-privacy-policy/
