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

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    email: EMAIL,
    contactType: 'customer service',
    areaServed: 'ES',
    availableLanguage: ['Spanish'],
  },
  areaServed: {
    '@type': 'State',
    name: 'Comunidad de Madrid',
  },
  sameAs: [SOCIAL.facebook],
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  image: `${SITE_URL}/images/logo.png`,
  areaServed: {
    '@type': 'State',
    name: 'Comunidad de Madrid',
  },
  openingHoursSpecification: horarioApertura,
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
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'State',
      name: 'Comunidad de Madrid',
    },
  };
}

type ZoneLocalBusinessArgs = {
  municipio: string;
  slug: string;
  description: string;
};

// LocalBusiness para landings de zona: areaServed apunta al municipio concreto,
// contenido en la Comunidad de Madrid. Reutiliza el @id global para agregación.
export function zoneLocalBusinessSchema({
  municipio,
  slug,
  description,
}: ZoneLocalBusinessArgs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#localbusiness`,
    name: SITE_NAME,
    url: `${SITE_URL}/zonas/${slug}`,
    description,
    telephone: '+34640962564',
    image: `${SITE_URL}/images/logo.png`,
    areaServed: {
      '@type': 'City',
      name: municipio,
      containedInPlace: {
        '@type': 'State',
        name: 'Comunidad de Madrid',
      },
    },
  };
}
