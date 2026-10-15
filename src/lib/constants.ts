// ============================================================
// Construcciones Anaid — Constantes globales del portal
// ============================================================

export const SITE_NAME = 'Construcciones Anaid';
export const SITE_NAME_FULL = 'Construcciones Anaid — Reformas & Inversión Inmobiliaria';

export const SITE_URL = 'https://www.construccionesanaid.com';

// Medición de visitas (Google Tag Manager). Mientras el ID sea el de relleno no se carga nada,
// no se muestra el aviso de cookies (no hay nada que aceptar) y /cookies lo dice. Al poner el ID
// real, el aviso aparece solo; si se añaden etiquetas en GTM además de GA4, actualizar /cookies.
export const GTM_ID: string = 'GTM-XXXXXXX';
export const GTM_CONFIGURADO = GTM_ID !== '' && GTM_ID !== 'GTM-XXXXXXX';

// Contacto directo
export const PHONE = '+34640962564';
export const PHONE_DISPLAY = '640 962 564';
export const WHATSAPP_NUMBER = '34640962564';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20pedir%20presupuesto%20para%20una%20reforma%20en%20la%20Comunidad%20de%20Madrid.`;
// Correo público: hola@ (Luis, 15-10-2026; sustituye a info@ de la decisión 13)
export const EMAIL = 'hola@construccionesanaid.com';
export const EMAIL_ADMIN = 'admin@construccionesanaid.com';

// Ubicación y cobertura
// Domicilio: SOLO para aviso legal y privacidad (obligación legal). Nunca en otras páginas ni en schema.
export const ADDRESS = 'C/ Isaac Peral, 46, Valdeavero (Madrid)';
export const COVERAGE_AREA = 'Toda la Comunidad de Madrid';

// Horario
export const HORARIO = 'L-V 8:30—19:30';
export const HORARIO_DETAIL = {
  atencion: 'Lunes a Viernes: 8:30-19:30',
};

// Promesa de la web provisional (release/web-basica): respuesta de una persona por correo,
// teléfono o WhatsApp. Sin presupuesto automático hasta la versión completa.
export const RESPUESTA_PLAZO = 'Te respondemos en menos de 48 horas laborables';

// Redes sociales oficiales (YouTube + LinkedIn)
export const SOCIAL = {
  linkedinPersonal: 'https://www.linkedin.com/in/luis-manuel-vazquez-troncoso/',
  // Página de empresa creada por Luis el 15-10-2026
  linkedinEmpresa: 'https://www.linkedin.com/company/construcciones-anaid/',
  youtube: 'https://www.youtube.com/@ConstruccionesAnaid',
  facebook: 'https://www.facebook.com/construccionesanaid',
} as const;

// Firma de tecnología y desarrollo
export const POWERED_BY = {
  name: 'PyMExpert',
  url: 'https://www.pymexpert.com',
  label: 'Web construida por PyMExpert',
} as const;

// Navegación principal
// Rutas absolutas: el menú debe funcionar desde cualquier página, no solo en portada.
export const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Obras', href: '/#galeria' },
  { label: 'Cómo trabajamos', href: '/como-funciona' },
  { label: 'Zonas', href: '/zonas' },
  { label: 'Preguntas frecuentes', href: '/#preguntas-frecuentes' },
  { label: 'Contacto', href: '/contacto' },
] as const;

// Formulario de consulta de la portada
export const PRESUPUESTO_HREF = '/#contacto';

// Páginas de servicio, para el pie y el enlazado interno
export const SERVICE_PAGES = [
  { label: 'Reforma integral', href: '/servicios/reforma-integral-madrid', icon: 'Home', description: 'Vivienda o local completo, llave en mano.' },
  { label: 'Reforma de cocina', href: '/servicios/reforma-cocina-madrid', icon: 'ChefHat', description: 'Distribución, mobiliario e instalaciones.' },
  { label: 'Reforma de baño', href: '/servicios/reforma-bano-madrid', icon: 'Bath', description: 'Cambio de bañera por ducha, alicatado y sanitarios.' },
  { label: 'Arquitecto para reformas', href: '/servicios/arquitecto-reformas-madrid', icon: 'Ruler', description: 'Proyecto técnico y dirección de obra.' },
  { label: 'Electricista', href: '/servicios/electricista-madrid', icon: 'Zap', description: 'Instalaciones, boletines y averías.' },
  { label: 'Fontanero', href: '/servicios/fontanero-madrid', icon: 'Droplets', description: 'Instalaciones, fugas y saneamiento.' },
  { label: 'Climatización', href: '/servicios/climatizacion-madrid', icon: 'Thermometer', description: 'Aire acondicionado, aerotermia y calefacción.' },
  { label: 'Pequeñas obras', href: '/servicios/pequenas-obras-madrid', icon: 'Wrench', description: 'Arreglos y trabajos puntuales.' },
] as const;

// Servicios especializados (tarjetas de portada). Particulares primero: público principal.
// Construcciones Anaid no ejecuta ni firma la obra: la firma el profesional asignado.
export const SERVICES = [
  {
    title: 'Reforma integral de vivienda',
    slug: 'reforma-integral-vivienda',
    badge: 'Todo coordinado',
    description: 'Toda tu casa de una vez. Te asignamos arquitecto y oficios de nuestra red: albañilería, fontanería, electricidad, climatización y pintura. Tú hablas solo con nosotros.',
    icon: 'Home',
    features: ['Fotos del avance por WhatsApp', 'Plazo y precio en contrato', 'Un solo interlocutor'],
  },
  {
    title: 'Reforma de cocina y baño',
    slug: 'reforma-cocina-bano',
    badge: 'Lo que más se usa',
    description: 'Las dos estancias que más usas cada día. Distribución, instalaciones, alicatado y mobiliario, con un profesional de cada oficio.',
    icon: 'Sparkles',
    features: ['Un profesional para cada oficio', 'Fotos del avance por WhatsApp', 'Trato directo'],
  },
  {
    title: 'Reformas para inversores',
    slug: 'reformas-inversores-madrid',
    badge: 'Para vender o alquilar',
    description: 'Pisos para vender o alquilar. Te ayudamos a conocer el alcance de la obra antes de decidir, y el plazo queda fijado en el contrato.',
    icon: 'TrendingUp',
    features: ['Plazo y precio en contrato', 'Fotos del avance por WhatsApp', 'Un solo interlocutor'],
  },
  {
    title: 'Para inmobiliarias',
    slug: 'reformas-inmobiliarias-madrid',
    badge: 'Colaboración',
    description: 'Tu comprador duda por la obra. Le ayudamos a conocer qué reforma necesita la vivienda para que decida con más información.',
    icon: 'Building2',
    features: ['Trato directo', 'Respuesta en menos de 48 horas laborables', 'Un solo interlocutor'],
  },
] as const;

// Preguntas frecuentes: también van al JSON-LD (FAQPage), cada respuesta debe leerse sola.
export const FAQS = [
  {
    question: '¿Quién firma el contrato de obra?',
    answer:
      'Lo firmas directamente con el profesional que hace tu obra, elegido de nuestra red para tu caso. Él hace el trabajo y se compromete por escrito al plazo y al precio, con penalización si no cumple el plazo. Construcciones Anaid prepara el presupuesto, te asigna a ese profesional, coordina la obra y te acompaña hasta el final: tu interlocutor siempre somos nosotros. Si un profesional incumple de forma reiterada nuestros compromisos con los clientes, deja la red.',
  },
  {
    question: '¿Cuándo me respondéis?',
    answer:
      'En menos de 48 horas laborables, de lunes a viernes. Escríbenos por el formulario, por WhatsApp o llámanos, cuéntanos qué quieres reformar y en qué municipio, y una persona te contesta para ver tu caso. Si hace falta, organizamos una visita a la obra.',
  },
  {
    question: '¿Cómo se prepara el presupuesto?',
    answer:
      'Con lo que nos cuentas y, si hace falta, con una visita a la obra para ver el estado real y resolver tus dudas. El precio queda cerrado en el contrato que firmas con el profesional asignado.',
  },
  {
    question: '¿Cuánto dura una obra?',
    answer:
      'Depende del tamaño y de la dificultad. El plazo queda fijado en el contrato que firmas con el profesional asignado, antes de empezar. Por experiencia, la mayoría de obras no pasan de 60 días.',
  },
  {
    question: '¿Quién se encarga de las licencias y permisos?',
    answer:
      'Las licencias y los permisos corren por cuenta del cliente. Si prefieres que los gestionemos nosotros, lo valoramos aparte, con su coste.',
  },
  {
    question: '¿Qué experiencia tenéis?',
    answer:
      'Más de 20 años en el sector de la reforma. Con ese criterio elegimos a los arquitectos y oficios de nuestra red y fijamos con ellos los compromisos con cada cliente. Quien los incumple de forma reiterada deja de trabajar con nosotros.',
  },
  {
    question: '¿Cómo sé cómo va mi obra si no puedo ir?',
    answer:
      'Por WhatsApp. Casi cada día te mandamos fotos del avance. No tienes que pasarte por la obra ni llamar a nadie para saber cómo va.',
  },
  {
    question: '¿En qué zonas trabajáis?',
    answer:
      'En toda la Comunidad de Madrid, en la capital y en cualquier municipio. Dinos el tuyo en el mensaje y te asignamos un profesional de nuestra red.',
  },
] as const;

export const INTERMEDIATION_DISCLAIMER =
  'Construcciones Anaid coordina proyectos integrales de reforma y construcción a través de una red homologada de profesionales, técnicos y arquitectos colegiados.';

export const LEGAL_DRAFT = false;
// Titular de la web: persona física; «Construcciones Anaid» es su nombre comercial.
export const LEGAL = {
  titular: 'Luis Manuel Vázquez',
  nif: '08984194A',
  domicilio: 'C/ Isaac Peral, 46, Valdeavero, Madrid',
} as const;
