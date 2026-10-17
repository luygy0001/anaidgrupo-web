import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import JsonLd from '@/components/seo/JsonLd';
import { Phone, Mail, MessageCircle, Clock, MapPin } from 'lucide-react';
import {
  PHONE,
  PHONE_DISPLAY,
  EMAIL,
  WHATSAPP_URL,
  HORARIO_DETAIL,
  COVERAGE_AREA,
  RESPUESTA_PLAZO,
} from '@/lib/constants';
import { localBusinessSchema } from '@/lib/seo-schemas';
import FormConsulta from '@/components/forms/FormConsulta';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta con Construcciones Anaid por teléfono, WhatsApp, correo o formulario. Te respondemos en menos de 48 horas laborables, de lunes a viernes.',
  alternates: { canonical: '/contacto' },
};

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />

      <section className="section-padding">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold">Contacto</h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Escríbenos, llámanos o envía un WhatsApp. Te respondemos en
              menos de 48 horas laborables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Contact info */}
            <div className="space-y-6 min-w-0">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-primary/5 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-semibold text-foreground">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-green-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                  <p className="font-semibold text-foreground">Hablar por WhatsApp</p>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-primary/5 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground break-all">{EMAIL}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horario de atención</p>
                  <p className="font-semibold text-foreground">
                    {HORARIO_DETAIL.tramos.map((tramo) => (
                      <span key={tramo} className="block">
                        {tramo}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{RESPUESTA_PLAZO}.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Zona de trabajo</p>
                  <p className="font-semibold text-foreground">{COVERAGE_AREA}</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="min-w-0">
              <h2 className="text-xl font-bold mb-4">Envíanos un mensaje</h2>
              <FormConsulta />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
