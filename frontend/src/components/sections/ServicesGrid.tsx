import Container from '@/components/ui/Container';
import { SERVICES } from '@/lib/constants';
import {
  Home,
  Bath,
  ChefHat,
  Zap,
  Droplets,
  Thermometer,
  Ruler,
  Wrench,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Home,
  Bath,
  ChefHat,
  Zap,
  Droplets,
  Thermometer,
  Ruler,
  Wrench,
};

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Servicios que podemos ayudarte a canalizar
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Anaid Grupo centraliza la solicitud, analiza el proyecto y lo asigna
            al colaborador adecuado según el tipo de trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Wrench;
            return (
              <a
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group bg-white rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver más <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            );
          })}
        </div>

        {/* "No sé qué necesito" link */}
        <div className="mt-8 text-center">
          <a
            href="/solicitar-proyecto"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            ¿No sabes qué profesional necesitas? Cuéntanos tu caso
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
