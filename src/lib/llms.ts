import {
  SITE_NAME,
  SITE_URL,
  EMAIL,
  PHONE_DISPLAY,
  HORARIO_DETAIL,
  RESPUESTA_PLAZO,
  COVERAGE_AREA,
  INTERMEDIATION_DISCLAIMER,
  SERVICE_PAGES,
  SERVICES,
  FAQS,
  SOCIAL,
} from '@/lib/constants';
import { PAGINAS_SERVICIO } from '@/content/servicios';
import { PAGINAS_ZONA, CAPAS_COBERTURA } from '@/content/zonas';
import { PASOS, QUE_HACE, QUE_NO_HACE } from '@/content/como-trabajamos';

// /llms.txt y /llms-full.txt (formato de llmstxt.org) generados desde el mismo contenido que la
// web: constantes, src/content y las preguntas frecuentes. No se escribe nada a mano aquí, para que
// lo que lee un asistente de IA no se separe nunca de lo que ve el visitante. Sin precios: la web no
// los publica.

const url = (ruta: string) => `${SITE_URL}${ruta}`;
const servicios = SERVICE_PAGES.map((s) => {
  const slug = s.href.split('/').pop() as string;
  return { ...s, slug, pagina: PAGINAS_SERVICIO[slug] };
});
const faqPresupuesto = FAQS.find((f) => f.question === '¿Cómo se prepara el presupuesto?');

function cabecera(): string[] {
  return [
    `# ${SITE_NAME}`,
    '',
    `> ${INTERMEDIATION_DISCLAIMER}`,
    '',
    `Servicios: ${servicios.map((s) => s.label).join(', ')}.`,
    '',
    `- Zona: ${COVERAGE_AREA}.`,
    `- Respuesta: ${RESPUESTA_PLAZO}.`,
    `- Correo: ${EMAIL}`,
    `- Teléfono y WhatsApp: ${PHONE_DISPLAY}`,
    `- Horario: ${HORARIO_DETAIL.atencion}`,
    `- Formulario de consulta: ${url('/contacto')}`,
    ...(faqPresupuesto ? [`- Presupuesto: ${faqPresupuesto.answer}`] : []),
    `- Perfiles: YouTube ${SOCIAL.youtube} · LinkedIn ${SOCIAL.linkedinEmpresa} · Facebook ${SOCIAL.facebook}`,
  ];
}

export function llmsTxt(): string {
  const zonasConPagina = CAPAS_COBERTURA.flatMap((c) => c.municipios).filter((m) => m.hasLanding);
  return [
    ...cabecera(),
    '',
    '## Servicios',
    '',
    ...servicios.map((s) => `- [${s.pagina.landing.h1}](${url(s.href)}): ${s.pagina.landing.description}`),
    `- [Todos los servicios](${url('/servicios')})`,
    '',
    '## Para quién',
    '',
    ...SERVICES.map((s) => `- ${s.title}: ${s.description}`),
    '',
    '## Zonas',
    '',
    `- [Zonas de cobertura](${url('/zonas')}): ${COVERAGE_AREA}.`,
    ...zonasConPagina.map((m) => `- [${m.nombre}](${url(`/zonas/${m.slug}`)})`),
    '',
    '## Cómo trabajamos',
    '',
    `- [Cómo trabajamos](${url('/como-funciona')}): ${PASOS.map((p) => p.title).join(' → ')}.`,
    ...QUE_NO_HACE.map((n) => `- ${n}.`),
    '',
    '## Optional',
    '',
    `- [Preguntas frecuentes](${url('/#preguntas-frecuentes')})`,
    `- [Todo el contenido en un archivo](${url('/llms-full.txt')})`,
    `- [Aviso legal](${url('/aviso-legal')}): titular y naturaleza del servicio`,
    `- [Política de privacidad](${url('/privacidad')})`,
    '',
  ].join('\n');
}

export function llmsFullTxt(): string {
  const l: string[] = [...cabecera(), '', '## Cómo trabajamos', '', `Fuente: ${url('/como-funciona')}`, ''];
  PASOS.forEach((p) => l.push(`${p.number}. ${p.title}: ${p.description}`));
  l.push('', `### Qué hace ${SITE_NAME}`, '', ...QUE_HACE.map((q) => `- ${q}`));
  l.push('', `### Qué no hace ${SITE_NAME}`, '', ...QUE_NO_HACE.map((q) => `- ${q}`));

  l.push('', '## Para quién', '');
  SERVICES.forEach((s) => l.push(`- ${s.title}: ${s.description}`));

  l.push('', '## Servicios');
  for (const s of servicios) {
    const p = s.pagina.landing;
    l.push('', `### ${p.h1}`, '', `Fuente: ${url(s.href)}`, '', p.intro, '', 'Qué tipo de trabajos incluye:');
    p.trabajos.forEach((t) => l.push(`- ${t}`));
    l.push('', `Cuándo suele necesitarse: ${p.cuando}`);
    if (p.proyecto) {
      l.push('', `Proyecto de ejemplo: ${p.proyecto.titulo}. ${p.proyecto.texto} ${p.proyecto.autoria}`);
    }
    l.push('', 'Preguntas frecuentes:');
    p.faqs.forEach((f) => l.push(`- ${f.question} ${f.answer}`));
  }

  l.push('', '## Zonas', '', `Fuente: ${url('/zonas')}`, '', `${COVERAGE_AREA}.`);
  for (const c of CAPAS_COBERTURA) {
    l.push('', `### ${c.titulo}`, '', c.descripcion, '');
    c.municipios.forEach((m) => l.push(`- ${m.nombre}${m.hasLanding ? `: ${url(`/zonas/${m.slug}`)}` : ''}`));
  }
  for (const z of Object.values(PAGINAS_ZONA)) {
    const p = z.landing;
    l.push('', `### Reformas en ${p.municipio}`, '', `Fuente: ${url(`/zonas/${p.slug}`)}`, '');
    p.introParagraphs.forEach((t) => l.push(t, ''));
    p.highlights.forEach((h) => l.push(`- ${h}`));
  }

  l.push('', '## Preguntas frecuentes', '', `Fuente: ${url('/#preguntas-frecuentes')}`, '');
  FAQS.forEach((f) => l.push(`### ${f.question}`, '', f.answer, ''));

  return l.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}
