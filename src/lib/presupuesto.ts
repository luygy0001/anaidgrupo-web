// ============================================================
// Reglas del presupuesto: compartidas por el formulario (cliente) y /api/lead (servidor),
// para que la validación nunca se contradiga. Contrato con n8n: docs/n8n-contrato-datos.md.
// Decisiones de Luis: docs/DECISIONES.md (puntos 5, 6, 15, 16, 29, 40-43).
// ============================================================

export const VERSION_CONTRATO = '2026-10-06';

export const PERFILES = ['particular', 'inversor', 'inmobiliaria'] as const;
export type Perfil = (typeof PERFILES)[number];

export const NOMBRE_PERFIL: Record<Perfil, string> = {
  particular: 'Particular',
  inversor: 'Inversor',
  inmobiliaria: 'Inmobiliaria',
};

export const CALIDADES = ['media-baja', 'media', 'alta'] as const;
export type Calidad = (typeof CALIDADES)[number];

export const NOMBRE_CALIDAD: Record<Calidad, string> = {
  'media-baja': 'Media-baja',
  media: 'Media',
  alta: 'Alta',
};

// Calidades que puede elegir cada perfil (decisión de Luis, 06-10-2026)
export const CALIDADES_POR_PERFIL: Record<Perfil, readonly Calidad[]> = {
  particular: ['media-baja', 'media', 'alta'],
  inversor: ['media-baja', 'media'],
  inmobiliaria: ['media-baja'],
};

export const TIPOS_OBRA = [
  { valor: 'reforma-integral', etiqueta: 'Reforma integral' },
  { valor: 'cocina', etiqueta: 'Cocina' },
  { valor: 'bano', etiqueta: 'Baño' },
  { valor: 'cocina-y-bano', etiqueta: 'Cocina y baño' },
  { valor: 'otra', etiqueta: 'Otra obra' },
] as const;
export type TipoObra = (typeof TIPOS_OBRA)[number]['valor'];

export const METROS_MIN = 1;
export const METROS_MAX = 5000;

// Presupuestos adicionales: el primero es gratis (inversores e inmobiliarias: uno por semana)
export const IMPORTE_PRESUPUESTO_ADICIONAL = 150;

export const ESTADOS_PRESUPUESTO = ['aceptado', 'pago_requerido'] as const;
export type EstadoPresupuesto = (typeof ESTADOS_PRESUPUESTO)[number];

export function esPerfil(valor: unknown): valor is Perfil {
  return typeof valor === 'string' && (PERFILES as readonly string[]).includes(valor);
}

export function esTipoObra(valor: unknown): valor is TipoObra {
  return typeof valor === 'string' && TIPOS_OBRA.some((t) => t.valor === valor);
}

export function calidadPermitida(perfil: Perfil, valor: unknown): valor is Calidad {
  return typeof valor === 'string' && (CALIDADES_POR_PERFIL[perfil] as readonly string[]).includes(valor);
}

// Los metros son obligatorios salvo en «Otra obra», donde la descripción es la que manda
export function metrosObligatorios(tipo: TipoObra): boolean {
  return tipo !== 'otra';
}

export function textoCondicionPago(perfil: Perfil): string {
  return perfil === 'particular'
    ? `Entiendo que el primer presupuesto es gratis y que los siguientes cuestan ${IMPORTE_PRESUPUESTO_ADICIONAL} €.`
    : `Entiendo que tengo un presupuesto gratis cada semana y que los siguientes de esa semana cuestan ${IMPORTE_PRESUPUESTO_ADICIONAL} €.`;
}

export function telefonoValido(valor: string): boolean {
  return /^\+?[0-9]{9,15}$/.test(valor.replace(/[\s\-().]/g, ''));
}

export function emailValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}
