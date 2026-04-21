import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

export const metadata: Metadata = {
  title: 'Reforma de cocina en Madrid',
  description: 'Reforma tu cocina en Madrid con profesionales seleccionados. Anaid Grupo analiza tu proyecto y te asigna al colaborador adecuado.',
  alternates: { canonical: '/servicios/reforma-cocina-madrid' },
};

export default function ReformaCocinaPage() {
  return (
    <ServiceLanding
      h1="Reforma de cocina en Madrid"
      slug="reforma-cocina-madrid"
      breadcrumbName="Reforma de cocina"
      description="Servicio de intermediación para reformas de cocina en Madrid: análisis del proyecto y asignación al profesional validado."
      intro="La cocina es el corazón del hogar. Si necesitas renovarla, Anaid Grupo analiza tu proyecto y te conecta con el profesional adecuado en la Comunidad de Madrid."
      trabajos={[
        'Diseño y distribución de cocina',
        'Instalación de muebles altos y bajos',
        'Encimeras: silestone, granito, porcelánico',
        'Instalación de electrodomésticos',
        'Fontanería y tomas de agua',
        'Electricidad: puntos de luz, enchufes, extractor',
        'Alicatado, solado y pintura',
        'Integración cocina-salón (cocinas abiertas)',
      ]}
      cuando="Se suele reformar la cocina cuando los muebles y electrodomésticos están obsoletos, cuando se quiere cambiar la distribución para ganar espacio, al renovar la vivienda para vender o alquilar, o al querer abrir la cocina al salón."
      rangoOrientativo={{ rango: '5.000 – 15.000 €', nota: 'Según diseño, materiales, electrodomésticos y complejidad de la obra.' }}
      faqs={[
        { question: '¿Cuánto dura una reforma de cocina?', answer: 'Entre 2 y 4 semanas habitualmente. Depende de si hay cambios en fontanería, electricidad o distribución.' },
        { question: '¿Puedo abrir la cocina al salón?', answer: 'En muchos casos sí, pero es necesario comprobar si el tabique es de carga. El profesional o un arquitecto técnico valorará la viabilidad.' },
        { question: '¿El profesional se encarga también de los electrodomésticos?', answer: 'Depende del profesional. Algunos incluyen el suministro e instalación de electrodomésticos y otros trabajan con los que tú elijas.' },
      ]}
    />
  );
}
