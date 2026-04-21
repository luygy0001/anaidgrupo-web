import type { Metadata } from 'next';
import ZoneLanding from '@/components/sections/ZoneLanding';

const MUNICIPIO = 'Majadahonda';
const SLUG = 'majadahonda';
const DESCRIPTION =
  'Reformas y servicios técnicos en Majadahonda. Anaid Grupo asigna al profesional validado más adecuado para tu proyecto en la Comunidad de Madrid.';

export const metadata: Metadata = {
  title: 'Reformas en Majadahonda | Anaid Grupo',
  description: DESCRIPTION,
  alternates: { canonical: `/zonas/${SLUG}` },
};

export default function MajadahondaPage() {
  return (
    <ZoneLanding
      municipio={MUNICIPIO}
      slug={SLUG}
      description={DESCRIPTION}
      introParagraphs={[
        'Majadahonda es una zona consolidada del noroeste de Madrid, con un parque de viviendas que mezcla adosados, unifamiliares y bloques modernos. Anaid Grupo centraliza tu solicitud y la asigna al profesional validado que mejor encaja con el tipo de proyecto y los plazos que manejas.',
        'Trabajamos tanto en el centro urbano como en urbanizaciones y zonas residenciales. Cubrimos reformas integrales, actualización de baños y cocinas, climatización, electricidad, fontanería y servicios técnicos de arquitectura cuando el proyecto lo requiere.',
        'Nuestro modelo es de intermediación: no ejecutamos directamente la obra, sino que conectamos tu proyecto con el profesional adecuado y acompañamos el proceso hasta que recibes el presupuesto definitivo.',
      ]}
      highlights={[
        'Proyectos habituales de reforma integral en adosados y unifamiliares consolidados.',
        'Alta demanda de actualización de instalaciones en viviendas de 20–30 años.',
        'Equipos con experiencia en comunidades de propietarios y normativas locales.',
        'Cercanía operativa con Pozuelo y Las Rozas, lo que agiliza tiempos de respuesta.',
      ]}
      crossLinks={[
        { municipio: 'Pozuelo de Alarcón', slug: 'pozuelo-de-alarcon' },
        { municipio: 'Las Rozas de Madrid', slug: 'las-rozas' },
      ]}
    />
  );
}
