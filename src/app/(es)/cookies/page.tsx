import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import CookieSettingsButton from '@/components/layout/CookieSettingsButton';
import { EMAIL, GTM_CONFIGURADO, LEGAL_DRAFT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Qué cookies y tecnologías parecidas usa la web de Construcciones Anaid, para qué sirven y cómo gestionarlas.',
  alternates: { canonical: '/cookies' },
  robots: { index: false },
};

// Lo que muestra esta página depende de GTM_CONFIGURADO (constants.ts): sin medición configurada
// no hay cookies que necesiten permiso. Si se añaden etiquetas en GTM además de GA4, añadirlas aquí.

const ENLACE = 'text-primary underline';
const CELDA = 'px-3 py-2 align-top';

interface Elemento {
  nombre: string;
  titular: string;
  finalidad: string;
  duracion: string;
}

// Web provisional: sin comprobación antirrobots (Turnstile) ni otras cookies técnicas. Solo
// existe el almacenamiento de la elección de cookies si se configura la medición (GTM).
const NECESARIAS: Elemento[] = GTM_CONFIGURADO
  ? [
      {
        nombre: 'anaid_cookie_consent_v1 (almacenamiento local)',
        titular: 'Construcciones Anaid',
        finalidad: 'Recordar tu elección sobre las cookies de análisis.',
        duracion: 'Hasta que la borres o cambies tu elección.',
      },
    ]
  : [];

const ANALITICAS: Elemento[] = GTM_CONFIGURADO
  ? [
      {
        nombre: '_ga y _ga_*',
        titular: 'Google (Google Analytics 4, a través de Google Tag Manager)',
        finalidad: 'Contar visitas y saber qué páginas se usan, de forma agregada. Solo si las aceptas.',
        duracion: 'Hasta 2 años.',
      },
    ]
  : [];

function TablaElementos({ titulo, elementos }: { titulo: string; elementos: Elemento[] }) {
  return (
    // Región desplazable en móvil: recibe el foco para moverla con el teclado (WCAG 2.1.1).
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={titulo}>
      <table className="w-full text-sm border border-border">
        <caption className="sr-only">{titulo}</caption>
        <thead>
          <tr className="bg-muted text-foreground">
            <th scope="col" className={`${CELDA} text-left font-medium`}>Qué</th>
            <th scope="col" className={`${CELDA} text-left font-medium`}>De quién</th>
            <th scope="col" className={`${CELDA} text-left font-medium`}>Para qué</th>
            <th scope="col" className={`${CELDA} text-left font-medium`}>Duración</th>
          </tr>
        </thead>
        <tbody>
          {elementos.map((e) => (
            <tr key={e.nombre} className="border-t border-border">
              <th scope="row" className={`${CELDA} text-left font-medium text-foreground`}>{e.nombre}</th>
              <td className={CELDA}>{e.titular}</td>
              <td className={CELDA}>{e.finalidad}</td>
              <td className={CELDA}>{e.duracion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Política de cookies</h1>

        {LEGAL_DRAFT && (
          <div className="mb-6 p-4 rounded-lg border border-amber-300 bg-amber-50 text-sm text-amber-900">
            <strong>Documento en redacción.</strong> Esta página no está indexada en buscadores.
          </div>
        )}

        <div className="text-muted-foreground space-y-8">
          <p className="text-xs italic">Última actualización: 15 de octubre de 2026</p>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Qué son las cookies</h2>
            <p>
              Son pequeños archivos que una web guarda en tu dispositivo. En esta página incluimos
              también tecnologías parecidas, como el almacenamiento local del navegador. Las que son
              necesarias para que la web funcione o sea segura no necesitan tu permiso; las demás, sí
              (artículo 22.2 de la Ley 34/2002 de servicios de la sociedad de la información y guía
              de cookies de la Agencia Española de Protección de Datos).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">2. Las que usamos</h2>
            <h3 className="text-base font-semibold text-foreground">Necesarias (no requieren tu permiso)</h3>
            {NECESARIAS.length > 0 ? (
              <TablaElementos titulo="Cookies y tecnologías necesarias" elementos={NECESARIAS} />
            ) : (
              <p>Ninguna: esta web no guarda cookies en tu dispositivo.</p>
            )}

            <h3 className="text-base font-semibold text-foreground">De análisis y de publicidad</h3>
            {ANALITICAS.length > 0 ? (
              <TablaElementos titulo="Cookies de análisis, solo con tu permiso" elementos={ANALITICAS} />
            ) : (
              <p>
                No usamos ninguna. Por eso no te mostramos un aviso de cookies: no hay nada que aceptar.
                Si algún día las usamos, te pediremos permiso antes y las detallaremos aquí.
              </p>
            )}
            <p>No usamos cookies de publicidad.</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">3. Cómo gestionarlas</h2>
            {GTM_CONFIGURADO && (
              <>
                <p>
                  La primera vez que entras verás un aviso para aceptar o rechazar las cookies de
                  análisis. Puedes cambiar tu decisión cuando quieras desde «Configurar cookies», en
                  el pie de la página, o aquí:
                </p>
                <p>
                  <CookieSettingsButton className="inline-block px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors">
                    Abrir configuración de cookies
                  </CookieSettingsButton>
                </p>
              </>
            )}
            <p>
              También puedes borrar o bloquear las cookies desde la configuración de tu navegador.
            </p>
          </div>

          {GTM_CONFIGURADO && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">4. Transferencias fuera de la Unión Europea</h2>
              <p>
                Google es una empresa de Estados Unidos. Las transferencias se amparan en el Marco de
                Privacidad de Datos UE-EE. UU. y en las cláusulas contractuales tipo aprobadas por la
                Comisión Europea.
              </p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">{GTM_CONFIGURADO ? '5' : '4'}. Más información</h2>
            <p>
              Lo demás sobre tus datos está en la{' '}
              <Link href="/privacidad" className={ENLACE}>política de privacidad</Link>. Si tienes
              dudas sobre las cookies, escríbenos a{' '}
              <a href={`mailto:${EMAIL}`} className={ENLACE}>{EMAIL}</a>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
