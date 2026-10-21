import type { ServiceLandingProps } from '@/components/sections/ServiceLanding';

// Contenido de las páginas de servicio. Lo leen las páginas y también /llms.txt y /llms-full.txt
// (src/lib/llms.ts): un solo sitio para el texto visible, los datos para Google y los de la IA.

// Fotos reales de la página de piscinas (decisión 92).
const FOTOS = '/images/piscinas';

export type PaginaServicio = {
  titulo: string;
  descripcionMeta: string;
  landing: ServiceLandingProps;
};

export const PAGINAS_SERVICIO: Record<string, PaginaServicio> = {
  'reforma-integral-madrid': {
    titulo: 'Reforma integral en Madrid',
    descripcionMeta: 'Solicita tu reforma integral en Madrid. Construcciones Anaid analiza tu proyecto y te asigna al profesional adecuado. Colaboradores seleccionados.',
    landing: {
      h1: "Reforma integral en Madrid",
      slug: "reforma-integral-madrid",
      breadcrumbName: "Reforma integral",
      description: "Servicio de intermediación para reformas integrales de vivienda y local en la Comunidad de Madrid: coordinación, análisis y asignación al profesional adecuado de nuestra red.",
      intro: "Si necesitas una renovación completa de tu vivienda o local, Construcciones Anaid analiza tu proyecto y te conecta con el profesional adecuado para llevarlo a cabo en la Comunidad de Madrid.",
      trabajos: [
        'Renovación completa de viviendas y locales',
        'Redistribución de espacios y tabiquería',
        'Cambio completo de instalaciones (electricidad, fontanería, climatización)',
        'Acabados: suelos, paredes, techos, carpintería',
        'Coordinación de gremios necesarios',
        'Proyectos con necesidad de licencia de obra',
      ],
      cuando: "Este tipo de reforma suele necesitarse al comprar una vivienda de segunda mano, al renovar un piso antiguo, al cambiar la distribución del hogar o al adaptar un local comercial. También cuando la vivienda necesita una actualización completa de instalaciones.",
      faqs: [
        { question: '¿Cuánto dura una reforma integral?', answer: 'Depende del tamaño. En una vivienda habitual de unos 80 m², con tres dormitorios, un baño, cocina y salón, la reforma integral no suele pasar de 60 días. En viviendas grandes, de 100 a 200 m² o más (chalets, casas y pisos con más estancias y baños, patios o terreno), hablamos de 2 a 4 meses. El profesional asignado te da el plazo tras ver la obra y queda fijado en el contrato.' },
        { question: '¿Necesito licencia de obra para una reforma integral?', answer: 'En muchos casos sí, especialmente si se modifican tabiques, instalaciones o elementos estructurales. El profesional o un arquitecto técnico pueden orientarte sobre los permisos necesarios.' },
        { question: '¿Puedo vivir en casa durante la reforma?', answer: 'Normalmente no es recomendable durante una reforma integral, por seguridad y para no retrasar los trabajos. El profesional te asesorará según tu caso concreto.' },
        { question: '¿El presupuesto incluye materiales?', answer: 'Depende del acuerdo con el profesional. La mayoría de presupuestos incluyen materiales y mano de obra, pero conviene confirmarlo antes de aceptar.' },
      ],
    },
  },
  'reforma-cocina-madrid': {
    titulo: 'Reforma de cocina en Madrid',
    descripcionMeta: 'Reforma tu cocina en Madrid con profesionales seleccionados. Construcciones Anaid analiza tu proyecto y te asigna al colaborador adecuado.',
    landing: {
      h1: "Reforma de cocina en Madrid",
      slug: "reforma-cocina-madrid",
      breadcrumbName: "Reforma de cocina",
      description: "Servicio de intermediación para reformas de cocina en Madrid: análisis del proyecto y asignación al profesional adecuado de nuestra red.",
      intro: "La cocina es el corazón del hogar. Si necesitas renovarla, Construcciones Anaid analiza tu proyecto y te conecta con el profesional adecuado en la Comunidad de Madrid.",
      trabajos: [
        'Diseño y distribución de cocina',
        'Instalación de muebles altos y bajos',
        'Encimeras: silestone, granito, porcelánico',
        'Instalación de electrodomésticos',
        'Fontanería y tomas de agua',
        'Electricidad: puntos de luz, enchufes, extractor',
        'Alicatado, solado y pintura',
        'Integración cocina-salón (cocinas abiertas)',
      ],
      cuando: "Se suele reformar la cocina cuando los muebles y electrodomésticos están obsoletos, cuando se quiere cambiar la distribución para ganar espacio, al renovar la vivienda para vender o alquilar, o al querer abrir la cocina al salón.",
      faqs: [
        { question: '¿Cuánto dura una reforma de cocina?', answer: 'Entre 2 y 4 semanas habitualmente. Depende de si hay cambios en fontanería, electricidad o distribución.' },
        { question: '¿Puedo abrir la cocina al salón?', answer: 'En muchos casos sí, pero es necesario comprobar si el tabique es de carga. El profesional o un arquitecto técnico valorará la viabilidad.' },
        { question: '¿El profesional se encarga también de los electrodomésticos?', answer: 'Depende del profesional. Algunos incluyen el suministro e instalación de electrodomésticos y otros trabajan con los que tú elijas.' },
      ],
    },
  },
  'reforma-bano-madrid': {
    titulo: 'Reforma de baño en Madrid',
    descripcionMeta: 'Reforma de baño en Madrid. Te asignamos un profesional cualificado para renovar tu baño. Te respondemos en menos de 48 horas laborables.',
    landing: {
      h1: "Reforma de baño en Madrid",
      slug: "reforma-bano-madrid",
      breadcrumbName: "Reforma de baño",
      description: "Servicio de intermediación para reformas de baño en Madrid: análisis del proyecto y asignación al profesional adecuado de nuestra red.",
      intro: "Moderniza tu baño con la ayuda de un profesional adecuado. Construcciones Anaid analiza tu proyecto y asigna al colaborador que mejor encaja con tus necesidades en Madrid.",
      trabajos: [
        'Cambio de plato de ducha o bañera',
        'Alicatado y solado completo',
        'Instalación de sanitarios y grifería',
        'Muebles de baño y espejos',
        'Fontanería y desagües',
        'Iluminación y electricidad del baño',
        'Impermeabilización y ventilación',
        'Accesibilidad: plato a nivel, barras, etc.',
      ],
      cuando: "La reforma de baño suele necesitarse cuando el baño es antiguo y necesita una actualización completa, cuando hay problemas de humedad o filtraciones, al querer mejorar la accesibilidad o cuando simplemente se quiere modernizar el espacio.",
      faqs: [
        { question: '¿Cuánto tarda una reforma de baño?', answer: 'Una reforma completa de baño suele durar entre 1 y 3 semanas, según el alcance de los trabajos. El profesional te dará un plazo más preciso tras valorar tu caso.' },
        { question: '¿Puedo cambiar la bañera por un plato de ducha?', answer: 'Sí, es uno de los trabajos más habituales. El profesional valorará la viabilidad técnica y te propondrá las mejores opciones.' },
        { question: '¿Es necesario reformar todo el baño o puedo hacer cambios parciales?', answer: 'Puedes hacer cambios parciales, pero a veces es más rentable y estético hacer una reforma completa. El profesional te asesorará según tu situación.' },
      ],
    },
  },
  'arquitecto-reformas-madrid': {
    titulo: 'Arquitecto para reformas Madrid',
    descripcionMeta: 'Arquitecto para reformas en Madrid: proyecto, licencias y dirección de obra. Te asignamos al profesional adecuado. Respuesta en menos de 48 horas laborables.',
    landing: {
      h1: "Arquitecto / técnico para reformas en Madrid",
      slug: "arquitecto-reformas-madrid",
      breadcrumbName: "Arquitecto / técnico",
      description: "Servicio de intermediación para arquitectura técnica en Madrid: proyectos, licencias, dirección de obra y certificaciones con profesionales de nuestra red.",
      intro: "Proyectos técnicos, licencias de obra, dirección de obra y certificaciones: Construcciones Anaid te conecta con el arquitecto o técnico adecuado para tu reforma en Madrid.",
      trabajos: [
        'Redacción de proyectos técnicos para reformas',
        'Tramitación de licencias de obra',
        'Dirección de obra y coordinación de seguridad',
        'Certificados de eficiencia energética',
        'Inspección Técnica de Edificios (ITE)',
        'Informes periciales y valoraciones',
        'Diseño de interiores con enfoque técnico',
        'Asesoramiento en normativa urbanística',
      ],
      cuando: "Necesitas un arquitecto o técnico cuando la reforma requiere licencia de obra (cambios estructurales, modificación de fachada), cuando se necesita un proyecto técnico oficial, para obtener certificados energéticos, para ITE, o cuando quieres un diseño profesional con planos y distribución optimizada.",
      faqs: [
        { question: '¿Cuándo necesito un arquitecto para mi reforma?', answer: 'Cuando la reforma implique cambios estructurales, modificación de fachadas, cambio de uso del local o cualquier trabajo que requiera licencia de obra mayor. También es recomendable para reformas complejas que necesitan coordinación profesional.' },
        { question: '¿Qué diferencia hay entre arquitecto y arquitecto técnico?', answer: 'El arquitecto diseña y firma proyectos de obra mayor. El arquitecto técnico (aparejador) se encarga de la dirección de ejecución y puede firmar proyectos de obra menor. El profesional adecuado depende del tipo de proyecto.' },
        { question: '¿Cuánto tarda la tramitación de una licencia?', answer: 'Depende del ayuntamiento y el tipo de licencia. Una comunicación previa puede resolverse en días, mientras que una licencia de obra mayor puede tardar semanas o meses. El técnico te informará de los plazos previsibles.' },
      ],
    },
  },
  'electricista-madrid': {
    titulo: 'Electricista en Madrid',
    descripcionMeta: 'Electricista en Madrid: instalaciones, averías, cuadros y boletines. Te asignamos al profesional adecuado. Respuesta en menos de 48 horas laborables.',
    landing: {
      h1: "Electricista en Madrid",
      slug: "electricista-madrid",
      breadcrumbName: "Electricista",
      description: "Servicio de intermediación para trabajos de electricidad en Madrid: instalaciones, averías, boletines y mantenimiento con profesionales de nuestra red.",
      intro: "Desde averías puntuales hasta instalaciones completas, Construcciones Anaid analiza tu necesidad y te asigna un electricista cualificado en la Comunidad de Madrid.",
      trabajos: [
        'Reparación de averías eléctricas',
        'Instalación y cambio de cuadros eléctricos',
        'Boletines eléctricos y certificaciones',
        'Ampliación de puntos de luz y enchufes',
        'Instalación de iluminación LED',
        'Domótica básica y automatizaciones',
        'Instalación de cargadores de vehículo eléctrico',
        'Revisión y actualización de instalaciones antiguas',
      ],
      cuando: "Los servicios de electricista se necesitan ante averías imprevistas, al renovar una instalación antigua que no cumple normativa, al reformar una vivienda, al ampliar la instalación para nuevas necesidades o para obtener certificaciones y boletines obligatorios.",
      faqs: [
        { question: '¿Cuándo necesito un boletín eléctrico?', answer: 'Un boletín eléctrico es obligatorio al dar de alta un suministro, al cambiar la potencia contratada o al modificar la instalación. El electricista te orientará según tu caso.' },
        { question: '¿Pueden actualizar mi instalación eléctrica sin hacer obra?', answer: 'En muchos casos sí, especialmente si solo se trata de cambiar el cuadro o añadir protecciones. Si hay que hacer regatas en las paredes, puede requerir algo más de obra.' },
        { question: '¿Atendéis urgencias eléctricas?', answer: 'Sí, puedes indicar la urgencia al enviar tu solicitud y priorizaremos la asignación de un profesional disponible.' },
      ],
    },
  },
  'fontanero-madrid': {
    titulo: 'Fontanero en Madrid',
    descripcionMeta: 'Fontanero en Madrid: fugas, instalaciones, calentadores y mantenimiento. Te asignamos al profesional adecuado. Respuesta en menos de 48 horas laborables.',
    landing: {
      h1: "Fontanero en Madrid",
      slug: "fontanero-madrid",
      breadcrumbName: "Fontanero",
      description: "Servicio de intermediación para trabajos de fontanería en Madrid: fugas, instalaciones, calentadores y mantenimiento con profesionales de nuestra red.",
      intro: "Fugas, atascos, instalaciones nuevas o cambio de calentador: Construcciones Anaid analiza tu solicitud y te conecta con un fontanero profesional en la Comunidad de Madrid.",
      trabajos: [
        'Reparación de fugas y averías',
        'Desatascos de tuberías y desagües',
        'Instalación de sanitarios y griferías',
        'Cambio de calentador o caldera',
        'Instalación de ósmosis y descalcificadores',
        'Renovación de tuberías antiguas',
        'Instalación de radiadores y sistemas de calefacción',
        'Revisión y mantenimiento preventivo',
      ],
      cuando: "Los servicios de fontanería se necesitan ante urgencias como fugas de agua o atascos, al renovar baño o cocina, al cambiar calentador o caldera, al detectar humedades o pérdidas de presión, o durante una reforma donde hay que mover instalaciones.",
      faqs: [
        { question: '¿Atendéis urgencias de fontanería?', answer: 'Sí. Indica la urgencia en tu solicitud y priorizaremos la asignación de un fontanero disponible lo antes posible.' },
        { question: '¿Puedo cambiar las tuberías de plomo por otras más seguras?', answer: 'Sí, y es recomendable. El fontanero valorará el estado de la instalación y te propondrá las alternativas más adecuadas.' },
        { question: '¿El fontanero también puede instalar calefacción?', answer: 'Muchos fontaneros trabajan también con sistemas de calefacción. Si tu necesidad es más compleja (suelo radiante, aerotermia), puede requerir un especialista en climatización.' },
      ],
    },
  },
  'climatizacion-madrid': {
    titulo: 'Climatización en Madrid',
    descripcionMeta: 'Aire acondicionado, calefacción y aerotermia en la Comunidad de Madrid. Te asignamos al profesional adecuado. Respuesta en menos de 48 horas laborables.',
    landing: {
      h1: "Climatización en Madrid",
      slug: "climatizacion-madrid",
      breadcrumbName: "Climatización",
      description: "Servicio de intermediación para climatización en Madrid: aire acondicionado, calefacción, aerotermia y mantenimiento con profesionales de nuestra red.",
      intro: "Aire acondicionado, calefacción, aerotermia o suelo radiante: Construcciones Anaid analiza tu necesidad y te asigna al profesional de climatización adecuado en Madrid.",
      trabajos: [
        'Instalación de aire acondicionado (split, multisplit, conductos)',
        'Instalación y cambio de calderas',
        'Suelo radiante e instalaciones por agua',
        'Aerotermia y bombas de calor',
        'Mantenimiento y revisión de equipos',
        'Carga de gas y reparación de averías',
        'Soluciones de eficiencia energética',
        'Climatización de locales comerciales',
      ],
      cuando: "Se necesita un profesional de climatización al instalar o sustituir un sistema de aire acondicionado, al cambiar la caldera, al querer mejorar la eficiencia energética del hogar, al acondicionar un local comercial o al planificar una reforma que incluya nuevas instalaciones de frío y calor.",
      faqs: [
        { question: '¿Qué sistema de climatización es mejor para mi vivienda?', answer: 'Depende del tamaño, la distribución y tus necesidades. El profesional valorará tu caso y te recomendará la solución más eficiente.' },
        { question: '¿La aerotermia es rentable en Madrid?', answer: 'En muchos casos sí, especialmente en viviendas unifamiliares o con buen aislamiento. El profesional puede calcular el ahorro estimado para tu situación.' },
        { question: '¿Necesito permiso para instalar aire acondicionado?', answer: 'Si hay unidad exterior en fachada, puede requerir autorización de la comunidad de vecinos. El profesional te orientará sobre los requisitos de tu caso.' },
      ],
    },
  },
  'piscinas-diseno-madrid': {
    titulo: 'Piscinas de diseño a medida en Madrid',
    descripcionMeta: 'Piscinas de diseño a medida en Madrid: spa, cascadas, piedra y gresite. Nuevas o reformando la tuya. Te respondemos en menos de 48 horas laborables.',
    landing: {
      h1: "Piscinas de diseño en Madrid",
      slug: "piscinas-diseno-madrid",
      breadcrumbName: "Piscinas de diseño",
      description: "Coordinación de piscinas de diseño a medida en la Comunidad de Madrid: diseño, construcción y reforma de piscinas existentes, con spa, cascadas y revestimientos de piedra y gresite. La obra la hace el profesional de la red de Construcciones Anaid asignado a cada proyecto, con quien el cliente firma el contrato.",
      intro: "Sales al jardín, subes la escalera de piedra del spa y oyes el agua caer en cascada a la piscina. Eso es una piscina de diseño: pensada a medida para tu casa, nueva o a partir de la que ya tienes. Te asignamos al profesional de nuestra red que la diseña y la construye, y nosotros coordinamos la obra hasta el final. Como cada piscina se hace a medida, hacemos como máximo 10 al año.",
      proyecto: {
        titulo: 'Una piscina de diseño terminada: spa de piedra y dos cascadas',
        texto:
          'Es una piscina en forma de riñón, con gresite azul y una playa de gresite rosa con escalones para entrar al agua. Al fondo hay un spa elevado de piedra para seis personas, con una cascada que cae a la piscina, y a un lado, un muro de roca con otra cascada en arco. Las máquinas y un baño quedan dentro de una caseta de piedra, entre césped y palmeras.',
        autoria: 'Obra de profesionales que hoy forman parte de nuestra red.',
        fotos: [
          {
            src: `${FOTOS}/piscina-diseno-spa-cascada.jpg`,
            alt: 'Piscina en forma de riñón con gresite azul y playa de gresite rosa; al fondo, spa elevado de piedra con cascada y chorro lateral, sobre césped',
            pie: 'Gresite azul, playa rosa y el spa de piedra al fondo.',
          },
          {
            src: `${FOTOS}/piscina-diseno-vista-general.jpg`,
            alt: 'Vista general: spa circular elevado con escalones de piedra junto a la piscina, césped alrededor y muro de piedra al fondo',
            pie: 'El spa elevado, con su escalera de piedra.',
          },
          {
            src: `${FOTOS}/piscina-diseno-spa-piedra.jpg`,
            alt: 'Piscina con el spa de piedra al fondo, su cascada y un chorro de agua, junto a una palmera',
            pie: 'La cascada y el chorro del spa caen a la piscina.',
          },
          {
            src: `${FOTOS}/piscina-diseno-muro-roca-cascada.jpg`,
            alt: 'Muro de roca con una cascada en arco que cae sobre la piscina, entre palmeras, con la caseta de piedra al fondo',
            pie: 'La cascada en arco del muro de roca.',
          },
          {
            src: `${FOTOS}/spa-hidromasaje-6-personas.jpg`,
            alt: 'Spa en marcha con el hidromasaje funcionando, visto desde arriba',
            pie: 'Spa para seis personas, con hidromasaje.',
          },
          {
            src: `${FOTOS}/caseta-sala-maquinas-bano.jpg`,
            alt: 'Caseta de piedra con dos puertas, una para la sala de máquinas y otra para el baño, junto a una palmera y césped',
            pie: 'Caseta de piedra: sala de máquinas y baño.',
          },
          {
            src: `${FOTOS}/spa-gresite-hidromasaje.jpg`,
            alt: 'Interior del spa revestido de gresite blanco y rojo, con las boquillas de hidromasaje',
            pie: 'Gresite blanco y rojo dentro del spa.',
          },
        ],
      },
      trabajos: [
        'Diseño a medida de tu jardín, también con curvas, como las piscinas en forma de riñón',
        'Construcción de piscinas de diseño nuevas',
        'Reforma de piscinas que ya existen, para convertirlas en piscinas de diseño',
        'Spa elevado con hidromasaje, revestido de piedra y con escalera de piedra',
        'Cascadas y chorros de agua: desde el spa o desde un muro de roca',
        'Revestimientos de gresite y de piedra, con zona de playa y escalones para entrar al agua',
        'Caseta de piedra con la sala de máquinas y un baño junto a la piscina',
      ],
      cuando: "Suele necesitarse cuando tienes un chalet o una casa con jardín y la piscina que te imaginas no es la de siempre: con curvas, con un spa al que se sube por escalones de piedra, con una cascada o con un muro de roca. También cuando ya tienes piscina y quieres darle otra vida con gresite o piedra nuevos, un spa o una cascada. Y cuando no quieres ser tú quien llame al de la piedra, al del gresite y al de las máquinas para que se pongan de acuerdo: hablas con una sola persona, y las fotos de la obra te llegan por WhatsApp casi cada día, aunque estés en la oficina.",
      faqs: [
        {
          question: '¿Hacéis piscinas estándar o prefabricadas?',
          answer:
            'No. En piscinas solo coordinamos proyectos de diseño: hechos a medida de cada jardín, con la forma, el spa, las cascadas y los revestimientos de piedra o gresite que se elijan para esa casa. Para una piscina estándar o prefabricada hay empresas que se dedican solo a eso. Si ya tienes una y quieres convertirla en una piscina de diseño, en eso sí te ayudamos.',
        },
        {
          question: '¿Cuántas piscinas hacéis al año?',
          answer:
            'Como máximo 10. Cada piscina es de diseño y se hace a medida de su jardín, así que limitamos el número para que cada proyecto tenga la atención que necesita. Si quieres la tuya, cuéntanos tu proyecto cuanto antes.',
        },
        {
          question: '¿Podéis convertir mi piscina actual en una piscina de diseño?',
          answer:
            'Sí, también se reforman piscinas que ya existen. Se puede cambiar el revestimiento por gresite o piedra, añadir un spa elevado o una cascada, o levantar una caseta de piedra para las máquinas. Antes de contratar, el profesional que te asignamos visita tu casa, ve la piscina y te dice qué se puede hacer con ella.',
        },
        {
          question: '¿Quién firma el contrato y hace la obra de la piscina?',
          answer:
            'El profesional de nuestra red que te asignamos. Firmas el contrato de obra directamente con él y se compromete por escrito al precio, que queda cerrado en el contrato, y al plazo, con penalización si no lo cumple. Él hace la obra y responde de su trabajo. Construcciones Anaid no construye: estudia tu consulta, elige al profesional que encaja, coordina la obra y te manda fotos del avance por WhatsApp casi cada día.',
        },
        {
          question: '¿Cuánto cuesta una piscina de diseño?',
          answer:
            'Depende de cada proyecto: del tamaño, de la forma y de lo que lleve, como spa, cascadas, piedra o gresite. Por eso no publicamos precios: el profesional asignado prepara tu presupuesto, lo revisa y te lo envía, y antes de contratar visita tu casa para ver el jardín y lo que quieres hacer. El precio queda cerrado en el contrato que firmas con él. A tu consulta te respondemos en menos de 48 horas laborables.',
        },
      ],
    },
  },
};
