import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import InvestorSection from '@/components/sections/InvestorSection';
import AIExplainer from '@/components/sections/AIExplainer';
import ServicesGrid from '@/components/sections/ServicesGrid';
import GallerySection from '@/components/sections/GallerySection';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTASection from '@/components/sections/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { FAQS, SITE_NAME, SITE_URL, PHONE, EMAIL, SOCIAL } from '@/lib/constants';

export const metadata: Metadata = {
  // absolute: la plantilla de layout.tsx añadiría la marca otra vez
  title: { absolute: 'Reformas en la Comunidad de Madrid | Construcciones Anaid' },
  description:
    'Reformas en toda la Comunidad de Madrid. Elige la calidad, recibe tu presupuesto en menos de 1 hora y sigue tu obra con fotos casi a diario por WhatsApp.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Reformas en Madrid con presupuesto en menos de 1 hora',
    description:
      'Elige la calidad de acabados, recibe tu presupuesto en menos de 1 hora y sigue tu obra con fotos casi a diario por WhatsApp.',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/obra-salon.jpg`,
        width: 1200,
        height: 675,
        alt: 'Salón abierto de una obra de la red de Construcciones Anaid',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reformas en la Comunidad de Madrid | Construcciones Anaid',
    description:
      'Reformas en la Comunidad de Madrid. Presupuesto en menos de 1 hora y fotos de tu obra casi a diario por WhatsApp.',
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
      description:
        'Reformas integrales, de cocina y de baño en toda la Comunidad de Madrid. Construcciones Anaid prepara tu presupuesto en menos de 1 hora, te asigna al profesional adecuado de su red de arquitectos y oficios, coordina la obra y te envía fotos del avance casi a diario por WhatsApp.',
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      // Negocio de área de servicio: sin dirección pública (la sede solo figura en las
      // páginas legales, decisión de Luis del 06-10-2026).
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
              name: 'Reforma integral de vivienda',
              description: 'Reforma completa de vivienda en la Comunidad de Madrid con profesionales de la red de Construcciones Anaid y el plazo fijado en el contrato de obra.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Reformas para inversores e inmobiliarias',
              description: 'Reformas en calidad media-baja o media para vender o alquilar, con presupuesto en menos de 1 hora.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Reforma de cocina',
              description: 'Reforma de cocina: distribución, instalaciones y mobiliario, con la calidad de acabados que elijas.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Reforma de baño',
              description: 'Reforma de baño: cambio de bañera por ducha, alicatado, sanitarios y grifería, con la calidad que elijas.',
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
      {/* El FAQPage ya va en el @graph de esta página: sin schema duplicado */}
      <FAQAccordion items={[...FAQS]} withSchema={false} />
      <CTASection />
    </>
  );
}
