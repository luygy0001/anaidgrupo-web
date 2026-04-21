import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import TrustBadges from '@/components/sections/TrustBadges';
import HowItWorks from '@/components/sections/HowItWorks';
import ServicesGrid from '@/components/sections/ServicesGrid';
import AIExplainer from '@/components/sections/AIExplainer';
import PriceRange from '@/components/sections/PriceRange';
import CoverageSection from '@/components/sections/CoverageSection';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';
import JsonLd from '@/components/seo/JsonLd';
import { FAQS, SITE_NAME } from '@/lib/constants';
import { organizationSchema, localBusinessSchema } from '@/lib/seo-schemas';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: `Reformas integrales en Madrid con profesionales validados y presupuesto claro · ${SITE_NAME}`,
  description:
    'Conectamos tu proyecto con profesionales validados en Madrid. Proceso ágil, presupuesto claro y seguimiento digital. Reformas integrales, baño, cocina, piscinas y servicios técnicos.',
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
    },
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <ServicesGrid />
      <AIExplainer />
      <PriceRange />
      <CoverageSection />
      <FAQAccordion items={[...FAQS]} />
      <CTASection />
      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
