import { NextRequest, NextResponse } from 'next/server';

// Rate Limiting en memoria para mitigar spam y ataques de saturación
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 15 * 60 * 1000 });
    return false;
  }
  if (now > entry.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 15 * 60 * 1000 });
    return false;
  }
  if (entry.count >= 5) {
    return true;
  }
  entry.count += 1;
  return false;
}

// Sanitización de texto para prevenir inyecciones
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '') // Eliminar tags HTML
    .trim()
    .slice(0, 500); // Límite de longitud
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin') || req.headers.get('referer') || '';
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';

    // 1. Verificación de Origen Legítimo (Prevención de CSRF y llamadas desde webs externas)
    const allowedHosts = ['construccionesanaid.com', 'www.construccionesanaid.com', 'localhost'];
    const isAllowed = allowedHosts.some((host) => origin.includes(host));
    if (origin && !isAllowed) {
      return NextResponse.json({ error: 'Origen no autorizado' }, { status: 403 });
    }

    // 2. Control de Frecuencia (Rate Limiting)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Has alcanzado el límite de solicitudes. Por favor, contáctanos directamente por WhatsApp o teléfono.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 3. Trampa Anti-Bot (Honeypot)
    // Si un bot rellena este campo invisible, descartamos la petición silenciosamente sin dar pistas
    if (body.company_fax || body.website_url) {
      return NextResponse.json({ success: true, message: 'Solicitud tramitada' });
    }

    const { profile, nombre, telefono, email, zona, descripcion } = body;

    // 4. Validación rigurosa de campos obligatorios
    if (!telefono || typeof telefono !== 'string') {
      return NextResponse.json({ error: 'El teléfono es obligatorio' }, { status: 400 });
    }

    // Formato de teléfono (mínimo 9 dígitos)
    const cleanPhone = telefono.replace(/\s+/g, '');
    const phoneRegex = /^[+0-9]{9,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json({ error: 'El formato del teléfono no es válido' }, { status: 400 });
    }

    // Validación de email opcional
    if (email && typeof email === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json({ error: 'El formato de email no es válido' }, { status: 400 });
      }
    }

    // 5. Datos saneados y validados
    const leadData = {
      profile: ['inversor', 'inmobiliaria', 'particular'].includes(profile) ? profile : 'particular',
      nombre: sanitize(nombre || 'Sin nombre'),
      telefono: cleanPhone,
      email: email ? sanitize(email) : null,
      zona: sanitize(zona || 'Madrid'),
      descripcion: sanitize(descripcion || 'Sin detalles adicionales'),
      ip,
      fecha: new Date().toISOString(),
    };

    // 6. Si existe un webhook seguro de n8n configurado en servidor, reenviamos de forma privada
    const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
      } catch (err) {
        console.error('Error forwarding lead to n8n:', err);
        // Continuamos para no bloquear al usuario legítimo
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Tu solicitud ha sido recibida y protegida con éxito.',
    });
  } catch (error) {
    console.error('API lead error:', error);
    return NextResponse.json({ error: 'Error interno de procesamiento' }, { status: 500 });
  }
}
