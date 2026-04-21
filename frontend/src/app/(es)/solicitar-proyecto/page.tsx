import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import FormSolicitud from '@/components/forms/FormSolicitud';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';

export const metadata: Metadata = {
  title: 'Solicitar proyecto gratuito',
  description:
    'Cuéntanos tu proyecto de reforma o servicio técnico en Madrid. Analizamos tu necesidad y te asignamos el profesional adecuado sin compromiso.',
  alternates: { canonical: '/solicitar-proyecto' },
};

export default function SolicitarProyectoPage() {
  return (
    <>
      <section className="section-padding">
        <Container narrow>
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Cuéntanos tu proyecto
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Analizamos tu necesidad y te ayudamos a dar el siguiente paso con
              el colaborador adecuado.
            </p>
          </div>

          <FormSolicitud />

          <div className="mt-8">
            <IntermediationDisclaimer />
          </div>
        </Container>
      </section>
    </>
  );
}
