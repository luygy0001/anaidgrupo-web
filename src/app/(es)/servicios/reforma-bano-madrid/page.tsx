import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

export const metadata: Metadata = {
  title: 'Reforma de baño en Madrid',
  description: 'Reforma de baño en Madrid. Te asignamos un profesional cualificado para renovar tu baño. Solicita proyecto gratuito.',
  alternates: { canonical: '/servicios/reforma-bano-madrid' },
};

export default function ReformaBanoPage() {
  return (
    <ServiceLanding
      h1="Reforma de baño en Madrid"
      slug="reforma-bano-madrid"
      breadcrumbName="Reforma de baño"
      description="Servicio de intermediación para reformas de baño en Madrid: análisis del proyecto y asignación al profesional validado."
      intro="Moderniza tu baño con la ayuda de un profesional adecuado. Anaid Grupo analiza tu proyecto y asigna al colaborador que mejor encaja con tus necesidades en Madrid."
      trabajos={[
        'Cambio de plato de ducha o bañera',
        'Alicatado y solado completo',
        'Instalación de sanitarios y grifería',
        'Muebles de baño y espejos',
        'Fontanería y desagües',
        'Iluminación y electricidad del baño',
        'Impermeabilización y ventilación',
        'Accesibilidad: plato a nivel, barras, etc.',
      ]}
      cuando="La reforma de baño suele necesitarse cuando el baño es antiguo y necesita una actualización completa, cuando hay problemas de humedad o filtraciones, al querer mejorar la accesibilidad o cuando simplemente se quiere modernizar el espacio."
      rangoOrientativo={{ rango: '3.000 – 10.000 €', nota: 'Según tamaño, materiales elegidos y estado actual del baño.' }}
      faqs={[
        { question: '¿Cuánto tarda una reforma de baño?', answer: 'Una reforma completa de baño suele durar entre 1 y 3 semanas, según el alcance de los trabajos. El profesional te dará un plazo más preciso tras valorar tu caso.' },
        { question: '¿Puedo cambiar la bañera por un plato de ducha?', answer: 'Sí, es uno de los trabajos más habituales. El profesional valorará la viabilidad técnica y te propondrá las mejores opciones.' },
        { question: '¿Es necesario reformar todo el baño o puedo hacer cambios parciales?', answer: 'Puedes hacer cambios parciales, pero a veces es más rentable y estético hacer una reforma completa. El profesional te asesorará según tu situación.' },
      ]}
    />
  );
}
