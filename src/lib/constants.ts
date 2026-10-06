// ============================================================
// Construcciones Anaid — Constantes globales del portal
// ============================================================

export const SITE_NAME = 'Construcciones Anaid';
export const SITE_NAME_FULL = 'Construcciones Anaid — Reformas & Inversión Inmobiliaria';

export const SITE_URL = 'https://www.construccionesanaid.com';

// Tracking
export const GTM_ID = 'GTM-XXXXXXX';
export const COOKIEYES_ID = 'CLI-XXXXXXXX';

// Contacto directo
export const PHONE = '+34640962564';
export const PHONE_DISPLAY = '640 962 564';
export const WHATSAPP_NUMBER = '34640962564';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20pedir%20presupuesto%20para%20una%20reforma%20en%20la%20Comunidad%20de%20Madrid.`;
export const EMAIL = 'info@construccionesanaid.com';
export const EMAIL_ADMIN = 'admin@construccionesanaid.com';

// Ubicación y cobertura
// Domicilio: SOLO para aviso legal y privacidad (obligación legal). Nunca en otras páginas ni en schema.
export const ADDRESS = 'C/ Isaac Peral, 46, Valdeavero (Madrid)';
export const COVERAGE_AREA = 'Toda la Comunidad de Madrid';

// Horario
export const HORARIO = 'L-V 8:30—19:30';
export const HORARIO_DETAIL = {
  atencion: 'Lunes a Viernes: 8:30-19:30',
  urgencias: 'Atención prioritaria para inversores e inmobiliarias por WhatsApp',
  chatbot: 'Presupuesto preparado con inteligencia artificial y revisado por una persona en menos de 24 horas',
};

// Redes sociales oficiales (YouTube + LinkedIn)
export const SOCIAL = {
  linkedinPersonal: 'https://www.linkedin.com/in/luis-manuel-vazquez-troncoso/',
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
  { label: 'Inversores e inmobiliarias', href: '/#inversores' },
  { label: 'Cómo trabajamos', href: '/como-funciona' },
  { label: 'Zonas', href: '/zonas' },
  { label: 'Guías de precios', href: '/guias-precios' },
  { label: 'Contacto', href: '/contacto' },
] as const;

// Formulario principal de presupuesto (portada)
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
    features: ['Fotos del avance por WhatsApp', 'Plazo y precio en contrato', 'Calidad media-baja, media o alta'],
  },
  {
    title: 'Reforma de cocina y baño',
    slug: 'reforma-cocina-bano',
    badge: 'Lo que más se usa',
    description: 'Las dos estancias que más usas cada día. Distribución, instalaciones, alicatado y mobiliario, con un profesional de cada oficio y la calidad que elijas.',
    icon: 'Sparkles',
    features: ['Presupuesto en menos de 24 horas', 'Un profesional para cada oficio', 'Fotos del avance por WhatsApp'],
  },
  {
    title: 'Reformas para inversores',
    slug: 'reformas-inversores-madrid',
    badge: 'Para vender o alquilar',
    description: 'Pisos para vender o alquilar, en calidad media-baja o media. Sabes cuánto cuesta la obra antes de comprar. El plazo, fijado en el contrato.',
    icon: 'TrendingUp',
    features: ['Presupuesto en menos de 24 horas', 'Plazo y precio en contrato', '1 presupuesto gratis cada semana'],
  },
  {
    title: 'Para inmobiliarias',
    slug: 'reformas-inmobiliarias-madrid',
    badge: 'Colaboración',
    description: 'Tu comprador duda por la obra. Le damos un presupuesto en calidad media-baja en menos de 24 horas para que decida con un número delante.',
    icon: 'Building2',
    features: ['Calidad media-baja, cifra realista', 'Rápido, para no enfriar la venta', '1 presupuesto gratis cada semana'],
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
    question: '¿Cómo tengo el presupuesto en menos de 24 horas?',
    answer:
      'Rellenas el formulario, nos cuentas qué quieres reformar y eliges la calidad de los acabados. Un sistema de inteligencia artificial, con tecnología de PyMExpert, prepara el presupuesto con esos datos; una persona lo revisa y te lo enviamos por correo y WhatsApp en menos de 24 horas. Antes de contratar, visitamos la obra para comprobar que todo coincide. No tienes que esperar semanas para tener un primer número.',
  },
  {
    question: '¿El presupuesto que recibo es el definitivo?',
    answer:
      'En la gran mayoría de los casos, sí. Antes de contratar visitamos la obra para comprobar que lo que nos contaste coincide con la realidad, y aprovechas para resolver tus dudas. El precio queda cerrado en el contrato, según el presupuesto firmado.',
  },
  {
    question: '¿Qué calidades de acabado puedo elegir?',
    answer:
      'Hay tres: media-baja, media y alta. Si eres particular, eliges cualquiera de las tres; si eres inversor, media-baja o media; si eres inmobiliaria, el presupuesto se hace en media-baja. Cada calidad incluye un precio máximo por material, por ejemplo para el revestimiento. Si eliges un material más caro, pagas solo la diferencia.',
  },
  {
    question: '¿Cuánto dura una obra?',
    answer:
      'Depende del tamaño y de la dificultad. El plazo queda fijado en el contrato que firmas con el profesional asignado, antes de empezar. Por experiencia, la mayoría de obras no pasan de 60 días.',
  },
  {
    question: '¿Cuánto cuesta pedir presupuesto?',
    answer:
      'El primero es gratis. Los siguientes cuestan 150 €. Si eres inversor o inmobiliaria, tienes uno gratis cada semana. Cada presupuesto lleva trabajo de verdad, y así podemos responder rápido a todos.',
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
      'En toda la Comunidad de Madrid, en la capital y en cualquier municipio. Pon el tuyo en el formulario y te asignamos un profesional de nuestra red.',
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
