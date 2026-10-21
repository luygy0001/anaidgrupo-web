// Cómo trabaja Construcciones Anaid. Lo leen la portada (HowItWorks), /como-funciona y también
// /llms.txt y /llms-full.txt (src/lib/llms.ts).

export const PASOS = [
  {
    number: '01',
    title: 'Cuéntanos tu proyecto',
    description:
      'Escríbenos por el formulario, por WhatsApp o llámanos, y cuéntanos qué necesitas. Si quieres, por WhatsApp puedes mandarnos fotos.',
  },
  {
    number: '02',
    title: 'Analizamos la necesidad',
    description:
      'Una persona estudia cada solicitud para ver el tipo de servicio, la urgencia y la complejidad del proyecto.',
  },
  {
    number: '03',
    title: 'Asignamos el perfil adecuado',
    description:
      'Seleccionamos al colaborador que mejor encaja según especialidad, zona geográfica, disponibilidad y tipo de trabajo.',
  },
  {
    number: '04',
    title: 'El profesional te contacta',
    description:
      'El profesional asignado visita tu proyecto, lo valida técnicamente y te entrega un presupuesto definitivo sin compromiso.',
  },
] as const;

export const QUE_HACE = [
  'Recibe y analiza cada solicitud de cliente',
  'Filtra y clasifica la necesidad según tipo, urgencia y zona',
  'Asigna al profesional colaborador más adecuado',
  'Orienta al cliente en los primeros pasos del proyecto',
  'Facilita la comunicación entre cliente y profesional',
] as const;

export const QUE_NO_HACE = [
  'No ejecuta obras ni servicios técnicos',
  'No factura al cliente final por la ejecución',
  'No ofrece garantía técnica propia sobre la obra',
  'No sustituye la valoración profesional en persona',
  'No fija precios definitivos sin validación del profesional',
] as const;
