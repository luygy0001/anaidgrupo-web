import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { LEGAL, LEGAL_DRAFT, SITE_NAME, EMAIL, PHONE, PHONE_DISPLAY, ADDRESS } from '@/lib/constants';
import { IMPORTE_PRESUPUESTO_ADICIONAL } from '@/lib/presupuesto';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Qué datos tratamos en Construcciones Anaid, para qué, con quién los compartimos (también la inteligencia artificial que prepara los presupuestos) y cómo ejercer tus derechos.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false },
};

// Si cambia un proveedor, un plazo o el lugar del servidor, hay que actualizar esta página
// (ver docs/DECISIONES.md, decisiones 50 a 56) y la fecha de «Última actualización».

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
      'Preparar tu presupuesto, enviártelo por correo y por WhatsApp y organizar la visita a la obra antes de contratar.',
    base: 'Aplicar las medidas precontractuales que nos pides (art. 6.1.b RGPD).',
  },
  {
    finalidad: `Decidir si tu presupuesto es gratuito o cuesta ${IMPORTE_PRESUPUESTO_ADICIONAL} € (regla de presupuestos repetidos).`,
    base: 'Medidas precontractuales: es una condición que aceptas al pedirlo (art. 6.1.b) y nuestro interés legítimo en evitar abusos (art. 6.1.f).',
  },
  {
    finalidad:
      'Pasar tu solicitud al profesional que hará la obra, si decides seguir adelante, y coordinar y seguir la obra.',
    base: 'Medidas precontractuales y la relación que mantienes con nosotros (art. 6.1.b).',
  },
  {
    finalidad: 'Contestar tus consultas por el formulario, WhatsApp, teléfono o correo.',
    base: 'Medidas precontractuales si preguntas por un servicio (art. 6.1.b) o nuestro interés legítimo en atender a quien nos escribe (art. 6.1.f).',
  },
  {
    finalidad: 'Valorar tu incorporación como profesional colaborador.',
    base: 'Medidas precontractuales (art. 6.1.b).',
  },
  {
    finalidad: 'Proteger la web frente a robots y abusos.',
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
    uso: 'Servidor de la web y de la automatización que gestiona las solicitudes, y buzones de correo de @construccionesanaid.com.',
    lugar: 'Servidor en Fráncfort (Alemania).',
  },
  {
    nombre: 'Google (Google Workspace)',
    uso: 'Correo con el que te enviamos el presupuesto, hojas de cálculo, documentos y la carpeta de cada cliente.',
    lugar: 'Unión Europea y Estados Unidos.',
  },
  {
    nombre: 'Anthropic (Claude)',
    uso: 'Redactar el borrador de tu presupuesto. Según su política, borra lo que recibe en 30 días como máximo y no lo usa para entrenar sus modelos.',
    lugar: 'Irlanda y Estados Unidos.',
  },
  {
    nombre: 'Cloudflare (Turnstile)',
    uso: 'Comprobar que quien envía un formulario es una persona y no un robot.',
    lugar: 'Red mundial; empresa de Estados Unidos.',
  },
];

const PLAZOS: { datos: string; plazo: string }[] = [
  {
    datos: 'Solicitudes de presupuesto o de proyecto que no llegan a obra, y consultas',
    plazo: '12 meses desde nuestro último contacto. Después se borran.',
  },
  {
    datos: 'Si contratas la obra con el profesional',
    plazo:
      'Mientras dure la obra y su seguimiento. Después, bloqueados mientras puedan exigirse responsabilidades (5 años con carácter general) y durante los plazos de la ley fiscal; luego se borran.',
  },
  {
    datos: 'Profesionales que quieren colaborar',
    plazo: 'Si no colaboramos, 12 meses. Si colaboramos, mientras dure la colaboración y después los plazos legales.',
  },
  { datos: 'Registro de la automatización que procesa los formularios', plazo: '14 días.' },
  { datos: 'Copia en Anthropic al redactar el presupuesto', plazo: 'Hasta 30 días, según su política.' },
  { datos: 'Dirección IP para limitar envíos repetidos', plazo: '15 minutos.' },
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
          <p className="text-xs italic">Última actualización: 6 de octubre de 2026</p>

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
                Los usamos para preparar tu presupuesto, contestarte y, si sigues adelante, pasar tu
                obra al profesional que la hará.
              </li>
              <li>
                Una inteligencia artificial (Claude, de Anthropic) redacta el borrador de tu
                presupuesto sin conocer tu nombre, tu correo ni tu teléfono, y una persona lo revisa
                antes de enviártelo.
              </li>
              <li>
                Si tu presupuesto es gratuito o de pago lo decide un proceso automático: puedes pedir
                que lo revise una persona.
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
            <h3 className="text-base font-semibold text-foreground">Formulario de presupuesto</h3>
            <p>
              Si eres particular, inversor o inmobiliaria; la calidad de acabados; el tipo de obra; los
              metros; el municipio; la descripción de la obra; tu nombre, móvil y correo, y las
              casillas que marcas.
            </p>
            <h3 className="text-base font-semibold text-foreground">Solicitud de proyecto</h3>
            <p>Nombre, teléfono, correo, código postal, tipo de servicio, urgencia y descripción.</p>
            <h3 className="text-base font-semibold text-foreground">Formulario de contacto</h3>
            <p>Nombre, correo, teléfono (si nos lo das) y tu mensaje.</p>
            <h3 className="text-base font-semibold text-foreground">Formulario para profesionales</h3>
            <p>
              Nombre, empresa, teléfono, correo, especialidades, zonas de trabajo, experiencia y
              descripción de tu actividad.
            </p>
            <h3 className="text-base font-semibold text-foreground">WhatsApp, teléfono y correo</h3>
            <p>Lo que nos cuentes y las fotos que nos envíes.</p>
            <h3 className="text-base font-semibold text-foreground">Datos técnicos</h3>
            <p>
              Tu dirección IP y datos de tu navegador, para comprobar que no eres un robot y limitar
              los envíos repetidos.
            </p>
            <p>
              No necesitamos datos de salud ni otros datos especialmente protegidos: por favor, no los
              incluyas en la descripción.
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

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">4. Inteligencia artificial y decisiones automáticas</h2>
            <h3 className="text-base font-semibold text-foreground">El borrador de tu presupuesto</h3>
            <p>
              Un sistema de inteligencia artificial, Claude, de la empresa Anthropic, redacta el
              borrador de tu presupuesto con los datos de la obra: perfil, calidad, tipo de obra,
              metros, municipio y descripción. No recibe tu nombre, tu correo ni tu teléfono. El
              importe no lo calcula la IA: sale de nuestras tarifas. Una persona revisa cada
              presupuesto antes de enviártelo, y el precio final lo fija el profesional en el contrato,
              después de visitar la obra. Te lo explicamos con más detalle en{' '}
              <Link href="/ia-analisis-proyecto" className={ENLACE}>cómo usamos la IA</Link>.
            </p>
            <h3 className="text-base font-semibold text-foreground">Si tu presupuesto es gratuito o de pago</h3>
            <p>
              Esto sí lo decide un proceso automático, sin intervención de una persona, en el momento
              en que envías el formulario. Mira tus solicitudes anteriores con el mismo correo o el
              mismo móvil:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Particulares: el primer presupuesto es gratuito.</li>
              <li>Inversores e inmobiliarias: un presupuesto gratuito cada 7 días.</li>
              <li>
                Los demás cuestan {IMPORTE_PRESUPUESTO_ADICIONAL} €. Te lo decimos antes de preparar
                nada y decides tú si lo pides.
              </li>
            </ul>
            <p>
              Solo contamos las solicitudes que aún conservamos (ver el apartado 7). Tienes derecho a
              que una persona revise esa decisión, a darnos tu punto de vista y a impugnarla:
              escríbenos a <a href={`mailto:${EMAIL}`} className={ENLACE}>{EMAIL}</a> (art. 22 RGPD).
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
              Si nos escribes por WhatsApp o te enviamos el presupuesto por ahí, WhatsApp (WhatsApp
              Ireland Limited, del grupo Meta) trata esos mensajes según sus propias condiciones y su
              política de privacidad.
            </p>
            <h3 className="text-base font-semibold text-foreground">Autoridades</h3>
            <p>Solo cuando la ley nos obligue, por ejemplo jueces o la Agencia Tributaria.</p>
            <p>No vendemos ni cedemos tus datos a nadie más.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Transferencias fuera de la Unión Europea</h2>
            <p>
              Google, Anthropic, Cloudflare y Meta (WhatsApp) son empresas o grupos con sede en Estados
              Unidos y pueden tratar datos allí. Esas transferencias se amparan en el Marco de
              Privacidad de Datos UE-EE. UU. (para las empresas adheridas) y en las cláusulas
              contractuales tipo aprobadas por la Comisión Europea, incluidas en sus contratos de
              tratamiento de datos. Si quieres más información, escríbenos a{' '}
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
              Tu elección sobre cookies se guarda en tu propio navegador: lo explicamos en la{' '}
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
              <li>
                <strong>Revisión por una persona:</strong> que una persona revise una decisión
                automática, como la de si tu presupuesto es gratuito.
              </li>
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
              Los campos marcados con asterisco son necesarios: sin ellos no podemos preparar tu
              presupuesto ni contestarte. Para el presupuesto pedimos móvil y correo porque te lo
              enviamos por los dos medios. Los formularios son para mayores de edad.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">10. Cómo protegemos tus datos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Conexión cifrada (HTTPS) en toda la web.</li>
              <li>Comprobación antirrobots y límite de envíos en los formularios.</li>
              <li>La web y la automatización se comunican con una clave secreta.</li>
              <li>
                Solo acceden a tus datos quien gestiona tu solicitud y, cuando corresponde, el
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
