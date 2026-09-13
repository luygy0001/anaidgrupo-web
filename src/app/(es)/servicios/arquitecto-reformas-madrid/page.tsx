import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

export const metadata: Metadata = {
  title: 'Arquitecto para reformas Madrid',
  description: 'Arquitecto y técnico para reformas en Madrid. Proyectos, licencias y dirección de obra. Te asignamos al profesional adecuado.',
  alternates: { canonical: '/servicios/arquitecto-reformas-madrid' },
};

export default function ArquitectoPage() {
  return (
    <ServiceLanding
      h1="Arquitecto / técnico para reformas en Madrid"
      slug="arquitecto-reformas-madrid"
      breadcrumbName="Arquitecto / técnico"
      description="Servicio de intermediación para arquitectura técnica en Madrid: proyectos, licencias, dirección de obra y certificaciones con profesionales validados."
      intro="Proyectos técnicos, licencias de obra, dirección de obra y certificaciones: Anaid Grupo te conecta con el arquitecto o técnico adecuado para tu reforma en Madrid."
      trabajos={[
        'Redacción de proyectos técnicos para reformas',
        'Tramitación de licencias de obra',
        'Dirección de obra y coordinación de seguridad',
        'Certificados de eficiencia energética',
        'Inspección Técnica de Edificios (ITE)',
        'Informes periciales y valoraciones',
        'Diseño de interiores con enfoque técnico',
        'Asesoramiento en normativa urbanística',
      ]}
      cuando="Necesitas un arquitecto o técnico cuando la reforma requiere licencia de obra (cambios estructurales, modificación de fachada), cuando se necesita un proyecto técnico oficial, para obtener certificados energéticos, para ITE, o cuando quieres un diseño profesional con planos y distribución optimizada."
      faqs={[
        { question: '¿Cuándo necesito un arquitecto para mi reforma?', answer: 'Cuando la reforma implique cambios estructurales, modificación de fachadas, cambio de uso del local o cualquier trabajo que requiera licencia de obra mayor. También es recomendable para reformas complejas que necesitan coordinación profesional.' },
        { question: '¿Qué diferencia hay entre arquitecto y arquitecto técnico?', answer: 'El arquitecto diseña y firma proyectos de obra mayor. El arquitecto técnico (aparejador) se encarga de la dirección de ejecución y puede firmar proyectos de obra menor. El profesional adecuado depende del tipo de proyecto.' },
        { question: '¿Cuánto tarda la tramitación de una licencia?', answer: 'Depende del ayuntamiento y el tipo de licencia. Una comunicación previa puede resolverse en días, mientras que una licencia de obra mayor puede tardar semanas o meses. El técnico te informará de los plazos previsibles.' },
      ]}
    />
  );
}
