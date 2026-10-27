// Kamon (家紋) dos setores: brasões geométricos e simétricos, feitos em código.
import { svgOpen, r } from '../lib.mjs';

export const meta = { name: 'kamon', w: 96, h: 96 };

const C = 48;
const ring = (T) => `<circle cx="${C}" cy="${C}" r="44" fill="none" stroke="${T.ink}" stroke-width="4"/>`;

/** Forma sólida com recortes transparentes (máscara branca/preta). */
const cut = (T, id, shape, holes) => `<mask id="m-${id}">${shape}<g fill="#000">${holes}</g></mask>`
  + `<rect width="96" height="96" fill="${T.ink}" mask="url(#m-${id})"/>`;

const hex = (cx, cy, s) => Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i;
  return `${r(cx + s * Math.cos(a))},${r(cy + s * Math.sin(a))}`;
}).join(' ');

const MOTIFS = {
  // Noren: a cortina da entrada das lojas, três painéis pendurados numa vara
  retail: (T) => `<g fill="${T.ink}">
    <rect x="18" y="24" width="60" height="5" rx="2.5"/>
    <path d="M22 31h15v34q-7.5 5-15 0z"/>
    <path d="M40.5 31h15v38q-7.5 5-15 0z"/>
    <path d="M59 31h15v34q-7.5 5-15 0z"/></g>`,
  // Moeda antiga: círculo com furo quadrado e quatro marcas
  // (os "furos" são recortados por máscara: o fundo do GitHub aparece através)
  fintech: (T) => cut(T, 'fintech', `<circle cx="${C}" cy="${C}" r="30" fill="#fff"/>`,
    `<circle cx="${C}" cy="${C}" r="25" fill="none" stroke="#000" stroke-width="2"/>
    <rect x="40" y="40" width="16" height="16"/>
    <rect x="45" y="27" width="6" height="8"/><rect x="45" y="61" width="6" height="8"/>
    <rect x="27" y="45" width="8" height="6"/><rect x="61" y="45" width="8" height="6"/>`),
  // Chōchin: lanterna de festival com nervuras
  entertainment: (T) => `<rect x="38" y="16" width="20" height="7" rx="2" fill="${T.ink}"/>
    <rect x="38" y="73" width="20" height="7" rx="2" fill="${T.ink}"/>
    ${cut(T, 'lantern', `<ellipse cx="${C}" cy="${C}" rx="22" ry="26" fill="#fff"/>`,
    `<g stroke="#000" stroke-width="2.2" fill="none">${[-16, -8, 0, 8, 16].map((dy) => {
      const half = 22 * Math.sqrt(1 - (dy / 26) ** 2);
      return `<path d="M${r(C - half + 2)},${C + dy}H${r(C + half - 2)}"/>`;
    }).join('')}</g>`)}`,
  // Kikkō: sete hexágonos, como os nós de uma rede
  platforms: (T) => {
    const s = 11, dx = s * 1.5, dy = s * Math.sqrt(3);
    const centers = [[0, 0], [0, -dy], [0, dy], [dx, -dy / 2], [dx, dy / 2], [-dx, -dy / 2], [-dx, dy / 2]];
    return `<g fill="none" stroke="${T.ink}" stroke-width="3.2" stroke-linejoin="round">${centers
      .map(([x, y]) => `<polygon points="${hex(C + x, C + y, s - 1.5)}"/>`).join('')}</g>`;
  },
};

export const variants = Object.keys(MOTIFS).map((k) => ({ suffix: `-${k}`, props: { motif: k } }));

export function render(T, { motif }) {
  return `${svgOpen(96, 96, `${motif} crest`, `Kamon-style crest for the ${motif} sector.`)}
${ring(T)}${MOTIFS[motif](T)}
</svg>`;
}
