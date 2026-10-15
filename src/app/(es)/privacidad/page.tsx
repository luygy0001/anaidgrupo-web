import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { LEGAL, LEGAL_DRAFT, SITE_NAME, EMAIL, PHONE, PHONE_DISPLAY, ADDRESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Qué datos tratamos en Construcciones Anaid cuando nos escribes, para qué, con quién los compartimos, cuánto tiempo los guardamos y cómo ejercer tus derechos.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false },
};

// Versión de la web provisional (rama release/web-basica, 15-10-2026): un formulario de consulta
// que llega por correo a info@ (Hostinger). Sin IA, sin automatizaciones ni Turnstile. Al publicar
// la versión completa, vuelve la política de la rama fix/contenido-real-y-formularios.

const ENLACE = 'text-primary underline';
const CELDA = 'px-3 py-2 align-top';

// En móvil las tablas se desplazan en horizontal: la región recibe el foco para poder moverla con
// el teclado (WCAG 2.1.1) y se anuncia con el título de la tabla.
function Tabla({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={titulo}>
      <table className="w-full text-sm border border-border">
        <caption className="sr-only">{titulo}</caption>
        {children}
      </table>
    </div>
  );
}

const FINALIDADES: { finalidad: string; base: string }[] = [
  {
    finalidad:
      'Contestar tu consulta por el formulario, WhatsApp, teléfono o correo y, si sigues adelante, preparar tu presupuesto y organizar la visita a la obra.',
    base: 'Aplicar las medidas precontractuales que nos pides (art. 6.1.b RGPD) o nuestro interés legítimo en atender a quien nos escribe (art. 6.1.f).',
  },
  {
    finalidad:
      'Pasar tu solicitud al profesional que hará la obra, si decides seguir adelante, y coordinar y seguir la obra.',
    base: 'Medidas precontractuales y la relación que mantienes con nosotros (art. 6.1.b).',
  },
  {
    finalidad: 'Proteger la web frente a robots y envíos abusivos.',
    base: 'Interés legítimo en la seguridad de la web (art. 6.1.f).',
  },
  {
    finalidad: 'Cumplir obligaciones legales, por ejemplo fiscales o requerimientos de autoridades.',
    base: 'Obligación legal (art. 6.1.c).',
  },
];

const PROVEEDORES: { nombre: string; uso: string; lugar: string }[] = [
  {
    nombre: 'Hostinger',
    uso: 'Servidor de la web y buzones de correo de @construccionesanaid.com, donde recibimos tu consulta.',
    lugar: 'Servidor de la web en Fráncfort (Alemania).',
  },
];

const PLAZOS: { datos: string; plazo: string }[] = [
  {
    datos: 'Consultas que no llegan a obra',
    plazo: '12 meses desde nuestro último contacto. Después se borran.',
  },
  {
    datos: 'Si contratas la obra con el profesional',
    plazo:
      'Mientras dure la obra y su seguimiento. Después, bloqueados mientras puedan exigirse responsabilidades (5 años con carácter general) y durante los plazos de la ley fiscal; luego se borran.',
  },
  { datos: 'Dirección IP para limitar envíos repetidos', plazo: '15 minutos, solo en la memoria del servidor.' },
];

export default function PrivacidadPage() {
  return (
    <section className="section-padding">
      <Container narrow>
        <h1 className="text-3xl font-bold mb-8">Política de privacidad</h1>

        {LEGAL_DRAFT && (
          <div className="mb-6 p-4 rounded-lg border border-amber-300 bg-amber-50 text-sm text-amber-900">
            <strong>Documento en redacción.</strong> Esta página no está indexada en buscadores.
          </div>
        )}

        <div className="text-muted-foreground space-y-8">
          <p className="text-xs italic">Última actualización: 15 de octubre de 2026</p>

          <p>
            Aquí te contamos, sin letra pequeña, qué datos tuyos tratamos, para qué, con quién los
            compartimos y qué derechos tienes. Aplicamos el Reglamento General de Protección de Datos
            (RGPD) y la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los
            derechos digitales (LOPDGDD).
          </p>

          <div className="p-5 rounded-xl border border-border bg-muted">
            <h2 className="text-lg font-semibold text-foreground mb-3">En resumen</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                Tus datos los trata {LEGAL.titular}, con el nombre comercial {SITE_NAME}.
              </li>
              <li>
                Los usamos para contestarte y, si sigues adelante, preparar tu presupuesto y pasar tu
                obra al profesional que la hará.
              </li>
              <li>
                Tu consulta nos llega por correo y la lee y contesta una persona. No usamos
                inteligencia artificial ni decisiones automáticas con tus datos.
              </li>
              <li>No vendemos tus datos ni te enviamos publicidad.</li>
              <li>
                Puedes pedir verlos, corregirlos o borrarlos escribiendo a{' '}
                <a href={`mailto:${EMAIL}`} className={ENLACE}>{EMAIL}</a>.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Quién trata tus datos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Responsable:</strong> {LEGAL.titular} (nombre comercial: {SITE_NAME})</li>
              <li><strong>NIF:</strong> {LEGAL.nif}</li>
              <li><strong>Domicilio:</strong> {ADDRESS}</li>
              <li><strong>Correo:</strong> <a href={`mailto:${EMAIL}`} className={ENLACE}>{EMAIL}</a></li>
              <li><strong>Teléfono:</strong> <a href={`tel:${PHONE}`} className={ENLACE}>{PHONE_DISPLAY}</a></li>
            </ul>
            <p className="mt-3">
              {SITE_NAME} no ejecuta obras: estudia tu solicitud, prepara el presupuesto y te pone en
              contacto con un profesional autónomo, que es quien firma contigo el contrato de obra.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">2. Qué datos tratamos</h2>
            <p>
              Solo los que tú nos das y los técnicos imprescindibles para que la web funcione con
              seguridad. No compramos datos ni los sacamos de otras fuentes.
            </p>
            <h3 className="text-base font-semibold text-foreground">Formulario de consulta</h3>
            <p>Nombre, teléfono, correo, tipo de reforma, tu mensaje y la página desde la que nos escribes.</p>
            <h3 className="text-base font-semibold text-foreground">WhatsApp, teléfono y correo</h3>
            <p>Lo que nos cuentes y las fotos que nos envíes.</p>
            <h3 className="text-base font-semibold text-foreground">Datos técnicos</h3>
            <p>Tu dirección IP, solo para limitar los envíos repetidos del formulario.</p>
            <p>
              No necesitamos datos de salud ni otros datos especialmente protegidos: por favor, no los
              incluyas en el mensaje.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">3. Para qué los usamos y con qué base legal</h2>
            <Tabla titulo="Finalidades del tratamiento y su base legal">
              <thead>
                <tr className="bg-muted text-foreground">
                  <th scope="col" className={`${CELDA} text-left font-medium`}>Para qué</th>
                  <th scope="col" className={`${CELDA} text-left font-medium`}>Base legal</th>
                </tr>
              </thead>
              <tbody>
                {FINALIDADES.map((f) => (
                  <tr key={f.finalidad} className="border-t border-border">
                    <td className={CELDA}>{f.finalidad}</td>
                    <td className={CELDA}>{f.base}</td>
                  </tr>
                ))}
              </tbody>
            </Tabla>
            <p>
              No te enviamos publicidad. Si algún día quisiéramos hacerlo, antes te pediríamos permiso
              aparte.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Inteligencia artificial y decisiones automáticas</h2>
            <p>
              En esta web no usamos inteligencia artificial con tus datos ni tomamos decisiones
              automáticas sobre ti: tu consulta la lee y la contesta una persona.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">5. Con quién compartimos tus datos</h2>
            <h3 className="text-base font-semibold text-foreground">El profesional que hará tu obra</h3>
            <p>
              Si decides seguir adelante, pasamos tus datos de contacto y los de la obra al profesional
              autónomo asignado. Él firma contigo el contrato de obra y, desde ese momento, trata tus
              datos como responsable para ejecutarla.
            </p>
            <h3 className="text-base font-semibold text-foreground">Proveedores que trabajan para nosotros</h3>
            <p>
              Solo tratan los datos siguiendo nuestras instrucciones y con un contrato de encargo de
              tratamiento (art. 28 RGPD):
            </p>
            <Tabla titulo={`Proveedores que tratan datos por cuenta de ${SITE_NAME}`}>
              <thead>
                <tr className="bg-muted text-foreground">
                  <th scope="col" className={`${CELDA} text-left font-medium`}>Proveedor</th>
                  <th scope="col" className={`${CELDA} text-left font-medium`}>Para qué</th>
                  <th scope="col" className={`${CELDA} text-left font-medium`}>Dónde</th>
                </tr>
              </thead>
              <tbody>
                {PROVEEDORES.map((p) => (
                  <tr key={p.nombre} className="border-t border-border">
                    <th scope="row" className={`${CELDA} text-left font-medium text-foreground`}>{p.nombre}</th>
                    <td className={CELDA}>{p.uso}</td>
                    <td className={CELDA}>{p.lugar}</td>
                  </tr>
                ))}
              </tbody>
            </Tabla>
            <h3 className="text-base font-semibold text-foreground">WhatsApp</h3>
            <p>
              Si nos escribes por WhatsApp, WhatsApp (WhatsApp Ireland Limited, del grupo Meta) trata
              esos mensajes según sus propias condiciones y su política de privacidad.
            </p>
            <h3 className="text-base font-semibold text-foreground">Autoridades</h3>
            <p>Solo cuando la ley nos obligue, por ejemplo jueces o la Agencia Tributaria.</p>
            <p>No vendemos ni cedemos tus datos a nadie más.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Transferencias fuera de la Unión Europea</h2>
            <p>
              Si usas WhatsApp, Meta es un grupo con sede en Estados Unidos y puede tratar datos allí.
              Esas transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. y en las
              cláusulas contractuales tipo aprobadas por la Comisión Europea. Si quieres más
              información, escríbenos a{' '}
              <a href={`mailto:${EMAIL}`} className={ENLACE}>{EMAIL}</a>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">7. Cuánto tiempo guardamos tus datos</h2>
            <Tabla titulo="Plazos de conservación de los datos">
              <thead>
                <tr className="bg-muted text-foreground">
                  <th scope="col" className={`${CELDA} text-left font-medium`}>Datos</th>
                  <th scope="col" className={`${CELDA} text-left font-medium`}>Plazo</th>
                </tr>
              </thead>
              <tbody>
                {PLAZOS.map((p) => (
                  <tr key={p.datos} className="border-t border-border">
                    <th scope="row" className={`${CELDA} text-left font-medium text-foreground`}>{p.datos}</th>
                    <td className={CELDA}>{p.plazo}</td>
                  </tr>
                ))}
              </tbody>
            </Tabla>
            <p>
              Sobre las cookies, lo explicamos en la{' '}
              <Link href="/cookies" className={ENLACE}>política de cookies</Link>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">8. Tus derechos</h2>
            <p>Puedes pedirnos en cualquier momento:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Acceso:</strong> saber qué datos tuyos tenemos.</li>
              <li><strong>Rectificación:</strong> corregir los que estén mal.</li>
              <li><strong>Supresión:</strong> borrarlos cuando ya no hagan falta.</li>
              <li><strong>Oposición y limitación:</strong> que dejemos de usarlos o los usemos solo para algunas cosas.</li>
              <li><strong>Portabilidad:</strong> recibirlos en un formato que puedas llevar a otra empresa.</li>
            </ul>
            <p>
              Escríbenos a <a href={`mailto:${EMAIL}`} className={ENLACE}>{EMAIL}</a> con el asunto
              «Protección de datos» e indica qué quieres. Te contestamos en un mes como máximo. Solo te
              pediremos que acredites tu identidad si tenemos dudas razonables de que eres tú.
            </p>
            <p>
              Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de
              Protección de Datos en{' '}
              <a href="https://www.aepd.es" className={ENLACE} target="_blank" rel="noopener noreferrer">
                www.aepd.es
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. ¿Tienes que darnos tus datos?</h2>
            <p>
              Los campos marcados con asterisco son necesarios: sin ellos no podemos contestarte.
              Pedimos teléfono y correo para poder responderte por el medio que te venga mejor. Los
              formularios son para mayores de edad.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">10. Cómo protegemos tus datos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Conexión cifrada (HTTPS) en toda la web.</li>
              <li>Límite de envíos y filtro contra robots en el formulario.</li>
              <li>La consulta viaja a nuestro correo por una conexión cifrada.</li>
              <li>
                Solo acceden a tus datos quien gestiona tu consulta y, cuando corresponde, el
                profesional asignado.
              </li>
              <li>Proveedores con contrato de tratamiento de datos.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">11. Cambios en esta política</h2>
            <p>
              Si cambiamos algo importante, por ejemplo un proveedor, lo actualizaremos aquí con su
              fecha.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
