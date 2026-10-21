// Genera las imágenes de la firma en imagenes/firma/ a partir de datos-firma.mjs:
// el logo recortado a doble resolución y un icono por red (círculo del color de acento, trazo blanco).
// Iconos de iconos/brand-*.svg: Tabler Icons, licencia MIT.
//
// Necesita sharp. No se instala en el proyecto del cliente: se reutiliza uno existente.
// Por defecto el del CRM de Mandrinados; otro distinto con la variable SHARP_DESDE
// (ruta a un package.json de un proyecto que tenga sharp en node_modules).
import { createRequire } from 'node:module';
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = dirname(fileURLToPath(import.meta.url));
const D = (await import(pathToFileURL(join(raiz, 'datos-firma.mjs')).href)).default;

const desde = process.env.SHARP_DESDE || 'D:/MandrinadosAnaid/mandrinados-anaid-crm/package.json';
let sharp;
try {
  sharp = createRequire(desde)('sharp');
} catch {
  console.error(`No encuentro sharp desde ${desde}.\nIndica otro proyecto que lo tenga: SHARP_DESDE=<ruta>/package.json node generar-imagenes.mjs`);
  process.exit(1);
}

if (!existsSync(D.logo.origen)) {
  console.error(`No existe el logo de origen: ${D.logo.origen}`);
  process.exit(1);
}

const salida = join(raiz, 'imagenes', 'firma');
mkdirSync(salida, { recursive: true });

// 1) Logo: se quitan los márgenes vacíos y sale a 2x del tamaño mostrado.
// Con `logo.recorteIzquierda` (0–1) se queda solo esa fracción izquierda: sirve para sacar el
// símbolo o monograma de un logo horizontal, cuyo texto en la firma va escrito como texto.
const sinMargenes = await sharp(D.logo.origen, { density: 300 }).trim().png().toBuffer();
let logo = sharp(sinMargenes);
if (D.logo.recorteIzquierda) {
  const { width, height } = await logo.metadata();
  const ancho = Math.max(1, Math.round(width * D.logo.recorteIzquierda));
  logo = sharp(await logo.extract({ left: 0, top: 0, width: ancho, height }).png().toBuffer()).trim();
}
await logo
  .resize(D.logo.ancho * 2, D.logo.alto * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(join(salida, D.logo.archivo));

// 2) Iconos de redes a 2x (se muestran a 28 px)
for (const red of D.redes) {
  const origen = join(raiz, 'iconos', `brand-${red.icono}.svg`);
  if (!existsSync(origen)) {
    console.error(`No hay icono para "${red.icono}" (${origen}). Descárgalo de Tabler Icons (outline) a iconos/.`);
    process.exit(1);
  }
  const trazos = [...readFileSync(origen, 'utf8').matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
  <circle cx="28" cy="28" r="28" fill="${D.colores.acento}"/>
  <g transform="translate(14 14) scale(1.1667)" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${trazos.map((d) => `<path d="${d}"/>`).join('\n    ')}
  </g>
</svg>`;
  await sharp(Buffer.from(svg), { density: 288 })
    .resize(56, 56)
    .png({ compressionLevel: 9 })
    .toFile(join(salida, `${red.icono}.png`));
}

console.log(`Imágenes generadas en ${salida}: ${[D.logo.archivo, ...D.redes.map((r) => `${r.icono}.png`)].join(', ')}`);
