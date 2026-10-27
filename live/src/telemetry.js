// Painel de telemetria (docs/ESCOPO-RYUMON.md §6.1 · 03 e §11.5).
// Função pura: recebe o estado já lido do KV e devolve o SVG. Não chama rede.
import { CLOUDS } from './art.js';

export const STALE_MS = 15 * 60 * 1000; // dado mais velho que isso → "no signal"

const THEMES = {
  dark: {
    bg: '#0B1A33', panel: '#0E2142', edge: '#24467F', ink: '#E8E1D3', soft: '#9DB7E8',
    muted: '#6F93D6', rule: '#1B3563', ok: '#3FB68B', warn: '#E0A43A', down: '#D7263D', off: '#6B7280',
  },
  light: {
    bg: '#F3EBDD', panel: '#F8F2E7', edge: '#C9B48F', ink: '#13213D', soft: '#1E3A6E',
    muted: '#2563EB', rule: '#E4D6BD', ok: '#1F8A62', warn: '#B07415', down: '#B5122A', off: '#6B7280',
  },
};

const MONO = "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace";
const SERIF = "'Hiragino Mincho ProN','Yu Mincho',Georgia,'Times New Roman',serif";

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const fmtInt = (n) => Math.round(n).toLocaleString('en-US');

/** "3h ago", "2d ago"… a partir de um instante ISO. */
export function ago(iso, now) {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  const s = Math.max(0, (now - t) / 1000);
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

/** Hora local da Paraíba (America/Fortaleza, UTC−3 fixo). */
const brt = (ms) => new Date(ms - 3 * 3600 * 1000).toISOString().slice(11, 16);

/** Sparkline das latências: barras ▁▂▃▅▇ desenhadas em SVG. */
function spark(values, x, y, w, h, color) {
  const v = (values ?? []).slice(-20);
  if (v.length < 2) return `<path d="M${x},${y + h / 2}h${w}" stroke="${color}" stroke-opacity=".35" stroke-dasharray="2 3"/>`;
  const max = Math.max(...v), min = Math.min(...v), span = max - min || 1;
  const step = w / v.length;
  return v.map((n, i) => {
    const bh = 2 + ((n - min) / span) * (h - 2);
    return `<rect x="${(x + i * step).toFixed(1)}" y="${(y + h - bh).toFixed(1)}" width="${(step * 0.62).toFixed(1)}" height="${bh.toFixed(1)}" rx="1"/>`;
  }).join('');
}

/**
 * @param {object} state
 * @param {Array<{name:string,status?:string,uptime30d?:number,latencyMs?:number[]}>} state.systems
 * @param {number|null} state.updatedAt  epoch ms do último envio do monitor
 * @param {Record<string,{tests?:number,deployedAt?:string}>} state.ci
 * @param {string[]} state.allow  ordem de exibição
 */
export function renderTelemetry({ systems = [], updatedAt = null, ci = {}, allow = [] }, theme = 'dark', now = Date.now()) {
  const T = THEMES[theme] ?? THEMES.dark;
  const live = updatedAt != null && now - updatedAt <= STALE_MS;
  const byName = new Map(systems.map((s) => [s.name, s]));
  const names = allow.length ? allow : systems.map((s) => s.name);
  const rows = names.map((name) => ({ name, ...(live ? byName.get(name) : {}), ...ci[name] }));

  const reporting = rows.filter((r) => r.status);
  const up = reporting.filter((r) => r.status === 'up').length;
  const uptimes = reporting.map((r) => r.uptime30d).filter(Number.isFinite);
  const uptime = uptimes.length ? uptimes.reduce((a, b) => a + b, 0) / uptimes.length : null;

  const W = 1200, COLS = 2, ROW = 26, TOP = 96, PADX = 48, GAP = 40;
  const perCol = Math.ceil(rows.length / COLS) || 1;
  const H = TOP + perCol * ROW + 64;
  const colW = (W - PADX * 2 - GAP) / COLS;

  const headColor = !live ? T.off : up === reporting.length && reporting.length ? T.ok : T.warn;
  const headline = !live ? 'NO SIGNAL' : `${up}/${reporting.length} SYSTEMS ONLINE`;
  const color = (s) => ({ up: T.ok, degraded: T.warn, down: T.down }[s] ?? T.off);
  const label = (s) => ({ up: 'OK', degraded: 'SLOW', down: 'DOWN' }[s] ?? '—');

  const body = rows.map((r, i) => {
    const col = Math.floor(i / perCol), row = i % perCol;
    const x = PADX + col * (colW + GAP), y = TOP + row * ROW;
    const c = color(r.status);
    const deployed = r.deployedAt ? ago(r.deployedAt, now) : null;
    return `<g class="row" style="animation-delay:${(0.15 + i * 0.05).toFixed(2)}s">
  <circle cx="${x + 5}" cy="${y - 4}" r="4" fill="${c}"${r.status === 'up' ? ' class="pulse"' : ''}/>
  <text x="${x + 18}" y="${y}" class="name">${esc(r.name)}</text>
  <g fill="${c}" fill-opacity=".85">${spark(live ? r.latencyMs : null, x + 182, y - 13, 80, 14, c)}</g>
  <text x="${x + 274}" y="${y}" class="cell" style="fill:${c}">${label(r.status)}</text>
  <text x="${x + 316}" y="${y}" class="cell dim">${Number.isFinite(r.tests) ? `${fmtInt(r.tests)} tests ✓` : ''}</text>
  <text x="${x + colW}" y="${y}" class="cell dim" text-anchor="end">${deployed ? `deployed ${deployed}` : ''}</text>
</g>`;
  }).join('');

  const cloud = (k, x, y, flip = false) => {
    const c = CLOUDS[k];
    const t = flip ? `translate(${x + c.w},${y}) scale(-1,1)` : `translate(${x},${y})`;
    return `<g transform="${t}" opacity=".9">${c.markup.replaceAll('__INK__', T.edge)}</g>`;
  };

  const foot = live
    ? `updated ${brt(updatedAt)} BRT · data pushed from production, sanitized`
    : updatedAt ? `last signal ${brt(updatedAt)} BRT · the panel never lies` : 'waiting for the first signal · the panel never lies';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
<title id="t">Production telemetry</title>
<desc id="d">${esc(`${headline}. ${uptime != null ? `30-day uptime ${uptime.toFixed(2)}%. ` : ''}${rows.map((r) => `${r.name}: ${label(r.status)}`).join(', ')}.`)}</desc>
<style>
  text{font-family:${MONO};font-size:13px;fill:${T.ink}}
  .title{font-family:${SERIF};font-size:15px;letter-spacing:4px;fill:${T.soft}}
  .head{font-size:15px;font-weight:700;letter-spacing:2px}
  .name{font-weight:600}.cell{font-size:12px}.dim{fill:${T.muted}}
  .foot{font-size:11px;fill:${T.muted};letter-spacing:.5px}
  .row{opacity:0;animation:in .5s ease-out forwards}
  .pulse{animation:pulse 2.4s ease-in-out infinite}
  @keyframes in{to{opacity:1}}
  @keyframes pulse{50%{opacity:.35}}
  @media (prefers-reduced-motion:reduce){*{animation:none!important}.row{opacity:1}}
</style>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="${T.panel}" stroke="${T.edge}" stroke-width="1.5"/>
${cloud('left', 14, 6)}${cloud('right', W - CLOUDS.right.w - 14, H - CLOUDS.right.h - 4, true)}
<text x="${W / 2}" y="34" text-anchor="middle" class="title">壱 · TELEMETRY</text>
<circle cx="${PADX + 6}" cy="${TOP - 38}" r="6" fill="${headColor}"${live ? ' class="pulse"' : ''}/>
<text x="${PADX + 20}" y="${TOP - 33}" class="head" style="fill:${headColor}">${headline}</text>
<text x="${W - PADX}" y="${TOP - 33}" text-anchor="end" class="head">${live && uptime != null ? `30d UPTIME ${uptime.toFixed(2)}%` : ''}</text>
<path d="M${PADX},${TOP - 20}H${W - PADX}" stroke="${T.rule}"/>
${body}
<path d="M${PADX},${H - 42}H${W - PADX}" stroke="${T.rule}"/>
<text x="${PADX}" y="${H - 20}" class="foot">${esc(foot)}</text>
</svg>`;
}
