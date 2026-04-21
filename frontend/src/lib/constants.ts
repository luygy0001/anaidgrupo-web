// ============================================================
// Anaid Grupo Construcción — Constantes globales
// ============================================================

export const SITE_NAME = 'Anaid Grupo';
export const SITE_NAME_FULL = 'Anaid Grupo Construcción';

export const SITE_URL = 'https://www.anaidgrupo.com';
export const APP_URL = 'https://app.anaidgrupo.com';

// Tracking — sustituir por IDs reales antes de pasar a producción.
// Mientras sea placeholder, los componentes no cargan el script correspondiente.
export const GTM_ID = 'GTM-XXXXXXX';
export const COOKIEYES_ID = 'CLI-XXXXXXXX';

// Contacto
export const PHONE = '+34640962564';
export const PHONE_DISPLAY = '640 962 564';
export const WHATSAPP_NUMBER = '34640962564';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20mi%20proyecto`;
export const EMAIL = 'redes@anaidgrupo.com';
export const EMAIL_ADMIN = 'admin@anaidgrupo.com';

// Dirección
export const ADDRESS = 'C/ Isaac Peral, 46, Valdeavero, Madrid';
export const COVERAGE_AREA = 'Comunidad de Madrid';

// Horario
export const HORARIO = 'L-V 9:00–14:00 y 16:00–19:00';
export const HORARIO_DETAIL = {
  atencion: 'Lunes a Viernes: 9:00–14:00 y 16:00–19:00',
  chatbot: 'Chatbot disponible 24/7',
};

// Redes sociales
export const SOCIAL = {
  facebook: 'https://www.facebook.com/anaid.grupo',
} as const;

// Navegación principal
export const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Cómo funciona', href: '/como-funciona' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Zonas de cobertura', href: '/zonas' },
  { label: 'Guías y precios', href: '/guias-precios' },
  { label: 'Solicitar proyecto', href: '/solicitar-proyecto' },
  { label: 'Únete a la red', href: '/unete-red' },
  { label: 'Contacto', href: '/contacto' },
] as const;

export const NAV_ITEMS_EN = [
  { label: 'Home', href: '/en' },
  { label: 'How it works', href: '/en/how-it-works' },
  { label: 'Services', href: '/en/services' },
  { label: 'Request project', href: '/en/request-project' },
  { label: 'Join the network', href: '/en/join-network' },
  { label: 'Contact', href: '/en/contact' },
] as const;

// Servicios
export const SERVICES = [
  {
    title: 'Reforma integral',
    slug: 'reforma-integral-madrid',
    description: 'Renovación completa de viviendas y locales en Madrid.',
    icon: 'Home',
  },
  {
    title: 'Reforma de baño',
    slug: 'reforma-bano-madrid',
    description: 'Modernización y reforma completa de baños.',
    icon: 'Bath',
  },
  {
    title: 'Reforma de cocina',
    slug: 'reforma-cocina-madrid',
    description: 'Diseño y reforma de cocinas funcionales y modernas.',
    icon: 'ChefHat',
  },
  {
    title: 'Electricista',
    slug: 'electricista-madrid',
    description: 'Instalaciones eléctricas, averías y certificaciones.',
    icon: 'Zap',
  },
  {
    title: 'Fontanero',
    slug: 'fontanero-madrid',
    description: 'Reparaciones, instalaciones y mantenimiento de fontanería.',
    icon: 'Droplets',
  },
  {
    title: 'Climatización',
    slug: 'climatizacion-madrid',
    description: 'Instalación y mantenimiento de aire acondicionado y calefacción.',
    icon: 'Thermometer',
  },
  {
    title: 'Arquitecto / técnico',
    slug: 'arquitecto-reformas-madrid',
    description: 'Proyectos técnicos, licencias y dirección de obra.',
    icon: 'Ruler',
  },
  {
    title: 'Pequeñas obras',
    slug: 'pequenas-obras-madrid',
    description: 'Reparaciones menores, montajes y trabajos puntuales.',
    icon: 'Wrench',
  },
] as const;

// FAQs generales
export const FAQS = [
  {
    question: '¿Anaid Grupo realiza directamente la obra?',
    answer:
      'No. Anaid Grupo actúa como intermediador: captamos, analizamos y asignamos cada solicitud al profesional colaborador más adecuado. La ejecución, facturación y garantía corresponden al profesional asignado.',
  },
  {
    question: '¿Quién me enviará el presupuesto final?',
    answer:
      'El profesional asignado es quien visitará tu proyecto, lo validará técnicamente y te entregará el presupuesto definitivo.',
  },
  {
    question: '¿El precio orientativo es definitivo?',
    answer:
      'No. Los rangos orientativos que ofrecemos son una referencia inicial. El precio definitivo lo determina el profesional tras valorar el proyecto en persona.',
  },
  {
    question: '¿Qué tipo de reformas y servicios podéis gestionar?',
    answer:
      'Gestionamos solicitudes de reforma integral, reforma de baño y cocina, electricidad, fontanería, climatización, arquitectura técnica y pequeñas obras en la Comunidad de Madrid.',
  },
  {
    question: '¿Cómo seleccionáis al profesional adecuado?',
    answer:
      'Analizamos cada solicitud según tipo de trabajo, especialidad requerida, zona, urgencia y disponibilidad. Después asignamos al colaborador que mejor encaje con tu proyecto.',
  },
  {
    question: '¿Puedo solicitar ayuda aunque no sepa qué profesional necesito?',
    answer:
      'Por supuesto. Nuestro equipo analiza tu necesidad y determina qué tipo de profesional es el más adecuado para tu caso.',
  },
  {
    question: '¿Trabajáis en toda la Comunidad de Madrid?',
    answer:
      'Sí, contamos con una red de colaboradores que cubre la Comunidad de Madrid. La disponibilidad puede variar según la zona y el tipo de servicio.',
  },
  {
    question: '¿Cuánto tardáis en responder?',
    answer:
      'Nuestro objetivo es contactarte en menos de 24 horas laborables tras recibir tu solicitud.',
  },
  {
    question: '¿Puedo enviar fotos o información previa del proyecto?',
    answer:
      'Sí, y lo recomendamos. Puedes adjuntar fotos tanto en el formulario como a través del chat guiado. Esto ayuda a analizar mejor tu necesidad.',
  },
  {
    question: '¿También atendéis trabajos urgentes?',
    answer:
      'Sí. Puedes indicar la urgencia al enviar tu solicitud y priorizaremos la asignación según disponibilidad de profesionales.',
  },
] as const;

// Disclaimer de intermediación
export const INTERMEDIATION_DISCLAIMER =
  'Anaid Grupo actúa como intermediador en la captación, análisis y asignación de solicitudes. La contratación final, la visita, la validación técnica, el presupuesto definitivo, la ejecución y las garantías corresponden al profesional asignado.';

// Datos legales
// TODO(legal): completar cif y datosMercantiles con datos reales antes de pasar a producción.
// Mientras LEGAL_DRAFT sea true, las páginas legales mantienen noindex y muestran un aviso de borrador.
export const LEGAL_DRAFT = true;
export const LEGAL = {
  razonSocial: 'Anaid Grupo Construcción',
  cif: 'Pendiente de actualización',
  domicilio: 'C/ Isaac Peral, 46, Valdeavero, Madrid',
  datosMercantiles: 'Pendiente de actualización',
} as const;
