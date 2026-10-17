import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import FAQAccordion from '@/components/sections/FAQAccordion';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';
import { FAQS } from '@/lib/constants';
import { CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo trabajamos',
  description:
    'Cómo trabaja Construcciones Anaid: estudiamos tu reforma, te asignamos al profesional adecuado de nuestra red en Madrid y coordinamos la obra contigo.',
  alternates: { canonical: '/como-funciona' },
};

const queHace = [
  'Recibe y analiza cada solicitud de cliente',
  'Filtra y clasifica la necesidad según tipo, urgencia y zona',
  'Asigna al profesional colaborador más adecuado',
  'Orienta al cliente en los primeros pasos del proyecto',
  'Facilita la comunicación entre cliente y profesional',
];

const queNoHace = [
  'No ejecuta obras ni servicios técnicos',
  'No factura al cliente final por la ejecución',
  'No ofrece garantía técnica propia sobre la obra',
  'No sustituye la valoración profesional en persona',
  'No fija precios definitivos sin validación del profesional',
];

export default function ComoFuncionaPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-transparent">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Así analizamos y asignamos cada proyecto
          </h1>
          <p className="mt-4 text-muted-foreground text-center text-lg">
            Un proceso transparente pensado para que tu proyecto llegue al
            profesional más adecuado.
          </p>
        </Container>
      </section>

      {/* Qué hace / Qué NO hace */}
      <section className="section-padding">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-success/5 border border-success/20">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Qué hace Construcciones Anaid
              </h2>
              <ul className="space-y-3">
                {queHace.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-error/5 border border-error/20">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Qué NO hace Construcciones Anaid
              </h2>
              <ul className="space-y-3">
                {queNoHace.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <XCircle className="w-4 h-4 text-error mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Clasificación */}
      <section className="section-padding bg-muted">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">
            Cómo se clasifica una solicitud
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cuando nos escribes, una persona revisa lo que nos cuentas: el tipo
            de reforma, qué necesitas y en qué municipio. Con esos datos vemos tu
            proyecto y qué tipo de profesional necesitas.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Si has indicado que no sabes qué profesional necesitas, lo analizamos y te orientamos antes de asignar a nadie.
          </p>
        </Container>
      </section>

      {/* Asignación */}
      <section className="section-padding">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">
            Cómo se asigna al profesional
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            La asignación se basa en varios factores: la especialidad requerida,
            la zona geográfica del proyecto, la disponibilidad del profesional y
            la urgencia indicada. El objetivo es conectar cada solicitud con el
            colaborador que mejor encaje.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            El cliente final no elige entre una lista de profesionales. Construcciones
            Anaid centraliza el análisis y la asignación para que cada proyecto reciba la atención adecuada.
          </p>
        </Container>
      </section>

      {/* Qué pasa después */}
      <section className="section-padding bg-muted">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">
            Qué sucede después de enviar tu solicitud
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">1</span>
              <div>
                <p className="font-medium text-foreground">Análisis inicial</p>
                <p className="text-sm text-muted-foreground">Te respondemos en menos de 48 horas laborables para ver tu caso.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">2</span>
              <div>
                <p className="font-medium text-foreground">Asignación del profesional</p>
                <p className="text-sm text-muted-foreground">Seleccionamos al colaborador más adecuado y le compartimos la información de tu proyecto.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">3</span>
              <div>
                <p className="font-medium text-foreground">Contacto del profesional</p>
                <p className="text-sm text-muted-foreground">El profesional asignado te contacta para coordinar una visita o resolver dudas.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-sm font-bold">4</span>
              <div>
                <p className="font-medium text-foreground">Presupuesto definitivo</p>
                <p className="text-sm text-muted-foreground">Tras la visita, el profesional te entrega un presupuesto definitivo sin compromiso.</p>
              </div>
            </li>
          </ol>
        </Container>
      </section>

      {/* Diferencia orientación vs presupuesto */}
      <section className="section-padding">
        <Container narrow>
          <h2 className="text-2xl font-bold mb-4">
            Diferencia entre nuestra respuesta y el presupuesto final
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cuando te contestamos te decimos si tu proyecto encaja, qué tipo de profesional
            necesita y cuáles son los siguientes pasos. No es un presupuesto ni una cifra
            orientativa.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            El presupuesto definitivo lo elabora siempre el profesional asignado
            tras visitar el proyecto, validar los trabajos necesarios y valorar
            los materiales, la mano de obra y cualquier circunstancia particular.
          </p>
        </Container>
      </section>

      {/* FAQs */}
      <FAQAccordion items={[...FAQS].slice(0, 5)} />

      <CTASection />

      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
