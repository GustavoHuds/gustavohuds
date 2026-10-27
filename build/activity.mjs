// 陸 Activity: o calendário de contribuições redesenhado como escamas de
// seigaiha (53 semanas × 7 dias). Roda todo dia na Action activity.yml e
// publica activity-{dark,light}.svg no branch `output`.
//
//   GITHUB_TOKEN=... node build/activity.mjs [pasta de saída]   (padrão: dist/)
//   node build/activity.mjs --write-font                          (regera a fonte embutida; precisa das .ttf)
//
// Sem dependências de npm: roda no runner só com Node.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { THEMES, esc, motionCss } from './lib.mjs';

const LOGIN = process.env.ACTIVITY_LOGIN || 'GustavoHuds';
const FONT_FILE = new URL('./data/activity-font.css', import.meta.url);
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CHARSET = `0123456789,.·+ ${MONTHS.join('')}contributions in the last year less more busiest day`;

const W = 1200, H = 196, R = 10.5, GRID_Y = 66;

const LEVELS = {
  dark: ['#102447', '#173A70', '#1F5199', '#3D74CC', '#79A3EC'],
  light: ['#EFE6D6', '#D3DDEB', '#97AED3', '#4A6FB0', '#1E3A6E'],
};

async function fetchCalendar(token) {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{
    totalContributions weeks{contributionDays{date weekday contributionCount}}}}}}`;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { authorization: `bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'ryumon-activity' },
    body: JSON.stringify({ query, variables: { login: LOGIN } }),
    signal: AbortSignal.timeout(20_000),
  });
  const body = await res.json();
  if (!res.ok || body.errors) throw new Error(`GraphQL: ${res.status} ${JSON.stringify(body.errors ?? body)}`);
  return body.data.user.contributionsCollection.contributionCalendar;
}

/** Nível 0–4 por quartis dos dias com contribuição (como o GitHub faz). */
function leveler(counts) {
  const nz = counts.filter((c) => c > 0).sort((a, b) => a - b);
  const q = (p) => nz[Math.min(nz.length - 1, Math.floor(p * nz.length))] ?? 1;
  const cuts = [q(0.25), q(0.5), q(0.75)];
  return (c) => (c <= 0 ? 0 : c <= cuts[0] ? 1 : c <= cuts[1] ? 2 : c <= cuts[2] ? 3 : 4);
}

/** Uma escama: disco + dois anéis internos (o motivo seigaiha). */
const scale = (id, fill, ring, width) => `<symbol id="${id}" overflow="visible">
  <circle r="${R}" fill="${fill}" stroke="${ring}" stroke-width="${width}"/>
  <circle r="${R * 0.66}" fill="none" stroke="${ring}" stroke-width="${width}"/>
  <circle r="${R * 0.33}" fill="none" stroke="${ring}" stroke-width="${width}"/></symbol>`;

export function renderActivity(cal, themeName, font = '') {
  const T = THEMES[themeName];
  const L = LEVELS[themeName];
  const days = cal.weeks.flatMap((w, wi) => w.contributionDays.map((d) => ({ ...d, wi })));
  const level = leveler(days.map((d) => d.contributionCount));
  const busiest = days.reduce((a, d) => (d.contributionCount > a.contributionCount ? d : a), days[0]);
  const cols = cal.weeks.length;
  const gridW = cols * R * 2 + R;
  const x0 = (W - gridW) / 2 + R;
  const cx = (d) => x0 + d.wi * R * 2 + (d.weekday % 2) * R;
  const cy = (d) => GRID_Y + R + d.weekday * R;

  // linhas de baixo por último: cada fileira cobre a metade de baixo da anterior
  const rows = Array.from({ length: 7 }, (_, wd) => days.filter((d) => d.weekday === wd));
  const cells = rows.map((row) => row.map((d) => {
    const lv = d === busiest && d.contributionCount > 0 ? 'b' : level(d.contributionCount);
    return `<use href="#s${lv}" x="${cx(d).toFixed(1)}" y="${cy(d).toFixed(1)}" style="animation-delay:${(0.2 + d.wi * 0.018).toFixed(2)}s"/>`;
  }).join('')).join('');

  // rótulo do mês na semana que contém o dia 1 (semana parcial no começo não ganha rótulo)
  const months = cal.weeks.map((w, wi) => {
    const first = w.contributionDays.find((d) => d.date.endsWith('-01'));
    if (!first || wi > cols - 3) return '';
    const m = Number(first.date.slice(5, 7)) - 1;
    return `<text class="m" x="${(x0 + wi * R * 2 - R).toFixed(1)}" y="${GRID_Y - 8}">${MONTHS[m]}</text>`;
  }).join('');

  const legendX = W - 60 - 5 * 26;
  const legend = [0, 1, 2, 3, 4].map((lv, i) => `<use href="#s${lv}" x="${legendX + 40 + i * 22}" y="${H - 26}"/>`).join('');
  const total = cal.totalContributions.toLocaleString('en-US');
  const ring = T.panel; // anéis na cor do painel: a escama "recorta" a de cima

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d">
<title id="t">GitHub activity</title>
<desc id="d">${esc(`${total} contributions in the last year, drawn as seigaiha wave scales. Busiest day: ${busiest.date} with ${busiest.contributionCount}.`)}</desc>
<defs><style>${font}${motionCss}
  text{font-family:RyMono,ui-monospace,Menlo,Consolas,monospace;fill:${T.inkSoft}}
  .h{font-size:14px;fill:${T.ink}}.m{font-size:11px}.s{font-size:11px;fill:${T.muted}}
  use{opacity:0;animation:ry-in .5s ease-out forwards}
  @media (prefers-reduced-motion:reduce){use{opacity:1}}
</style>
${L.map((c, i) => scale(`s${i}`, c, i === 0 ? T.panelEdge : ring, i === 0 ? 0.8 : 1)).join('')}
${scale('sb', T.shu, ring, 1)}
</defs>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="${T.panel}" stroke="${T.panelEdge}" stroke-width="1.5"/>
<text class="h" x="40" y="34">${esc(total)} contributions in the last year</text>
<text class="s" x="${W - 40}" y="34" text-anchor="end">busiest day ${esc(busiest.date)} · ${busiest.contributionCount}</text>
${months}
${cells}
<text class="s" x="${legendX + 22}" y="${H - 22}" text-anchor="end">less</text>${legend}<text class="s" x="${legendX + 40 + 4 * 22 + 18}" y="${H - 22}">more</text>
</svg>`;
}

async function main() {
  if (process.argv.includes('--write-font')) {
    const { fontFace } = await import('./lib.mjs');
    mkdirSync(new URL('./data/', import.meta.url), { recursive: true });
    writeFileSync(FONT_FILE, fontFace('mono', CHARSET));
    console.log('build/data/activity-font.css atualizado');
    return;
  }
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('defina GITHUB_TOKEN');
  const out = new URL(`../${process.argv[2] ?? 'dist'}/`, import.meta.url);
  mkdirSync(out, { recursive: true });
  const cal = await fetchCalendar(token);
  const font = readFileSync(FONT_FILE, 'utf8');
  for (const theme of ['dark', 'light']) {
    const svg = renderActivity(cal, theme, font);
    writeFileSync(new URL(`activity-${theme}.svg`, out), svg);
    console.log(`activity-${theme}.svg  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
  }
}

if (process.argv[1]?.endsWith('activity.mjs')) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}
