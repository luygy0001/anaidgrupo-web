import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import FAQAccordion from '@/components/sections/FAQAccordion';

export const metadata: Metadata = {
  title: 'Licencias y dudas antes de reformar',
  description: 'Cuándo necesitas licencia de obra, qué permisos pedir y dudas frecuentes antes de iniciar una reforma en Madrid.',
  alternates: { canonical: '/guias-precios/licencias-dudas-reforma' },
};

const faqs = [
  { question: '¿Cuándo necesito licencia de obra?', answer: 'Necesitas licencia de obra mayor cuando se modifican elementos estructurales, fachadas o se cambia el uso del local. Para obras menores como cambiar suelos, sanitarios o pintar, suele bastar con una comunicación previa o declaración responsable, dependiendo del municipio.' },
  { question: '¿Qué es una comunicación previa?', answer: 'Es un trámite más sencillo que la licencia de obra. Se presenta ante el ayuntamiento y, en muchos casos, permite iniciar la obra de forma inmediata o en unos pocos días.' },
  { question: '¿Necesito permiso de la comunidad de vecinos?', answer: 'Si la obra afecta a zonas comunes, fachada o estructura, sí necesitas autorización de la comunidad. Para obras dentro de tu vivienda que no afecten a la estructura, normalmente no es necesario, aunque conviene avisar.' },
  { question: '¿Cuánto cuesta una licencia de obra?', answer: 'El coste varía según el municipio y el tipo de obra. Una comunicación previa puede costar entre 50 y 300 €. Una licencia de obra mayor puede superar los 1.000 €, ya que incluye tasas municipales y el ICIO (Impuesto sobre Construcciones).' },
  { question: '¿Quién tramita la licencia?', answer: 'Normalmente el arquitecto o arquitecto técnico que redacta el proyecto. El profesional asignado por Anaid Grupo puede orientarte sobre si necesitas un técnico para tu caso.' },
  { question: '¿Puedo reformar un piso de alquiler?', answer: 'Sí, pero necesitas autorización por escrito del propietario. Es recomendable dejar por escrito qué modificaciones se van a hacer y quién asume el coste.' },
];

export default function LicenciasPage() {
  return (
    <>
      <section className="section-padding">
        <Container narrow>
          <h1 className="text-3xl sm:text-4xl font-bold">Licencias y dudas básicas antes de reformar</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Antes de iniciar una reforma, es importante saber si necesitas permiso, qué trámites hay que hacer y cómo evitar problemas. Resolvemos las dudas más frecuentes.
          </p>
        </Container>
      </section>

      <FAQAccordion items={faqs} title="Preguntas sobre licencias y permisos" />

      <CTASection title="¿Tienes dudas sobre tu proyecto?" subtitle="Cuéntanos tu caso y te orientamos sobre los primeros pasos." />
    </>
  );
}
