import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

export const metadata: Metadata = {
  title: 'Electricista en Madrid',
  description: 'Electricista en Madrid. Instalaciones, averías, cuadros eléctricos y certificaciones. Te asignamos al profesional adecuado.',
  alternates: { canonical: '/servicios/electricista-madrid' },
};

export default function ElectricistaPage() {
  return (
    <ServiceLanding
      h1="Electricista en Madrid"
      slug="electricista-madrid"
      breadcrumbName="Electricista"
      description="Servicio de intermediación para trabajos de electricidad en Madrid: instalaciones, averías, boletines y mantenimiento con profesionales validados."
      intro="Desde averías puntuales hasta instalaciones completas, Anaid Grupo analiza tu necesidad y te asigna un electricista cualificado en la Comunidad de Madrid."
      trabajos={[
        'Reparación de averías eléctricas',
        'Instalación y cambio de cuadros eléctricos',
        'Boletines eléctricos y certificaciones',
        'Ampliación de puntos de luz y enchufes',
        'Instalación de iluminación LED',
        'Domótica básica y automatizaciones',
        'Instalación de cargadores de vehículo eléctrico',
        'Revisión y actualización de instalaciones antiguas',
      ]}
      cuando="Los servicios de electricista se necesitan ante averías imprevistas, al renovar una instalación antigua que no cumple normativa, al reformar una vivienda, al ampliar la instalación para nuevas necesidades o para obtener certificaciones y boletines obligatorios."
      rangoOrientativo={{ rango: '50 – 150 €/hora', nota: 'Según tipo de intervención, materiales y complejidad.' }}
      faqs={[
        { question: '¿Cuándo necesito un boletín eléctrico?', answer: 'Un boletín eléctrico es obligatorio al dar de alta un suministro, al cambiar la potencia contratada o al modificar la instalación. El electricista te orientará según tu caso.' },
        { question: '¿Pueden actualizar mi instalación eléctrica sin hacer obra?', answer: 'En muchos casos sí, especialmente si solo se trata de cambiar el cuadro o añadir protecciones. Si hay que hacer regatas en las paredes, puede requerir algo más de obra.' },
        { question: '¿Atendéis urgencias eléctricas?', answer: 'Sí, puedes indicar la urgencia al enviar tu solicitud y priorizaremos la asignación de un profesional disponible.' },
      ]}
    />
  );
}
