import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CTASection({
  title = '¿Tienes un proyecto en mente?',
  subtitle = 'Cuéntanos qué necesitas y te ayudamos a dar el siguiente paso con el profesional adecuado.',
  ctaText = 'Solicitar proyecto gratuito',
  ctaHref = '/solicitar-proyecto',
}: CTASectionProps) {
  return (
    <section className="section-padding bg-primary text-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
          <p className="mt-4 text-white/80 leading-relaxed">{subtitle}</p>
          <div className="mt-8">
            <Button href={ctaHref} variant="secondary" size="lg">
              {ctaText}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
