// Monta todas as peças × temas em assets/. Uso: npm run build [-- peça ...]
import { writeFileSync, mkdirSync } from 'node:fs';
import { optimize } from 'svgo';
import { THEMES } from './lib.mjs';
import svgoConfig from './svgo.config.mjs';

const PIECES = ['hero', 'divider', 'buttons', 'kamon', 'stack', 'offduty', 'footer'];
const only = process.argv.slice(2);
const out = new URL('../assets/', import.meta.url);
mkdirSync(out, { recursive: true });

for (const name of PIECES) {
  if (only.length && !only.includes(name)) continue;
  const piece = await import(`./pieces/${name}.mjs`);
  const variants = piece.variants ?? [{ suffix: '', props: {} }];
  for (const { suffix, props } of variants) {
    for (const theme of Object.values(THEMES)) {
      const raw = piece.render(theme, props);
      const { data } = optimize(raw, svgoConfig);
      const file = `${piece.meta.name}${suffix}-${theme.name}.svg`;
      writeFileSync(new URL(file, out), data);
      console.log(`${file.padEnd(34)} ${(Buffer.byteLength(data) / 1024).toFixed(1).padStart(7)} KB`);
    }
  }
}
