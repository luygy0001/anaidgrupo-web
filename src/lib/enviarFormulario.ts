// Envío del formulario de consulta a /api/contacto.
// Lanza un Error con el mensaje para la persona si la consulta no ha llegado: nunca se da por
// enviada sin la confirmación del servidor (que solo la da si el correo ha salido).

import type { TipoReforma } from '@/lib/consulta';

export interface DatosConsulta {
  nombre: string;
  telefono: string;
  email: string;
  tipoReforma: TipoReforma | '';
  mensaje: string;
  aceptaPrivacidad: boolean;
  // Página desde la que se envía, para saber de dónde llegan las consultas
  origen: string;
  // Campo trampa (honeypot): una persona lo deja vacío
  sitioWeb: string;
}

const ERROR_RED =
  'Error de conexión. Puedes llamarnos o escribirnos por WhatsApp directamente.';

export async function enviarConsulta(datos: DatosConsulta): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  } catch {
    throw new Error(ERROR_RED);
  }

  const data: { success?: boolean; error?: string } = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(
      data.error || 'No hemos podido enviar tu consulta. Llámanos o escríbenos por WhatsApp.'
    );
  }
}
