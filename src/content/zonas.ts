import type { ZoneLandingProps } from '@/components/sections/ZoneLanding';

// Contenido de las páginas de zona. Lo leen las páginas y también /llms-full.txt (src/lib/llms.ts).

export type PaginaZona = {
  titulo: string;
  descripcionMeta: string;
  landing: ZoneLandingProps;
};

export const PAGINAS_ZONA: Record<string, PaginaZona> = {
  'pozuelo-de-alarcon': {
    titulo: 'Reformas en Pozuelo de Alarcón',
    descripcionMeta: 'Reformas y servicios técnicos en Pozuelo de Alarcón. Construcciones Anaid te asigna al profesional de su red más adecuado para tu proyecto.',
    landing: {
      municipio: 'Pozuelo de Alarcón',
      slug: 'pozuelo-de-alarcon',
      description: 'Reformas y servicios técnicos en Pozuelo de Alarcón. Construcciones Anaid asigna al profesional de su red más adecuado para tu proyecto en la Comunidad de Madrid.',
      introParagraphs: [
        'Pozuelo de Alarcón es uno de los municipios con mayor demanda de reformas integrales y proyectos de vivienda unifamiliar del noroeste de Madrid. Construcciones Anaid centraliza la solicitud y te conecta con el profesional de nuestra red que mejor encaja con el alcance y los acabados que necesita tu proyecto.',
        'Llegamos a todas las urbanizaciones y zonas de Pozuelo: La Finca, Monte Alina, Monte Gancedo, Húmera, Somosaguas y el casco urbano. Cubrimos desde reformas integrales de chalet hasta actualizaciones de baño, cocina o climatización.',
        'Nuestro papel es de intermediación: analizamos el proyecto, asignamos al profesional adecuado y te acompañamos hasta que el presupuesto definitivo, tras visita, está sobre la mesa. No ejecutamos obras directamente.',
      ],
      highlights: [
        'Alta presencia de viviendas unifamiliares y chalets con reformas de mayor entidad.',
        'Demanda frecuente de acabados de gama alta y domótica integrada.',
        'Coordinación ágil con técnicos y arquitectos cuando la obra requiere licencia.',
        'Profesionales de nuestra red con experiencia en vivienda unifamiliar y comunidades de propietarios.',
      ],
      crossLinks: [
        { municipio: 'Las Rozas de Madrid', slug: 'las-rozas' },
        { municipio: 'Majadahonda', slug: 'majadahonda' },
      ],
    },
  },
  'las-rozas': {
    titulo: 'Reformas en Las Rozas de Madrid',
    descripcionMeta: 'Reformas y servicios técnicos en Las Rozas de Madrid. Construcciones Anaid te asigna al profesional de su red más adecuado para tu proyecto.',
    landing: {
      municipio: 'Las Rozas de Madrid',
      slug: 'las-rozas',
      description: 'Reformas y servicios técnicos en Las Rozas de Madrid. Construcciones Anaid asigna al profesional de su red más adecuado para tu proyecto en la Comunidad de Madrid.',
      introParagraphs: [
        'Las Rozas combina grandes áreas residenciales de vivienda unifamiliar con bloques de pisos modernos. Construcciones Anaid analiza cada proyecto y te asigna al profesional adecuado de nuestra red, tanto si necesitas una reforma integral de chalet como si quieres renovar un baño o una cocina.',
        'Cubrimos zonas como Las Matas, Molino de la Hoz, Monterrozas, El Cantizal y el centro urbano. Atendemos proyectos residenciales, actualizaciones de instalaciones y reformas en comunidades de vecinos.',
        'Somos plataforma de intermediación: conectamos tu necesidad con el profesional que mejor encaja. El presupuesto definitivo lo entrega el propio profesional tras visitar el proyecto en persona.',
      ],
      highlights: [
        'Mezcla de vivienda unifamiliar y vivienda colectiva moderna, con tipologías de obra variadas.',
        'Alta demanda de reformas de cocina abierta y baños con diseño actualizado.',
        'Profesionales acostumbrados a las normas de las comunidades y urbanizaciones.',
        'Coordinación con arquitectos técnicos cuando el proyecto requiere proyecto visado o licencia.',
      ],
      crossLinks: [
        { municipio: 'Pozuelo de Alarcón', slug: 'pozuelo-de-alarcon' },
        { municipio: 'Majadahonda', slug: 'majadahonda' },
      ],
    },
  },
  'majadahonda': {
    titulo: 'Reformas en Majadahonda',
    descripcionMeta: 'Reformas y servicios técnicos en Majadahonda. Construcciones Anaid te asigna al profesional de su red más adecuado para tu proyecto.',
    landing: {
      municipio: 'Majadahonda',
      slug: 'majadahonda',
      description: 'Reformas y servicios técnicos en Majadahonda. Construcciones Anaid asigna al profesional de su red más adecuado para tu proyecto en la Comunidad de Madrid.',
      introParagraphs: [
        'Majadahonda es una zona consolidada del noroeste de Madrid, con un parque de viviendas que mezcla adosados, unifamiliares y bloques modernos. Construcciones Anaid centraliza tu solicitud y la asigna al profesional de nuestra red que mejor encaja con el tipo de proyecto y los plazos que manejas.',
        'Llegamos tanto al centro urbano como a las urbanizaciones y zonas residenciales. Cubrimos reformas integrales, actualización de baños y cocinas, climatización, electricidad, fontanería y servicios técnicos de arquitectura cuando el proyecto lo requiere.',
        'Nuestro modelo es de intermediación: no ejecutamos directamente la obra, sino que conectamos tu proyecto con el profesional adecuado y acompañamos el proceso hasta que recibes el presupuesto definitivo.',
      ],
      highlights: [
        'Proyectos habituales de reforma integral en adosados y unifamiliares consolidados.',
        'Alta demanda de actualización de instalaciones en viviendas de 20–30 años.',
        'Profesionales con experiencia en comunidades de propietarios.',
        'Cercanía con Pozuelo y Las Rozas: la misma red atiende los tres municipios.',
      ],
      crossLinks: [
        { municipio: 'Pozuelo de Alarcón', slug: 'pozuelo-de-alarcon' },
        { municipio: 'Las Rozas de Madrid', slug: 'las-rozas' },
      ],
    },
  },
};

// Capas de cobertura de /zonas (municipios a los que llegamos; con página propia si hasLanding).
export type Municipio = {
  nombre: string;
  slug: string;
  nota?: string;
  hasLanding?: boolean;
};

export type CapaCobertura = {
  id: string;
  titulo: string;
  descripcion: string;
  municipios: Municipio[];
};

export const CAPAS_COBERTURA: CapaCobertura[] = [
  {
    id: 'noroeste',
    titulo: 'Noroeste de Madrid',
    descripcion:
      'Municipios donde las reformas suelen ser de mayor entidad: integrales, cocina y baño con acabados de gama alta.',
    municipios: [
      { nombre: 'Pozuelo de Alarcón', slug: 'pozuelo-de-alarcon', hasLanding: true },
      { nombre: 'Las Rozas de Madrid', slug: 'las-rozas', hasLanding: true },
      { nombre: 'Majadahonda', slug: 'majadahonda', hasLanding: true },
    ],
  },
  {
    id: 'volumen',
    titulo: 'Zona metropolitana sur y corredor del Henares',
    descripcion:
      'Municipios con gran volumen de población donde cubrimos reformas de vivienda, baño, cocina y servicios técnicos.',
    municipios: [
      { nombre: 'Móstoles', slug: 'mostoles' },
      { nombre: 'Fuenlabrada', slug: 'fuenlabrada' },
      { nombre: 'Leganés', slug: 'leganes' },
      { nombre: 'Getafe', slug: 'getafe' },
      { nombre: 'Alcorcón', slug: 'alcorcon' },
      { nombre: 'Torrejón de Ardoz', slug: 'torrejon-de-ardoz' },
    ],
  },
  {
    id: 'base',
    titulo: 'Nuestra zona de base',
    descripcion:
      'El corredor del Henares es la zona más cercana a nuestra base, en el este de la Comunidad de Madrid.',
    municipios: [
      {
        nombre: 'Alcalá de Henares',
        slug: 'alcala-de-henares',
      },
    ],
  },
];
