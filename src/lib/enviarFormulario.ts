// Envío de formularios públicos a /api/lead.
// Lanza un Error con el mensaje para el usuario si el contacto no se registra.

import type { EstadoPresupuesto } from '@/lib/presupuesto';

export type TipoFormulario = 'presupuesto' | 'contacto' | 'solicitud' | 'profesional';

type ValorCampo = string | string[] | boolean | number | undefined;

// Respuesta de la ruta. En los presupuestos, n8n indica si se prepara o si requiere pago.
export interface RespuestaFormulario {
  estado?: EstadoPresupuesto;
  importe?: number;
}

const ERROR_RED =
  'Error de conexión. Puedes llamarnos o escribirnos por WhatsApp directamente.';

export async function enviarFormulario(
  tipo: TipoFormulario,
  campos: Record<string, ValorCampo>
): Promise<RespuestaFormulario> {
  let res: Response;
  try {
    res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, ...campos }),
    });
  } catch {
    throw new Error(ERROR_RED);
  }

  const data: { success?: boolean; error?: string; estado?: EstadoPresupuesto; importe?: number } = await res
    .json()
    .catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(
      data.error || 'No hemos podido registrar tu solicitud. Llámanos o escríbenos por WhatsApp.'
    );
  }
  return { estado: data.estado, importe: data.importe };
}
