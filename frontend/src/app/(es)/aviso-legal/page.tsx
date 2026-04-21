import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { LEGAL, LEGAL_DRAFT, SITE_NAME, SITE_URL, EMAIL, PHONE, PHONE_DISPLAY, ADDRESS, INTERMEDIATION_DISCLAIMER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal de Anaid Grupo Construcción. Información sobre el titular, condiciones de uso y responsabilidad.',
  alternates: { canonical: '/aviso-legal' },
  robots: { index: false },
};

export default function AvisoLegalPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Aviso legal</h1>

        {LEGAL_DRAFT && (
          <div className="mb-6 p-4 rounded-lg border border-amber-300 bg-amber-50 text-sm text-amber-900">
            <strong>Documento en redacción.</strong> Los datos identificativos
            (CIF/NIF y datos mercantiles) se completarán antes de la publicación
            definitiva. Esta página no está indexada en buscadores.
          </div>
        )}

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-xs italic">Última actualización: abril de 2026</p>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Datos identificativos del titular</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
              Sociedad de la Información y de Comercio Electrónico (LSSICE), se facilitan los
              siguientes datos identificativos del titular de este sitio web:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Denominación comercial:</strong> {SITE_NAME}</li>
              <li><strong>Razón social:</strong> {LEGAL.razonSocial}</li>
              <li><strong>CIF/NIF:</strong> {LEGAL.cif}</li>
              <li><strong>Domicilio social:</strong> {ADDRESS}</li>
              <li><strong>Teléfono:</strong> {PHONE_DISPLAY}</li>
              <li><strong>Correo electrónico:</strong> {EMAIL}</li>
              <li><strong>Sitio web:</strong> {SITE_URL}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Objeto y naturaleza del servicio</h2>
            <p>{INTERMEDIATION_DISCLAIMER}</p>
            <p>
              {SITE_NAME} <strong>no es una empresa constructora ni ejecuta obras de ningún tipo</strong>.
              Su actividad se limita a la intermediación comercial: captación, análisis, clasificación
              y asignación de solicitudes a profesionales colaboradores independientes que operan bajo
              su propia razón social, licencias y seguros.
            </p>
            <p>
              El presente sitio web tiene por objeto facilitar información sobre los servicios de
              intermediación de {SITE_NAME}, así como permitir a los usuarios enviar solicitudes de
              proyecto a través de formularios, chat guiado y otros canales de comunicación habilitados.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Condiciones generales de uso</h2>
            <p>
              El acceso y navegación por este sitio web atribuye la condición de usuario, lo que implica
              la aceptación plena y sin reservas de todas las disposiciones incluidas en este aviso legal,
              así como de cualesquiera otras disposiciones legales que resulten de aplicación.
            </p>
            <p>El usuario se compromete a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hacer un uso adecuado y lícito del sitio web, de conformidad con la legislación vigente, la moral, las buenas costumbres y el orden público.</li>
              <li>No utilizar el sitio web con fines fraudulentos o contrarios a la buena fe.</li>
              <li>No introducir datos falsos en los formularios de contacto, solicitud de proyecto o registro profesional.</li>
              <li>No realizar acciones que puedan dañar, inutilizar, sobrecargar o deteriorar el sitio web o impedir su normal uso.</li>
            </ul>
            <p>
              {SITE_NAME} se reserva el derecho a denegar o retirar el acceso al sitio web sin
              necesidad de preaviso a aquellos usuarios que incumplan las presentes condiciones.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Propiedad intelectual e industrial</h2>
            <p>
              Todos los contenidos de este sitio web — incluyendo, a título enunciativo pero no
              limitativo, textos, fotografías, gráficos, imágenes, logotipos, marcas, iconos, diseño
              gráfico, código fuente, software y bases de datos — están protegidos por las leyes
              españolas e internacionales de propiedad intelectual e industrial y son titularidad de
              {' '}{SITE_NAME} o de sus legítimos licenciantes.
            </p>
            <p>
              Queda expresamente prohibida la reproducción, distribución, comunicación pública,
              transformación o cualquier otra forma de explotación de los contenidos, total o parcial,
              sin la autorización expresa y por escrito de {SITE_NAME}.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Exclusión de responsabilidad</h2>
            <p>{SITE_NAME} no se hace responsable de:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Los servicios prestados por los profesionales colaboradores asignados, ni de la calidad,
                precio, plazo, resultado o garantía de sus trabajos. La relación contractual se
                establece directamente entre el usuario y el profesional.
              </li>
              <li>
                Los daños o perjuicios que puedan derivarse de interferencias, interrupciones,
                virus informáticos, averías o desconexiones en el funcionamiento del sitio web.
              </li>
              <li>
                Los contenidos de terceros a los que se pueda acceder mediante enlaces desde este sitio web.
              </li>
              <li>
                La exactitud, veracidad o actualidad de los rangos de precios orientativos publicados,
                que tienen carácter meramente informativo y no constituyen una oferta vinculante.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Chat guiado y formularios</h2>
            <p>
              Este sitio web dispone de un chat guiado y formularios de solicitud que recogen datos
              personales del usuario. Dichos datos se tratan conforme a lo establecido en nuestra{' '}
              <a href="/privacidad" className="text-primary underline">política de privacidad</a>.
              El chat guiado no es un asistente de inteligencia artificial autónomo; se trata de un
              flujo de preguntas predefinidas diseñado para recopilar la información necesaria para
              analizar la solicitud del usuario.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Modificaciones</h2>
            <p>
              {SITE_NAME} se reserva el derecho a modificar en cualquier momento las condiciones
              contenidas en este aviso legal, la configuración y disponibilidad del sitio web, así
              como los contenidos publicados. Dichas modificaciones serán efectivas desde su publicación
              en el sitio web.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Legislación aplicable y jurisdicción</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para la resolución de
              cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, el
              usuario y {SITE_NAME} se someten a los juzgados y tribunales del domicilio del usuario
              consumidor, de conformidad con lo dispuesto en el artículo 90.2 del Real Decreto
              Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de
              la Ley General para la Defensa de los Consumidores y Usuarios. Para usuarios no
              consumidores, serán competentes los juzgados y tribunales de Madrid.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">9. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con este aviso legal, puede contactar con nosotros
              a través del correo electrónico{' '}
              <a href={`mailto:${EMAIL}`} className="text-primary underline">{EMAIL}</a>{' '}
              o llamando al{' '}
              <a href={`tel:${PHONE}`} className="text-primary underline">{PHONE_DISPLAY}</a>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
