// Generador de firmas de email para Outlook (plantilla de la skill firma-email-outlook).
// No se edita por cliente: los datos van en datos-firma.mjs. Uso: `node generar.mjs` en esta carpeta.
// Salida: firmas/firma-{completa,respuesta,comercial}.html, firmas/firma-movil.txt,
//         firmas/portapapeles/*.html (fragmentos solo ASCII para pegar en Outlook) e instalar-firmas.html.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = dirname(fileURLToPath(import.meta.url));
const D = (await import(pathToFileURL(join(raiz, 'datos-firma.mjs')).href)).default;

// ---------- Comprobaciones previas ----------

function buscarPendientes(valor, ruta = '') {
  if (typeof valor === 'string') return valor.includes('PENDIENTE') ? [ruta] : [];
  if (valor && typeof valor === 'object') {
    return Object.entries(valor).flatMap(([k, v]) => buscarPendientes(v, ruta ? `${ruta}.${k}` : k));
  }
  return [];
}

const pendientes = buscarPendientes(D);
if (pendientes.length) {
  console.error('Faltan datos reales en datos-firma.mjs:\n  - ' + pendientes.join('\n  - '));
  process.exit(1);
}

function luminancia(hex) {
  const n = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contraste(a, b) {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const C = D.colores;
const pares = [
  ['enlace sobre blanco', C.enlace, '#ffffff'],
  ['texto legal sobre blanco', C.legal, '#ffffff'],
  ['nombre (oscuro) sobre blanco', C.oscuro, '#ffffff'],
  ['texto blanco sobre la franja', '#ffffff', C.oscuro],
  ['enlace de la franja', C.franjaEnlace, C.oscuro],
];
for (const [nombre, a, b] of pares) {
  const r = contraste(a, b);
  if (r < 4.5) console.warn(`AVISO contraste bajo (${r.toFixed(2)}:1 < 4,5): ${nombre} ${a} / ${b}`);
}

// ---------- Piezas ----------

const FUENTE = 'Arial, Helvetica, sans-serif';
const esc = (s) => s.replaceAll('&', '&amp;');
const marcaTexto = [D.marca.parte1, D.marca.parte2].filter(Boolean).join(' ');

/** Parámetros UTM para medir en Analytics las visitas que llegan desde la firma. */
function utm(url, variante) {
  const u = new URL(url);
  u.searchParams.set('utm_source', 'firma-email');
  u.searchParams.set('utm_medium', 'email');
  u.searchParams.set('utm_campaign', `firma-${variante}`);
  return esc(u.toString());
}

function enlace(href, texto, extra = '') {
  return `<a href="${href}" style="color:${C.enlace}; text-decoration:none;${extra}">${texto}</a>`;
}

function marca(tam) {
  const p2 = D.marca.parte2
    ? `<span style="font-weight:bold; color:${C.marcaAcento}; font-size:${tam}px;">&nbsp;${D.marca.parte2}</span>`
    : '';
  return `<span style="font-weight:bold; color:${C.oscuro}; font-size:${tam}px;">${D.marca.parte1}</span>${p2}`;
}

function img(archivo, alt, ancho, alto = ancho) {
  return `<img src="${D.imagenesRemotas}${archivo}" width="${ancho}" height="${alto}" alt="${alt}" border="0" style="display:block; width:${ancho}px; height:${alto}px; border:0; outline:none;">`;
}

const etiqueta = (t) => `<span style="color:${C.marcaAcento}; font-weight:bold;">${t}</span>`;

/**
 * Encabezado de la firma completa. Con `persona` es el nombre y debajo cargo + marca;
 * con `persona: null` (buzón genérico tipo info@) la marca pasa a ser el titular.
 */
function encabezado() {
  if (!D.persona) {
    const sub = D.subtitulo
      ? `\n      <div style="font-size:13px; line-height:20px; color:${C.gris};">${D.subtitulo}</div>`
      : '';
    return `<div style="font-size:16px; line-height:22px;">${marca(16)}</div>${sub}`;
  }
  return `<div style="font-size:16px; line-height:22px; font-weight:bold; color:${C.oscuro};">${D.persona.nombre}</div>
      <div style="font-size:13px; line-height:20px; color:${C.gris};">${D.persona.cargo} · ${marca(13)}</div>`;
}

/** Primera línea de la firma corta, en una sola línea. */
function encabezadoCorto() {
  if (!D.persona) return D.subtitulo ? `${marca(13)} · ${D.subtitulo}` : marca(13);
  return `<b style="color:${C.oscuro};">${D.persona.nombre}</b> · ${D.persona.cargo} · ${marca(13)}`;
}

function lineaTelefonos() {
  const partes = [enlace(`tel:${D.telefono.e164}`, D.telefono.texto, ` color:${C.texto};`)];
  if (D.whatsapp) partes.push(enlace(D.whatsapp, 'WhatsApp'));
  if (D.telefono2) partes.push(`${D.telefono2.etiqueta} ${enlace(`tel:${D.telefono2.e164}`, D.telefono2.texto, ` color:${C.texto};`)}`);
  return partes.join(' · ');
}

function clausulaRgpd() {
  return `<b style="color:${C.gris};">Protección de datos.</b> Responsable: ${D.titular} (${marcaTexto}). Finalidad: gestionar la relación comercial o profesional y atender sus solicitudes. Legitimación: ejecución de un contrato o de medidas precontractuales y, para datos de contacto profesionales, interés legítimo. No se cederán datos a terceros salvo obligación legal. Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad en ${enlace(`mailto:${D.email}`, D.email)} y reclamar ante la AEPD (${enlace('https://www.aepd.es/', 'www.aepd.es')}). Más información: ${enlace(D.paginas.privacidad, 'Política de privacidad')} · ${enlace(D.paginas.avisoLegal, 'Aviso legal')}.`;
}

/** Nota opcional sobre la naturaleza del servicio (p. ej. intermediación: coordina pero no ejecuta). */
function notaActividad() {
  return D.notaActividad
    ? `<div style="padding-bottom:6px;"><b style="color:${C.gris};">${D.notaActividad.titulo}</b> ${D.notaActividad.texto}</div>`
    : '';
}

function clausulaConfidencialidad() {
  return `<b style="color:${C.gris};">Confidencialidad.</b> Este mensaje y sus adjuntos son confidenciales y se dirigen exclusivamente a su destinatario. Si lo ha recibido por error, comuníquenoslo y elimínelo.`;
}

function clausulaBaja() {
  return `Este mensaje es una comunicación comercial de ${marcaTexto}. Si no desea recibir más comunicaciones comerciales, puede darse de baja gratis respondiendo con la palabra BAJA o ${enlace(`mailto:${D.email}?subject=BAJA`, 'solicitando la baja aquí')}.`;
}

/** Firma completa (mensajes nuevos) y comercial (igual + línea de baja LSSI). */
function firmaCompleta(variante) {
  const iconos = D.redes
    .map((r) => `<td style="padding:0 6px 0 0;"><a href="${r.url}" style="text-decoration:none;">${img(`${r.icono}.png`, r.nombre, 28)}</a></td>`)
    .join('');
  const filaRedes = D.redes.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; margin-top:8px;"><tr>${iconos}</tr></table>`
    : '';
  const direccion = D.mapa ? `${D.direccion} · ${enlace(esc(D.mapa), 'Cómo llegar')}` : D.direccion;
  const verServicios = D.paginas.servicios
    ? ` &nbsp;${enlace(utm(D.paginas.servicios, variante), 'Ver servicios&nbsp;→', ` color:${C.franjaEnlace}; font-weight:bold; white-space:nowrap;`)}`
    : '';
  const claim = D.claim ? ` · <b style="color:#ffffff;">${D.claim}</b>` : '';
  const filaFranja = D.actividad
    ? `
  <tr>
    <td colspan="2" style="padding:14px 0 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td bgcolor="${C.oscuro}" style="background-color:${C.oscuro}; padding:9px 14px; font-family:${FUENTE}; font-size:12px; line-height:18px; color:#ffffff;">
            ${D.actividad}${claim}${verServicios}
          </td>
        </tr>
      </table>
    </td>
  </tr>`
    : '';
  const filaHorario = D.horario
    ? `
  <tr>
    <td colspan="2" style="padding:6px 0 0 0; font-family:${FUENTE}; font-size:11px; line-height:16px; color:${C.legal};">Horario: ${D.horario}</td>
  </tr>`
    : '';
  const filaBaja = variante === 'comercial'
    ? `
  <tr><td colspan="2" style="padding:12px 0 0 0; font-family:${FUENTE}; font-size:12px; line-height:17px; color:${C.texto};">${clausulaBaja()}</td></tr>`
    : '';

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; max-width:560px; font-family:${FUENTE};">
  <tr>
    <td valign="top" width="${D.logo.ancho}" style="width:${D.logo.ancho}px; padding:2px 14px 0 0; border-right:2px solid ${C.acento};">
      <a href="${utm(D.web, variante)}" style="text-decoration:none;">${img(D.logo.archivo, marcaTexto, D.logo.ancho, D.logo.alto)}</a>
    </td>
    <td valign="top" style="padding:0 0 0 14px; font-family:${FUENTE}; font-size:13px; line-height:20px; color:${C.texto};">
      ${encabezado()}
      <div style="padding-top:6px;">${etiqueta('T.')} ${lineaTelefonos()}</div>
      <div>${etiqueta('E.')} ${enlace(`mailto:${D.email}`, D.email, ` color:${C.texto};`)}</div>
      <div>${etiqueta('W.')} ${enlace(utm(D.web, variante), D.webTexto)}</div>
      <div>${etiqueta('D.')} ${direccion}</div>
      ${filaRedes}
    </td>
  </tr>${filaFranja}${filaHorario}${filaBaja}
  <tr>
    <td colspan="2" style="padding:12px 0 0 0; font-family:${FUENTE}; font-size:11px; line-height:16px; color:${C.legal};">
      <div style="border-top:1px solid ${C.linea}; padding-top:10px;">${notaActividad()}${clausulaRgpd()}</div>
      <div style="padding-top:6px;">${clausulaConfidencialidad()}</div>
    </td>
  </tr>
</table>`;
}

/** Firma corta para respuestas y reenvíos: sin imágenes para no ensuciar los hilos. */
function firmaRespuesta() {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; max-width:560px; font-family:${FUENTE};">
  <tr>
    <td style="padding:0 0 0 12px; border-left:2px solid ${C.acento}; font-family:${FUENTE}; font-size:13px; line-height:20px; color:${C.texto};">
      <div>${encabezadoCorto()}</div>
      <div>${lineaTelefonos()} · ${enlace(utm(D.web, 'respuesta'), D.webTexto)}</div>
    </td>
  </tr>
  <tr>
    <td style="padding:8px 0 0 0; font-family:${FUENTE}; font-size:11px; line-height:16px; color:${C.legal};">
      Protección de datos: responsable ${D.titular} (${marcaTexto}). Puede ejercer sus derechos en ${enlace(`mailto:${D.email}`, D.email)}. Más información en la ${enlace(D.paginas.privacidad, 'Política de privacidad')}. Mensaje confidencial.
    </td>
  </tr>
</table>`;
}

function firmaMovil() {
  const tel = D.whatsapp ? `Tel. y WhatsApp: ${D.telefono.texto}` : `Tel.: ${D.telefono.texto}`;
  const cabecera = D.persona
    ? [D.persona.nombre, `${D.persona.cargo} · ${marcaTexto}`]
    : [marcaTexto, D.subtitulo];
  return [
    ...cabecera,
    D.actividad,
    tel,
    `${D.email} · ${D.webTexto}`,
    D.direccion,
    '',
    `Protección de datos: responsable ${D.titular} (${marcaTexto}). Derechos en ${D.email}. Más información: ${D.paginas.privacidad}`,
    '',
  ].filter((l) => l !== null && l !== undefined).join('\n');
}

/** Versión solo ASCII (tildes como &#243;): Set-Clipboard -AsHtml de PowerShell 5.1 rompe los caracteres UTF-8. */
const aAscii = (s) => [...s].map((c) => (c.codePointAt(0) > 127 ? `&#${c.codePointAt(0)};` : c)).join('');

function documento(titulo, cuerpo) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
</head>
<body style="margin:0; padding:24px 16px; background:#ffffff;">
<p style="margin:0 0 14px 0; font-family:${FUENTE}; font-size:14px; line-height:20px; color:${C.texto};">Un saludo,</p>
${cuerpo}
</body>
</html>
`;
}

const FIRMAS = [
  { id: 'completa', nombre: 'Completa', uso: 'Mensajes nuevos', html: firmaCompleta('completa') },
  { id: 'respuesta', nombre: 'Respuesta', uso: 'Respuestas y reenvíos', html: firmaRespuesta() },
  { id: 'comercial', nombre: 'Comercial', uso: 'Emails de captación o promoción (se elige a mano)', html: firmaCompleta('comercial') },
];

function panel() {
  const archivos = [D.logo.archivo, ...D.redes.map((r) => `${r.icono}.png`)];
  const listaArchivos = archivos.map((a) => `<code>${a}</code>`).join(', ').replace(/, ([^,]+)$/, ' y $1');
  const carpetaLocal = join(raiz, 'imagenes', 'firma');
  // Pasos para publicar las imágenes: los de un hosting con administrador de archivos, salvo que
  // `hosting.pasos` traiga los de esa web (p. ej. meterlas en el repositorio y desplegar).
  const pasosPublicar = D.hosting.pasos ?? [
    `${D.hosting.nombre} → panel del sitio → <b>Administrador de archivos</b>.`,
    `Crear la carpeta <code>${D.hosting.carpeta}</code>.`,
    `Subir dentro los ${archivos.length} archivos de <code>${esc(carpetaLocal)}</code>: ${listaArchivos}.`,
  ];
  const tarjetas = FIRMAS.map((f) => `
    <section class="tarjeta">
      <div class="cabecera">
        <div>
          <h2>Firma «${f.nombre}»</h2>
          <p class="uso">${f.uso}</p>
        </div>
        <button type="button" class="copiar" data-firma="${f.id}">Copiar firma</button>
      </div>
      <div class="lienzo">
        <div class="firma" id="firma-${f.id}">${f.html}</div>
      </div>
    </section>`).join('\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Firmas de email · ${marcaTexto}</title>
<style>
  :root { --fondo:#f3f4f6; --tarjeta:#ffffff; --texto:#111827; --suave:#4b5563; --borde:#e5e7eb; --oscuro:${C.oscuro}; --ok:#15803d; --okFondo:#dcfce7; --aviso:#9a3412; --avisoFondo:#ffedd5; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--fondo); color:var(--texto); font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.55; }
  main { max-width:880px; margin:0 auto; padding:24px 16px 48px; }
  h1 { font-size:24px; margin:0 0 4px; color:var(--oscuro); }
  h2 { font-size:17px; margin:0; color:var(--oscuro); }
  h3 { font-size:16px; margin:24px 0 8px; color:var(--oscuro); }
  .intro { color:var(--suave); margin:0 0 16px; }
  .estado { border-radius:8px; padding:12px 14px; margin:0 0 20px; font-size:14px; }
  .estado.ok { background:var(--okFondo); color:var(--ok); }
  .estado.pendiente { background:var(--avisoFondo); color:var(--aviso); }
  .tarjeta { background:var(--tarjeta); border:1px solid var(--borde); border-radius:12px; margin:0 0 20px; overflow:hidden; }
  .cabecera { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; padding:14px 16px; border-bottom:1px solid var(--borde); }
  .uso { margin:2px 0 0; color:var(--suave); font-size:13px; }
  .lienzo { padding:20px 16px; overflow-x:auto; background:#ffffff; }
  .copiar { background:var(--oscuro); color:#ffffff; border:0; border-radius:8px; padding:10px 16px; font-size:14px; font-weight:bold; cursor:pointer; min-height:44px; }
  .copiar.hecho { background:var(--ok); }
  .guia { background:var(--tarjeta); border:1px solid var(--borde); border-radius:12px; padding:4px 20px 20px; margin:0 0 20px; }
  .guia ol { padding-left:22px; margin:8px 0; }
  .guia li { margin:0 0 8px; }
  code { background:#f3f4f6; border:1px solid var(--borde); border-radius:4px; padding:1px 5px; font-size:13px; word-break:break-all; }
  .nota { color:var(--suave); font-size:13px; }
  pre { background:#f9fafb; border:1px solid var(--borde); border-radius:8px; padding:12px; white-space:pre-wrap; font-size:13px; }
</style>
</head>
<body>
<main>
  <h1>Firmas de email de ${marcaTexto}</h1>
  <p class="intro">Tres firmas listas para Outlook. Primero se suben las imágenes a la web y luego se copia cada firma con su botón.</p>
  <div id="estado" class="estado pendiente">Comprobando si las imágenes ya están subidas a la web…</div>
${tarjetas}
  <section class="guia">
    <h3>Paso 1 · Publicar las imágenes en la web (una sola vez)</h3>
    <ol>
      ${pasosPublicar.map((p) => `<li>${p}</li>`).join('\n      ')}
      <li>Comprobar que abre <code>${D.imagenesRemotas}${D.logo.archivo}</code> y recargar esta página: el aviso de arriba se pone en verde.</li>
    </ol>

    <h3>Paso 2 · Crear las firmas en Outlook (el Outlook nuevo de Windows)</h3>
    <ol>
      <li>Engranaje <b>Configuración</b> → <b>Cuentas</b> → <b>Firmas</b>.</li>
      <li>En «Esta configuración se aplica a», elegir <b>${D.email}</b>.</li>
      <li><b>+ Agregar firma</b> → nombre <b>Completa</b> → pulsar «Copiar firma» aquí y pegar con <b>Ctrl + V</b> → marcar «predeterminado para los mensajes nuevos» → <b>Guardar</b>.</li>
      <li>Repetir con <b>Respuesta</b> (marcar «predeterminado para las respuestas y reenvíos») y con <b>Comercial</b> (sin marcar nada).</li>
    </ol>

    <h3>Paso 3 · Cambiar de firma</h3>
    <ol>
      <li>En un email concreto: pestaña <b>Mensaje</b> → <b>Firma ▾</b> → elegir la firma. Sustituye a la que había.</li>
      <li>Para cambiar la que sale siempre: Configuración → Cuentas → Firmas → desplegables de «mensajes nuevos» y «respuestas y reenvíos».</li>
    </ol>
    <p class="nota">La firma Comercial lleva la línea de baja que exige la LSSI. No permite enviar publicidad a quien no la ha pedido: úsala con clientes o contactos que han dado permiso.</p>

    <h3>Paso 4 · Outlook en el móvil</h3>
    <ol>
      <li>App de Outlook → icono de cuenta → engranaje <b>Configuración</b> → <b>Firma</b> → pegar este texto:</li>
    </ol>
    <pre>${esc(firmaMovil())}</pre>

    <h3>Paso 5 · Prueba final</h3>
    <ol>
      <li>Email nuevo a Gmail y Hotmail: se ven el logo y los iconos.</li>
      <li>Pulsar los enlaces: teléfono, WhatsApp, web, mapa, redes y privacidad.</li>
      <li>Abrirlo en el móvil y con modo oscuro.</li>
      <li>Responder desde Outlook: sale la firma corta.</li>
    </ol>
  </section>
</main>
<script>
  const REMOTO = ${JSON.stringify(D.imagenesRemotas)};
  const LOCAL = 'imagenes/firma/';
  const nombreArchivo = (src) => src.split('/').pop().split('?')[0];
  const imagenes = [...document.querySelectorAll('.firma img')];

  // Vista previa: si las imágenes aún no están en la web, se muestran las locales.
  const usarLocal = (img) => { img.src = LOCAL + nombreArchivo(img.src); };
  imagenes.forEach((img) => {
    if (img.complete && img.naturalWidth === 0) usarLocal(img);
    else img.addEventListener('error', () => usarLocal(img), { once: true });
  });

  const estado = document.getElementById('estado');
  const prueba = new Image();
  prueba.onload = () => {
    estado.className = 'estado ok';
    estado.textContent = 'Imágenes subidas a la web: ya se pueden copiar las firmas en Outlook.';
  };
  prueba.onerror = () => {
    estado.className = 'estado pendiente';
    estado.textContent = 'Las imágenes todavía no están en la web. Haz el paso 1 antes de copiar las firmas (la vista previa usa las imágenes locales).';
  };
  prueba.src = REMOTO + ${JSON.stringify(D.logo.archivo)} + '?comprobacion=' + Date.now();

  // Copia con formato: la firma siempre sale con las imágenes de la web, nunca las locales.
  document.querySelectorAll('.copiar').forEach((boton) => {
    boton.addEventListener('click', () => {
      const bloque = document.getElementById('firma-' + boton.dataset.firma);
      const previas = imagenes.map((img) => [img, img.getAttribute('src')]);
      bloque.querySelectorAll('img').forEach((img) => img.setAttribute('src', REMOTO + nombreArchivo(img.src)));

      const rango = document.createRange();
      rango.selectNodeContents(bloque);
      const seleccion = window.getSelection();
      seleccion.removeAllRanges();
      seleccion.addRange(rango);
      let copiado = false;
      try { copiado = document.execCommand('copy'); } catch (e) { copiado = false; }
      seleccion.removeAllRanges();
      previas.forEach(([img, src]) => img.setAttribute('src', src));

      const texto = boton.textContent;
      boton.textContent = copiado ? 'Copiada: pégala en Outlook' : 'No se pudo copiar: selecciónala y usa Ctrl + C';
      if (copiado) boton.classList.add('hecho');
      setTimeout(() => { boton.textContent = texto; boton.classList.remove('hecho'); }, 3500);
    });
  });
</script>
</body>
</html>
`;
}

// ---------- Escritura ----------

mkdirSync(join(raiz, 'firmas', 'portapapeles'), { recursive: true });
for (const f of FIRMAS) {
  writeFileSync(join(raiz, 'firmas', `firma-${f.id}.html`), documento(`Firma ${f.nombre} · ${marcaTexto}`, f.html), 'utf8');
  writeFileSync(join(raiz, 'firmas', 'portapapeles', `firma-${f.id}.html`), aAscii(f.html), 'ascii');
}
writeFileSync(join(raiz, 'firmas', 'firma-movil.txt'), firmaMovil(), 'utf8');
writeFileSync(join(raiz, 'instalar-firmas.html'), panel(), 'utf8');
console.log(`Firmas de ${marcaTexto} generadas: firmas/, firmas/portapapeles/ e instalar-firmas.html`);
