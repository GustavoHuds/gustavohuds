// Kamon (家紋) dos setores: asset F (assets/src/ai/F-kamon-set.png),
// vetorizado por build/vectorize.py. A tinta vira a cor do tema e os
// recortes deixam o fundo do GitHub aparecer.
import { svgOpen, art, vector } from '../lib.mjs';

export const meta = { name: 'kamon', w: 96, h: 96 };

const SECTORS = ['retail', 'fintech', 'entertainment', 'platforms'];
export const variants = SECTORS.map((k) => ({ suffix: `-${k}`, props: { motif: k } }));

export function render(T, { motif }) {
  const v = vector(`kamon-${motif}`);
  const s = 92 / Math.max(v.w, v.h);
  return `${svgOpen(96, 96, `${motif} crest`, `Kamon-style crest for the ${motif} sector.`)}
${art(`kamon-${motif}`, { x: (96 - v.w * s) / 2, y: (96 - v.h * s) / 2, w: v.w * s, fill: T.ink })}
</svg>`;
}
