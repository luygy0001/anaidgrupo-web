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
70. **Correo público: se mantiene info@construccionesanaid.com** (decisión 13). Luis valoró pasar a
    hola@ el 15-10-2026 y decidió no cambiarlo. En Hostinger, info@ es el buzón real y hola@ un
    alias que entrega en él.
71. **Facebook**: página `facebook.com/Construccionesanaid` (Luis, 15-10-2026). Botón en el pie junto a
    YouTube y LinkedIn, y en los datos para Google de la portada.
72. **Logo en los datos para Google:** las fichas de negocio de contacto y zonas apuntaban a
    `public/img/logo.svg`, un logo antiguo de «Anaid Grupo» con «Tecnología con IA» (contra la
    decisión 21). Pasan a `public/images/logo.png`, el logo real, y se retiran los dos SVG de «Anaid Grupo» (`logo.svg` y `logo-small.svg`, este sin usar).
73. **Canal de YouTube** creado por Luis el 15-10-2026 con luis@pymexpert.com (cuenta de marca):
    `@ConstruccionesAnaid`, ID `UC59ykHhlB76Eb3tQbDgoxVw`. Configurado con la extensión de Claude en
    Chrome: descripción, 5 enlaces (web, contacto, WhatsApp, LinkedIn, Facebook), correo info@,
    banner y foto de perfil (monograma CA), país España, palabras clave, subidas en privado,
    español de España, categoría «Consejos y estilo» y moderación básica. Pendiente de Luis:
    declarar que no está dirigido a niños, añadir a gerente@ como propietario y verificar el
    teléfono si YouTube lo pide.
74. **Icono de la web** (Luis, 15-10-2026): la pestaña mostraba el triángulo de la plantilla de
    Next.js. Se sustituye por el monograma «CA» del logo, sacado de `public/images/logo.png`:
    `src/app/favicon.ico` (16, 32 y 48 px; el de 16 px recortado sobre las letras para que se lea),
    `src/app/icon.png` (192 px, múltiplo de 48 como pide Google para los resultados de búsqueda) y
    `src/app/apple-icon.png` (180 px, opaco, para iPhone). Fondo blanco: se ve en pestañas claras y
    oscuras.
75. **Páginas retiradas = 404** (15-10-2026): `/guias-precios`, `/ia-analisis-proyecto`, `/unete-red`
    y `/solicitar-proyecto` devuelven 404 con `noindex` y la 404 tiene título propio («Página no
    encontrada»). Sin redirecciones: Google no tenía ninguna página del dominio indexada (la web
    antigua iba con contraseña), ninguna página enlaza a ellas y el sitemap solo lista páginas que
    existen. Las 404 no penalizan al resto de la web. Cuando vuelvan con la versión completa,
    volverán a dar 200.
76. **Frase de intermediación** (Luis, 15-10-2026): la frase de `INTERMEDIATION_DISCLAIMER` (Servicios,
    Cómo trabajamos, páginas de servicio y de zona, y aviso legal) decía «proyectos integrales de
    reforma y construcción» y «red homologada»: chocaba con la decisión de no hacer obra nueva y
    afirmaba una homologación que no existe. Pasa a: «Construcciones Anaid coordina reformas con una
    red de arquitectos, autónomos y empresas. El contrato de obra lo firmas con el profesional
    asignado, que hace la obra y responde de su trabajo.» La rama de la versión completa tiene la
    frase antigua: cambiarla al retomarla.
77. **Horario único** (Luis, 15-10-2026), igual que el Perfil de Empresa de Google: **lunes a jueves
    de 8:00 a 18:00 y viernes de 8:00 a 15:00**. Sustituye a los tres horarios que convivían en la
    web: 8:30–19:30 en el texto visible y en los datos para Google de la portada, y 9:00–14:00 más
    16:00–19:00 en los de contacto. Ahora hay una sola fuente para cada formato: `HORARIO_DETAIL`
    en `constants.ts` (texto) y `horarioApertura` en `seo-schemas.ts` (datos para Google, que usan
    la portada y contacto). En contacto y en el pie, cada tramo va en su línea para que no se corte
    a mitad. La respuesta «en menos de 48 horas laborables, de lunes a viernes» no cambia.
78. **Sin cabecera `X-Powered-By`** (Luis, 15-10-2026): `poweredByHeader: false` en `next.config.ts`.
    La web dejaba de decir en cada respuesta que funciona con Next.js; no cambia nada más.

### Auditoría de la web publicada (2026-10-17)

79. **Plazos de obra** (Luis, 17-10-2026): la reforma habitual (vivienda de unos 80 m², tres
    dormitorios, un baño, cocina y salón) no pasa de 60 días; las obras grandes (100-200 m² o más:
    chalets, casas y pisos con más estancias y baños, patios o terreno) van de 2 a 4 meses. Sustituye
    a los dos textos que se contradecían: la FAQ general («la mayoría de obras no pasan de 60 días»)
    y la de reforma integral («entre 2 y 4 meses»). El plazo concreto sigue fijándose en el contrato.
80. **Zonas suavizadas** (Luis, 17-10-2026): fuera «zonas premium», «alta renta media», «núcleo
    operativo», «trabajamos en todas las urbanizaciones» y las afirmaciones de experiencia previa en
    urbanizaciones concretas que hoy no se pueden demostrar. Se habla de cobertura («llegamos a»),
    no de obras hechas.
81. **«Validado» y «estrictamente seleccionado» fuera** (Luis, 17-10-2026, a propuesta de Claude):
    sugieren un proceso de certificación que no existe, igual que «homologada» (decisión 76). Se
    sustituyen por «de nuestra red», «seleccionado» o «elegidos por nosotros», que es lo que ocurre
    de verdad: Luis decide quién entra en la red.
82. **«Nuestro equipo» → «una persona»** en los textos de proceso (17-10-2026): hoy las consultas las
    revisa Luis en persona, como ya decían la FAQ y la política de privacidad.
83. **Cómo trabajamos sin «orientación inicial… estimación»** (17-10-2026): la web provisional no da
    cifras orientativas (decisión 61). El bloque explica qué contiene nuestra respuesta y que el
    presupuesto lo hace el profesional tras la visita.
84. **Aviso legal sin «solicitud de proyecto» ni «registro profesional»** (17-10-2026): formularios
    retirados en la provisional (decisión 62). Fecha de actualización del aviso legal: 17-10-2026.
85. **Imagen para compartir única** (17-10-2026): `public/images/og-portada.jpg`, 1200×630, hecha a
    partir de la foto real del salón con el logotipo y el titular, declarada en el layout raíz para
    que todas las páginas tengan tarjeta al compartirse por WhatsApp o LinkedIn. Sustituye al JPG
    original de 780 KB que solo tenía la portada.

86. **Registros de IP del servidor: la privacidad se queda como está** (17-10-2026): comprobado en
    Dokploy (solo lectura) que Traefik no tiene registro de accesos (`traefik.yml` sin `accessLog`)
    y que la función «Requests» está desactivada; la web solo usa la IP 15 minutos en memoria para
    frenar envíos repetidos, que es lo que dice la política. Si algún día se activa «Requests»,
    añadir «registros técnicos del servidor» con su plazo. Cierra el punto L2 de la auditoría del 17-10.
87. **Informes DMARC a luis@pymexpert.com** (Luis, 17-10-2026): `_dmarc` de construccionesanaid.com
    pasa a `v=DMARC1; p=none; rua=mailto:luis@pymexpert.com`; en pymexpert.com se añade el TXT
    `construccionesanaid.com._report._dmarc` = `v=DMARC1` (sin él los informes no llegan a un buzón
    de otro dominio). Se mantiene `p=none` un mes; con informes limpios, `p=quarantine`. Cierra E1.

### Cambios del 19-10-2026

88. **Nuevo móvil: 664 415 523** (Luis, 19-10-2026), para teléfono y WhatsApp. Sustituye al
    640 962 564 en cabecera, pie, contacto, botón de WhatsApp, páginas legales y datos para Google
    (el de las zonas estaba escrito a mano; ahora sale de `PHONE`). Fuera de la web hay que
    cambiarlo también en el Perfil de Empresa de Google, LinkedIn, YouTube, Facebook y las firmas.
89. **Domicilio: C/ Isaac Peral, 46, oficina 2, 28816 Valdeavero (Madrid)** (Luis, 19-10-2026).
    Solo en el aviso legal y la privacidad, como hasta ahora; fecha de actualización de ambas
    páginas: 19-10-2026.
90. **Cobertura sin «mayor capacidad operativa»** (Luis, 19-10-2026, tras el informe SEO externo):
    las páginas de servicio decían «mayor capacidad operativa en el área metropolitana y el
    corredor del Henares» y enlazaban solo a zonas del noroeste; `/zonas` hablaba de «mayor
    capacidad de respuesta». Se sigue la decisión 80 (cobertura, no promesas): «Nuestra base está
    en el este de la Comunidad, junto al corredor del Henares. Estas zonas tienen página propia» y
    «Llegamos a toda la Comunidad de Madrid». No se crean páginas de Alcalá ni Torrejón sin datos
    reales de la zona.
91. **Informe SEO/GEO externo del 19-10-2026: lo que se aplica y lo que no.** Comprobado contra el
    código y la web publicada:
    - **Cierto y aplicado:** no había `llms.txt` (404). Se crea `public/llms.txt` solo con datos que
      ya dice la web (modelo de intermediación, contacto, horario, proceso, 8 servicios, zonas con
      página y lo que no hacemos). El borrador del informe no se usa: traía el teléfono antiguo y
      afirmaciones que la web no hace («valoración rápida en menos de 48 h para compradores»,
      «alcance cerrado antes de comprar», Alcalá con página propia).
    - **Cierto a medias y aplicado:** la promesa de «mayor capacidad operativa» en el corredor del
      Henares (decisión 90). Torrejón y Alcalá ya figuran en `/zonas`, sin página propia.
    - **Opcional y aplicado:** `alternateName: «Construccionesanaid»` en los datos de la portada.
      La marca de la web es «Construcciones Anaid» en todas partes; no había inconsistencia.
    - **Cosmético y aplicado:** espacio real en «Web construida por PyMExpert» (el hueco era solo
      visual). El enlace ya iba a https://www.pymexpert.com.
    - **Falso:** «no hay enlaces a redes» (el pie enlaza YouTube, LinkedIn y Facebook con
      `aria-label` y están en `sameAs`); «falta `FAQPage`» (está en la portada, servicios y cómo
      trabajamos); «el JSON-LD debe ser `HomeAndConstructionBusiness`» (ya lo es); «palabras
      pegadas» en el teléfono de la cabecera y en el horario (son textos alternativos o líneas en
      bloque: el teléfono lleva `aria-label` y cada tramo del horario va en su línea).
    - **No se aplica:** FAQ con precios (decisión 61, la web no publica cifras) e Instagram (no hay
      cuenta).
92. **Piscinas de diseño sustituye a Pequeñas obras** (Luis, 19-10-2026), igual que en el Perfil de
    Empresa de Google. Nueva página `/servicios/piscinas-diseno-madrid`: **solo piscinas de diseño**
    (no estándar ni prefabricadas), con diseño, construcción y reforma de piscinas existentes, para
    propietarios de chalet o casa con jardín. Textos del agente copywriter con los datos de Luis.
    - **Proyecto de ejemplo con 7 fotos reales** (carpeta «PISCINA ZULEMA»): piscina en forma de
      riñón, spa elevado de piedra para 6 personas, dos cascadas y caseta de piedra con sala de
      máquinas y baño. Luis tiene permiso del cliente. Pie: «Obra de profesionales que hoy forman
      parte de nuestra red», **sin año** (las fotos son de 2007), **sin lugar ni nombre del cliente**.
      Fotos recortadas para quitar la fecha impresa, con contraste, color y nitidez ajustados, a
      1440 px y sin datos EXIF (no llevaban GPS).
    - `/servicios/pequenas-obras-madrid` redirige de forma permanente a `/servicios` (no a piscinas:
      quien buscaba pequeñas obras no encontraría lo que buscaba). Sale del pie, del sitemap y de
      `llms.txt`; piscinas entra también en el catálogo de servicios de los datos de la portada.
    - `llms.txt`: «No hacemos obra nueva de viviendas ni edificios» (antes «No hacemos obra nueva:
      solo reformas», que chocaba con construir piscinas).
    - **Pendiente de Luis:** la web dice dos cosas sobre quién prepara el presupuesto (la FAQ de la
      portada: Construcciones Anaid; «Cómo trabajamos» y la decisión 83: el profesional tras la
      visita). La página de piscinas usa una redacción neutra hasta que se decida.
93. **Piscinas: máximo 10 al año** (Luis, 19-10-2026). Es un límite real («al ser de diseño, tenemos
    limitado a 10 piscinas por año»): va en la presentación de la página, en una pregunta frecuente
    y en `llms.txt`. Es la razón para escribir pronto que pedía el copywriter. Luis confirma también
    que se construyen piscinas nuevas y se rehabilitan antiguas, pero no se hace obra nueva de
    viviendas: el nicho son las reformas.
94. **Quién prepara el presupuesto: el profesional asignado** (Luis, 19-10-2026). Lo genera con el
    programa interno de Construcciones Anaid, lo revisa, da el visto bueno y lo envía. La web decía
    dos cosas: la FAQ de la portada y la privacidad («Construcciones Anaid prepara el presupuesto»)
    contra «Cómo trabajamos», servicios y zonas (el profesional). Se unifica: «lo prepara el
    profesional asignado: lo revisa y te lo envía»; antes de contratar visita la obra y el precio
    queda cerrado en el contrato.
    - **No se menciona todavía el programa ni la IA.** La privacidad dice «en esta web no usamos
      inteligencia artificial con tus datos». Cuando el programa con IA se use con datos de clientes
      reales hay que actualizar la privacidad (proveedor de IA como encargado, finalidad, revisión
      humana) y avisar en el presupuesto de que se ha preparado con ayuda de IA y lo ha revisado el
      profesional. **Luis confirma (19-10-2026) que el programa con IA empieza con la versión
      completa**: la provisional no lo usa y su privacidad es correcta. Al publicar la completa,
      actualizar privacidad y aviso de IA en el presupuesto antes de tratar datos reales con él.

### Capa de buscadores e IA (21-10-2026)

Réplica en Construcciones Anaid del trabajo SEO/GEO hecho en PyMExpert. Solo la capa de buscadores e
IA: ni diseño ni textos comerciales. Tres ramas, cada una con su PR.

95. **robots.txt con los rastreadores de IA por nombre** (rama `feat/robots-rastreadores-ia`).
    Permiso explícito a OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User,
    ClaudeBot, PerplexityBot, Perplexity-User, Google-Extended, Bingbot, Applebot,
    Applebot-Extended, meta-externalagent, Amazonbot y CCBot, más la regla general `*`. Todos sin
    acceso a `/api/` ni `/admin/`. La línea del sitemap va al final.
96. **llms.txt y llms-full.txt se generan con el contenido de la web** (rama `feat/llms-generados`).
    Antes `public/llms.txt` era un texto a mano que se desfasaba (quedó «Pequeñas obras» tras el
    cambio a piscinas). Ahora los textos de servicios, zonas y «Cómo trabajamos» viven en
    `src/content/` y los leen las páginas y `src/lib/llms.ts`: un solo sitio para lo que ven las
    personas, Google y las IA. Formato llmstxt.org, sin precios ni plazos (la web no los publica).
    Las páginas se ven exactamente igual: comprobado el texto visible, metas y datos estructurados
    de las 16 páginas contra producción.
97. **Datos estructurados: una sola ficha del negocio** (rama `fix/datos-estructurados-negocio`).
    Portada, contacto y zonas describían el negocio con tipos e `@id` distintos (`LocalBusiness`
    con `#localbusiness` frente a `HomeAndConstructionBusiness` con `/#business`) y solo la portada
    llevaba los perfiles (`sameAs`). Ahora las tres usan la misma entidad `NEGOCIO`
    (`HomeAndConstructionBusiness`, subtipo de LocalBusiness y padre de GeneralContractor) con el
    mismo nombre, teléfono, correo, horario y perfiles de YouTube, LinkedIn y Facebook; los
    servicios la citan como proveedor. Se borra `organizationSchema`, que no usaba ninguna página.
    - **Sin dirección**, como en el Perfil de Empresa (negocio de área de servicio, decisión 9 y
      decisión de Luis de no mostrar el domicilio en la ficha).
    - FAQPage: portada, «Cómo funciona» y las 8 páginas de servicio, que son las que tienen
      preguntas frecuentes.
98. **Domicilio: Av. Isaac Peral, no «C/»** (Luis, 21-10-2026). La calle es una avenida, como en la
    ficha verificada de Mandrinados Anaid en Google; así coincide con lo que Google tiene registrado
    para la verificación del Perfil de Empresa. Cambia solo en el aviso legal y la privacidad
    (`ADDRESS` y `LEGAL.domicilio`), con fecha de actualización 21-10-2026. Corrige la decisión 89.
99. **Fuera el aviso «Estamos mejorando esta web»** (Luis, 28-10-2026, tras la auditoría del mismo
    día). Anunciaba sin fecha la versión completa («muy pronto podrás pedir tu presupuesto online…»)
    y en móvil ocupaba espacio encima de la cabecera. Se borra el componente `AvisoMejoras`; si
    algún día hace falta un aviso, se escribe con lo que sea cierto en ese momento.
100. **Google Analytics 4, solo con consentimiento previo** (Luis, 28-10-2026). Propiedad en la
     cuenta de empresa **luis@pymexpert.com**. Analytics **directo** (gtag.js), sin Tag Manager: una
     pieza menos. **Nada de Google se carga hasta que el visitante pulsa «Aceptar»**: no hay script de
     Consent Mode por adelantado ni avisos sin cookies; solo cuenta a quien acepta. Si después
     rechaza, se desactiva en esa visita y se borran las cookies `_ga`.
     - El aviso tiene «Aceptar» y «Rechazar» iguales y el panel solo dos grupos: técnicas (la
       elección guardada) y analíticas. Fuera «Personalización», que no correspondía a nada real.
     - En Analytics: conservación de datos 14 meses, Google Signals desactivado y anuncios
       personalizados desactivados también en el código.
     - La CSP se abre a Google solo con ID. /cookies y /privacidad añaden Google Analytics
       (finalidad con consentimiento, proveedor, transferencia a EE. UU. y plazo) solo con ID.
101. **Sitemap con la fecha real de cada página** (Luis, 28-10-2026, punto 6 de la auditoría del
     mismo día). Cada URL lleva su `<lastmod>`: la fecha del último cambio importante de esa página,
     sacada del historial de git. Cuenta el texto visible, el título o la descripción, los enlaces y
     los datos estructurados; no cuentan la cabecera, el pie, el aviso de cookies ni los cambios de
     código que dejan la página igual. Las fechas se escriben a mano en `src/app/sitemap.ts`, porque
     la imagen de Docker no lleva `.git` y la fecha de compilación sería falsa (por eso se quitó el
     21-10). Al cambiar una página, se actualiza su fecha.
     - Fechas de partida: portada, contacto y las 8 de servicio, 21-10 (datos estructurados de la
       decisión 97); /servicios, /zonas y «Cómo funciona», 19-10 (Piscinas de diseño, cobertura y
       preguntas frecuentes); las 3 zonas, 28-10 (descripciones más cortas).
102. **La 404 con cabecera, pie y WhatsApp** (Luis, 28-10-2026, punto 18 de la auditoría). Next.js
     pinta la 404 fuera del layout de las páginas, así que salía sin logo ni menú. La estructura
     común (saltar al contenido, aviso de cookies, cabecera, pie y botón de WhatsApp) pasa a
     `MarcoPagina`, que usan el layout y la 404: quien llega por un enlace roto puede seguir
     navegando. Sigue siendo un 404 real con «noindex», también en /gracias/<tipo-inexistente>.
103. **Más protección en el formulario** (Luis, 28-10-2026, punto 14 de la auditoría). Lo mismo que
     ya tiene pymexpert.com, sin dependencias nuevas, en `/api/contacto`:
     - **Solo JSON** (415 para texto, multipart o sin tipo), que es lo que envía el formulario.
     - **Cuerpo de 16 KB como mucho** (413), contando los bytes al leer (`src/lib/peticion.ts`) y no
       fiándose de `content-length`, que el cliente puede omitir o falsear.
     - **Tope global de 30 consultas por hora** entre todas las IP (429 con teléfono y WhatsApp).
       Solo cuenta las consultas válidas que van a salir por correo: las peticiones basura no
       gastan el cupo de la gente real. Se queda en memoria (un solo contenedor).
     - El contador por IP (5 cada 15 minutos) ya no crece sin límite (máximo 10.000 IP, borra las
       caducadas) y solo acepta IP válidas en `X-Forwarded-For`.
     - La política de privacidad no cambia: la IP sigue usándose solo 15 minutos en memoria y el
       tope global no guarda IP, solo la hora de cada envío.
104. **La foto de la portada sale antes en el móvil** (Luis, 28-10-2026, punto 15 de la auditoría).
     PageSpeed móvil antes del cambio: 96, con el elemento principal (la foto del chalet) en 2,8 s.
     Lighthouse pedía prioridad alta para esa foto y menos peso (40 KB en móvil).
     - **Prioridad alta:** la foto se pide con `loading="eager"` y `fetchPriority="high"` en vez de
       `priority`, que Next.js 16 da por obsoleto y solo añadía una precarga con prioridad normal.
     - **AVIF y calidad 60 solo en esa foto:** `formats` AVIF y WebP, y `qualities` [60, 75]. En
       móvil pasa de 40 KB (WebP 75) a 20 KB (AVIF 60), sin diferencia a simple vista bajo el
       degradado (comparativa en docs/capturas). Sin AVIF se sirve WebP o JPEG de unos 34 KB.
     - La foto de la tarjeta de obras lleva `sizes`: en escritorio se descargaba al ancho de toda
       la pantalla.
     - La primera petición de cada tamaño en AVIF tarda algo más en generarse y cada despliegue
       vacía la caché de imágenes del contenedor: lo nota solo la primera visita.
