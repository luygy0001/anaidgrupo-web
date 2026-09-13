import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

export const metadata: Metadata = {
  title: 'Fontanero en Madrid',
  description: 'Fontanero en Madrid: reparaciones, instalaciones y mantenimiento. Anaid Grupo te asigna al profesional adecuado.',
  alternates: { canonical: '/servicios/fontanero-madrid' },
};

export default function FontaneroPage() {
  return (
    <ServiceLanding
      h1="Fontanero en Madrid"
      slug="fontanero-madrid"
      breadcrumbName="Fontanero"
      description="Servicio de intermediación para trabajos de fontanería en Madrid: fugas, instalaciones, calentadores y mantenimiento con profesionales validados."
      intro="Fugas, atascos, instalaciones nuevas o cambio de calentador: Anaid Grupo analiza tu solicitud y te conecta con un fontanero profesional en la Comunidad de Madrid."
      trabajos={[
        'Reparación de fugas y averías',
        'Desatascos de tuberías y desagües',
        'Instalación de sanitarios y griferías',
        'Cambio de calentador o caldera',
        'Instalación de ósmosis y descalcificadores',
        'Renovación de tuberías antiguas',
        'Instalación de radiadores y sistemas de calefacción',
        'Revisión y mantenimiento preventivo',
      ]}
      cuando="Los servicios de fontanería se necesitan ante urgencias como fugas de agua o atascos, al renovar baño o cocina, al cambiar calentador o caldera, al detectar humedades o pérdidas de presión, o durante una reforma donde hay que mover instalaciones."
      rangoOrientativo={{ rango: '50 – 120 €/hora', nota: 'Según urgencia, complejidad y materiales necesarios.' }}
      faqs={[
        { question: '¿Atendéis urgencias de fontanería?', answer: 'Sí. Indica la urgencia en tu solicitud y priorizaremos la asignación de un fontanero disponible lo antes posible.' },
        { question: '¿Puedo cambiar las tuberías de plomo por otras más seguras?', answer: 'Sí, y es recomendable. El fontanero valorará el estado de la instalación y te propondrá las alternativas más adecuadas.' },
        { question: '¿El fontanero también puede instalar calefacción?', answer: 'Muchos fontaneros trabajan también con sistemas de calefacción. Si tu necesidad es más compleja (suelo radiante, aerotermia), puede requerir un especialista en climatización.' },
      ]}
    />
  );
}
