// 10 · Off-duty: pinheiro, montanhas e a trilha até o cume (asset E,
// vetorizado). Fica dentro do <details> "Off-duty", no lugar da prancha 3D.
import { svgOpen, motionCss, EASE, at, art, vector } from '../lib.mjs';

export const meta = { name: 'offduty', w: 1200, h: 360 };

export function render(T) {
  const W = 1200, H = 360, v = vector('mountain');
  const h = (W / v.w) * v.h;
  return `${svgOpen(W, H, 'Off-duty', 'A pine on a cliff and a trail winding up to a mountain peak above the clouds, in ukiyo-e linework.')}
<defs><style>${motionCss}
  .climb{clip-path:inset(0 100% 0 0);animation:ry-climb 2.6s ${EASE} .2s forwards}
  @keyframes ry-climb{to{clip-path:inset(0 0 0 0)}}
  @media (prefers-reduced-motion:reduce){.climb{clip-path:none!important}}
</style>
  <linearGradient id="osky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${T.skyTop}"/><stop offset="1" stop-color="${T.skyHorizon}"/>
  </linearGradient>
  <clipPath id="card"><rect width="${W}" height="${H}" rx="14"/></clipPath>
</defs>
<g clip-path="url(#card)">
<rect width="${W}" height="${H}" fill="url(#osky)"/>
<circle class="rise" ${at(1.4, 1.6, '--dy:30px')} cx="1010" cy="92" r="30" fill="${T.shu}" fill-opacity=".85"/>
${art('mountain', { x: 0, y: H - h - 6, w: W, fill: T.ink, cls: 'climb' })}
</g>
</svg>`;
}
