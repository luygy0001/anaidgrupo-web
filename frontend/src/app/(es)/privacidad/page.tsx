import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { LEGAL, LEGAL_DRAFT, SITE_NAME, SITE_URL, EMAIL, PHONE, PHONE_DISPLAY, ADDRESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad de Anaid Grupo Construcción. Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Política de privacidad</h1>

        {LEGAL_DRAFT && (
          <div className="mb-6 p-4 rounded-lg border border-amber-300 bg-amber-50 text-sm text-amber-900">
            <strong>Documento en redacción.</strong> Los datos identificativos
            del responsable (CIF/NIF) se completarán antes de la publicación
            definitiva. Esta página no está indexada en buscadores.
          </div>
        )}

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-xs italic">Última actualización: abril de 2026</p>

          <p>
            En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27
            de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al
            tratamiento de datos personales (RGPD), y de la Ley Orgánica 3/2018, de 5 de diciembre,
            de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le
            informamos de lo siguiente:
          </p>

          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Responsable del tratamiento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Responsable:</strong> {LEGAL.razonSocial}</li>
              <li><strong>CIF/NIF:</strong> {LEGAL.cif}</li>
              <li><strong>Domicilio:</strong> {ADDRESS}</li>
              <li><strong>Correo electrónico:</strong> <a href={`mailto:${EMAIL}`} className="text-primary underline">{EMAIL}</a></li>
              <li><strong>Teléfono:</strong> <a href={`tel:${PHONE}`} className="text-primary underline">{PHONE_DISPLAY}</a></li>
              <li><strong>Sitio web:</strong> {SITE_URL}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. Datos que recogemos</h2>
            <p>Recabamos datos personales a través de los siguientes canales:</p>

            <h3 className="text-base font-semibold text-foreground mt-4">a) Formulario de solicitud de proyecto</h3>
            <p>Datos recogidos: nombre completo, teléfono, email, código postal, descripción del proyecto, tipo de servicio, nivel de urgencia y, opcionalmente, fotografías del proyecto.</p>

            <h3 className="text-base font-semibold text-foreground mt-4">b) Chat guiado</h3>
            <p>
              Este sitio web dispone de un chat guiado (no un chatbot de inteligencia artificial
              autónomo) que recoge los mismos datos que el formulario de solicitud mediante un flujo
              de preguntas predefinidas. Los datos proporcionados a través del chat se almacenan y
              tratan con las mismas finalidades y garantías que los datos del formulario.
            </p>

            <h3 className="text-base font-semibold text-foreground mt-4">c) Formulario de contacto</h3>
            <p>Datos recogidos: nombre, email, teléfono (opcional) y mensaje.</p>

            <h3 className="text-base font-semibold text-foreground mt-4">d) Formulario de incorporación de profesionales</h3>
            <p>Datos recogidos: nombre completo, empresa, email, teléfono, especialidades, zonas de trabajo y descripción de actividad.</p>

            <h3 className="text-base font-semibold text-foreground mt-4">e) Panel de usuarios registrados</h3>
            <p>Datos recogidos: email y contraseña para el acceso al panel privado de profesionales colaboradores.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Finalidad del tratamiento</h2>
            <p>Los datos personales recabados se tratan con las siguientes finalidades:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gestionar las solicitudes de proyecto enviadas por los usuarios a través de formularios, chat guiado u otros canales.</li>
              <li>Analizar, clasificar y puntuar cada solicitud para asignarla al profesional colaborador más adecuado según especialidad, zona y disponibilidad.</li>
              <li>Contactar al usuario para dar seguimiento a su solicitud y facilitar la comunicación con el profesional asignado.</li>
              <li>Gestionar las solicitudes de incorporación de profesionales colaboradores a la red de {SITE_NAME}.</li>
              <li>Responder a las consultas recibidas a través del formulario de contacto.</li>
              <li>Gestionar el acceso y la funcionalidad del panel privado de profesionales.</li>
              <li>Cumplir con las obligaciones legales aplicables.</li>
            </ul>
            <p>
              <strong>No realizamos envío de comunicaciones comerciales</strong> salvo que el usuario
              haya prestado su consentimiento expreso e inequívoco para ello.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Base legal del tratamiento</h2>
            <p>La base legal para el tratamiento de los datos personales es:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Consentimiento del interesado</strong> (art. 6.1.a RGPD): al marcar la casilla
                de aceptación de esta política de privacidad en los formularios y el chat guiado, el
                usuario presta su consentimiento libre, específico, informado e inequívoco para el
                tratamiento de sus datos.
              </li>
              <li>
                <strong>Ejecución de medidas precontractuales</strong> (art. 6.1.b RGPD): los datos
                facilitados para la solicitud de proyecto se tratan en el marco de la prestación del
                servicio de intermediación solicitado por el usuario.
              </li>
              <li>
                <strong>Interés legítimo</strong> (art. 6.1.f RGPD): para la gestión interna, mejora
                del servicio y prevención de fraude.
              </li>
              <li>
                <strong>Cumplimiento de obligaciones legales</strong> (art. 6.1.c RGPD): cuando sea
                necesario para cumplir con la legislación aplicable.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Destinatarios de los datos</h2>
            <p>Los datos personales podrán ser comunicados a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Profesionales colaboradores:</strong> los datos de contacto y la descripción
                del proyecto del usuario se compartirán con el profesional colaborador asignado a su
                solicitud, exclusivamente para la gestión y ejecución del proyecto solicitado.
              </li>
              <li>
                <strong>Proveedores de servicios:</strong> proveedores de alojamiento web (Hostinger),
                correo electrónico y herramientas de gestión necesarias para la operativa del servicio,
                que actúan como encargados del tratamiento conforme al artículo 28 del RGPD.
              </li>
              <li>
                <strong>Autoridades públicas:</strong> cuando exista obligación legal de comunicar los
                datos a jueces, tribunales, administraciones públicas u organismos competentes.
              </li>
            </ul>
            <p>
              No se realizan transferencias internacionales de datos fuera del Espacio Económico
              Europeo (EEE).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Plazo de conservación</h2>
            <p>Los datos personales se conservarán durante los siguientes plazos:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Solicitudes de proyecto:</strong> mientras dure la gestión de la solicitud y,
                una vez finalizada, durante los plazos de prescripción legalmente aplicables (mínimo
                3 años conforme al artículo 1.964 del Código Civil).
              </li>
              <li>
                <strong>Datos de contacto:</strong> mientras se mantenga la relación y, posteriormente,
                durante los plazos de prescripción legal.
              </li>
              <li>
                <strong>Datos de profesionales colaboradores:</strong> mientras se mantenga la relación
                de colaboración activa.
              </li>
              <li>
                <strong>Datos del chat guiado:</strong> se conservarán asociados a la solicitud generada
                y seguirán los mismos plazos que las solicitudes de proyecto.
              </li>
            </ul>
            <p>
              Una vez transcurridos los plazos indicados, los datos serán suprimidos o, en su caso,
              bloqueados conforme a la normativa vigente.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">7. Derechos del interesado</h2>
            <p>
              De conformidad con el RGPD y la LOPDGDD, el usuario puede ejercer en cualquier momento
              los siguientes derechos:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Acceso:</strong> obtener confirmación de si se están tratando sus datos y acceder a los mismos.</li>
              <li><strong>Rectificación:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando, entre otros motivos, ya no sean necesarios para la finalidad para la que fueron recogidos.</li>
              <li><strong>Limitación del tratamiento:</strong> solicitar la limitación del tratamiento en los supuestos previstos en el artículo 18 del RGPD.</li>
              <li><strong>Portabilidad:</strong> recibir los datos en un formato estructurado, de uso común y lectura mecánica, y transmitirlos a otro responsable.</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
              <li><strong>Revocación del consentimiento:</strong> retirar el consentimiento prestado en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.</li>
            </ul>
            <p>
              Para ejercer estos derechos, el usuario puede dirigirse a{' '}
              <a href={`mailto:${EMAIL}`} className="text-primary underline">{EMAIL}</a>,
              indicando en el asunto &quot;Ejercicio de derechos RGPD&quot; y adjuntando copia de su
              documento de identidad.
            </p>
            <p>
              Asimismo, el usuario tiene derecho a presentar una reclamación ante la Agencia Española
              de Protección de Datos (AEPD) en{' '}
              <span className="text-primary">www.aepd.es</span>, si considera que el tratamiento de
              sus datos no se ajusta a la normativa vigente.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">8. Medidas de seguridad</h2>
            <p>
              {SITE_NAME} ha adoptado las medidas técnicas y organizativas adecuadas para garantizar
              la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o
              acceso no autorizado, de conformidad con lo establecido en el artículo 32 del RGPD.
              Entre otras medidas:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cifrado de las comunicaciones mediante protocolo HTTPS/TLS.</li>
              <li>Almacenamiento seguro de contraseñas mediante algoritmos de hash.</li>
              <li>Control de acceso basado en roles para el panel de administración.</li>
              <li>Copias de seguridad periódicas de la base de datos.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">9. Uso de cookies</h2>
            <p>
              Este sitio web puede utilizar cookies propias y de terceros. Para más información,
              consulte nuestra{' '}
              <a href="/cookies" className="text-primary underline">política de cookies</a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">10. Modificaciones</h2>
            <p>
              {SITE_NAME} se reserva el derecho a modificar la presente política de privacidad para
              adaptarla a novedades legislativas o jurisprudenciales, así como a cambios en la
              operativa del servicio. Cualquier modificación será publicada en esta misma página
              con indicación de la fecha de actualización.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">11. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con esta política de privacidad o con el
              tratamiento de sus datos personales, puede contactar con nosotros en{' '}
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
