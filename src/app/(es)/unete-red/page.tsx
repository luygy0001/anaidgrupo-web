import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';
import FormProfesional from '@/components/forms/FormProfesional';
import {
  Users,
  Filter,
  BarChart3,
  Zap,
  Shield,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Únete a nuestra red',
  description:
    'Si eres profesional del sector reformas, únete a la red de colaboradores de Anaid Grupo. Recibe leads filtrados con apoyo tecnológico.',
  alternates: { canonical: '/unete-red' },
};

const benefits = [
  {
    icon: Filter,
    title: 'Leads mejor filtrados',
    text: 'Recibes solicitudes previamente analizadas y clasificadas. Menos ruido, más oportunidades reales.',
  },
  {
    icon: Zap,
    title: 'Menos carga administrativa',
    text: 'Nuestra tecnología y automatizaciones te liberan tiempo para que te centres en lo que mejor sabes hacer.',
  },
  {
    icon: BarChart3,
    title: 'Mejor control comercial',
    text: 'Panel privado para gestionar tus leads, estados y seguimiento de forma organizada.',
  },
  {
    icon: Shield,
    title: 'Apoyo tecnológico',
    text: 'IA para resúmenes, clasificación y orientación. Herramientas que te ayudan a trabajar mejor.',
  },
];

const specialties = [
  'Reformas integrales',
  'Reformas de baño y cocina',
  'Electricidad',
  'Fontanería',
  'Climatización',
  'Arquitectura técnica',
  'Pequeñas obras y reparaciones',
];

const steps = [
  'Rellena el formulario de solicitud',
  'Nuestro equipo revisa tu perfil',
  'Te contactamos para una entrevista breve',
  'Si encajas, te damos de alta y empiezas a recibir oportunidades',
];

export default function UneteRedPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
        <Container narrow>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Para profesionales
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Únete a la red de colaboradores de Anaid Grupo
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Si eres profesional del sector y quieres recibir oportunidades mejor
              filtradas, con más orden comercial y apoyo tecnológico, queremos
              conocerte.
            </p>
          </div>
        </Container>
      </section>

      {/* Para quién es */}
      <section className="section-padding">
        <Container>
          <h2 className="text-2xl font-bold text-center mb-4">
            ¿Para quién es?
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Buscamos profesionales y empresas del sector reformas, instalaciones
            y servicios técnicos que operen en la Comunidad de Madrid y quieran
            formar parte de una red organizada y con respaldo tecnológico.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 p-5 rounded-xl bg-muted border border-border">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Especialidades */}
      <section className="section-padding bg-muted">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-6">
            Especialidades que buscamos
          </h2>
          <ul className="space-y-2">
            {specialties.map((s) => (
              <li key={s} className="flex items-center gap-2 text-foreground">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Proceso */}
      <section className="section-padding">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-6">
            Proceso de incorporación
          </h2>
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-foreground pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Formulario */}
      <section className="section-padding bg-muted">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Solicita tu incorporación
          </h2>
          <FormProfesional />
        </Container>
      </section>

      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
