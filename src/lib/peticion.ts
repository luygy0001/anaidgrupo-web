// Lectura del cuerpo JSON de una petición con un tope real de bytes (el mismo arreglo que en
// pymexpert.com).
//
// `req.json()` carga el cuerpo entero en memoria sin límite, y la cabecera `content-length` la
// escribe el cliente: en una petición `chunked` ni existe. Aquí se lee el flujo contando los bytes
// de verdad y se corta en cuanto se pasa del límite, con o sin cabecera.

export type LecturaJson =
  | { readonly ok: true; readonly valor: unknown }
  | { readonly ok: false; readonly estado: 400 | 413 };

const MAL_FORMADA = { ok: false, estado: 400 } as const;
const DEMASIADO_GRANDE = { ok: false, estado: 413 } as const;

export async function leerJsonConLimite(req: Request, maxBytes: number): Promise<LecturaJson> {
  // Si la cabecera viene, sirve para rechazar pronto; si no es un número entero, la petición
  // está mal formada. Si no viene, se mide leyendo.
  const declarada = req.headers.get('content-length');
  if (declarada !== null) {
    if (!/^\d+$/.test(declarada)) return MAL_FORMADA;
    if (Number(declarada) > maxBytes) return DEMASIADO_GRANDE;
  }

  if (!req.body) return MAL_FORMADA;

  const lector = req.body.getReader();
  const trozos: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await lector.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        // Se deja de leer en el acto: lo que falta no llega a memoria.
        await lector.cancel().catch(() => undefined);
        return DEMASIADO_GRANDE;
      }
      trozos.push(value);
    }
  } catch {
    return MAL_FORMADA;
  }

  const bytes = new Uint8Array(total);
  let posicion = 0;
  for (const trozo of trozos) {
    bytes.set(trozo, posicion);
    posicion += trozo.byteLength;
  }

  try {
    return { ok: true, valor: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return MAL_FORMADA;
  }
}
