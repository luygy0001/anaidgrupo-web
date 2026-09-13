import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CTASection from '@/components/sections/CTASection';
import IntermediationDisclaimer from '@/components/shared/IntermediationDisclaimer';
import { Brain, ScanSearch, BarChart3, Zap, Shield, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IA para reformas',
  description:
    'Descubre cómo Anaid Grupo usa inteligencia artificial para analizar, clasificar y asignar mejor cada proyecto de reforma en Madrid.',
  alternates: { canonical: '/ia-analisis-proyecto' },
};

const capabilities = [
  {
    icon: ScanSearch,
    title: 'Clasificación automática de solicitudes',
    text: 'La IA identifica el tipo de servicio, la complejidad estimada y los requisitos técnicos a partir de la descripción y las fotos del proyecto.',
  },
  {
    icon: Zap,
    title: 'Detección de urgencia',
    text: 'Las solicitudes urgentes se priorizan automáticamente para agilizar la respuesta y la asignación del profesional más adecuado.',
  },
  {
    icon: BarChart3,
    title: 'Scoring inteligente',
    text: 'Cada solicitud recibe una puntuación que refleja su nivel de completitud, urgencia y potencial, ayudando al equipo a gestionar el flujo de forma eficiente.',
  },
  {
    icon: Brain,
    title: 'Resumen estructurado para el profesional',
    text: 'Generamos un resumen claro y organizado del proyecto para que el profesional asignado tenga toda la información relevante desde el primer momento.',
  },
];

const limitations = [
  'La IA no sustituye la valoración técnica profesional.',
  'La IA no genera presupuestos definitivos.',
  'La decisión final de asignación siempre la controla Anaid Grupo.',
  'El presupuesto definitivo requiere visita y revisión por parte del profesional.',
  'La IA no ejecuta ni supervisa obras.',
];

export default function IAAnalisisPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
        <Container narrow>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-light text-accent-700 text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              Tecnología aplicada
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Cómo usamos IA para analizar mejor tu proyecto
            </h1>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              La inteligencia artificial nos ayuda a procesar las solicitudes de forma
              más rápida, ordenada y eficiente. No es magia: es tecnología al servicio
              de un mejor servicio.
            </p>
          </div>
        </Container>
      </section>

      {/* What the AI does */}
      <section className="section-padding">
        <Container>
          <h2 className="text-2xl font-bold text-center mb-10">
            Qué hace nuestra IA
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-6 rounded-xl bg-white border border-border"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                  <cap.icon className="w-5 h-5" />
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
            <AlertTriangle className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-bold">Qué NO hace nuestra IA</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Es importante ser transparentes sobre los límites de la tecnología
            que utilizamos. La IA es una herramienta de apoyo, no un sustituto del
            criterio profesional.
          </p>
          <ul className="space-y-3">
            {limitations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-error/10 text-error text-xs font-bold mt-0.5">
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
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Transparencia y control</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Toda la información que compartes se trata de forma confidencial y se
            utiliza exclusivamente para analizar y gestionar tu solicitud. La IA
            procesa los datos internamente para generar resúmenes y clasificaciones,
            pero todas las decisiones finales —especialmente la asignación del
            profesional y la validación del proyecto— las toma el equipo de Anaid
            Grupo en colaboración con el profesional asignado.
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
