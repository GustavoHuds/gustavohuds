// Checagens de orçamento e sanidade (docs/ESCOPO-RYUMON.md §10.4).
import { readdirSync, readFileSync, statSync } from 'node:fs';

const dir = new URL('../assets/', import.meta.url);
const BUDGET_KB = { hero: 350, route: 350, footer: 150, offduty: 200, stack: 120, divider: 8, btn: 4, kamon: 10 };
const errors = [];
const svgs = readdirSync(dir).filter((f) => f.endsWith('.svg'));

for (const f of svgs) {
  const src = readFileSync(new URL(f, dir), 'utf8');
  const kb = statSync(new URL(f, dir)).size / 1024;
  const budget = BUDGET_KB[f.split('-')[0]];
  if (budget && kb > budget) errors.push(`${f}: ${kb.toFixed(1)} KB > ${budget} KB`);
  if (/(?:href|src)="https?:/.test(src)) errors.push(`${f}: referência externa (não carrega no GitHub)`);
  if (/animation:/.test(src) && !/prefers-reduced-motion/.test(src)) errors.push(`${f}: animado sem prefers-reduced-motion`);
  const pair = f.includes('-dark') ? f.replace('-dark', '-light') : f.replace('-light', '-dark');
  if (!svgs.includes(pair)) errors.push(`${f}: falta o par ${pair}`);
}

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
for (const m of readme.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) errors.push(`README: <img> sem alt: ${m[0].slice(0, 70)}`);
for (const m of readme.matchAll(/\.\/assets\/([\w-]+\.svg)/g)) if (!svgs.includes(m[1])) errors.push(`README: asset inexistente ${m[1]}`);
const total = [...new Set([...readme.matchAll(/\.\/assets\/([\w-]+-dark\.svg)/g)].map((m) => m[1]))]
  .reduce((s, f) => s + statSync(new URL(f, dir)).size, 0) / 1024;
if (total > 1536) errors.push(`peso total (tema escuro) ${total.toFixed(0)} KB > 1,5 MB`);

console.log(`${svgs.length} SVGs · peso total por tema ≈ ${total.toFixed(0)} KB`);
if (errors.length) { console.error(errors.map((e) => `✗ ${e}`).join('\n')); process.exit(1); }
console.log('✓ tudo dentro do orçamento');
