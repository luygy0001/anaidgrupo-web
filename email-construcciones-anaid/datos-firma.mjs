// Datos de la firma de email de Construcciones Anaid.
// Todo sale de la web: src/lib/constants.ts (contacto, redes, horario, LEGAL) y
// src/app/globals.css (colores). Si cambia algo allí, cambiarlo también aquí y regenerar.
// Buzón genérico info@: firma institucional, sin nombre de persona (persona: null).

export default {
  // Sin subtítulo a propósito: la franja ya dice la actividad y la línea D. la zona. Poner un
  // «Atención al cliente» sería inventar un departamento que no existe.
  persona: null,
  subtitulo: null,

  marca: { parte1: 'Construcciones', parte2: 'Anaid' },

  // RESPUESTA_PLAZO de constants.ts: la web provisional NO promete presupuesto en 24 h.
  actividad: 'Reformas y coordinación de obra en Madrid',
  claim: 'Respuesta en menos de 48 h laborables',

  // LEGAL.titular del aviso legal: persona física, «Construcciones Anaid» es su nombre comercial.
  titular: 'Luis Manuel Vázquez',

  telefono: { texto: '664 415 523', e164: '+34664415523' },
  telefono2: null,
  whatsapp: 'https://wa.me/34664415523',

  email: 'info@construccionesanaid.com',
  web: 'https://www.construccionesanaid.com/',
  webTexto: 'www.construccionesanaid.com',

  // La web publica el domicilio SOLO en aviso legal y privacidad (ver el comentario de ADDRESS en
  // constants.ts). Aquí va la zona de cobertura, igual que el pie de la web.
  direccion: 'Toda la Comunidad de Madrid',
  mapa: null,

  horario: 'L–J 8:00–18:00 · V 8:00–15:00',

  paginas: {
    servicios: 'https://www.construccionesanaid.com/servicios',
    privacidad: 'https://www.construccionesanaid.com/privacidad',
    avisoLegal: 'https://www.construccionesanaid.com/aviso-legal',
  },

  redes: [
    { nombre: 'LinkedIn', icono: 'linkedin', url: 'https://www.linkedin.com/company/construcciones-anaid/' },
    { nombre: 'YouTube', icono: 'youtube', url: 'https://www.youtube.com/@ConstruccionesAnaid' },
    { nombre: 'Facebook', icono: 'facebook', url: 'https://www.facebook.com/Construccionesanaid' },
  ],

  imagenesRemotas: 'https://www.construccionesanaid.com/images/firma/',

  logo: {
    origen: 'D:/construccionesanaid-web/public/images/logo.png',
    archivo: 'ca-monograma.png',
    ancho: 64,
    alto: 64,
    // El logo de la web es horizontal: se recorta el monograma «CA» de la izquierda (el 30 % del
    // ancho, ya sin bordes vacíos) y el nombre va escrito como texto en la firma.
    recorteIzquierda: 0.3,
  },

  // Azul #1a365d (--primary-500) y ámbar #D97706 (--accent-500) de globals.css.
  // Para los textos se usan los ámbares oscuros de la misma rampa, que sí contrastan sobre blanco.
  colores: {
    acento: '#D97706',
    marcaAcento: '#b45309',
    enlace: '#92400e',
    oscuro: '#1a365d',
    franjaEnlace: '#fcd34d',
    texto: '#374151',
    gris: '#4b5563',
    legal: '#6b7280',
    linea: '#e5e7eb',
  },

  // Obligatorio aquí: el aviso legal dice que Construcciones Anaid no es constructora ni ejecuta
  // obras, y la web lo repite en cada página de servicio. La firma tiene que decir lo mismo.
  // Texto literal de INTERMEDIATION_DISCLAIMER en constants.ts, para decir lo mismo que la web.
  notaActividad: {
    titulo: 'Cómo trabajamos.',
    texto: 'Construcciones Anaid coordina reformas con una red de arquitectos, autónomos y empresas. El contrato de obra lo firmas con el profesional asignado, que hace la obra y responde de su trabajo.',
  },

  // La web es Next.js y se despliega con Dokploy: las imágenes van en el repositorio, no se suben
  // por un administrador de archivos.
  hosting: {
    nombre: 'VPS con Dokploy',
    carpeta: 'public/images/firma/',
    pasos: [
      'Copiar los 4 PNG de <code>email-construcciones-anaid/imagenes/firma/</code> a <code>public/images/firma/</code> del repositorio.',
      'Commit en la rama de trabajo y <b>push</b> a GitHub (<code>anaidgrupo-web</code>).',
      'Desplegar en Dokploy (skill <code>despliegue-dokploy</code>) y esperar a que termine.',
    ],
  },
};
