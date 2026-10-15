import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import CoverageSection from '@/components/sections/CoverageSection';
import GallerySection from '@/components/sections/GallerySection';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTASection from '@/components/sections/CTASection';
import JsonLd from '@/components/seo/JsonLd';
import { FAQS, SITE_NAME, SITE_URL, PHONE, EMAIL, SOCIAL } from '@/lib/constants';

const TITULO = 'Reformas en Madrid con trato directo | Construcciones Anaid';
const DESCRIPCION =
  'Reformas integrales, de cocina y de baño en toda la Comunidad de Madrid con una red de profesionales coordinada por Construcciones Anaid. Te respondemos en menos de 48 horas.';

export const metadata: Metadata = {
  // absolute: la plantilla de layout.tsx añadiría la marca otra vez
  title: { absolute: TITULO },
  description: DESCRIPCION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
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
    title: TITULO,
    description: DESCRIPCION,
    images: [`${SITE_URL}/images/obra-salon.jpg`],
  },
};

// Marcado estructurado: negocio de área de servicio (SEO) + FAQPage con las preguntas visibles
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'Construcciones Anaid',
      description:
        'Reformas integrales, de cocina y de baño en toda la Comunidad de Madrid. Construcciones Anaid te asigna al profesional adecuado de su red de arquitectos y oficios, coordina la obra y te envía fotos del avance casi a diario por WhatsApp.',
      url: SITE_URL,
      telephone: PHONE,
      email: EMAIL,
      // Negocio de área de servicio: sin dirección pública (la sede solo figura en las
      // páginas legales, decisión de Luis del 06-10-2026).
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
        { '@type': 'City', name: 'Madrid' },
        { '@type': 'City', name: 'Pozuelo de Alarcón' },
        { '@type': 'City', name: 'Las Rozas de Madrid' },
        { '@type': 'City', name: 'Majadahonda' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:30',
          closes: '19:30',
        },
      ],
      // Solo perfiles del propio negocio (no el personal del titular)
      sameAs: [SOCIAL.youtube, SOCIAL.linkedinEmpresa],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de reforma',
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
              name: 'Reforma de cocina',
              description: 'Reforma de cocina: distribución, instalaciones y mobiliario.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Reforma de baño',
              description: 'Reforma de baño: cambio de bañera por ducha, alicatado, sanitarios y grifería.',
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
      <ServicesGrid />
      <CoverageSection />
      <GallerySection />
      <HowItWorks />
      {/* El FAQPage ya va en el @graph de esta página: sin schema duplicado */}
      <FAQAccordion items={[...FAQS]} withSchema={false} />
      <CTASection />
    </>
  );
}
