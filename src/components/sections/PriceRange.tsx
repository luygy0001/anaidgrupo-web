import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Info } from 'lucide-react';

const ranges = [
  { service: 'Reforma integral', range: '400 – 1.200 €/m²', note: 'Según alcance y acabados' },
  { service: 'Reforma de baño', range: '3.000 – 10.000 €', note: 'Según tamaño y materiales' },
  { service: 'Reforma de cocina', range: '5.000 – 15.000 €', note: 'Según diseño y electrodomésticos' },
  { service: 'Electricista', range: '50 – 150 €/hora', note: 'Según tipo de intervención' },
  { service: 'Fontanero', range: '50 – 120 €/hora', note: 'Según urgencia y complejidad' },
  { service: 'Climatización', range: '1.000 – 5.000 €', note: 'Según equipo y habitaciones' },
];

export default function PriceRange() {
  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Rangos orientativos de precios
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Estos rangos son una referencia inicial para ayudarte a planificar.
            El precio definitivo lo determina el profesional tras valorar tu proyecto en persona.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            {ranges.map((item, i) => (
              <div
                key={item.service}
                className={`flex items-center justify-between px-5 py-4 ${
                  i < ranges.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div>
                  <p className="font-medium text-foreground">{item.service}</p>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </div>
                <span className="text-sm font-semibold text-primary whitespace-nowrap ml-4">
                  {item.range}
                </span>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-4 flex gap-2 items-start p-3 rounded-lg bg-accent-light/50 border border-accent/20">
            <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              El rango orientativo nunca sustituye la valoración final en obra por
              parte del profesional. Los precios pueden variar según zona, estado actual,
              materiales elegidos y complejidad del trabajo.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Button href="/guias-precios" variant="outline" size="sm">
              Ver guías de precios detalladas
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
