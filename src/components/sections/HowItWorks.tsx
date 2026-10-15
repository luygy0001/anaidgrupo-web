import Container from '@/components/ui/Container';
import { FileText, Search, UserCheck, HardHat } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'Cuéntanos tu proyecto',
    description:
      'Escríbenos por el formulario, por WhatsApp o llámanos, y cuéntanos qué necesitas. Si quieres, por WhatsApp puedes mandarnos fotos.',
  },
  {
    icon: Search,
    number: '02',
    title: 'Analizamos la necesidad',
    description:
      'Nuestro equipo estudia cada solicitud para identificar el tipo de servicio, la urgencia y la complejidad del proyecto.',
  },
  {
    icon: UserCheck,
    number: '03',
    title: 'Asignamos el perfil adecuado',
    description:
      'Seleccionamos al colaborador que mejor encaja según especialidad, zona geográfica, disponibilidad y tipo de trabajo.',
  },
  {
    icon: HardHat,
    number: '04',
    title: 'El profesional te contacta',
    description:
      'El profesional asignado visita tu proyecto, lo valida técnicamente y te entrega un presupuesto definitivo sin compromiso.',
  },
];

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
