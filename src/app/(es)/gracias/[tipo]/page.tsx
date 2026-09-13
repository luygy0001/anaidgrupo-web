import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ThankYouFire from '@/components/tracking/ThankYouFire';
import { CheckCircle2, Clock, Phone, ArrowRight } from 'lucide-react';
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';

type Tipo = 'contacto' | 'solicitud' | 'profesional' | 'chat';

const TIPOS: Record<Tipo, { title: string; heading: string; subheading: string; next: string[] }> = {
  contacto: {
    title: 'Mensaje enviado — Gracias',
    heading: '¡Mensaje recibido!',
    subheading:
      'Hemos recibido tu consulta y te contactaremos lo antes posible.',
    next: [
      'Revisamos tu mensaje en horario laboral (L-V, 9:00–14:00 y 16:00–19:00).',
      'Te responderemos en menos de 24 horas laborables.',
      'Si tu consulta es urgente, puedes llamarnos o escribirnos por WhatsApp.',
    ],
  },
  solicitud: {
    title: 'Solicitud recibida — Gracias',
    heading: '¡Solicitud recibida correctamente!',
    subheading:
      'Hemos recibido tu solicitud de proyecto. Nuestro equipo la analizará y te asignará al profesional más adecuado.',
    next: [
      'Analizamos tu solicitud y su encaje con la red de profesionales validados.',
      'Te contactamos en menos de 24 horas laborables para confirmar detalles.',
      'El profesional asignado visitará tu proyecto y te entregará un presupuesto definitivo sin compromiso.',
    ],
  },
  profesional: {
    title: 'Solicitud de colaboración enviada — Gracias',
    heading: '¡Solicitud enviada!',
    subheading:
      'Hemos recibido tu propuesta de colaboración. Revisaremos tu perfil y te contactaremos en breve.',
    next: [
      'Revisamos tu perfil, especialidades y zonas de trabajo.',
      'Si encaja con la red, te contactamos para una validación más detallada.',
      'Gracias por tu interés en colaborar con Anaid Grupo.',
    ],
  },
  chat: {
    title: 'Solicitud recibida — Gracias',
    heading: '¡Gracias por contactar!',
    subheading:
      'Hemos recibido la información que nos has facilitado por chat. Te contactaremos para avanzar con tu proyecto.',
    next: [
      'Revisamos tu solicitud y la asignamos al profesional adecuado.',
      'Te contactaremos en menos de 24 horas laborables.',
      'Puedes cerrar esta ventana con tranquilidad — tus datos están guardados.',
    ],
  },
};

export function generateStaticParams() {
  return (Object.keys(TIPOS) as Tipo[]).map((tipo) => ({ tipo }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tipo: string }>;
}): Promise<Metadata> {
  const { tipo } = await params;
  const data = TIPOS[tipo as Tipo];
  return {
    title: data?.title ?? 'Gracias',
    robots: { index: false, follow: true },
    alternates: { canonical: `/gracias/${tipo}` },
  };
}

export default async function GraciasPage({
  params,
  searchParams,
}: {
  params: Promise<{ tipo: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { tipo } = await params;
  const { service } = await searchParams;

  const data = TIPOS[tipo as Tipo];
  if (!data) notFound();

  return (
    <section className="section-padding bg-gradient-to-br from-accent/5 via-transparent to-primary/5">
      <ThankYouFire conversionType={tipo} service={service} />

      <Container narrow>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 text-accent mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {data.heading}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {data.subheading}
          </p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto p-6 rounded-2xl bg-white border border-border shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <h2 className="text-lg font-semibold text-foreground">
              Qué pasa ahora
            </h2>
          </div>
          <ol className="space-y-3 text-sm text-foreground/90">
            {data.next.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 max-w-2xl mx-auto grid sm:grid-cols-2 gap-3">
          <Button href="/servicios" fullWidth>
            Ver nuestros servicios
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button href="/" variant="outline" fullWidth>
            Volver al inicio
          </Button>
        </div>

        <div className="mt-6 max-w-2xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-3 text-sm text-muted-foreground">
          <span>¿Necesitas contactar ya?</span>
          <div className="flex gap-3">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-1.5 text-primary hover:underline"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
