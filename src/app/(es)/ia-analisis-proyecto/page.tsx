import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';
import Link from 'next/link';
import { Brain, FileText, Layers, Repeat, Shield, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo usamos la IA',
  description:
    'Qué hace la inteligencia artificial en Construcciones Anaid: prepara tu presupuesto en menos de 1 hora con tus datos. Qué no hace y qué decide siempre una persona.',
  alternates: { canonical: '/ia-analisis-proyecto' },
};

// Transparencia sobre IA (Reglamento (UE) 2024/1689, art. 50, y RGPD, arts. 13 y 22).
// Solo hechos confirmados por Luis: si cambia el uso de la IA, actualizar esta página
// y la política de privacidad a la vez.
const capabilities = [
  {
    icon: FileText,
    title: 'Prepara tu presupuesto',
    text: 'Con los datos del formulario y la calidad de acabados que eliges, un sistema de inteligencia artificial calcula tu presupuesto y redacta su descripción. Funciona las 24 horas: te llega en menos de 1 hora.',
  },
  {
    icon: Layers,
    title: 'Explica qué incluye cada calidad',
    text: 'Cada calidad (media-baja, media o alta) tiene materiales de referencia con un precio máximo. La IA usa esa información para contarte qué entra en tu presupuesto. Si luego eliges un material más caro, pagas solo la diferencia.',
  },
  {
    icon: Repeat,
    title: 'Un proceso automático controla los presupuestos repetidos',
    text: 'Si ya has pedido un presupuesto con el mismo correo o teléfono, te avisamos antes de preparar otro: el primero es gratis y los siguientes cuestan 150 € (inversores e inmobiliarias: uno gratis cada semana).',
  },
];

const limitations = [
  'No visita tu obra: antes de contratar, una persona de Construcciones Anaid la visita para comprobar que todo coincide con lo que nos contaste.',
  'No fija el precio final: lo fija el profesional que hará la obra y queda cerrado en el contrato que firmas con él.',
  'No elige al profesional: la asignación la decide una persona de Construcciones Anaid.',
  'No ejecuta ni supervisa la obra.',
  'No tiene la última palabra: si no estás de acuerdo con tu presupuesto o con el cobro de un presupuesto adicional, escríbenos y lo revisa una persona.',
];

export default function IAAnalisisPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
        <Container narrow>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light text-accent-700 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" aria-hidden="true" />
              Con tecnología de PyMExpert
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Cómo usamos la inteligencia artificial en tu presupuesto
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Usamos inteligencia artificial para una tarea concreta: preparar tu presupuesto
              en menos de 1 hora. Te contamos qué hace, qué no hace y dónde decide siempre
              una persona.
            </p>
          </div>
        </Container>
      </section>

      {/* What the AI does */}
      <section className="section-padding">
        <Container>
          <h2 className="text-2xl font-bold text-center mb-10">
            Qué hace la IA y qué es automático
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-6 rounded-xl bg-white border border-border"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                  <cap.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {cap.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What the AI does NOT do */}
      <section className="section-padding bg-muted">
        <Container narrow>
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-accent" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Qué no hace la IA</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            La IA es una herramienta para darte un número rápido y claro. Las decisiones
            que importan las toman personas.
          </p>
          <ul className="space-y-3">
            {limitations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span aria-hidden="true" className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-error/10 text-error text-xs font-bold mt-0.5">
                  ✕
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Trust */}
      <section className="section-padding">
        <Container narrow>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Tus datos y la IA</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Usamos tus datos solo para preparar y enviarte el presupuesto y para gestionar
            tu obra. En la{' '}
            <Link href="/privacidad" className="text-primary underline">
              política de privacidad
            </Link>{' '}
            te explicamos qué proveedores intervienen y cuáles son tus derechos, incluido el
            de pedir que una persona revise cualquier decisión automática.
          </p>
        </Container>
      </section>

      <CTASection />

      <Container className="py-6">
        <IntermediationDisclaimer variant="subtle" />
      </Container>
    </>
  );
}
