import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

// Servicio nuevo del 19-10-2026 (decisión 92): solo piscinas de diseño. Sustituye a «Pequeñas obras».
// Fotos reales de una obra de profesionales que hoy forman parte de la red; sin año, lugar ni cliente.
export const metadata: Metadata = {
  title: 'Piscinas de diseño a medida en Madrid',
  description:
    'Piscinas de diseño a medida en Madrid: spa, cascadas, piedra y gresite. Nuevas o reformando la tuya. Te respondemos en menos de 48 horas laborables.',
  alternates: { canonical: '/servicios/piscinas-diseno-madrid' },
};

const FOTOS = '/images/piscinas';

export default function PiscinasDisenoPage() {
  return (
    <ServiceLanding
      h1="Piscinas de diseño en Madrid"
      slug="piscinas-diseno-madrid"
      breadcrumbName="Piscinas de diseño"
      description="Coordinación de piscinas de diseño a medida en la Comunidad de Madrid: diseño, construcción y reforma de piscinas existentes, con spa, cascadas y revestimientos de piedra y gresite. La obra la hace el profesional de la red de Construcciones Anaid asignado a cada proyecto, con quien el cliente firma el contrato."
      intro="Sales al jardín, subes la escalera de piedra del spa y oyes el agua caer en cascada a la piscina. Eso es una piscina de diseño: pensada a medida para tu casa, nueva o a partir de la que ya tienes. Te asignamos al profesional de nuestra red que la diseña y la construye, y nosotros coordinamos la obra hasta el final."
      proyecto={{
        titulo: 'Una piscina de diseño terminada: spa de piedra y dos cascadas',
        texto:
          'Es una piscina en forma de riñón, con gresite azul y una playa de gresite rosa con escalones para entrar al agua. Al fondo hay un spa elevado de piedra para seis personas, con una cascada que cae a la piscina, y a un lado, un muro de roca con otra cascada en arco. Las máquinas y un baño quedan dentro de una caseta de piedra, entre césped y palmeras.',
        autoria: 'Obra de profesionales que hoy forman parte de nuestra red.',
        fotos: [
          {
            src: `${FOTOS}/piscina-diseno-spa-cascada.jpg`,
            alt: 'Piscina en forma de riñón con gresite azul y playa de gresite rosa; al fondo, spa elevado de piedra con cascada y chorro lateral, sobre césped',
            pie: 'Gresite azul, playa rosa y el spa de piedra al fondo.',
          },
          {
            src: `${FOTOS}/piscina-diseno-vista-general.jpg`,
            alt: 'Vista general: spa circular elevado con escalones de piedra junto a la piscina, césped alrededor y muro de piedra al fondo',
            pie: 'El spa elevado, con su escalera de piedra.',
          },
          {
            src: `${FOTOS}/piscina-diseno-spa-piedra.jpg`,
            alt: 'Piscina con el spa de piedra al fondo, su cascada y un chorro de agua, junto a una palmera',
            pie: 'La cascada y el chorro del spa caen a la piscina.',
          },
          {
            src: `${FOTOS}/piscina-diseno-muro-roca-cascada.jpg`,
            alt: 'Muro de roca con una cascada en arco que cae sobre la piscina, entre palmeras, con la caseta de piedra al fondo',
            pie: 'La cascada en arco del muro de roca.',
          },
          {
            src: `${FOTOS}/spa-hidromasaje-6-personas.jpg`,
            alt: 'Spa en marcha con el hidromasaje funcionando, visto desde arriba',
            pie: 'Spa para seis personas, con hidromasaje.',
          },
          {
            src: `${FOTOS}/caseta-sala-maquinas-bano.jpg`,
            alt: 'Caseta de piedra con dos puertas, una para la sala de máquinas y otra para el baño, junto a una palmera y césped',
            pie: 'Caseta de piedra: sala de máquinas y baño.',
          },
          {
            src: `${FOTOS}/spa-gresite-hidromasaje.jpg`,
            alt: 'Interior del spa revestido de gresite blanco y rojo, con las boquillas de hidromasaje',
            pie: 'Gresite blanco y rojo dentro del spa.',
          },
        ],
      }}
      trabajos={[
        'Diseño a medida de tu jardín, también con curvas, como las piscinas en forma de riñón',
        'Construcción de piscinas de diseño nuevas',
        'Reforma de piscinas que ya existen, para convertirlas en piscinas de diseño',
        'Spa elevado con hidromasaje, revestido de piedra y con escalera de piedra',
        'Cascadas y chorros de agua: desde el spa o desde un muro de roca',
        'Revestimientos de gresite y de piedra, con zona de playa y escalones para entrar al agua',
        'Caseta de piedra con la sala de máquinas y un baño junto a la piscina',
      ]}
      cuando="Suele necesitarse cuando tienes un chalet o una casa con jardín y la piscina que te imaginas no es la de siempre: con curvas, con un spa al que se sube por escalones de piedra, con una cascada o con un muro de roca. También cuando ya tienes piscina y quieres darle otra vida con gresite o piedra nuevos, un spa o una cascada. Y cuando no quieres ser tú quien llame al de la piedra, al del gresite y al de las máquinas para que se pongan de acuerdo: hablas con una sola persona, y las fotos de la obra te llegan por WhatsApp casi cada día, aunque estés en la oficina."
      faqs={[
        {
          question: '¿Hacéis piscinas estándar o prefabricadas?',
          answer:
            'No. En piscinas solo coordinamos proyectos de diseño: hechos a medida de cada jardín, con la forma, el spa, las cascadas y los revestimientos de piedra o gresite que se elijan para esa casa. Para una piscina estándar o prefabricada hay empresas que se dedican solo a eso. Si ya tienes una y quieres convertirla en una piscina de diseño, en eso sí te ayudamos.',
        },
        {
          question: '¿Podéis convertir mi piscina actual en una piscina de diseño?',
          answer:
            'Sí, también se reforman piscinas que ya existen. Se puede cambiar el revestimiento por gresite o piedra, añadir un spa elevado o una cascada, o levantar una caseta de piedra para las máquinas. Antes de contratar, el profesional que te asignamos visita tu casa, ve la piscina y te dice qué se puede hacer con ella.',
        },
        {
          question: '¿Quién firma el contrato y hace la obra de la piscina?',
          answer:
            'El profesional de nuestra red que te asignamos. Firmas el contrato de obra directamente con él y se compromete por escrito al precio, que queda cerrado en el contrato, y al plazo, con penalización si no lo cumple. Él hace la obra y responde de su trabajo. Construcciones Anaid no construye: estudia tu consulta, elige al profesional que encaja, coordina la obra y te manda fotos del avance por WhatsApp casi cada día.',
        },
        {
          question: '¿Cuánto cuesta una piscina de diseño?',
          answer:
            'Depende de cada proyecto: del tamaño, de la forma y de lo que lleve, como spa, cascadas, piedra o gresite. Por eso no publicamos precios. Antes de contratar, el profesional asignado visita tu casa para ver el jardín y lo que quieres hacer. El precio queda cerrado en el contrato que firmas con él. A tu consulta te respondemos en menos de 48 horas laborables.',
        },
      ]}
    />
  );
}
