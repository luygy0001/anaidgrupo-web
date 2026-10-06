import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// Recepción única de formularios públicos
// ------------------------------------------------------------
// Todos los formularios de la web (presupuesto de portada, contacto,
// solicitud de proyecto y alta de profesionales) envían aquí. La ruta
// valida, sanea y reenvía el contacto al webhook de n8n configurado en
// N8N_LEAD_WEBHOOK_URL. Si el webhook no existe o falla, responde con
// error para que el usuario lo sepa y use teléfono o WhatsApp: nunca se
// confirma como recibido un contacto que no ha llegado a ningún sitio.
// ============================================================

type Tipo = 'presupuesto' | 'contacto' | 'solicitud' | 'profesional';

// Campos admitidos por tipo de formulario. Cualquier otro se descarta.
const CAMPOS: Record<Tipo, readonly string[]> = {
  presupuesto: ['perfil', 'nombre', 'telefono', 'email', 'zona', 'descripcion'],
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

function sanearValor(valor: unknown): string | string[] | boolean | null {
  if (typeof valor === 'string') return sanitize(valor);
  if (typeof valor === 'boolean') return valor;
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

    // Compatibilidad: el formulario de portada no enviaba tipo
    const tipo: Tipo = esTipo(datos.tipo) ? datos.tipo : 'presupuesto';

    // 4. Campos permitidos y saneados
    const campos: Record<string, string | string[] | boolean> = {};
    for (const campo of CAMPOS[tipo]) {
      const valor = sanearValor(datos[campo]);
      if (valor !== null && valor !== '') campos[campo] = valor;
    }

    // 5. Validación: hace falta un medio de contacto válido
    const telefono = typeof campos.telefono === 'string' ? campos.telefono.replace(/\s+/g, '') : '';
    const email = typeof campos.email === 'string' ? campos.email : '';

    if (telefono) {
      if (!/^[+0-9]{9,15}$/.test(telefono)) {
        return NextResponse.json({ error: 'El formato del teléfono no es válido' }, { status: 400 });
      }
      campos.telefono = telefono;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'El formato del email no es válido' }, { status: 400 });
    }
    if (tipo === 'contacto' ? !email : !telefono) {
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

    const respuesta = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, ...campos, ip, fecha: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    }).catch((err: unknown) => {
      console.error('[api/lead] Error de red al reenviar a n8n:', err);
      return null;
    });

    if (!respuesta || !respuesta.ok) {
      console.error('[api/lead] n8n no aceptó el contacto. Estado:', respuesta?.status ?? 'sin respuesta');
      return NextResponse.json({ error: ERROR_CONTACTO_DIRECTO }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[api/lead] Error interno:', error);
    return NextResponse.json({ error: ERROR_CONTACTO_DIRECTO }, { status: 500 });
  }
}
