import Container from '@/components/ui/Container';
import { FileText, Search, UserCheck, HardHat } from 'lucide-react';
import { PASOS } from '@/content/como-trabajamos';

// Textos de los pasos en src/content/como-trabajamos.ts; aquí solo el icono de cada uno.
const iconos = [FileText, Search, UserCheck, HardHat];
const steps = PASOS.map((paso, i) => ({ ...paso, icon: iconos[i] }));

export default function HowItWorks() {
  return (
    <section id="como-trabajamos" className="section-padding scroll-mt-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Cómo trabajamos
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Un proceso claro, con un solo interlocutor desde el primer mensaje.{' '}
            <a href="/como-funciona" className="text-primary underline">
              Te lo contamos con detalle
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <step.icon className="w-6 h-6" />
              </div>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-xs font-bold text-white bg-primary px-2 py-0.5 rounded-full">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
