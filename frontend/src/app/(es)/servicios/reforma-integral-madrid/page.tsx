import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

export const metadata: Metadata = {
  title: 'Reforma integral en Madrid',
  description: 'Solicita tu reforma integral en Madrid. Anaid Grupo analiza tu proyecto y te asigna al profesional adecuado. Colaboradores seleccionados.',
  alternates: { canonical: '/servicios/reforma-integral-madrid' },
};

export default function ReformaIntegralPage() {
  return (
    <ServiceLanding
      h1="Reforma integral en Madrid"
      slug="reforma-integral-madrid"
      breadcrumbName="Reforma integral"
      description="Servicio de intermediación para reformas integrales de vivienda y local en la Comunidad de Madrid: coordinación, análisis y asignación al profesional validado."
      intro="Si necesitas una renovación completa de tu vivienda o local, Anaid Grupo analiza tu proyecto y te conecta con el profesional adecuado para llevarlo a cabo en la Comunidad de Madrid."
      trabajos={[
        'Renovación completa de viviendas y locales',
        'Redistribución de espacios y tabiquería',
        'Cambio completo de instalaciones (electricidad, fontanería, climatización)',
        'Acabados: suelos, paredes, techos, carpintería',
        'Coordinación de gremios necesarios',
        'Proyectos con necesidad de licencia de obra',
      ]}
      cuando="Este tipo de reforma suele necesitarse al comprar una vivienda de segunda mano, al renovar un piso antiguo, al cambiar la distribución del hogar o al adaptar un local comercial. También cuando la vivienda necesita una actualización completa de instalaciones."
      rangoOrientativo={{ rango: '400 – 1.200 €/m²', nota: 'Según alcance, calidades y estado inicial de la vivienda.' }}
      faqs={[
        { question: '¿Cuánto dura una reforma integral?', answer: 'Depende del alcance, pero una reforma integral de un piso medio en Madrid puede durar entre 2 y 4 meses. El profesional asignado te dará un plazo estimado tras valorar el proyecto.' },
        { question: '¿Necesito licencia de obra para una reforma integral?', answer: 'En muchos casos sí, especialmente si se modifican tabiques, instalaciones o elementos estructurales. El profesional o un arquitecto técnico pueden orientarte sobre los permisos necesarios.' },
        { question: '¿Puedo vivir en casa durante la reforma?', answer: 'Normalmente no es recomendable durante una reforma integral, por seguridad y para no retrasar los trabajos. El profesional te asesorará según tu caso concreto.' },
        { question: '¿El presupuesto incluye materiales?', answer: 'Depende del acuerdo con el profesional. La mayoría de presupuestos incluyen materiales y mano de obra, pero conviene confirmarlo antes de aceptar.' },
      ]}
    />
  );
}
