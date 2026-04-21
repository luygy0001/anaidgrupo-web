export type Urgencia = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type TipoServicio =
  | 'REFORMA_INTEGRAL'
  | 'REFORMA_BANO'
  | 'REFORMA_COCINA'
  | 'ELECTRICIDAD'
  | 'FONTANERIA'
  | 'CLIMATIZACION'
  | 'ARQUITECTO'
  | 'PEQUENAS_OBRAS'
  | 'NO_SE';

export type FuenteLead = 'FORMULARIO' | 'WHATSAPP' | 'TELEFONO' | 'CHAT';

export type EstadoLead =
  | 'NUEVO'
  | 'ANALIZADO'
  | 'ASIGNADO'
  | 'EN_CURSO'
  | 'CERRADO'
  | 'DESCARTADO';

export interface LeadFormData {
  nombre: string;
  telefono: string;
  email: string;
  codigoPostal: string;
  descripcion: string;
  urgencia: Urgencia;
  tipoServicio: TipoServicio;
  noSabeQueNecesita: boolean;
  aceptaPrivacidad: boolean;
  fotos?: File[];
}

export interface ProfessionalFormData {
  nombre: string;
  empresa?: string;
  email: string;
  telefono: string;
  especialidades: string[];
  zonas: string[];
  experiencia: string;
  descripcion: string;
  aceptaPrivacidad: boolean;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  aceptaPrivacidad: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceInfo {
  title: string;
  slug: string;
  description: string;
  icon: string;
}
