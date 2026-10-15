# Registro de decisiones — Construcciones Anaid

## 2026-10-06

- **Fuera el contenido inventado de la portada** (commit `1f48df6`): opiniones con sello
  «Verificado», cifras (45 días, +22 %, 70 %), «la primera constructora de Madrid».
  Motivo: nada se publica sin dato real de Luis.
- **Formularios unificados en `/api/lead` → n8n** (commit `413079a`). Sin webhook o con
  fallo de n8n, el usuario ve un error y se le manda a teléfono o WhatsApp. Las fotos se
  piden por WhatsApp.
- **Las fotos de la galería son obras reales de Anaid** (lo confirma Luis). Quité la galería
  y las marqué como «imagen orientativa» antes de saberlo: hay que restaurarlas con los
  datos reales de cada obra. Pendiente: lugar y plazo reales de cada foto (la cocina y el
  baño tenían datos distintos en la cabecera y en la galería).

### Compuerta 1 — respuestas de Luis (2026-10-06)

1. **Modelo:** red coordinada por Luis, con arquitectos y la mayoría de oficios del sector
   disponibles para cualquier necesidad. Se puede decir «coordinado por arquitectos».
2. **Zona:** toda la Comunidad de Madrid. **Valdeavero no debe aparecer** en la web
   (salvo donde la ley lo exija: ver nota sobre el aviso legal).
3. **Plazos:** se fijan por contrato en cada obra; varían con la magnitud y dificultad; por
   experiencia no suelen pasar de 60 días. Redactar así, sin «garantizado» genérico.
4. **Presupuesto en 1 hora:** se cumple con una automatización de n8n que Luis va a crear;
   la web debe conectarse a ella. El formulario se rediseña para recoger todo lo necesario.
5. **Precios por m²:** media-baja 700 €, media 900 €, alta 1.050 €.
6. **Calidades por perfil:** particular, las tres; inmobiliaria, solo media-baja;
   inversor, media-baja y media.
7. **Antibots** obligatorio.
8. **Presupuestos repetidos:** a partir del segundo presupuesto con el mismo email se bloquea
   y se avisa de que cada presupuesto adicional cuesta 150 € (Bizum o transferencia; medios
   de pago por concretar).
9. **Versión en inglés:** se retira.
10. **Panel (`/panel`):** pendiente; Luis pidió una explicación sencilla.
11. **Infraestructura:** dominio en Hostinger; VPS con Dokploy y Docker.

### Compuerta 1 — segunda ronda (2026-10-06)

12. **Valdeavero** solo en aviso legal y privacidad, como exige la ley. En ningún otro sitio.
13. **Correos disponibles:** info@, admi@, hola@ y redes@construccionesanaid.com. Criterio
    aplicado: **info@** como correo público (contacto, aviso legal, privacidad y derechos
    RGPD); **redes@** para perfiles sociales; admi@ y hola@ no se publican.
14. **Cloudflare Turnstile** aprobado como antibots (mencionarlo en cookies y privacidad).
15. **Precios:** nunca con IVA y **no se publican**. El cliente solo elige la calidad; n8n
    calcula el presupuesto con sus datos. Los €/m² (700 / 900 / 1.050) son internos de n8n.
16. **Presupuestos repetidos:** la regla de los 150 € vale para los tres perfiles.
    Inmobiliarias e inversores tienen además un contador de **1 por semana**.
    Interpretación a confirmar: particular, 1 gratis en total; inmobiliaria e inversor,
    1 gratis por semana; el resto, 150 €. El control lo hace n8n (guarda el historial).
17. **n8n** está en el VPS de Hostinger. Luis tiene **Google Workspace** (Gmail, Sheets),
    útil para que n8n envíe el presupuesto y guarde los contactos.
18. **Automatizaciones:** la web deja todo listo y documentado (datos que envía, respuestas
    que espera); Luis monta los flujos de n8n después.

19. **Panel `/panel` se retira.** Al principio los contactos se gestionan con n8n y una base
    de datos. Se quita en la fase de limpieza.

20. ~~Contrato: lo firma Construcciones Anaid como contratista.~~ **CORREGIDO por Luis el
    mismo día (muy importante): el contrato de obra lo firma el AUTÓNOMO asignado al
    proyecto, no Construcciones Anaid.** Anaid analiza, presupuesta, asigna al profesional
    de su red, coordina y hace seguimiento, pero no ejecuta ni firma la obra. El plazo queda
    en el contrato entre cliente y profesional. El discurso de «intermediación» de las
    páginas interiores era correcto en el fondo; solo cambia la marca. Nunca escribir
    «constructora», «obra realizada por Construcciones Anaid» ni «una única empresa
    responsable».
21. **Marca:** solo **Construcciones Anaid**. Fuera «Anaid Grupo» de toda la web.
22. **Galería:** vuelve ya, como obras reales de Anaid, con el tipo de obra y sin lugar ni
    plazo hasta que Luis pase los datos.

### Respuestas de Luis a la propuesta de copy de portada (2026-10-06)

23. **Precio cerrado:** sí, en el contrato, según el presupuesto firmado. El precio final
    lo fija el profesional que hace la obra.
24. **Presupuesto de 1 hora:** en el 90 % de los casos es el definitivo. Antes de contratar
    se hace una visita visual a la obra para contrastar que lo explicado coincide con la
    realidad (y resolver dudas). No llamarlo «definitivo» en la web.
25. **Diseño 3D:** no se incluye. Bajo petición, diseño 3D con IA con coste según lo que se pida.
26. **Licencias y permisos:** por cuenta del cliente. Si piden que los gestione Anaid, se
    valora con coste aparte (se intenta no hacerlo).
27. **Comisiones a inmobiliarias:** se pactan en persona; nada en la web.
28. **Calidades:** cada una lleva un tope por material (ejemplo revestimiento: media-baja
    hasta 20 €/m², media hasta 40 €/m², alta hasta 90 €/m²). Si el cliente elige algo más
    caro, paga la diferencia. En la web se explica el mecanismo sin cifras (decisión 15).
29. **Contador semanal confirmado:** particular, 1 gratis en total; inmobiliaria e
    inversor, 1 gratis por semana; el resto, 150 €.
30. **Plazos incumplidos:** el contrato entre profesional y cliente incluye penalización
    por retraso. Los profesionales de la red trabajan con unos valores fijados previamente
    con Construcciones Anaid; Luis empezó a explicar qué pasa si los incumplen de forma
    reiterada (frase incompleta: pendiente de confirmar).

31. **Automatización de presupuestos 24/7.** El presupuesto llega en menos de 1 hora a
    cualquier hora.
32. **Profesionales que incumplen** de forma reiterada los compromisos con los clientes
    dejan la red.
33. **Experiencia:** Luis lleva en el sector desde 2003 (antes con su empresa). Se puede
    mencionar sin datos exactos: «más de 20 años en el sector de la reforma». No nombrar la
    empresa antigua ni dar cifras.

34. **Precios de las guías:** se mantienen como precios de mercado orientativos en Madrid,
    con fuente verificable citada y aviso de que no son el presupuesto de Anaid (frente
    aparte de investigación).
35. **NIF:** NO usar el de Anaid Grupo Empresarial SL (empresa parada; reactivación sin
    decidir). **Titular de la web:** Luis Manuel Vázquez, persona física; «Construcciones
    Anaid» es su nombre comercial. Aviso legal y privacidad actualizados.
36. **Crédito:** la web figura como creada por PyMExpert, con enlace a
    https://www.pymexpert.com (pie y aviso legal). PyMExpert se publica a la vez.
37. **n8n:** la IA del presupuesto tendrá los datos y textos de cada calidad.
38. **Contraseñas fuera:** se quita el panel y la contraseña de staging. Si el negocio
    escala, se rediseñará con accesos para profesionales.
39. **Pendiente legal:** la privacidad aún menciona chat guiado, subida de fotos y panel;
    hay que actualizarla con el formulario nuevo (Turnstile, n8n, Google Workspace como
    encargados del tratamiento).

40. **Formulario de presupuesto: correo y teléfono obligatorios.** Quien no quiera darlos
    no es cliente (Luis, 06-10-2026). El correo además sirve a n8n para detectar
    presupuestos repetidos y enviar el PDF.

41. **Plan del formulario de presupuesto aprobado** (perfil, calidad según perfil, tipo de
    obra, m², municipio, descripción, nombre, móvil y correo obligatorios, casillas de
    privacidad y de pago de presupuestos adicionales, Turnstile, respuesta inmediata de n8n).
42. ~~WhatsApp lo contesta una IA (n8n).~~ **CORREGIDO por Luis el mismo día: WhatsApp lo
    contesta él, una persona.** No hace falta aviso de IA en WhatsApp ni se menciona en la
    página de IA (commit de la página revertido). Si algún día lo contesta una IA, el primer
    mensaje debe decirlo (AI Act art. 50.1).
43. **El presupuesto sale automático 24/7, sin revisión humana previa.** Es una decisión
    automatizada (RGPD art. 22): la web ofrece revisión por una persona.
44. **El chalé de fondo de la portada es una foto de banco de imágenes:** solo decorativa,
    sin texto que sugiera obra propia. Comprobar que su licencia permite uso comercial.

45. **Los presupuestos quedan en BORRADOR de correo; Luis los revisa y da el visto bueno**
    (06-10-2026). Sustituye a la decisión 43: ya no hay envío automático. En el futuro, el
    borrador irá al profesional encargado de la obra para que lo revise y lo envíe él.
46. **Plazo prometido: menos de 24 horas** (sustituye a la promesa de 1 hora 24/7 de las
    decisiones 4 y 31). Cambiado en titular, metadatos, formulario, preguntas frecuentes, página
    de IA, inversores y botones.
47. **PDF desde una plantilla de Google Docs** (Google Workspace). Alternativa anotada:
    PDFMonkey, que Luis usó antes.
48. **WhatsApp: Luis envía el PDF desde la app** tras aprobar el borrador. Sin API de WhatsApp,
    sin plantillas de Meta ni coexistencia.
49. **Clientes nuevos en Google Drive** (con sus datos y el resumen de la obra), como ya hace Luis.

### Segunda ronda de decisiones y privacidad (2026-10-06, noche)

50. **IA: API de Claude (Anthropic).** A los clientes del EEE los contrata Anthropic Ireland; el
    acuerdo de tratamiento de datos va dentro de sus condiciones comerciales; no entrena con los
    datos y borra entradas y salidas en 30 días. La IA no recibe nombre, correo ni teléfono.
51. **Servidor: VPS de Hostinger en Fráncfort (Alemania)**, dentro de la UE. Luis dijo primero
    España, pero Hostinger no ofrece VPS en España (comprobado en su web); Luis lo confirmó.
52. **Cuenta profesional de Google: el Google Workspace de PyMExpert** (Luis). Nunca el Gmail
    personal: con una cuenta personal, Google no firma contrato de encargado del tratamiento
    (RGPD art. 28). Comprobado por DNS que hoy ningún dominio de Luis tiene Workspace (el correo
    está en Hostinger): hay que contratarlo antes de publicar. Remitente propuesto:
    info@construccionesanaid.com como alias (D13 en el repositorio de n8n, pendiente).
53. **Política de privacidad reescrita** en «tú» y con resumen: nombra a Hostinger (Fráncfort),
    Google, Anthropic, Cloudflare y WhatsApp; explica las transferencias a EE. UU. y sus
    garantías, la IA del borrador y la decisión automática de gratuidad con revisión humana
    (RGPD art. 22); usa la base legal correcta (medidas precontractuales, no consentimiento) e
    incluye los plazos. Aviso legal sin el chat y página de IA con el nombre del proveedor.
54. **Plazos de conservación (propuestos, pendientes de confirmar por Luis):** sin obra, 12 meses
    desde el último contacto; con obra, lo que dure y después bloqueo de 5 años; profesionales no
    seleccionados, 12 meses; ejecuciones de n8n, 14 días. Consecuencia: «el primero gratis»
    cuenta solo las solicitudes que aún se conservan. n8n avisa cada mes de lo caducado y borra
    Luis (nada se borra solo).
55. **Primera capa informativa en los cuatro formularios** (LOPDGDD art. 11): responsable,
    finalidad, base, destinatarios y derechos junto a la casilla, que pasa a «He leído la política
    de privacidad» (la base es la solicitud del cliente, no su consentimiento).
56. **Cookies: un solo aviso, el propio.** Se retira CookieYes (sin configurar; habría mostrado un
    segundo aviso). Mientras GTM no tenga ID real no se muestran el aviso ni «Configurar cookies»,
    porque no hay nada que aceptar, y /cookies lo dice; al poner el ID aparecen solos. Si se
    añaden en GTM etiquetas además de GA4, hay que actualizar /cookies.
57. **Presupuestos de n8n:** IVA del 21 % siempre (base, IVA y total); cocina y baño por partidas
    con precio por calidad (se definen al construir); cada presupuesto detalla la calidad elegida
    partida por partida. Detalle en el repositorio de n8n.
58. **/unete-red sin promesas falsas:** fuera la tarjeta «Panel privado para gestionar tus leads»
    (el panel se retiró, decisión 38) y la de IA para «resúmenes y clasificación». Ahora: «Tu
    contrato, tu obra» (firma el profesional y fija el precio tras la visita) y la IA que prepara
    el borrador revisado por una persona. Pendiente: revisar el resto de la página con el
    copywriter.

### Fase 1 — Navegación (2026-10-06, hecha)

Menú con rutas absolutas válidas en todas las páginas (Servicios, Inversores e
inmobiliarias, Cómo trabajamos, Zonas, Guías de precios, Contacto); pie con los 8 servicios;
la portada enlaza a `/servicios` y a `/ia-analisis-proyecto`; las páginas de zona enlazaban
a 4 servicios inexistentes (404) y ahora a los 8 reales; las anclas ya no quedan bajo la
cabecera fija. Criterio de hecho: rastreo desde portada alcanza las 30 páginas del sitemap,
0 enlaces rotos, 0 anclas rotas; verificado a 1366 y 375.
Detectado para la fase de limpieza: `MobileMenu.tsx` no se usa.

### Pendiente de confirmar por Luis

- Lugar y plazo reales de cada foto de la galería.
- ~~Proveedor de IA que usa n8n y región del VPS de Hostinger~~ Resuelto (decisiones 50 y 51).
- Textos de cada calidad: Luis los rellena en `plantillas/calidades.csv` del repositorio de n8n
  (la web solo muestra el nombre).
- Plazos de conservación (decisión 54).
- Contratar el Google Workspace de PyMExpert y elegir remitente (decisión 52). Mientras el correo
  siga en Hostinger, la política lo nombra como proveedor de correo; si pasa a Google, actualizarla.

### Pendiente técnico detectado (06-10-2026)

- ~~Google Fonts desde los servidores de Google~~ **Resuelto (06-10-2026):** fuentes servidas
  desde la propia web con `next/font`; 0 peticiones a Google y CSP sin dominios de fuentes.
- Turnstile: Luis debe crear el widget en Cloudflare y poner las dos claves en Dokploy.
- `CookieConsentBanner.tsx` arrastra 3 errores de lint anteriores (setState dentro de un efecto y
  tipo `Function`). El aviso no se muestra mientras no haya GTM: arreglarlos y probarlo cuando se
  active la medición.

## 2026-10-15 — Web provisional (rama release/web-basica)

Luis necesita la web pública ya, mientras se termina la versión completa
(`fix/contenido-real-y-formularios`, que no se toca y sustituirá a esta).

59. **Web provisional pública, sin contraseña**, desde `release/web-basica`, creada desde la rama completa.
60. **Un solo formulario de consulta** (nombre, teléfono, email, tipo de reforma: baño, cocina,
    reforma integral u otro; mensaje) que llega por correo a info@ por el **SMTP de Hostinger**
    (librería nodemailer 10.0.13, fijada; aprobada por Luis). Campo trampa y límite de envíos. Sin
    n8n, sin IA y sin Turnstile. El formulario solo dice «enviado» si el servidor de correo lo acepta.
61. **Promesa: «Te respondemos en menos de 48 horas».** Fuera el presupuesto en 24 horas, la
    gratuidad y los 150 €, las calidades y los precios orientativos de los servicios.
62. **Fuera hasta la versión completa** (404, sin enlaces ni sitemap): guías de precios (precios
    sin fuente, decisión 34), página de IA, «Únete a la red» y «Solicitar proyecto».
63. **Aviso de mejoras** en todas las páginas, sin fechas ni promesas concretas.
64. **Privacidad, cookies y aviso legal adaptados** a lo que hace la provisional: solo Hostinger
    (web y correo) y WhatsApp si el cliente lo usa; sin IA ni decisiones automáticas; sin cookies.
65. **Google:** solo Search Console por ahora (sin Analytics ni aviso de cookies).
66. **Despliegue:** commit en rama → pull request a `main` → Dokploy despliega `main`. Lo configura
    Luis en Dokploy con la guía; la contraseña del buzón la pone él.
67. **Respuesta en menos de 48 horas laborables (de lunes a viernes)** (Luis, 15-10-2026): sustituye
    a «menos de 48 horas» en toda la web, porque el horario de atención es de lunes a viernes.
68. **LinkedIn de empresa** creada por Luis: `linkedin.com/company/construcciones-anaid`. El pie y
    los datos para Google la enlazan; el perfil personal sale de los datos del negocio.
69. **La red es de autónomos y empresas**, coordinada por Construcciones Anaid con arquitectos; la
    visita a la obra antes de contratar la hace el profesional asignado (Luis, 15-10-2026).
70. **Correo público: hola@construccionesanaid.com** (Luis, 15-10-2026). Sustituye a info@ de la
    decisión 13 en toda la web y en LinkedIn. En Hostinger, info@ es el buzón real y hola@ un
    alias que entrega en él (Luis): el formulario entra y envía con info@ (`SMTP_USER` = info@) y se
    manda a hola@.
