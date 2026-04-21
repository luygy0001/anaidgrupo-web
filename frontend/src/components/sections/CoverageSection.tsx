import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { MapPin } from 'lucide-react';

export default function CoverageSection() {
  return (
    <section className="section-padding bg-muted">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Cobertura
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Comunidad de Madrid
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Trabajamos con una red de colaboradores estrictamente seleccionados
            que cubren la Comunidad de Madrid. Nuestro objetivo es asegurar que
            cada proyecto cuente con un profesional cercano y cualificado.
          </p>
          <div className="mt-6">
            <Button href="/zonas" variant="outline">
              Ver zonas de cobertura
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
