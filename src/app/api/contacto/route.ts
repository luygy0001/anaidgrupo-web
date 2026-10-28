import { isIP } from 'node:net';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { EMAIL } from '@/lib/constants';
import { leerJsonConLimite } from '@/lib/peticion';
import {
  LIMITES,
  emailValido,
  esTipoReforma,
  etiquetaTipoReforma,
  telefonoValido,
} from '@/lib/consulta';

// ============================================================
// Formulario de consulta de la web provisional → correo a info@
// ------------------------------------------------------------
// Valida, sanea y envía la consulta por el SMTP de Hostinger (buzón info@construccionesanaid.com).
// Solo responde «enviado» si el servidor de correo ha aceptado el mensaje; si no, error visible
// con teléfono y WhatsApp. Sin n8n, sin IA y sin Turnstile en esta versión.
// Protecciones: origen propio, solo JSON (415), cuerpo de 16 KB como mucho (413), 5 envíos cada
// 15 minutos por IP y 30 consultas por hora en total (429), campo trampa y validación en servidor.
// Variables (Dokploy > Environment): SMTP_USER y SMTP_PASS obligatorias; SMTP_HOST, SMTP_PORT y
// CONTACTO_DESTINO opcionales. Nunca credenciales en el código.
// ============================================================

export const runtime = 'nodejs';

const ERROR_CONTACTO_DIRECTO =
  'No hemos podido enviar tu consulta. Por favor, llámanos o escríbenos por WhatsApp y te atendemos.';

// Cuerpo máximo: el formulario lleno, con el mensaje de 2.000 caracteres, no llega a 10 KB
const MAX_BYTES = 16_000;

// Límite de frecuencia en memoria: 5 envíos cada 15 minutos por IP
const limites = new Map<string, { cuenta: number; caduca: number }>();
// Tope de IP distintas guardadas: sin él, el contador crecería con cada IP nueva hasta agotar la
// memoria del servidor.
const MAX_IPS = 10_000;

function superaLimite(ip: string): boolean {
  const ahora = Date.now();
  const entrada = limites.get(ip);
  if (entrada && ahora <= entrada.caduca) {
    if (entrada.cuenta >= 5) return true;
    entrada.cuenta += 1;
    return false;
  }
  limites.delete(ip);
  if (limites.size >= MAX_IPS) {
    for (const [clave, valor] of limites) if (ahora > valor.caduca) limites.delete(clave);
    // Si sigue lleno, sale la más antigua (el Map guarda el orden de llegada)
    while (limites.size >= MAX_IPS) {
      const masAntigua = limites.keys().next().value;
      if (masAntigua === undefined) break;
      limites.delete(masAntigua);
    }
  }
  limites.set(ip, { cuenta: 1, caduca: ahora + 15 * 60 * 1000 });
  return false;
}

// Tope global: como mucho 30 consultas por hora entre todas las IP. Acota el daño aunque alguien
// reparta los envíos entre muchas IP; una semana normal no se acerca. Solo cuenta las consultas
// válidas que van a salir por correo, así las peticiones basura no gastan el cupo de la gente real.
const MAX_TOTAL_HORA = 30;
let envios: number[] = [];

function superaTopeGlobal(): boolean {
  const haceUnaHora = Date.now() - 60 * 60 * 1000;
  envios = envios.filter((momento) => momento > haceUnaHora);
  if (envios.length >= MAX_TOTAL_HORA) return true;
  envios.push(Date.now());
  return false;
}

// Orígenes permitidos: comparación exacta (esquema, host y puerto), nunca por subcadena
const ORIGENES_PERMITIDOS: ReadonlySet<string> = new Set([
  'https://construccionesanaid.com',
  'https://www.construccionesanaid.com',
]);

function origenPermitido(cabecera: string): boolean {
  let url: URL;
  try {
    url = new URL(cabecera);
  } catch {
    return false;
  }
  if (ORIGENES_PERMITIDOS.has(url.origin)) return true;
  // En desarrollo, el servidor local en cualquier puerto; en producción, nunca
  return process.env.NODE_ENV !== 'production' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
}

// IP para el límite: detrás de Traefik (Dokploy) vale el último valor de X-Forwarded-For, el que
// añade el proxy; el primero lo puede inventar el cliente. Si no es una IP válida, todas esas
// peticiones comparten un mismo contador en vez de abrir uno nuevo cada vez.
function ipCliente(req: NextRequest): string {
  const ultima = req.headers
    .get('x-forwarded-for')
    ?.split(',')
    .map((parte) => parte.trim())
    .filter(Boolean)
    .at(-1);
  return ultima && isIP(ultima) ? ultima : 'sin-ip';
}

// Texto de una línea: sin etiquetas HTML ni saltos de línea (evita inyectar cabeceras de correo)
function linea(valor: unknown, max: number): string {
  return typeof valor === 'string' ? valor.replace(/[<>\r\n]/g, ' ').trim().slice(0, max) : '';
}

function parrafo(valor: unknown, max: number): string {
  return typeof valor === 'string' ? valor.replace(/[<>]/g, '').trim().slice(0, max) : '';
}

function error(mensaje: string, estado: number) {
  return NextResponse.json({ error: mensaje }, { status: estado });
}

export async function POST(req: NextRequest) {
  try {
    const origen = req.headers.get('origin') || req.headers.get('referer') || '';
    if (origen && !origenPermitido(origen)) return error('Origen no autorizado', 403);

    if (superaLimite(ipCliente(req))) {
      return error(
        'Has alcanzado el límite de envíos. Por favor, llámanos o escríbenos por WhatsApp.',
        429
      );
    }

    // Solo JSON, que es lo que envía el formulario; cualquier otro formato se rechaza sin leerlo
    const formato = req.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
    if (formato !== 'application/json') return error('Formato no admitido', 415);

    const lectura = await leerJsonConLimite(req, MAX_BYTES);
    if (!lectura.ok) {
      return error(lectura.estado === 413 ? 'La consulta es demasiado larga' : 'Solicitud no válida', lectura.estado);
    }
    const cuerpo = lectura.valor;
    if (!cuerpo || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) {
      return error('Solicitud no válida', 400);
    }
    const datos = cuerpo as Record<string, unknown>;

    // Campo trampa relleno: es un robot. Se responde como si nada para no darle pistas.
    if (typeof datos.sitioWeb === 'string' && datos.sitioWeb.trim() !== '') {
      return NextResponse.json({ success: true });
    }

    const nombre = linea(datos.nombre, LIMITES.nombre);
    const telefono = linea(datos.telefono, LIMITES.telefono).replace(/[\s\-().]/g, '');
    const email = linea(datos.email, LIMITES.email).toLowerCase();
    const mensaje = parrafo(datos.mensaje, LIMITES.mensaje);
    const tipoReforma = datos.tipoReforma;
    const pagina = linea(datos.origen, 200) || '/';

    if (!nombre) return error('Indica tu nombre.', 400);
    if (!telefonoValido(telefono)) return error('Indica un teléfono válido.', 400);
    if (!emailValido(email)) return error('Indica un email válido.', 400);
    if (!esTipoReforma(tipoReforma)) return error('Elige el tipo de reforma.', 400);
    if (!mensaje) return error('Cuéntanos qué necesitas en el mensaje.', 400);
    if (datos.aceptaPrivacidad !== true) {
      return error('Confirma que has leído la política de privacidad.', 400);
    }

    if (superaTopeGlobal()) {
      // Sin datos de la persona en el registro: solo que se ha llegado al tope
      console.warn(`[api/contacto] Tope de ${MAX_TOTAL_HORA} consultas por hora alcanzado: consulta rechazada.`);
      return error(
        'Ahora mismo no podemos recibir más consultas por la web. Por favor, llámanos o escríbenos por WhatsApp.',
        429
      );
    }

    const tipo = etiquetaTipoReforma(tipoReforma);
    const fecha = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Madrid',
    }).format(new Date());

    const asunto = `Consulta web (${tipo}): ${nombre}`;
    const texto = [
      'Nueva consulta desde la web construccionesanaid.com',
      '',
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Email: ${email}`,
      `Tipo de reforma: ${tipo}`,
      `Página: ${pagina}`,
      `Fecha: ${fecha} (hora de Madrid)`,
      '',
      'Mensaje:',
      mensaje,
      '',
      '---',
      'Al responder a este correo, la respuesta va directamente al cliente.',
      'Compromiso de la web: respuesta en menos de 48 horas laborables.',
    ].join('\n');

    const usuario = process.env.SMTP_USER;
    const clave = process.env.SMTP_PASS;
    if (!usuario || !clave) {
      if (process.env.NODE_ENV === 'production') {
        console.error('[api/contacto] Faltan SMTP_USER o SMTP_PASS: consulta no enviada.');
        return error(ERROR_CONTACTO_DIRECTO, 503);
      }
      // Solo en desarrollo y sin correo configurado: se simula el envío para poder probar la web.
      console.info(`[api/contacto] Desarrollo sin SMTP: envío simulado («${asunto}»).`);
      return NextResponse.json({ success: true });
    }

    const puerto = Number(process.env.SMTP_PORT) || 465;
    const transporte = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: puerto,
      secure: puerto === 465,
      auth: { user: usuario, pass: clave },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    try {
      await transporte.sendMail({
        from: { name: 'Web Construcciones Anaid', address: usuario },
        to: process.env.CONTACTO_DESTINO || EMAIL,
        replyTo: { name: nombre, address: email },
        subject: asunto,
        text: texto,
      });
    } catch (fallo) {
      // Solo el código del error, nunca credenciales ni datos de la persona
      const detalle =
        fallo && typeof fallo === 'object'
          ? `${(fallo as { code?: string }).code ?? ''} ${(fallo as { responseCode?: number }).responseCode ?? ''}`.trim()
          : '';
      console.error('[api/contacto] El servidor de correo no aceptó la consulta.', detalle);
      return error(ERROR_CONTACTO_DIRECTO, 502);
    }

    return NextResponse.json({ success: true });
  } catch (fallo) {
    console.error('[api/contacto] Error interno:', fallo instanceof Error ? fallo.name : 'desconocido');
    return error(ERROR_CONTACTO_DIRECTO, 500);
  }
}
