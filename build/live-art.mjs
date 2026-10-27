// Gera live/src/art.js: as nuvens kumo (asset D, vetorizado) que emolduram
// o painel de telemetria. O Worker não lê arquivos, então a arte vai embutida.
// A cor é trocada em tempo de execução: o marcador __INK__ vira a cor do tema.
import { writeFileSync } from 'node:fs';
import { optimize } from 'svgo';
import { art, vector } from './lib.mjs';
import svgoConfig from './svgo.config.mjs';

const CLOUDS = { left: 'clouds-c5', right: 'clouds-c6' };
const HEIGHT = 62; // altura em que as nuvens aparecem no painel

const out = {};
for (const [key, name] of Object.entries(CLOUDS)) {
  const v = vector(name);
  const w = Math.round((HEIGHT / v.h) * v.w);
  const g = art(name, { x: 0, y: 0, h: HEIGHT, fill: '__INK__' });
  const { data } = optimize(`<svg xmlns="http://www.w3.org/2000/svg">${g}</svg>`, svgoConfig);
  out[key] = { w, h: HEIGHT, markup: data.replace(/^<svg[^>]*>|<\/svg>$/g, '') };
}

const file = new URL('../live/src/art.js', import.meta.url);
writeFileSync(file, `// GERADO por build/live-art.mjs a partir de assets/src/vector. Não editar à mão.\nexport const CLOUDS = ${JSON.stringify(out)};\n`);
console.log(`live/src/art.js  ${(JSON.stringify(out).length / 1024).toFixed(1)} KB`);
