// Utilitários compartilhados pelas peças: tokens de tema, fontes embutidas,
// geometria de curvas e um gerador pseudoaleatório determinístico.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const FONT_DIR = `${ROOT}assets/src/fonts/`;
const CACHE_DIR = `${ROOT}.cache/fonts/`;

// ── Tokens (ver docs/ESCOPO-RYUMON.md §5.2) ────────────────────────────────
export const THEMES = {
  dark: {
    name: 'dark',
    skyTop: '#07122A', skyHorizon: '#14305C', sea: '#0B1A33', seaDeep: '#081429',
    bg: '#0B1A33', panel: '#0E2142', panelEdge: '#24467F',
    wave: '#1C4A92', waveShade: '#133766', stripe: '#5B8BDB',
    foam: '#F3EBDD', ink: '#E8E1D3', inkSoft: '#9DB7E8', muted: '#6F93D6',
    mist: '#5B80C2', mistOpacity: 0.22, ripple: '#3E66AE',
    accent: '#2563EB', shu: '#D7263D', sealText: '#F8F1E4', kin: '#C9A227',
    glow: '#D7263D', glowOpacity: 0.22, moon: '#F3EBDD',
    ok: '#3FB68B', warn: '#E0A43A', off: '#6B7280',
  },
  light: {
    name: 'light',
    skyTop: '#F7F1E6', skyHorizon: '#EAD9BE', sea: '#F1E7D6', seaDeep: '#E6D8C0',
    bg: '#F3EBDD', panel: '#F8F2E7', panelEdge: '#C9B48F',
    wave: '#1E3A6E', waveShade: '#152B54', stripe: '#4A6FB0',
    foam: '#FFFFFF', ink: '#13213D', inkSoft: '#1E3A6E', muted: '#2563EB',
    mist: '#1E3A6E', mistOpacity: 0.10, ripple: '#8DA2C6',
    accent: '#2563EB', shu: '#B5122A', sealText: '#FBF6EC', kin: '#A8841A',
    glow: '#E0623A', glowOpacity: 0.28, moon: '#FFFFFF',
    ok: '#1F8A62', warn: '#B07415', off: '#6B7280',
  },
};

// ── Texto ───────────────────────────────────────────────────────────────────
export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// ── Fontes ──────────────────────────────────────────────────────────────────
export const FONTS = {
  mincho: { file: 'ShipporiMincho-Regular.ttf', family: 'RyMincho', weight: 400 },
  minchoBold: { file: 'ShipporiMincho-Bold.ttf', family: 'RyMinchoB', weight: 700 },
  mono: { file: 'JetBrainsMono.ttf', family: 'RyMono', weight: 500 },
  monoBold: { file: 'JetBrainsMono.ttf', family: 'RyMonoB', weight: 700, wght: 700 },
};

/**
 * Gera @font-face com a fonte reduzida aos caracteres de `text`.
 * O resultado fica em cache por (fonte, peso, conjunto de caracteres).
 */
export function fontFace(key, text) {
  const f = FONTS[key];
  const chars = [...new Set(text)].sort().join('');
  const hash = createHash('sha1').update(`${f.file}|${f.wght ?? f.weight}|${chars}`).digest('hex').slice(0, 16);
  const cached = `${CACHE_DIR}${hash}.b64`;
  let b64;
  if (existsSync(cached)) {
    b64 = readFileSync(cached, 'utf8');
  } else {
    const font = `${FONT_DIR}${f.file}`;
    if (!existsSync(font)) throw new Error(`Fonte ausente: ${f.file}. Rode: npm run fonts:fetch`);
    b64 = execFileSync('python', [`${ROOT}build/subset.py`, font, String(f.wght ?? f.weight)], {
      input: chars, maxBuffer: 1 << 26,
    }).toString();
    mkdirSync(CACHE_DIR, { recursive: true });
    writeFileSync(cached, b64);
  }
  return `@font-face{font-family:${f.family};src:url(data:font/woff2;base64,${b64}) format('woff2');font-weight:${f.weight};}`;
}

export const family = (key) => FONTS[key].family;

// ── Movimento ───────────────────────────────────────────────────────────────
export const EASE = 'cubic-bezier(.65,0,.35,1)';
export const EASE_STAMP = 'cubic-bezier(.2,1.4,.4,1)';

/** Regras base de animação + desligamento total para prefers-reduced-motion. */
export const motionCss = `
.draw{stroke-dasharray:1;stroke-dashoffset:1;animation:ry-draw var(--d,1.6s) ${EASE} var(--t,0s) forwards}
.reveal{opacity:0;animation:ry-in var(--d,.8s) ${EASE} var(--t,0s) forwards}
.rise{opacity:0;animation:ry-rise var(--d,1.2s) ${EASE} var(--t,0s) forwards}
.pop{opacity:0;transform-box:fill-box;transform-origin:var(--o,center);animation:ry-pop var(--d,.45s) ${EASE_STAMP} var(--t,0s) forwards}
.wipe{clip-path:inset(0 100% 0 0);animation:ry-wipe var(--d,.9s) ${EASE} var(--t,0s) forwards}
.stamp{opacity:0;transform-box:fill-box;transform-origin:center;animation:ry-stamp .38s ${EASE_STAMP} var(--t,0s) forwards}
@keyframes ry-draw{to{stroke-dashoffset:0}}
@keyframes ry-in{to{opacity:1}}
@keyframes ry-rise{from{opacity:0;transform:translateY(var(--dy,40px))}to{opacity:1;transform:none}}
@keyframes ry-pop{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:none}}
@keyframes ry-wipe{to{clip-path:inset(0 0 0 0)}}
@keyframes ry-stamp{0%{opacity:0;transform:scale(1.35) rotate(-4deg)}70%{opacity:1}100%{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){
  *{animation:none!important;transition:none!important}
  .draw{stroke-dashoffset:0!important}
  .reveal,.rise,.pop,.stamp{opacity:1!important;transform:none!important}
  .wipe{clip-path:none!important}
}`;

/** Estilo inline para uma animação: atraso, duração e variáveis extras. */
export const at = (t, d, extra = '') => `style="--t:${t}s${d ? `;--d:${d}s` : ''}${extra ? `;${extra}` : ''}"`;

// ── Geometria ───────────────────────────────────────────────────────────────
export const r = (n) => Math.round(n * 10) / 10;
export const pt = ([x, y]) => `${r(x)},${r(y)}`;

/** Ponto e tangente de uma cúbica [p0,c1,c2,p1] em t. */
export function cubic([p0, c1, c2, p1], t) {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p1[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p1[1];
  const dx = 3 * u * u * (c1[0] - p0[0]) + 6 * u * t * (c2[0] - c1[0]) + 3 * t * t * (p1[0] - c2[0]);
  const dy = 3 * u * u * (c1[1] - p0[1]) + 6 * u * t * (c2[1] - c1[1]) + 3 * t * t * (p1[1] - c2[1]);
  const len = Math.hypot(dx, dy) || 1;
  return { p: [x, y], tan: [dx / len, dy / len] };
}

/** Amostra uma cadeia de cúbicas: segs = [[p0,c1,c2,p1], ...]. */
export function sample(segs, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const g = (i / (n - 1)) * segs.length;
    const k = Math.min(Math.floor(g), segs.length - 1);
    out.push(cubic(segs[k], g - k));
  }
  return out;
}

export const segsToPath = (segs) =>
  `M${pt(segs[0][0])}` + segs.map(([, c1, c2, p1]) => `C${pt(c1)} ${pt(c2)} ${pt(p1)}`).join('');

/** Polilinha suavizada (Catmull-Rom → cúbicas). */
export function smooth(points, closed = false) {
  const p = points;
  let d = `M${pt(p[0])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${pt(c1)} ${pt(c2)} ${pt(p2)}`;
  }
  return closed ? `${d}Z` : d;
}

export const rot = ([x, y], deg) => {
  const a = (deg * Math.PI) / 180;
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
};
export const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
export const norm = ([x, y]) => { const l = Math.hypot(x, y) || 1; return [x / l, y / l]; };

/** PRNG determinístico (mulberry32): o SVG sai idêntico a cada build. */
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Motivos reutilizáveis ───────────────────────────────────────────────────

/** Padrão seigaiha (青海波): escamas de arcos concêntricos. */
export function seigaihaPattern(id, { size = 36, stroke, fill, width = 1.4, rings = 3 }) {
  const R = size / 2;
  const scale = (cx, cy) => {
    let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
    for (let i = 1; i < rings; i++) {
      s += `<circle cx="${cx}" cy="${cy}" r="${r(R * (1 - i / rings))}" fill="none" stroke="${stroke}" stroke-width="${width}"/>`;
    }
    return s;
  };
  // duas fileiras deslocadas meia escama: a de cima é desenhada antes
  return `<pattern id="${id}" width="${size}" height="${R}" patternUnits="userSpaceOnUse">`
    + scale(0, 0) + scale(size, 0) + scale(R, R / 2) + scale(0, R) + scale(size, R)
    + `</pattern>`;
}

/**
 * Carimbo hanko: quadrado vermelho com borda irregular de tinta e
 * texto real (nunca gerado por IA). `chars` em leitura tradicional:
 * coluna da direita de cima para baixo, depois a da esquerda.
 */
export function hanko({ id, x, y, size, theme, chars = ['グ', 'ス', 'タ', 'ボ'], t = 0 }) {
  const s = size, pad = s * 0.12, cell = (s - pad * 2) / 2, fs = cell * 0.82;
  const [rTop, rBot, lTop, lBot] = chars;
  const cx = (col) => x + pad + cell * col + cell / 2;
  const cy = (row) => y + pad + cell * row + cell / 2 + fs * 0.34;
  const glyph = (c, col, row) =>
    `<text x="${r(cx(col))}" y="${r(cy(row))}" text-anchor="middle" font-family="${family('minchoBold')}" font-size="${r(fs)}" fill="${theme.sealText}">${c}</text>`;
  return `
  <filter id="${id}-ink" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="${r(s * 0.05)}"/>
  </filter>
  <g class="stamp" ${at(t)} filter="url(#${id}-ink)">
    <rect x="${x}" y="${y}" width="${s}" height="${s}" rx="${r(s * 0.08)}" fill="${theme.shu}"/>
    <rect x="${r(x + s * 0.06)}" y="${r(y + s * 0.06)}" width="${r(s * 0.88)}" height="${r(s * 0.88)}" rx="${r(s * 0.05)}" fill="none" stroke="${theme.sealText}" stroke-width="${r(s * 0.025)}"/>
    ${glyph(rTop, 1, 0)}${glyph(rBot, 1, 1)}${glyph(lTop, 0, 0)}${glyph(lBot, 0, 1)}
  </g>`;
}
export const HANKO_TEXT = 'グスタボ';

/** Nuvem kumo estilizada: lóbulos + base reta + espiral na ponta. */
export function kumo({ x, y, w, theme, cls = '', style = '' }) {
  const h = w * 0.22;
  const lobes = [[0.18, 0.55], [0.38, 0.85], [0.6, 0.7], [0.8, 0.5]];
  let d = `M${r(x)},${r(y)}`;
  let px = x;
  for (const [fx, fh] of lobes) {
    const nx = x + w * fx + w * 0.11;
    d += `A${r((nx - px) / 2)},${r(h * fh)} 0 0 1 ${r(nx)},${r(y)}`;
    px = nx;
  }
  d += `L${r(x + w)},${r(y)}`;
  const sx = x + w * 0.03, sy = y + h * 0.18;
  const spiral = `M${r(sx + h * 0.5)},${r(sy)}a${r(h * 0.5)},${r(h * 0.5)} 0 1 1 ${r(-h * 0.5)},${r(-h * 0.5)}a${r(h * 0.28)},${r(h * 0.28)} 0 1 1 ${r(h * 0.28)},${r(h * 0.28)}`;
  return `<g class="${cls}" ${style}>
    <path d="${d}Z" fill="${theme.foam}" fill-opacity="${theme.name === 'dark' ? 0.12 : 0.9}" stroke="${theme.ink}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="${spiral}" fill="none" stroke="${theme.ink}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M${r(x + w * 0.1)},${r(y + h * 0.35)}H${r(x + w * 1.05)}" stroke="${theme.ink}" stroke-width="1.6" stroke-linecap="round"/>
  </g>`;
}

// ── Arte vetorizada (assets/src/vector, gerada por build/vectorize.py) ────────
const VECTOR_DIR = `${ROOT}assets/src/vector/`;

/** Lê um SVG do vtracer: tamanho e paths (cada um com seu translate). */
export function vector(name) {
  const file = `${VECTOR_DIR}${name}.svg`;
  if (!existsSync(file)) throw new Error(`Arte ausente: ${name}.svg. Rode: python build/vectorize.py`);
  const src = readFileSync(file, 'utf8');
  const [, w, h] = src.match(/width="([\d.]+)" height="([\d.]+)"/);
  const paths = [...src.matchAll(/<path d="([^"]+)"[^>]*?(?:transform="translate\(([-\d.]+),([-\d.]+)\)")?\s*\/>/g)]
    .map(([, d, tx = 0, ty = 0]) => ({ d: d.trim(), tx: +tx, ty: +ty }));
  return { w: +w, h: +h, paths };
}

/**
 * Coloca uma arte vetorizada em (x, y) com largura `w` (ou altura `h`),
 * pintada com `fill`. A tinta vira cor do tema; o branco fica transparente.
 */
export function art(name, { x = 0, y = 0, w, h, fill, cls = '', style = '', flip = false }) {
  const v = vector(name);
  const s = w ? w / v.w : h / v.h;
  const flipT = flip ? ` translate(${r(v.w * s)},0) scale(-1,1)` : '';
  const body = v.paths.map(({ d, tx, ty }) =>
    `<path${tx || ty ? ` transform="translate(${r(tx)},${r(ty)})"` : ''} d="${d}"/>`).join('');
  // o grupo animado fica por fora: transform via CSS substituiria o atributo
  const g = `<g transform="translate(${r(x)},${r(y)})${flipT} scale(${+s.toFixed(5)})" fill="${fill}">${body}</g>`;
  return cls || style ? `<g${cls ? ` class="${cls}"` : ''}${style ? ` ${style}` : ''}>${g}</g>` : g;
}

export const svgOpen = (w, h, title, desc) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d">`
  + `<title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>`;
