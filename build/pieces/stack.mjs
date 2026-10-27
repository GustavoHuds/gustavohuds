// 六 Stack: prancha monocromática única, só com o que roda em produção.
// Ícones oficiais do pacote simple-icons (CC0). Sem ícone oficial → glifo neutro.
import * as icons from 'simple-icons';
import { svgOpen, motionCss, fontFace, family, at, esc } from '../lib.mjs';

export const meta = { name: 'stack', w: 1200, h: 0 };

const BY_SLUG = Object.fromEntries(Object.values(icons).filter((i) => i?.slug).map((i) => [i.slug, i]));

export const STACK = [
  ['Core', [['typescript', 'TypeScript'], ['nodedotjs', 'Node.js'], ['python', 'Python'], ['go', 'Go'],
    ['nestjs', 'NestJS'], ['fastify', 'Fastify'], ['react', 'React'], ['nextdotjs', 'Next.js']]],
  ['Data', [['postgresql', 'PostgreSQL'], ['prisma', 'Prisma'], ['redis', 'Redis'], ['sqlite', 'SQLite']]],
  ['AI', [['anthropic', 'Anthropic'], ['claude', 'Agent SDK'], ['modelcontextprotocol', 'MCP'], [null, 'OpenAI']]],
  ['Ops & Security', [['docker', 'Docker'], ['linux', 'Linux'], ['caddy', 'Caddy'], ['authelia', 'Authelia'],
    [null, 'CrowdSec'], ['githubactions', 'Actions'], ['trivy', 'Trivy'], [null, 'Semgrep'], [null, 'Gitleaks']]],
  ['Integrations', [['whatsapp', 'WhatsApp'], ['telegram', 'Telegram'], ['pix', 'PIX'], ['googlemaps', 'Google Maps'],
    [null, 'ERP']]],
];

const ROW_H = 118, TOP = 24, LABEL_W = 250, CELL = 100, ICON = 38;

/** Glifo neutro: uma escama de seigaiha (para quem não tem ícone oficial). */
const neutral = (T) => `<g fill="none" stroke="${T.ink}" stroke-width="1.6">
  <circle cx="19" cy="19" r="17"/><circle cx="19" cy="19" r="11"/><circle cx="19" cy="19" r="5"/></g>`;

export function render(T) {
  const H = TOP * 2 + STACK.length * ROW_H;
  meta.h = H;
  const labels = STACK.flatMap(([, items]) => items.map(([, l]) => l)).join('');
  const cats = STACK.map(([c]) => c).join('');
  let body = '', n = 0;
  STACK.forEach(([cat, items], ri) => {
    const y = TOP + ri * ROW_H;
    body += `<g class="reveal" ${at(0.1 + ri * 0.15, 0.7)}>
      <text class="cat" x="40" y="${y + 52}">${esc(cat)}</text>
      <path d="M40,${y + 66}h${LABEL_W - 70}" stroke="${T.shu}" stroke-width="2"/>`;
    items.forEach(([slug, label], i) => {
      const x = LABEL_W + i * CELL + (CELL - ICON) / 2;
      const icon = slug && BY_SLUG[slug];
      const glyph = icon
        ? `<svg x="${x}" y="${y + 18}" width="${ICON}" height="${ICON}" viewBox="0 0 24 24"><path fill="${T.ink}" d="${icon.path}"/></svg>`
        : `<g transform="translate(${x},${y + 18})">${neutral(T)}</g>`;
      body += `<g class="pop" ${at(0.3 + ri * 0.15 + i * 0.03, 0.4)}>${glyph}</g>
        <text class="lbl" x="${LABEL_W + i * CELL + CELL / 2}" y="${y + 84}" text-anchor="middle">${esc(label)}</text>`;
      n++;
    });
    body += `</g>`;
    if (ri < STACK.length - 1) body += `<path d="M40,${y + ROW_H}H1160" stroke="${T.panelEdge}" stroke-opacity=".5" stroke-dasharray="2 6"/>`;
  });
  return `${svgOpen(1200, H, 'Tech stack', `Production stack: ${STACK.map(([c, it]) => `${c}: ${it.map(([, l]) => l).join(', ')}`).join('. ')}.`)}
<defs><style>${fontFace('minchoBold', cats)}${fontFace('mono', labels)}${motionCss}
  .cat{font-family:${family('minchoBold')};font-size:24px;letter-spacing:1px;fill:${T.ink}}
  .lbl{font-family:${family('mono')};font-size:12.5px;fill:${T.inkSoft}}
</style></defs>
<rect x="1" y="1" width="1198" height="${H - 2}" rx="14" fill="${T.panel}" stroke="${T.panelEdge}" stroke-width="1.5"/>
${body}
</svg>`;
}
