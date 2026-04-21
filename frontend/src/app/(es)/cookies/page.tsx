import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import CookieSettingsButton from '@/components/layout/CookieSettingsButton';
import { EMAIL, LEGAL_DRAFT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Política de cookies de Anaid Grupo: qué cookies utilizamos, con qué finalidad y cómo gestionar tus preferencias en cualquier momento.',
  alternates: { canonical: '/cookies' },
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Política de cookies</h1>

        {LEGAL_DRAFT && (
          <div className="mb-6 p-4 rounded-lg border border-amber-300 bg-amber-50 text-sm text-amber-900">
            <strong>Documento en redacción.</strong> Los textos legales
            definitivos están pendientes de revisión jurídica. Esta página no
            está indexada en buscadores.
          </div>
        )}

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-xs italic">Última actualización: abril de 2026</p>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu
              dispositivo al visitar un sitio web. Permiten al sitio recordar
              tus preferencias, analizar el uso de la web y, en determinados
              casos, personalizar el contenido publicitario.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Base legal</h2>
            <p>
              El uso de cookies en este sitio web se rige por el artículo 22.2
              de la Ley 34/2002, de Servicios de la Sociedad de la Información
              (LSSICE), por el Reglamento (UE) 2016/679 (RGPD) y por la Guía
              de cookies de la Agencia Española de Protección de Datos (AEPD).
              Las cookies no estrictamente necesarias se instalan únicamente
              tras obtener tu consentimiento a través del banner de cookies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Categorías y cookies utilizadas</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-3 py-2 text-left font-medium">Categoría</th>
                    <th className="px-3 py-2 text-left font-medium">Proveedor</th>
                    <th className="px-3 py-2 text-left font-medium">Cookies / finalidad</th>
                    <th className="px-3 py-2 text-left font-medium">Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 align-top">Necesarias</td>
                    <td className="px-3 py-2 align-top">Anaid Grupo</td>
                    <td className="px-3 py-2 align-top">
                      Cookies técnicas de sesión para el funcionamiento básico
                      del sitio (mantener la sesión iniciada en el panel de
                      profesionales, prevenir CSRF, balanceo de carga).
                    </td>
                    <td className="px-3 py-2 align-top">Sesión</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 align-top">Necesarias</td>
                    <td className="px-3 py-2 align-top">CookieYes</td>
                    <td className="px-3 py-2 align-top">
                      Gestión del consentimiento y de las preferencias de
                      cookies (<em>cookieyes-consent</em>).
                    </td>
                    <td className="px-3 py-2 align-top">1 año</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 align-top">Analíticas</td>
                    <td className="px-3 py-2 align-top">Google (GA4 vía Google Tag Manager)</td>
                    <td className="px-3 py-2 align-top">
                      Medición del tráfico y del comportamiento de navegación
                      de forma agregada (<em>_ga</em>, <em>_ga_*</em>). Se
                      activa únicamente si aceptas las cookies analíticas.
                    </td>
                    <td className="px-3 py-2 align-top">Hasta 2 años</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2 align-top">Marketing</td>
                    <td className="px-3 py-2 align-top">Meta / Facebook Pixel</td>
                    <td className="px-3 py-2 align-top">
                      Medición de conversiones y público similar para campañas
                      en Facebook e Instagram (<em>_fbp</em>, <em>fr</em>). Se
                      activa únicamente si aceptas las cookies de marketing.
                    </td>
                    <td className="px-3 py-2 align-top">Hasta 90 días</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-2">
              Este sitio utiliza Google Tag Manager como contenedor de
              etiquetas. GTM por sí mismo no instala cookies publicitarias;
              son las etiquetas cargadas desde él (GA4, Meta Pixel) las que
              lo hacen, y siempre respetando tu consentimiento a través de
              Google Consent Mode v2.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Cómo gestionar tus preferencias</h2>
            <p>
              Al entrar por primera vez verás un banner de cookies donde puedes
              aceptar todas, rechazar todas o configurar por categoría. Puedes
              modificar tu decisión en cualquier momento desde el enlace
              <em>&quot;Configuración de cookies&quot;</em> del pie de página
              o directamente aquí:
            </p>
            <p>
              <CookieSettingsButton className="inline-block mt-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors">
                Abrir configuración de cookies
              </CookieSettingsButton>
            </p>
            <p className="mt-4">
              También puedes configurar tu navegador para aceptar o rechazar
              todas las cookies, o para que te avise cuando un sitio web
              intente instalar una cookie. Ten en cuenta que la desactivación
              de las cookies necesarias puede afectar al correcto funcionamiento
              del sitio.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Transferencias internacionales</h2>
            <p>
              Algunos proveedores citados (Google, Meta) están domiciliados
              fuera del Espacio Económico Europeo. Las transferencias se
              amparan en cláusulas contractuales tipo aprobadas por la
              Comisión Europea y en los marcos de adecuación aplicables
              (<em>Data Privacy Framework</em>).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Más información</h2>
            <p>
              Para más información sobre el tratamiento de tus datos, consulta
              nuestra{' '}
              <a href="/privacidad" className="text-primary underline">
                política de privacidad
              </a>
              . Si tienes dudas específicas sobre cookies, puedes escribirnos a{' '}
              <a href={`mailto:${EMAIL}`} className="text-primary underline">
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
