// 00 · Cabeçalho: a Grande Onda ao amanhecer, o sol nascendo, o carimbo.
// A onda é o asset A (assets/src/ai/A-hero-wave.png) vetorizado por
// build/vectorize.py; aqui ela ganha as cores do tema, o sol e a animação.
import { svgOpen, motionCss, EASE, fontFace, family, at, esc, seigaihaPattern, hanko, HANKO_TEXT, art, vector } from '../lib.mjs';

export const meta = { name: 'hero', w: 1200, h: 400 };

const W = 1200, H = 400;
const NAME = 'GUSTAVO HUDSON';
const ROLE = 'CHIEF TECHNOLOGY OFFICER';
const COORDS = '7°09′S  34°47′W  ·  WHERE THE SUN RISES FIRST';

// Posição da arte e pontos de referência medidos nela (coordenadas da arte)
const ART = { x: 0, y: 14, w: W };
const SUN_IN_ART = { x: 1626, y: 266, r: 59 };
const HORIZON_IN_ART = 330;

export function render(T) {
  const fonts = fontFace('minchoBold', NAME + HANKO_TEXT) + fontFace('mincho', ROLE) + fontFace('mono', COORDS);
  const k = ART.w / vector('wave').w;
  const sun = { x: ART.x + SUN_IN_ART.x * k, y: ART.y + SUN_IN_ART.y * k, r: SUN_IN_ART.r * k };
  const horizon = Math.round(ART.y + HORIZON_IN_ART * k);
  const dark = T.name === 'dark';

  return `${svgOpen(W, H, 'Gustavo Hudson — Chief Technology Officer',
    'Ukiyo-e style great wave at sunrise, the name Gustavo Hudson and a red hanko seal.')}
<defs>
  <style>${fonts}${motionCss}
    .surge{clip-path:inset(100% 0 0 0);animation:ry-surge 2.4s ${EASE} .2s forwards}
    @keyframes ry-surge{to{clip-path:inset(0 0 0 0)}}
    .name{font-family:${family('minchoBold')};font-size:48px;letter-spacing:6px;fill:${T.ink}}
    .role{font-family:${family('mincho')};font-size:19px;letter-spacing:5.5px;fill:${T.inkSoft}}
    .coord{font-family:${family('mono')};font-size:13px;letter-spacing:2.4px;fill:${T.muted}}
    @media (prefers-reduced-motion:reduce){.surge{clip-path:none!important}}
  </style>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${T.skyTop}"/><stop offset="1" stop-color="${T.skyHorizon}"/>
  </linearGradient>
  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${T.sea}"/><stop offset="1" stop-color="${T.seaDeep}"/>
  </linearGradient>
  <radialGradient id="glow" cx="${sun.x}" cy="${horizon}" r="300" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${T.glow}" stop-opacity="${T.glowOpacity}"/><stop offset="1" stop-color="${T.glow}" stop-opacity="0"/>
  </radialGradient>
  ${seigaihaPattern('seigaiha-sea', { size: 40, stroke: T.ripple, fill: 'none', width: 1 })}
  <linearGradient id="fade-up" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".4"/>
  </linearGradient>
  <mask id="sea-mask"><rect x="600" y="${horizon}" width="${W - 600}" height="${H - horizon}" fill="url(#fade-up)"/></mask>
  <!-- o mar só ganha cor depois da onda, para a linha do horizonte não cortar a gravura -->
  <linearGradient id="fade-right" x1="0" y1="0" x2="1" y2="0">
    <stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/>
  </linearGradient>
  <mask id="sea-edge"><rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#fade-right)"/></mask>
  <clipPath id="above-horizon"><rect width="${W}" height="${horizon}"/></clipPath>
</defs>

<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect class="reveal" ${at(1.4, 2)} width="${W}" height="${horizon}" fill="url(#glow)"/>
<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#sea)" mask="url(#sea-edge)"/>
<rect class="reveal" ${at(0.3, 1.5)} y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#seigaiha-sea)" mask="url(#sea-mask)" opacity="${dark ? 0.8 : 0.45}"/>

<!-- sol nascente: só o disco, nunca raios -->
<g clip-path="url(#above-horizon)">
  <circle class="rise" ${at(1.6, 1.6, '--dy:70px')} cx="${sun.x.toFixed(1)}" cy="${sun.y.toFixed(1)}" r="${(sun.r - 1.5).toFixed(1)}" fill="${T.shu}" fill-opacity=".9"/>
</g>

<!-- a gravura: sobe da base para a crista -->
${art('wave', { ...ART, fill: T.ink, cls: 'surge' })}

<!-- nome -->
<text class="name wipe" ${at(2.8, 0.9)} x="1160" y="74" text-anchor="end">${esc(NAME)}</text>
<text class="role wipe" ${at(3.1, 0.8)} x="1160" y="108" text-anchor="end">${esc(ROLE)}</text>
<text class="coord reveal" ${at(3.5, 0.7)} x="1160" y="134" text-anchor="end">${esc(COORDS)}</text>

${hanko({ id: 'seal', x: 1106, y: 318, size: 54, theme: T, t: 4.2 })}
</svg>`;
}
