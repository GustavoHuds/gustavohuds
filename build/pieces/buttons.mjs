// Botões de contato no estilo do tema (no lugar dos shields coloridos).
import { svgOpen, fontFace, family, esc } from '../lib.mjs';

export const meta = { name: 'btn', w: 220, h: 44 };

// Glifos próprios, 20×20, traço simples
const GLYPHS = {
  email: '<rect x="1.5" y="4" width="17" height="12" rx="1.5"/><path d="M2 5l8 6 8-6"/>',
  linkedin: '<rect x="1.5" y="1.5" width="17" height="17" rx="2.5"/><path d="M6 8.5V14M6 5.6v.1M9.5 14V8.5M9.5 11c0-1.6 1-2.6 2.4-2.6S14 9.4 14 11v3"/>',
  live: '<circle cx="10" cy="10" r="3" fill="currentColor"/><circle cx="10" cy="10" r="7.5"/>',
  oss: '<circle cx="5" cy="4.5" r="2"/><circle cx="5" cy="15.5" r="2"/><circle cx="15" cy="7" r="2"/><path d="M5 6.5v7M15 9c0 3-4 3.5-8.6 5.4"/>',
};

const BUTTONS = [
  { suffix: '-email', props: { glyph: 'email', label: 'EMAIL' } },
  { suffix: '-linkedin', props: { glyph: 'linkedin', label: 'LINKEDIN' } },
  { suffix: '-live', props: { glyph: 'live', label: 'LIVE IN PRODUCTION', wide: true } },
  { suffix: '-oss', props: { glyph: 'oss', label: 'OPEN SOURCE' } },
];
export const variants = BUTTONS;
const ALL_LABELS = BUTTONS.map((b) => b.props.label).join('');

export function render(T, { glyph, label, wide }) {
  const w = wide ? 236 : label.length > 8 ? 180 : 150, h = 44;
  const fill = T.name === 'dark' ? T.panel : T.panel;
  return `${svgOpen(w, h, label, `${label} button`)}
<defs><style>${fontFace('monoBold', ALL_LABELS)}
  .l{font-family:${family('monoBold')};font-size:13px;letter-spacing:2px;fill:${T.ink}}
</style></defs>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="6" fill="${fill}" stroke="${T.panelEdge}" stroke-width="1.5"/>
<rect x="1" y="1" width="5" height="${h - 2}" rx="2" fill="${glyph === 'live' ? T.ok : T.shu}"/>
<g transform="translate(18,12)" fill="none" stroke="${T.ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" color="${glyph === 'live' ? T.ok : T.ink}">${GLYPHS[glyph]}</g>
<text class="l" x="48" y="27">${esc(label)}</text>
</svg>`;
}
