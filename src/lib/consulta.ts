// Formulario de consulta de la web provisional (rama release/web-basica).
// Tipos de reforma y validaciones compartidas por el formulario (navegador) y /api/contacto
// (servidor): las mismas reglas en los dos lados.

export const TIPOS_REFORMA = [
  { valor: 'bano', etiqueta: 'Baño' },
  { valor: 'cocina', etiqueta: 'Cocina' },
  { valor: 'reforma-integral', etiqueta: 'Reforma integral' },
  { valor: 'otro', etiqueta: 'Otro' },
] as const;

export type TipoReforma = (typeof TIPOS_REFORMA)[number]['valor'];

export function esTipoReforma(valor: unknown): valor is TipoReforma {
  return TIPOS_REFORMA.some((t) => t.valor === valor);
}

export function etiquetaTipoReforma(valor: TipoReforma): string {
  return TIPOS_REFORMA.find((t) => t.valor === valor)?.etiqueta ?? valor;
}

// Longitudes máximas de cada campo (el servidor recorta lo que pase de aquí)
export const LIMITES = {
  nombre: 100,
  telefono: 30,
  email: 200,
  mensaje: 2000,
} as const;

export function telefonoValido(valor: string): boolean {
  return /^\+?[0-9]{9,15}$/.test(valor.replace(/[\s\-().]/g, ''));
}

export function emailValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}
