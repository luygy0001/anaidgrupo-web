import { NextRequest, NextResponse } from 'next/server';
import {
  IMPORTE_PRESUPUESTO_ADICIONAL,
  METROS_MAX,
  METROS_MIN,
  VERSION_CONTRATO,
  calidadPermitida,
  emailValido,
  esPerfil,
  esTipoObra,
  metrosObligatorios,
  telefonoValido,
} from '@/lib/presupuesto';

// ============================================================
// Recepción única de formularios públicos
// ------------------------------------------------------------
// Todos los formularios de la web (presupuesto de portada, contacto,
// solicitud de proyecto y alta de profesionales) envían aquí. La ruta
// valida, sanea y reenvía el contacto al webhook de n8n configurado en
// N8N_LEAD_WEBHOOK_URL. Si el webhook no existe o falla, responde con
// error para que el usuario lo sepa y use teléfono o WhatsApp: nunca se
// confirma como recibido un contacto que no ha llegado a ningún sitio.
// Contrato de datos con n8n: docs/n8n-contrato-datos.md
// ============================================================

type Tipo = 'presupuesto' | 'contacto' | 'solicitud' | 'profesional';
type Valor = string | string[] | boolean | number;
type Campos = Record<string, Valor>;

// Campos admitidos por tipo de formulario. Cualquier otro se descarta.
const CAMPOS: Record<Tipo, readonly string[]> = {
  presupuesto: [
    'perfil',
    'calidad',
    'tipoObra',
    'metros',
    'municipio',
    'descripcion',
    'nombre',
    'telefono',
    'email',
    'aceptaPrivacidad',
    'aceptaCondicionPago',
    'origenFormulario',
  ],
  contacto: ['nombre', 'telefono', 'email', 'mensaje'],
  solicitud: [
    'nombre',
    'telefono',
    'email',
    'codigoPostal',
    'tipoServicio',
    'noSabeQueNecesita',
    'urgencia',
    'descripcion',
    'origenFormulario',
  ],
  profesional: [
    'nombre',
    'empresa',
    'telefono',
    'email',
    'especialidades',
    'zonas',
    'experiencia',
    'descripcion',
  ],
};

const ERROR_CONTACTO_DIRECTO =
  'No hemos podido registrar tu solicitud. Por favor, llámanos o escríbenos por WhatsApp y te atendemos al momento.';

// Rate limiting en memoria para mitigar spam
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 15 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) {
    return true;
  }
  entry.count += 1;
  return false;
}

// Saneado de texto para evitar inyecciones de HTML
function sanitize(input: string, max = 2000): string {
  return input.replace(/[<>]/g, '').trim().slice(0, max);
}

function sanearValor(valor: unknown): Valor | null {
  if (typeof valor === 'string') return sanitize(valor);
  if (typeof valor === 'boolean') return valor;
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : null;
  if (Array.isArray(valor)) {
    return valor
      .filter((v): v is string => typeof v === 'string')
      .slice(0, 20)
      .map((v) => sanitize(v, 100));
  }
  return null;
}

function esTipo(valor: unknown): valor is Tipo {
  return typeof valor === 'string' && valor in CAMPOS;
}

function texto(campos: Campos, clave: string): string {
  const v = campos[clave];
  return typeof v === 'string' ? v : '';
}

// Validación y normalización del presupuesto. Devuelve el mensaje de error o null.
// Mismas reglas que el formulario (src/lib/presupuesto.ts).
function validarPresupuesto(campos: Campos): string | null {
  const perfil = campos.perfil;
  if (!esPerfil(perfil)) return 'Indica si eres particular, inversor o inmobiliaria.';

  // Las inmobiliarias siempre presupuestan en calidad media-baja
  if (perfil === 'inmobiliaria') campos.calidad = 'media-baja';
  if (!calidadPermitida(perfil, campos.calidad)) return 'Elige una calidad de acabados válida para tu perfil.';

  const tipoObra = campos.tipoObra;
  if (!esTipoObra(tipoObra)) return 'Elige el tipo de obra.';

  const metrosTexto = String(campos.metros ?? '').replace(',', '.').trim();
  if (metrosTexto) {
    const metros = Math.round(Number(metrosTexto));
    if (!Number.isFinite(metros) || metros < METROS_MIN || metros > METROS_MAX) {
      return `Los metros cuadrados deben estar entre ${METROS_MIN} y ${METROS_MAX}.`;
    }
    campos.metros = metros;
  } else if (metrosObligatorios(tipoObra)) {
    return 'Indica los metros cuadrados aproximados.';
  } else {
    delete campos.metros;
  }

  if (!texto(campos, 'municipio')) return 'Indica el municipio de la obra.';
  if (tipoObra === 'otra' && !texto(campos, 'descripcion')) return 'Cuéntanos qué obra necesitas.';
  if (!texto(campos, 'nombre')) return 'Indica tu nombre.';
  if (campos.aceptaPrivacidad !== true) return 'Tienes que aceptar la política de privacidad.';
  if (campos.aceptaCondicionPago !== true) return 'Tienes que aceptar las condiciones de los presupuestos adicionales.';
  return null;
}

// Antibots Cloudflare Turnstile. Sin clave secreta: en desarrollo se omite; en producción se
// rechaza (mejor un error visible que dejar entrar bots sin control).
async function verificarTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secreto = process.env.TURNSTILE_SECRET_KEY;
  if (!secreto) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[api/lead] Falta TURNSTILE_SECRET_KEY: envío rechazado.');
      return false;
    }
    return true;
  }
  if (typeof token !== 'string' || !token) return false;
  const cuerpo = new URLSearchParams({ secret: secreto, response: token });
  if (ip && ip !== 'anonymous') cuerpo.set('remoteip', ip);
  const respuesta = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: cuerpo,
    signal: AbortSignal.timeout(5_000),
  }).catch(() => null);
  if (!respuesta?.ok) return false;
  const datos: unknown = await respuesta.json().catch(() => null);
  return !!datos && typeof datos === 'object' && 'success' in datos && datos.success === true;
}

// Lo que n8n contesta al recibir un presupuesto. Si no dice nada, se da por aceptado.
function leerRespuestaN8n(cuerpo: unknown): { estado: 'aceptado' | 'pago_requerido'; importe?: number } {
  if (cuerpo && typeof cuerpo === 'object' && 'estado' in cuerpo && cuerpo.estado === 'pago_requerido') {
    const importe =
      'importe' in cuerpo && typeof cuerpo.importe === 'number' ? cuerpo.importe : IMPORTE_PRESUPUESTO_ADICIONAL;
    return { estado: 'pago_requerido', importe };
  }
  return { estado: 'aceptado' };
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') || req.headers.get('referer') || '';
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';

    // 1. Origen legítimo (evita envíos desde webs externas)
    const allowedHosts = ['construccionesanaid.com', 'www.construccionesanaid.com', 'localhost'];
    if (origin && !allowedHosts.some((host) => origin.includes(host))) {
      return NextResponse.json({ error: 'Origen no autorizado' }, { status: 403 });
    }

    // 2. Control de frecuencia
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Has alcanzado el límite de solicitudes. Por favor, contáctanos directamente por WhatsApp o teléfono.' },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Solicitud no válida' }, { status: 400 });
    }
    const datos = body as Record<string, unknown>;

    // 3. Trampa anti-bot: si un bot rellena el campo invisible, se descarta sin dar pistas
    if (datos.company_fax || datos.website_url) {
      return NextResponse.json({ success: true });
    }

    // 3 bis. Antibots (Turnstile). El token no se reenvía a n8n.
    if (!(await verificarTurnstile(datos.turnstileToken, ip))) {
      return NextResponse.json(
        {
          error:
            'No hemos podido comprobar que no eres un robot. Recarga la página e inténtalo de nuevo, o llámanos o escríbenos por WhatsApp.',
        },
        { status: 403 }
      );
    }

    // Compatibilidad: el formulario de portada antiguo no enviaba tipo
    const tipo: Tipo = esTipo(datos.tipo) ? datos.tipo : 'presupuesto';

    // 4. Campos permitidos y saneados
    const campos: Campos = {};
    for (const campo of CAMPOS[tipo]) {
      const valor = sanearValor(datos[campo]);
      if (valor !== null && valor !== '') campos[campo] = valor;
    }

    // 5. Validación: hace falta un medio de contacto válido
    const telefono = texto(campos, 'telefono').replace(/[\s\-().]/g, '');
    const email = texto(campos, 'email').toLowerCase();

    if (telefono) {
      if (!telefonoValido(telefono)) {
        return NextResponse.json({ error: 'El formato del teléfono no es válido' }, { status: 400 });
      }
      campos.telefono = telefono;
    }
    if (email) {
      if (!emailValido(email)) {
        return NextResponse.json({ error: 'El formato del email no es válido' }, { status: 400 });
      }
      campos.email = email;
    }

    // Presupuesto: correo y teléfono obligatorios (decisión de Luis) y reglas propias
    if (tipo === 'presupuesto') {
      if (!telefono || !email) {
        return NextResponse.json({ error: 'El móvil y el correo son obligatorios.' }, { status: 400 });
      }
      const error = validarPresupuesto(campos);
      if (error) return NextResponse.json({ error }, { status: 400 });
    } else if (tipo === 'contacto' ? !email : !telefono) {
      return NextResponse.json(
        { error: tipo === 'contacto' ? 'El email es obligatorio' : 'El teléfono es obligatorio' },
        { status: 400 }
      );
    }

    // 6. Reenvío a n8n. Sin webhook o con fallo, el usuario recibe error.
    const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('[api/lead] N8N_LEAD_WEBHOOK_URL no está configurada: contacto no registrado.');
      return NextResponse.json({ error: ERROR_CONTACTO_DIRECTO }, { status: 503 });
    }

    // Secreto compartido con el Header Auth del webhook de n8n (credencial «Anaid - Webhook»)
    const cabeceras: Record<string, string> = { 'Content-Type': 'application/json' };
    const secretoWebhook = process.env.N8N_WEBHOOK_SECRET;
    if (secretoWebhook) cabeceras['X-Webhook-Secret'] = secretoWebhook;

    const respuesta = await fetch(webhookUrl, {
      method: 'POST',
      headers: cabeceras,
      body: JSON.stringify({
        tipo,
        ...campos,
        ip,
        fecha: new Date().toISOString(),
        versionContrato: VERSION_CONTRATO,
      }),
      signal: AbortSignal.timeout(10_000),
    }).catch((err: unknown) => {
      console.error('[api/lead] Error de red al reenviar a n8n:', err);
      return null;
    });

    if (!respuesta || !respuesta.ok) {
      console.error('[api/lead] n8n no aceptó el contacto. Estado:', respuesta?.status ?? 'sin respuesta');
      return NextResponse.json({ error: ERROR_CONTACTO_DIRECTO }, { status: 502 });
    }

    if (tipo === 'presupuesto') {
      const cuerpo: unknown = await respuesta.json().catch(() => null);
      return NextResponse.json({ success: true, ...leerRespuestaN8n(cuerpo) });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[api/lead] Error interno:', error);
    return NextResponse.json({ error: ERROR_CONTACTO_DIRECTO }, { status: 500 });
  }
}
