// Divisor de seção: linha de maré com uma pequena onda no centro.
import { svgOpen, motionCss, at } from '../lib.mjs';

export const meta = { name: 'divider', w: 1200, h: 40 };

export function render(T) {
  const W = 1200, Y = 20;
  // onda central: três escamas de seigaiha
  const scale = (cx, rr) => [1, 0.66, 0.33]
    .map((k) => `<path d="M${cx - rr * k},${Y + 6}a${rr * k},${rr * k} 0 0 1 ${rr * k * 2},0" />`).join('');
  return `${svgOpen(W, 40, 'Section divider', 'A thin tide line with three seigaiha wave scales in the center.')}
<defs><style>${motionCss}</style></defs>
<g fill="none" stroke="${T.inkSoft}" stroke-linecap="round">
  <path class="draw" pathLength="1" ${at(0, 1.4)} d="M552,${Y + 6}H40" stroke-opacity=".45" stroke-width="1.2"/>
  <path class="draw" pathLength="1" ${at(0, 1.4)} d="M648,${Y + 6}H1160" stroke-opacity=".45" stroke-width="1.2"/>
  <g class="reveal" ${at(0.6, 0.8)} stroke-width="1.6">${scale(574, 18)}${scale(626, 18)}${scale(600, 22)}</g>
</g>
<circle class="pop" ${at(1.2, 0.4)} cx="600" cy="${Y - 8}" r="2.6" fill="${T.shu}"/>
</svg>`;
}
