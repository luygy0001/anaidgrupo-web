import {
  SITE_NAME,
  SITE_URL,
  PHONE,
  EMAIL,
  SOCIAL,
} from './constants';

// Horario para Google: el mismo que HORARIO_DETAIL (constants.ts) y que el Perfil de Empresa.
export const horarioApertura = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    opens: '08:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Friday'],
    opens: '08:00',
    closes: '15:00',
  },
];

// El negocio para Google: la misma entidad (mismo @id) en todas las páginas que lo describen, con
// el nombre, el teléfono y los perfiles de la web y del Perfil de Empresa. Sin dirección: negocio de
// área de servicio (decisión 9; la sede solo figura en las páginas legales).
export const NEGOCIO = {
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  // La grafía del dominio, por si alguien busca la marca junta
  alternateName: 'Construccionesanaid',
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  image: `${SITE_URL}/images/logo.png`,
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
    { '@type': 'City', name: 'Madrid' },
    { '@type': 'City', name: 'Pozuelo de Alarcón' },
    { '@type': 'City', name: 'Las Rozas de Madrid' },
    { '@type': 'City', name: 'Majadahonda' },
  ],
  openingHoursSpecification: horarioApertura,
  // Solo perfiles del propio negocio (no el personal del titular)
  sameAs: [SOCIAL.youtube, SOCIAL.linkedinEmpresa, SOCIAL.facebook],
};

// Referencia al negocio desde otros datos (proveedor de un servicio)
const refNegocio = {
  '@type': NEGOCIO['@type'],
  '@id': NEGOCIO['@id'],
  name: NEGOCIO.name,
  url: NEGOCIO.url,
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  ...NEGOCIO,
};

type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

type ServiceSchemaArgs = {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
};

export function serviceSchema({
  name,
  description,
  slug,
  serviceType,
}: ServiceSchemaArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: serviceType ?? name,
    url: `${SITE_URL}/servicios/${slug}`,
    provider: refNegocio,
    areaServed: {
      '@type': 'State',
      name: 'Comunidad de Madrid',
    },
  };
}

type ZoneLocalBusinessArgs = {
  municipio: string;
  description: string;
};

// Landings de zona: el mismo negocio, con areaServed en el municipio concreto
// (contenido en la Comunidad de Madrid).
export function zoneLocalBusinessSchema({
  municipio,
  description,
}: ZoneLocalBusinessArgs) {
  return {
    '@context': 'https://schema.org',
    ...NEGOCIO,
    description,
    areaServed: {
      '@type': 'City',
      name: municipio,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Comunidad de Madrid',
      },
    },
  };
}
