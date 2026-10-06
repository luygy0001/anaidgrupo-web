import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { EMAIL, PHONE, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Accesibilidad',
  description:
    'Declaración de accesibilidad de Construcciones Anaid: nivel de cumplimiento, cómo lo comprobamos y cómo avisarnos si encuentras una barrera.',
  alternates: { canonical: '/accesibilidad' },
  robots: { index: false },
};

// Fecha de la última revisión. Actualizarla cada vez que se repita la auditoría.
const ULTIMA_REVISION = '6 de octubre de 2026';

export default function AccesibilidadPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Declaración de accesibilidad</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-xs italic">Última revisión: {ULTIMA_REVISION}</p>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Nuestro compromiso</h2>
            <p>
              Queremos que cualquier persona pueda pedir su presupuesto y entender cómo trabajamos,
              también si usa un lector de pantalla, navega solo con el teclado, amplía el texto o
              tiene dificultades para distinguir colores. Esta web se ha diseñado para cumplir el
              nivel AA de las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2, que es el
              nivel que recoge la norma europea EN 301 549.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Cómo lo hemos comprobado</h2>
            <p>
              Revisión interna del {ULTIMA_REVISION}, sin auditoría externa por el momento:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Análisis automático de las páginas con la herramienta axe-core (reglas de WCAG 2.2 A y AA).</li>
              <li>Navegación completa con teclado y comprobación de que el foco se ve en fondos claros y oscuros.</li>
              <li>Contraste de textos y botones.</li>
              <li>Adaptación a pantallas de 320 píxeles de ancho sin desplazamiento horizontal.</li>
              <li>Respeto de la preferencia de «reducir movimiento» del sistema.</li>
              <li>Estructura de encabezados, etiquetas de formularios y textos alternativos de las imágenes.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Limitaciones conocidas</h2>
            <p>
              El formulario de presupuesto de la portada se está rediseñando para que todas sus
              etiquetas y mensajes de error se anuncien correctamente en los lectores de pantalla.
              Mientras tanto, puedes pedir tu presupuesto por teléfono o por WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Avísanos si encuentras una barrera</h2>
            <p>
              Si algo de esta web te resulta difícil de usar, dínoslo y te daremos la información por
              la vía que te venga mejor:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Correo: <a href={`mailto:${EMAIL}`} className="text-primary underline">{EMAIL}</a>
              </li>
              <li>
                Teléfono: <a href={`tel:${PHONE}`} className="text-primary underline">{PHONE_DISPLAY}</a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
