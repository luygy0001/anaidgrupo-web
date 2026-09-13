import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import InvestorSection from '@/components/sections/InvestorSection';
import AIExplainer from '@/components/sections/AIExplainer';
import ServicesGrid from '@/components/sections/ServicesGrid';
import GallerySection from '@/components/sections/GallerySection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTASection from '@/components/sections/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { FAQS, SITE_NAME, SITE_URL, PHONE, EMAIL, ADDRESS, SOCIAL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Reformas Integrales en Madrid (30-60 Días) | Construcciones Anaid',
  description:
    'Especialistas en reformas integrales y para inversores en Madrid y Alcalá de Henares con plazo cerrado de 30 a 60 días. Presupuestos con IA en menos de 1h y seguimiento diario por WhatsApp.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Reformas Integrales en Madrid con Plazo Cerrado | Construcciones Anaid',
    description:
      'Reformas llave en mano con plazo garantizado de 30 a 60 días. Presupuesto estimado con IA en menos de 1 hora y seguimiento casi diario por WhatsApp.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/obra-salon.jpg`,
        width: 1200,
        height: 675,
        alt: 'Reforma integral y diseño de salón en Madrid por Construcciones Anaid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reformas Integrales en Madrid (30-60 Días) | Construcciones Anaid',
    description:
      'Reformas con plazo cerrado en 30-60 días y diseño para revalorizar tu vivienda. Presupuesto en 1h con IA.',
    images: [`${SITE_URL}/images/obra-salon.jpg`],
  },
};

// Marcado estructurado dual: Entidad Local (SEO) + FAQPage (GEO para ChatGPT, Perplexity y Google AI Overviews)
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'Construcciones Anaid',
      alternateName: 'Anaid Grupo Reformas',
      description:
        'Empresa de reformas integrales y rehabilitación en la Comunidad de Madrid especializada en proyectos con plazo cerrado de 30 a 60 días, presupuestos preliminares con Inteligencia Artificial en menos de 1 hora y seguimiento diario de obra por WhatsApp.',
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Transferencia bancaria, financiación',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C/ Isaac Peral, 46',
        addressLocality: 'Valdeavero',
        addressRegion: 'Madrid',
        postalCode: '28816',
        addressCountry: 'ES',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.6306,
        longitude: -3.3328,
      },
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
        { '@type': 'City', name: 'Madrid' },
        { '@type': 'City', name: 'Alcalá de Henares' },
        { '@type': 'City', name: 'Pozuelo de Alarcón' },
        { '@type': 'City', name: 'Las Rozas' },
        { '@type': 'City', name: 'Majadahonda' },
        { '@type': 'City', name: 'Torrejón de Ardoz' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:30',
          closes: '19:30',
        },
      ],
      sameAs: [
        SOCIAL.youtube,
        SOCIAL.linkedinPersonal,
        SOCIAL.linkedinEmpresa,
        'https://www.pymexpert.com',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Construcción y Reforma',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Reformas Integrales de Vivienda',
              description: 'Reforma integral completa en Madrid con plazos cerrados de 30 a 60 días garantizados por contrato.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Reformas para Inversores y House Flipping',
              description: 'Intervención rápida de alta revalorización (+20%) para venta rápida o alquiler de máxima rentabilidad.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cocinas de Diseño con Isla',
              description: 'Diseño e instalación de cocinas abiertas integradas con muebles a medida y encimeras de cuarzo.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Baños en Suite con Microcemento',
              description: 'Renovación de baños con ducha italiana, grifería termostática y acabados de lujo.',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={schemaData} />
      <Hero />
      <InvestorSection />
      <AIExplainer />
      <ServicesGrid />
      <GallerySection />
      <ReviewsSection />
      <FAQAccordion items={[...FAQS]} />
      <CTASection />
    </>
  );
}
