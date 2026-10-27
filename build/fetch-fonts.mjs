// Baixa as fontes completas (OFL) usadas nos SVGs. Elas não vão para o git.
import { mkdir, writeFile, access } from 'node:fs/promises';

const BASE = 'https://raw.githubusercontent.com/google/fonts/main/ofl';
const FONTS = {
  'ShipporiMincho-Bold.ttf': `${BASE}/shipporimincho/ShipporiMincho-Bold.ttf`,
  'ShipporiMincho-Regular.ttf': `${BASE}/shipporimincho/ShipporiMincho-Regular.ttf`,
  'JetBrainsMono.ttf': `${BASE}/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf`,
};

const dir = new URL('../assets/src/fonts/', import.meta.url);
await mkdir(dir, { recursive: true });
for (const [file, url] of Object.entries(FONTS)) {
  const dest = new URL(file, dir);
  try { await access(dest); console.log(`ok   ${file}`); continue; } catch {}
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`got  ${file}`);
}
