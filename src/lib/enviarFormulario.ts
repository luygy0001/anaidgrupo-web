// Envío de formularios públicos a /api/lead.
// Lanza un Error con el mensaje para el usuario si el contacto no se registra.

export type TipoFormulario = 'presupuesto' | 'contacto' | 'solicitud' | 'profesional';

type ValorCampo = string | string[] | boolean | undefined;

const ERROR_RED =
  'Error de conexión. Puedes llamarnos o escribirnos por WhatsApp directamente.';

export async function enviarFormulario(
  tipo: TipoFormulario,
  campos: Record<string, ValorCampo>
): Promise<void> {
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

  const data: { success?: boolean; error?: string } = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(
      data.error || 'No hemos podido registrar tu solicitud. Llámanos o escríbenos por WhatsApp.'
    );
  }
}
