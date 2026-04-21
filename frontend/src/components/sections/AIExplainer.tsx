import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { Brain, ScanSearch, BarChart3, Zap } from 'lucide-react';

const features = [
  {
    icon: ScanSearch,
    title: 'Clasificación inteligente',
    text: 'Identificamos automáticamente el tipo de servicio y la complejidad de cada solicitud.',
  },
  {
    icon: Zap,
    title: 'Detección de urgencia',
    text: 'Priorizamos las solicitudes urgentes para agilizar la asignación.',
  },
  {
    icon: BarChart3,
    title: 'Resumen estructurado',
    text: 'Generamos un resumen claro del proyecto para el profesional asignado.',
  },
];

export default function AIExplainer() {
  return (
    <section className="section-padding">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light text-accent-700 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              Tecnología aplicada
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              IA que ayuda a analizar mejor tu proyecto
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              La tecnología de Anaid Grupo ayuda a clasificar solicitudes,
              detectar urgencias, ordenar información y mejorar la asignación del
              profesional más adecuado.
            </p>
            <p className="mt-3 text-sm text-muted-foreground italic">
              La IA nunca sustituye la validación profesional. El presupuesto
              final siempre requiere revisión en obra por parte del profesional
              asignado.
            </p>

            <div className="mt-6">
              <Button href="/ia-analisis-proyecto" variant="outline" size="sm">
                Saber más sobre nuestra tecnología
              </Button>
            </div>
          </div>

          {/* Features side */}
          <div className="space-y-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-4 rounded-xl bg-muted border border-border"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
