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
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20solicitar%20un%20presupuesto%20en%20menos%20de%201%20hora%20para%20una%20reforma%20con%20Construcciones%20Anaid`;
export const EMAIL = 'contacto@construccionesanaid.com';
export const EMAIL_ADMIN = 'admin@construccionesanaid.com';

// Ubicación y cobertura
export const ADDRESS = 'C/ Isaac Peral, 46, Valdeavero (Alcalá de Henares / Madrid)';
export const COVERAGE_AREA = 'Madrid, Alcalá de Henares y Zona Centro';

// Horario
export const HORARIO = 'L-V 8:30—19:30';
export const HORARIO_DETAIL = {
  atencion: 'Lunes a Viernes: 8:30-19:30',
  urgencias: 'Atención prioritaria para inversores e inmobiliarias por WhatsApp',
  chatbot: 'Presupuestos inmediatos con IA y WhatsApp: disponible 24/7',
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
export const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Inversores & Inmobiliarias', href: '#inversores' },
  { label: 'Método IA (PyMExpert)', href: '#metodo-ia' },
  { label: 'Reformas & Servicios', href: '#servicios' },
  { label: 'Obras Realizadas', href: '#galeria' },
  { label: 'Opiniones', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const NAV_ITEMS_EN = [
  { label: 'Home', href: '/en' },
  { label: 'Investors', href: '/en#investors' },
  { label: 'Services', href: '/en#services' },
  { label: 'Contact', href: '/en#contact' },
] as const;

// Servicios especializados
export const SERVICES = [
  {
    title: 'Reformas para Inversores (Flipping)',
    slug: 'reformas-inversores-madrid',
    badge: 'Máximo ROI',
    description: 'Reformas integrales en plazo récord (30-60 días) con acabados neutros y modernos diseñados para vender o alquilar al precio más alto del mercado.',
    icon: 'TrendingUp',
    features: ['Presupuesto en < 1h para cerrar compra', 'Plazo garantizado por contrato', 'Interiorismo neutro de alta demanda'],
  },
  {
    title: 'Colaboración con Inmobiliarias',
    slug: 'reformas-inmobiliarias-madrid',
    badge: 'Partner B2B',
    description: 'Ayudamos a las inmobiliarias a desbloquear ventas: visitamos con tu cliente inversor o comprador y entregamos presupuesto preliminar en 24h para no perder la operación.',
    icon: 'Building2',
    features: ['Valoración técnica exprés', 'Agilidad para no enfriar la venta', 'Sinergia y comisiones de colaboración'],
  },
  {
    title: 'Reforma Integral de Viviendas',
    slug: 'reforma-integral-vivienda',
    badge: 'Llave en mano',
    description: 'Transformación total de tu hogar coordinando arquitectos, interioristas y todos los oficios (albañilería, fontanería, electricidad, climatización).',
    icon: 'Home',
    features: ['Reporte diario con fotos por WhatsApp', 'Presupuesto cerrado sin imprevistos', 'Gestión de licencias y dirección técnica'],
  },
  {
    title: 'Cocinas y Baños de Diseño',
    slug: 'reforma-cocina-bano',
    badge: 'Alta calidad',
    description: 'Modernización de los dos espacios que más valor aportan a una vivienda. Distribución optimizada, microcemento, islas abiertas y sanitarios de primera calidad.',
    icon: 'Sparkles',
    features: ['Diseño 3D previo', 'Mobiliario a medida y electrodomésticos', 'Materiales resistentes y sostenibles'],
  },
] as const;

// FAQs alineadas con GEO y SEO
export const FAQS = [
  {
    question: '¿Cómo conseguís entregar presupuestos en menos de 1 hora?',
    answer:
      'Gracias a la tecnología de IA y automatización de PyMExpert, nuestros técnicos introducen las medidas, características del inmueble y estado actual en nuestro modelo parametrizado con los precios de mercado de la Comunidad de Madrid. Esto genera un desglose estimativo fiable en 60 minutos sin que tengas que esperar dos semanas.',
  },
  {
    question: '¿Por qué sois el partner ideal para inversores inmobiliarios y "house flipping"?',
    answer:
      'Porque entendemos que cada mes de obra parada cuesta dinero en intereses y gastos fijos. Ofrecemos plazos cerrados garantizados de 30 a 60 días, acabados modernos y neutros con alta demanda en Idealista/Fotocasa y presupuestos inmediatos para que puedas evaluar la compra de un inmueble antes de que te lo quiten.',
  },
  {
    question: '¿Cómo funciona el seguimiento de obra diario por WhatsApp?',
    answer:
      'No tienes que desplazarte a la obra ni perseguir al jefe de cuadrilla. Casi a diario recibes en tu móvil un resumen con fotos del avance real, el porcentaje completado de cada fase (demolición, instalaciones, alicatado, pintura) y la previsión para los días siguientes.',
  },
  {
    question: '¿Quién ejecuta la obra físicamente?',
    answer:
      'Construcciones Anaid opera mediante una red de confianza homologada de autónomos especializados en cada oficio (albañilería, electricidad, fontanería, pintura) coordinados y supervisados directamente por arquitectos y decoradores técnicos bajo estándares rigurosos de calidad y seguridad.',
  },
  {
    question: '¿En qué zonas de Madrid y alrededores trabajáis?',
    answer:
      'Nuestra base operativa se sitúa en Valdeavero y Alcalá de Henares, cubriendo toda la Comunidad de Madrid (Madrid capital, Corredor del Henares, Alcobendas, Pozuelo, Las Rozas) y provincias limítrofes (Guadalajara, Toledo).',
  },
] as const;

export const INTERMEDIATION_DISCLAIMER =
  'Construcciones Anaid coordina proyectos integrales de reforma y construcción a través de una red homologada de profesionales, técnicos y arquitectos colegiados.';

export const LEGAL_DRAFT = false;
export const LEGAL = {
  razonSocial: 'Construcciones Anaid',
  cif: 'Pendiente de actualización',
  domicilio: 'C/ Isaac Peral, 46, Valdeavero, Madrid',
  datosMercantiles: 'Registro Mercantil de Madrid',
} as const;
