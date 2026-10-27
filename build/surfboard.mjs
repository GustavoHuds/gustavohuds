// Gera a prancha de surf low-poly em STL ASCII (models/surfboard.stl) e a
// injeta no README entre os marcadores <!-- stl:start --> e <!-- stl:end -->.
// Feito direto em código para não depender do OpenSCAD.
import { readFileSync, writeFileSync } from 'node:fs';

const L = 180, W = 48, T = 6.4;
const RINGS = 22, SEG = 12;

// meia-largura relativa ao longo do comprimento (u: 0 = rabeta, 1 = bico)
const OUTLINE = [[0, 0.36], [0.08, 0.6], [0.25, 0.9], [0.45, 1], [0.65, 0.9], [0.82, 0.62], [0.93, 0.32], [1, 0.03]];
const lerpCurve = (curve, u) => {
  for (let i = 0; i < curve.length - 1; i++) {
    const [u0, v0] = curve[i], [u1, v1] = curve[i + 1];
    if (u <= u1) { const k = (1 - Math.cos(((u - u0) / (u1 - u0)) * Math.PI)) / 2; return v0 + (v1 - v0) * k; }
  }
  return curve.at(-1)[1];
};
const halfWidth = (u) => (W / 2) * lerpCurve(OUTLINE, u);
const halfThick = (u) => (T / 2) * (0.45 + 0.55 * Math.sin(Math.PI * Math.min(1, u * 1.15 + 0.08)));
const rocker = (u) => 26 * Math.max(0, u - 0.62) ** 2 + 6 * Math.max(0, 0.18 - u) ** 2;

const rings = [];
for (let i = 0; i < RINGS; i++) {
  const u = i / (RINGS - 1);
  const x = (u - 0.5) * L, hw = halfWidth(u), ht = halfThick(u), z0 = rocker(u);
  rings.push(Array.from({ length: SEG }, (_, j) => {
    const a = (j / SEG) * 2 * Math.PI, s = Math.sin(a);
    // convés mais chato que o fundo; bordas arredondadas
    return [x, hw * Math.cos(a), z0 + ht * Math.sign(s) * Math.abs(s) ** (s > 0 ? 0.55 : 0.8)];
  }));
}

const tris = [];
for (let i = 0; i < RINGS - 1; i++) {
  for (let j = 0; j < SEG; j++) {
    const a = rings[i][j], b = rings[i][(j + 1) % SEG], c = rings[i + 1][(j + 1) % SEG], d = rings[i + 1][j];
    tris.push([a, b, c], [a, c, d]);
  }
}
// tampas: rabeta (leque até o centro) e bico (leque até a ponta)
const tail = rings[0], nose = rings.at(-1);
const center = (ring) => ring.reduce((s, p) => [s[0] + p[0] / ring.length, s[1] + p[1] / ring.length, s[2] + p[2] / ring.length], [0, 0, 0]);
const tc = center(tail), nc = center(nose); nc[0] += 2.5;
for (let j = 0; j < SEG; j++) {
  tris.push([tc, tail[(j + 1) % SEG], tail[j]]);
  tris.push([nc, nose[j], nose[(j + 1) % SEG]]);
}
// quilhas: prismas triangulares finos sob a rabeta (thruster)
const fin = (x, y, h, len, toe) => {
  const zb = rocker((x / L) + 0.5) - halfThick((x / L) + 0.5) * 0.8, t = 0.7;
  const P = (dx, dy, dz) => [x + dx, y + dy + dx * toe, zb + dz];
  const A = [P(0, -t, 0), P(len, -t, 0), P(len * 0.15, -t, -h)];
  const B = [P(0, t, 0), P(len, t, 0), P(len * 0.15, t, -h)];
  tris.push([A[0], A[2], A[1]], [B[0], B[1], B[2]]);
  for (let k = 0; k < 3; k++) {
    const k2 = (k + 1) % 3;
    tris.push([A[k], A[k2], B[k2]], [A[k], B[k2], B[k]]);
  }
};
fin(-L * 0.47, 0, 11, 13, 0);
fin(-L * 0.42, W * 0.17, 10, 12, -0.04);
fin(-L * 0.42, -W * 0.17, 10, 12, 0.04);

const sub = (p, q) => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
const f = (n) => n.toFixed(3);
const facet = ([a, b, c]) => {
  const u = sub(b, a), v = sub(c, a);
  let n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const l = Math.hypot(...n) || 1; n = n.map((k) => k / l);
  return `facet normal ${n.map(f).join(' ')}\nouter loop\n${[a, b, c].map((p) => `vertex ${p.map(f).join(' ')}`).join('\n')}\nendloop\nendfacet`;
};
const stl = `solid surfboard\n${tris.map(facet).join('\n')}\nendsolid surfboard\n`;
writeFileSync(new URL('../models/surfboard.stl', import.meta.url), stl);

const readme = new URL('../README.md', import.meta.url);
const md = readFileSync(readme, 'utf8');
const re = /(<!-- stl:start -->\r?\n)[\s\S]*?(<!-- stl:end -->)/;
if (re.test(md)) writeFileSync(readme, md.replace(re, `$1\n\`\`\`stl\n${stl}\`\`\`\n\n$2`));
console.log(`surfboard: ${tris.length} facets, ${(stl.length / 1024).toFixed(0)} KB${re.test(md) ? ', injected into README' : ''}`);
