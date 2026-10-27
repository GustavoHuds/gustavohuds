// 12 · Rodapé: a noite cai sobre o mar e o dragão (asset B, vetorizado)
// sobe entre as nuvens rumo à lua. Lua cheia, mote e carimbo.
import { svgOpen, motionCss, fontFace, family, at, esc, r, rng, seigaihaPattern, hanko, HANKO_TEXT, art } from '../lib.mjs';

export const meta = { name: 'footer', w: 1200, h: 220 };

const MOTTO = '竜門 · THE GATE IS THE BEGINNING, NOT THE END';

export function render(T) {
  const W = 1200, H = 220, SEA = 150;
  const dark = T.name === 'dark';
  const sky = dark ? ['#050D1F', '#0B1A33'] : ['#EFE3CF', '#F3EBDD'];
  const rand = rng(23);
  const stars = dark ? Array.from({ length: 34 }, (_, i) => {
    const x = rand() * W, y = rand() * (SEA - 20), s = 0.6 + rand() * 1.3;
    return `<circle class="twinkle" style="animation-delay:${r(rand() * 6)}s" cx="${r(x)}" cy="${r(y)}" r="${r(s)}"/>`;
  }).join('') : '';
  const ripples = Array.from({ length: 22 }, () => {
    const x = rand() * W, y = SEA + 10 + rand() * 55, len = 30 + rand() * 60;
    return `<path d="M${r(x)},${r(y)}q${r(len / 2)},-3 ${r(len)},0"/>`;
  }).join('');

  return `${svgOpen(W, H, 'Night falls on the sea', 'A dragon rising through clouds toward the full moon over the night sea, and a red hanko seal. The gate is the beginning, not the end.')}
<defs><style>${fontFace('mincho', MOTTO)}${fontFace('minchoBold', HANKO_TEXT)}${motionCss}
  .twinkle{animation:ry-tw 5s ease-in-out infinite alternate}
  .soar{animation:ry-soar 14s ease-in-out 2s infinite alternate}
  @keyframes ry-tw{from{opacity:.25}to{opacity:1}}
  @keyframes ry-soar{to{transform:translate(14px,-5px)}}
  .motto{font-family:${family('mincho')};font-size:13px;letter-spacing:4px;fill:${T.inkSoft}}
</style>
  <linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient>
  <radialGradient id="halo"><stop offset=".55" stop-color="${T.moon}" stop-opacity=".25"/><stop offset="1" stop-color="${T.moon}" stop-opacity="0"/></radialGradient>
  ${seigaihaPattern('fsea', { size: 30, stroke: T.ripple, fill: dark ? T.seaDeep : T.sea, width: 1 })}
</defs>
<rect width="${W}" height="${H}" rx="14" fill="url(#fsky)"/>
<g fill="${T.moon}">${stars}</g>
<circle cx="960" cy="70" r="70" fill="url(#halo)"/>
<circle class="reveal" ${at(0.2, 1.4)} cx="960" cy="70" r="32" fill="${T.moon}" stroke="${T.ink}" stroke-width="1.5" fill-opacity="${dark ? 0.95 : 1}"/>
<g class="soar">${art('dragon-sm', { x: 40, y: 6, w: 450, fill: T.ink, cls: 'rise', style: at(0.4, 1.6, '--dy:30px') })}</g>
<path d="M0,${SEA}H${W}V${H - 14}a14,14 0 0 1 -14,14H14a14,14 0 0 1 -14,-14Z" fill="url(#fsea)" opacity=".85"/>
<path d="M0,${SEA}H${W}" stroke="${T.ink}" stroke-opacity=".4"/>
<g fill="none" stroke="${T.moon}" stroke-opacity=".55" stroke-width="2" stroke-linecap="round">
  <path d="M930,${SEA + 12}h60M942,${SEA + 26}h36M952,${SEA + 40}h16"/>
</g>
<g fill="none" stroke="${T.ripple}" stroke-width="1.4" stroke-linecap="round" opacity=".7">${ripples}</g>
<text class="motto reveal" ${at(0.6, 1)} x="830" y="${SEA - 18}" text-anchor="middle">${esc(MOTTO)}</text>
${hanko({ id: 'fseal', x: 1110, y: 160, size: 44, theme: T, t: 1.2 })}
</svg>`;
}
