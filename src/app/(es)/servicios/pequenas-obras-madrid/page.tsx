import type { Metadata } from 'next';
import ServiceLanding from '@/components/sections/ServiceLanding';

export const metadata: Metadata = {
  title: 'Pequeñas obras en Madrid',
  description: 'Pequeñas obras y reparaciones en Madrid: pintura, montajes, arreglos. Te asignamos al profesional adecuado para tu necesidad.',
  alternates: { canonical: '/servicios/pequenas-obras-madrid' },
};

export default function PequenasObrasPage() {
  return (
    <ServiceLanding
      h1="Pequeñas obras en Madrid"
      slug="pequenas-obras-madrid"
      breadcrumbName="Pequeñas obras"
      description="Servicio de intermediación para pequeñas obras y reparaciones en Madrid: pintura, montajes, albañilería menor y preparación de vivienda con profesionales validados."
      intro="Reparaciones, montajes, pintura y trabajos puntuales: Anaid Grupo analiza tu solicitud y te conecta con un profesional adecuado para pequeñas obras en Madrid."
      trabajos={[
        'Pintura de interiores y exteriores',
        'Montaje de muebles y estanterías',
        'Instalación de puertas y ventanas',
        'Construcción de tabiques y particiones',
        'Reparación de paredes, techos y suelos',
        'Colocación de rodapiés y molduras',
        'Trabajos de albañilería menor',
        'Preparación de vivienda para alquiler o venta',
      ]}
      cuando="Las pequeñas obras se necesitan para arreglos puntuales en el hogar, para preparar una vivienda antes de alquilarla o venderla, para mejoras estéticas como pintura o acabados, o para montajes y reparaciones que requieren un profesional pero no una reforma completa."
      faqs={[
        { question: '¿Qué se considera una pequeña obra?', answer: 'Trabajos de menor envergadura que no requieren licencia de obra: pintura, montajes, reparaciones de paredes o suelos, instalación de puertas, pequeños trabajos de albañilería, etc.' },
        { question: '¿Puedo solicitar varios trabajos pequeños en una sola petición?', answer: 'Sí, puedes describir todos los trabajos que necesitas en una sola solicitud. El profesional asignado valorará el conjunto.' },
        { question: '¿Cuánto suelen costar las pequeñas obras?', answer: 'El coste varía mucho según el tipo de trabajo. Una mano de pintura para un piso puede costar entre 500 y 1.500 €, mientras que un montaje puntual puede ser mucho menos. El profesional te dará un presupuesto concreto.' },
      ]}
    />
  );
}
