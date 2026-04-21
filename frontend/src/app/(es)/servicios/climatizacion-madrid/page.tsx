import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

export const metadata: Metadata = {
  title: 'Climatización en Madrid',
  description: 'Instalación de aire acondicionado, calefacción y climatización en Madrid. Te asignamos al profesional adecuado.',
  alternates: { canonical: '/servicios/climatizacion-madrid' },
};

export default function ClimatizacionPage() {
  return (
    <ServiceLanding
      h1="Climatización en Madrid"
      slug="climatizacion-madrid"
      breadcrumbName="Climatización"
      description="Servicio de intermediación para climatización en Madrid: aire acondicionado, calefacción, aerotermia y mantenimiento con profesionales validados."
      intro="Aire acondicionado, calefacción, aerotermia o suelo radiante: Anaid Grupo analiza tu necesidad y te asigna al profesional de climatización adecuado en Madrid."
      trabajos={[
        'Instalación de aire acondicionado (split, multisplit, conductos)',
        'Instalación y cambio de calderas',
        'Suelo radiante e instalaciones por agua',
        'Aerotermia y bombas de calor',
        'Mantenimiento y revisión de equipos',
        'Carga de gas y reparación de averías',
        'Soluciones de eficiencia energética',
        'Climatización de locales comerciales',
      ]}
      cuando="Se necesita un profesional de climatización al instalar o sustituir un sistema de aire acondicionado, al cambiar la caldera, al querer mejorar la eficiencia energética del hogar, al acondicionar un local comercial o al planificar una reforma que incluya nuevas instalaciones de frío y calor."
      rangoOrientativo={{ rango: '1.000 – 5.000 €', nota: 'Según tipo de equipo, número de unidades y complejidad de la instalación.' }}
      faqs={[
        { question: '¿Qué sistema de climatización es mejor para mi vivienda?', answer: 'Depende del tamaño, la distribución y tus necesidades. El profesional valorará tu caso y te recomendará la solución más eficiente.' },
        { question: '¿La aerotermia es rentable en Madrid?', answer: 'En muchos casos sí, especialmente en viviendas unifamiliares o con buen aislamiento. El profesional puede calcular el ahorro estimado para tu situación.' },
        { question: '¿Necesito permiso para instalar aire acondicionado?', answer: 'Si hay unidad exterior en fachada, puede requerir autorización de la comunidad de vecinos. El profesional te orientará sobre los requisitos de tu caso.' },
      ]}
    />
  );
}
