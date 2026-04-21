import type { Metadata } from 'next';
import ZoneLanding from '@/components/sections/ZoneLanding';

const MUNICIPIO = 'Pozuelo de Alarcón';
const SLUG = 'pozuelo-de-alarcon';
const DESCRIPTION =
  'Reformas y servicios técnicos en Pozuelo de Alarcón. Anaid Grupo asigna al profesional validado más adecuado para tu proyecto en la Comunidad de Madrid.';

export const metadata: Metadata = {
  title: 'Reformas en Pozuelo de Alarcón | Anaid Grupo',
  description: DESCRIPTION,
  alternates: { canonical: `/zonas/${SLUG}` },
};

export default function PozueloPage() {
  return (
    <ZoneLanding
      municipio={MUNICIPIO}
      slug={SLUG}
      description={DESCRIPTION}
      introParagraphs={[
        'Pozuelo de Alarcón es uno de los municipios con mayor demanda de reformas integrales y proyectos de vivienda unifamiliar del noroeste de Madrid. Anaid Grupo centraliza la solicitud y te conecta con el profesional validado que mejor encaja con el alcance y los acabados que necesita tu proyecto.',
        'Trabajamos en todas las urbanizaciones y zonas de Pozuelo: La Finca, Monte Alina, Monte Gancedo, Húmera, Somosaguas y el casco urbano. Cubrimos desde reformas integrales de chalet hasta actualizaciones de baño, cocina o climatización.',
        'Nuestro papel es de intermediación: analizamos el proyecto, asignamos al profesional adecuado y te acompañamos hasta que el presupuesto definitivo, tras visita, está sobre la mesa. No ejecutamos obras directamente.',
      ]}
      highlights={[
        'Alta presencia de viviendas unifamiliares y chalets con reformas de mayor entidad.',
        'Demanda frecuente de acabados de gama alta y domótica integrada.',
        'Coordinación ágil con técnicos y arquitectos cuando la obra requiere licencia.',
        'Profesionales validados con experiencia previa en comunidades y urbanizaciones de Pozuelo.',
      ]}
      crossLinks={[
        { municipio: 'Las Rozas de Madrid', slug: 'las-rozas' },
        { municipio: 'Majadahonda', slug: 'majadahonda' },
      ]}
    />
  );
}
