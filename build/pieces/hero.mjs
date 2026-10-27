// 00 · Cabeçalho: a Grande Onda ao amanhecer, o sol nascendo, o carimbo.
// Onda PROVISÓRIA, desenhada em código. Será trocada pela arte vetorizada
// do asset A (docs/ESCOPO-RYUMON.md §8.3) quando ela chegar.
import {
  svgOpen, motionCss, fontFace, family, at, esc, r, pt, sample, segsToPath, smooth,
  rot, add, norm, rng, seigaihaPattern, hanko, HANKO_TEXT, kumo,
} from '../lib.mjs';

export const meta = { name: 'hero', w: 1200, h: 400 };

const W = 1200, H = 400, HORIZON = 262;
const NAME = 'GUSTAVO HUDSON';
const ROLE = 'CHIEF TECHNOLOGY OFFICER';
const COORDS = '7°09′S  34°47′W  ·  WHERE THE SUN RISES FIRST';

// Dorso + lábio da onda principal (esquerda → crista → ponta do lábio)
const BACK = [
  [[-10, 310], [60, 240], [150, 146], [240, 96]],
  [[240, 96], [300, 62], [362, 42], [424, 46]],
  [[424, 46], [486, 50], [546, 86], [578, 142]],
];
// Ponta do lábio curvando para dentro e descendo pela face
const CURL = [
  [[578, 142], [556, 118], [522, 106], [490, 110]],
  [[490, 110], [450, 115], [420, 148], [418, 190]],
  [[418, 190], [416, 240], [462, 296], [552, 338]],
  [[552, 338], [596, 358], [628, 378], [668, 410]],
];

/** Garra de espuma: dedo curvo que pende da crista. */
function claw(p, dir, len, width) {
  const side = rot(dir, 90);
  const a = add(p, side, width / 2), b = add(p, side, -width / 2);
  const tip = add(p, dir, len);
  const hookDir = norm(rot(dir, 115));
  const hook = add(tip, hookDir, len * 0.42);
  const c1 = add(add(p, dir, len * 0.55), side, width * 0.7);
  const c2 = add(tip, rot(dir, 60), len * 0.35);
  const c3 = add(add(p, dir, len * 0.5), side, -width * 0.2);
  return `M${pt(a)}Q${pt(c1)} ${pt(tip)}Q${pt(c2)} ${pt(hook)}Q${pt(c3)} ${pt(b)}Z`;
}

function mainWave(T) {
  const body = `${segsToPath(BACK)}${CURL.map(([, c1, c2, p1]) => `C${pt(c1)} ${pt(c2)} ${pt(p1)}`).join('')}L-10,410Z`;

  // Estrias internas: o dorso deslocado para dentro, recortado pela onda
  const backPts = sample(BACK, 60);
  const stripes = [];
  for (let k = 1; k <= 6; k++) {
    const off = k * 19;
    const pts = backPts
      .map(({ p, tan }) => add(p, [-tan[1], tan[0]], off))
      .filter(([x, y]) => x < 470 - k * 8 && y < 400);
    if (pts.length > 4) stripes.push(smooth(pts.filter((_, i) => i % 3 === 0)));
  }

  // Garras ao longo da crista, do topo até a ponta do lábio
  const crest = sample(BACK.slice(1), 22).slice(2);
  const claws = crest.map(({ p, tan }, i) => {
    const out = [tan[1], -tan[0]];
    const dir = norm(add(tan, out, 0.75));
    const grow = 0.6 + (i / crest.length) * 0.9;
    return `<path class="pop" ${at(2.0 + i * 0.035, 0.42, '--o:0% 50%')} d="${claw(p, dir, 21 * grow, 10 * grow)}"/>`;
  }).join('');

  // Gotas de espuma perto da ponta
  const rand = rng(11);
  const drops = Array.from({ length: 16 }, (_, i) => {
    const x = 470 + rand() * 150, y = 40 + rand() * 120, rad = 1.6 + rand() * 3.4;
    return `<circle class="pop" ${at(2.6 + i * 0.03, 0.4)} cx="${r(x)}" cy="${r(y)}" r="${r(rad)}"/>`;
  }).join('');

  return `
  <g transform="translate(-34,22) scale(.9)">
  <clipPath id="wave-clip"><path d="${body}"/></clipPath>
  <g>
    <path class="reveal" ${at(1.0, 1.2)} d="${body}" fill="${T.wave}"/>
    <g class="reveal" ${at(1.1, 1.2)} clip-path="url(#wave-clip)">
      <path d="${segsToPath(CURL.slice(1))}L668,410L380,410Z" fill="${T.waveShade}"/>
      <rect x="-10" y="0" width="700" height="410" fill="url(#seigaiha-wave)" opacity=".35"/>
    </g>
    <g clip-path="url(#wave-clip)" fill="none" stroke="${T.stripe}" stroke-width="2.4" stroke-linecap="round">
      ${stripes.map((d, i) => `<path class="draw" pathLength="1" ${at(1.2 + i * 0.12, 1.4)} d="${d}"/>`).join('')}
    </g>
    <path class="draw" pathLength="1" ${at(1.7, 1.0)} d="${segsToPath(BACK.slice(1))}" fill="none" stroke="${T.foam}" stroke-width="9" stroke-linecap="round"/>
    <path class="draw" pathLength="1" ${at(0.2, 2.0)} d="${body}" fill="none" stroke="${T.ink}" stroke-width="2.6" stroke-linejoin="round"/>
    <g fill="${T.foam}" stroke="${T.ink}" stroke-width="1.3" stroke-linejoin="round">${claws}</g>
    <g fill="${T.foam}">${drops}</g>
  </g></g>`;
}

/** Onda de primeiro plano: corcova baixa com uma crista pequena. */
function smallWave(T, { x0, x1, base, crestX, crestY, delay, id }) {
  const segs = [
    [[x0, base], [x0 + (crestX - x0) * 0.4, base - 6], [crestX - 60, crestY + 6], [crestX, crestY]],
    [[crestX, crestY], [crestX + 30, crestY - 3], [crestX + 52, crestY + 10], [crestX + 62, crestY + 26]],
    [[crestX + 62, crestY + 26], [crestX + 54, crestY + 18], [crestX + 40, crestY + 18], [crestX + 34, crestY + 26]],
    [[crestX + 34, crestY + 26], [crestX + 70, base - 2], [x1 - 80, base + 6], [x1, H + 12]],
  ];
  const d = `${segsToPath(segs)}L${x1},${H + 10}L${x0},${H + 10}Z`;
  const crest = sample(segs.slice(0, 2), 12).slice(5);
  const claws = crest.map(({ p, tan }, i) => {
    const dir = norm(add(tan, [tan[1], -tan[0]], 0.8));
    return `<path class="pop" ${at(delay + 0.4 + i * 0.04, 0.4)} d="${claw(p, dir, 9, 5)}"/>`;
  }).join('');
  return `<g class="sway" id="${id}">
    <path class="reveal" ${at(delay, 0.9)} d="${d}" fill="${T.wave}" stroke="${T.ink}" stroke-width="2.2" stroke-linejoin="round"/>
    <path class="draw" pathLength="1" ${at(delay + 0.2, 0.9)} d="${segsToPath(segs.slice(0, 2))}" fill="none" stroke="${T.foam}" stroke-width="5" stroke-linecap="round"/>
    <g fill="${T.foam}" stroke="${T.ink}" stroke-width="1.1">${claws}</g>
  </g>`;
}

/** Ondulações do mar calmo à direita. */
function ripples(T) {
  const rand = rng(5);
  const rows = [[278, 1.2, 46], [296, 1.5, 58], [318, 1.9, 74], [346, 2.3, 92], [380, 2.8, 112]];
  let out = '';
  rows.forEach(([y, w, step], ri) => {
    for (let x = 620 + rand() * step; x < W + 20; x += step + rand() * step * 0.6) {
      const len = step * (0.45 + rand() * 0.25);
      out += `<path class="reveal" ${at(2.2 + ri * 0.1 + rand() * 0.3, 0.8)} d="M${r(x)},${r(y)}q${r(len / 2)},${r(-w * 3)} ${r(len)},0" stroke-width="${w}"/>`;
    }
  });
  return `<g fill="none" stroke="${T.ripple}" stroke-linecap="round">${out}</g>`;
}

export function render(T) {
  const fonts = fontFace('minchoBold', NAME + HANKO_TEXT) + fontFace('mincho', ROLE) + fontFace('mono', COORDS);
  const SUN = { x: 905, y: HORIZON - 26, r: 46 };

  return `${svgOpen(W, H, 'Gustavo Hudson — Chief Technology Officer',
    'Ukiyo-e style great wave at sunrise, the name Gustavo Hudson and a red hanko seal. Every line is hand-tuned SVG.')}
<defs>
  <style>${fonts}${motionCss}
    .sway{animation:ry-sway 11s ease-in-out 4.6s infinite alternate}
    .drift{animation:ry-drift 46s ease-in-out 3.4s infinite alternate}
    @keyframes ry-sway{to{transform:translateX(-6px)}}
    @keyframes ry-drift{to{transform:translateX(-38px)}}
    .name{font-family:${family('minchoBold')};font-size:50px;letter-spacing:6px;fill:${T.ink}}
    .role{font-family:${family('mincho')};font-size:20px;letter-spacing:5.5px;fill:${T.inkSoft}}
    .coord{font-family:${family('mono')};font-size:14px;letter-spacing:2.5px;fill:${T.muted}}
  </style>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${T.skyTop}"/><stop offset="1" stop-color="${T.skyHorizon}"/>
  </linearGradient>
  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${T.sea}"/><stop offset="1" stop-color="${T.seaDeep}"/>
  </linearGradient>
  <radialGradient id="glow" cx="${SUN.x}" cy="${HORIZON}" r="260" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${T.glow}" stop-opacity="${T.glowOpacity}"/><stop offset="1" stop-color="${T.glow}" stop-opacity="0"/>
  </radialGradient>
  ${seigaihaPattern('seigaiha-wave', { size: 34, stroke: T.stripe, fill: T.wave, width: 1.2 })}
  ${seigaihaPattern('seigaiha-sea', { size: 40, stroke: T.ripple, fill: 'none', width: 1 })}
  <linearGradient id="fade-up" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/>
  </linearGradient>
  <mask id="sea-mask"><rect x="0" y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="url(#fade-up)"/></mask>
  <clipPath id="above-horizon"><rect width="${W}" height="${HORIZON}"/></clipPath>
</defs>

<rect width="${W}" height="${HORIZON}" fill="url(#sky)"/>
<rect class="reveal" ${at(1.4, 2)} width="${W}" height="${HORIZON}" fill="url(#glow)"/>
<rect y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="url(#sea)"/>
<rect class="reveal" ${at(0.3, 1.5)} y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="url(#seigaiha-sea)" mask="url(#sea-mask)" opacity="${T.name === 'dark' ? 1 : .5}"/>

<!-- sol nascente: só o disco, nunca raios -->
<g clip-path="url(#above-horizon)">
  <circle class="rise" ${at(1.6, 1.6, '--dy:70px')} cx="${SUN.x}" cy="${SUN.y}" r="${SUN.r}" fill="${T.shu}" fill-opacity=".92"/>
</g>

<!-- montanha distante -->
<g class="reveal" ${at(1.2, 1.2)}>
  <path d="M968,${HORIZON}L1036,206Q1047,196 1058,202L1146,${HORIZON}Z" fill="${T.skyHorizon}" stroke="${T.ink}" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M1013,227L1024,233L1033,224L1043,232L1052,222L1062,231L1071,226" fill="none" stroke="${T.ink}" stroke-width="1.4" stroke-linejoin="round"/>
</g>
<path class="draw" pathLength="1" ${at(0.4, 1.6)} d="M600,${HORIZON}H${W}" stroke="${T.ink}" stroke-opacity=".45" stroke-width="1.2"/>

<!-- névoa -->
<g class="drift"><g class="rise" ${at(2.4, 1.2, '--dy:0px')} fill="${T.mist}" fill-opacity="${T.mistOpacity}">
  <rect x="640" y="236" width="330" height="9" rx="4.5"/>
  <rect x="820" y="249" width="380" height="7" rx="3.5"/>
</g></g>

${ripples(T)}
${smallWave(T, { x0: 470, x1: 1060, base: 372, crestX: 780, crestY: 338, delay: 1.5, id: 'w2' })}
${mainWave(T)}
${smallWave(T, { x0: -20, x1: 640, base: 384, crestX: 250, crestY: 330, delay: 1.3, id: 'w1' })}

${kumo({ x: 36, y: 70, w: 120, theme: T, cls: 'rise', style: at(2.6, 1.2, '--dy:0px') })}

<!-- nome -->
<text class="name wipe" ${at(3.2, 0.9)} x="1150" y="96" text-anchor="end">${esc(NAME)}</text>
<text class="role wipe" ${at(3.5, 0.8)} x="1150" y="134" text-anchor="end">${esc(ROLE)}</text>
<text class="coord reveal" ${at(3.9, 0.7)} x="1150" y="166" text-anchor="end">${esc(COORDS)}</text>

${hanko({ id: 'seal', x: 1096, y: 300, size: 58, theme: T, t: 4.4 })}
</svg>`;
}
