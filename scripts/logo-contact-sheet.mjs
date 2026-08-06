/**
 * Contact sheet for the processed logos: every mark composited onto both
 * white and the real hero navy, so a surviving white box or an invisible
 * dark mark is visible rather than inferred.
 *
 *   node scripts/logo-contact-sheet.mjs
 *
 * Also reports, per logo, the worst-case contrast of its ink against the
 * hero navy, so "looks fine" can be checked against a number.
 */
import sharp from "sharp";
import { readFileSync, existsSync } from "node:fs";

const REPORT = JSON.parse(readFileSync("public/logos/_source/report.json", "utf8"));
const HERO = { r: 16, g: 59, b: 90 };
const OUT = process.argv[2] || "/tmp/logo-contact-sheet.png";

const CELL_W = 220, CELL_H = 74, COLS = 5, LABEL_H = 16;
const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/** Worst-case ink contrast against a background, over opaque pixels. */
async function worstContrast(file, bg) {
  const { data, info } = await sharp(file).ensureAlpha().resize(64, 64, { fit: "inside" }).raw().toBuffer({ resolveWithObject: true });
  const bl = lum(bg.r, bg.g, bg.b) / 255;
  let worst = 21;
  for (let i = 0; i < info.width * info.height; i++) {
    const o = i * info.channels;
    if (data[o + 3] < 140) continue;
    const l = lum(data[o], data[o + 1], data[o + 2]) / 255;
    const ratio = (Math.max(l, bl) + 0.05) / (Math.min(l, bl) + 0.05);
    if (ratio < worst) worst = ratio;
  }
  return worst;
}

const items = REPORT.filter((r) => !r.vector);
const rows = Math.ceil(items.length / COLS);
const W = COLS * CELL_W;
const H = rows * (CELL_H * 2 + LABEL_H);

const comps = [];
const labels = [];
const flags = [];

for (let i = 0; i < items.length; i++) {
  const it = items[i];
  const col = i % COLS, row = (i / COLS) | 0;
  const x = col * CELL_W;
  const y = row * (CELL_H * 2 + LABEL_H);

  const onLight = `public/${it.fallback.replace(/^\//, "")}`;
  const onDarkFile = it.fallbackOnDark ? `public/${it.fallbackOnDark.replace(/^\//, "")}` : onLight;

  const light = await sharp(onLight).resize(CELL_W - 24, CELL_H - 16, { fit: "inside" }).png().toBuffer();
  const dark = await sharp(onDarkFile).resize(CELL_W - 24, CELL_H - 16, { fit: "inside" }).png().toBuffer();

  comps.push({ input: light, left: x + 12, top: y + LABEL_H + 8 });
  comps.push({ input: dark, left: x + 12, top: y + LABEL_H + CELL_H + 8 });

  labels.push(
    `<rect x="${x}" y="${y + LABEL_H}" width="${CELL_W}" height="${CELL_H}" fill="#FFFFFF"/>` +
    `<rect x="${x}" y="${y + LABEL_H + CELL_H}" width="${CELL_W}" height="${CELL_H}" fill="rgb(${HERO.r},${HERO.g},${HERO.b})"/>` +
    `<text x="${x + 6}" y="${y + 12}" font-family="Helvetica,Arial" font-size="11" fill="#111">${it.name}${it.srcOnDark ? " *" : ""}</text>`
  );

  const cLight = await worstContrast(onLight, { r: 255, g: 255, b: 255 });
  const cDark = await worstContrast(onDarkFile, HERO);
  if (cLight < 1.6 || cDark < 1.6) flags.push({ name: it.name, onWhite: cLight.toFixed(2), onNavy: cDark.toFixed(2) });
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#E9EDF2"/>${labels.join("")}</svg>`;
await sharp(Buffer.from(svg)).composite(comps).png().toFile(OUT);

console.log(`contact sheet: ${OUT}  (${items.length} logos, white row above navy row, * = has an on-dark variant)`);
console.log("\nILLEGIBLE on one of the two surfaces (worst-case ink contrast < 1.6:1):");
if (!flags.length) console.log("  none");
flags.forEach((f) => console.log(`  ${f.name.padEnd(30)} on white ${f.onWhite}:1   on navy ${f.onNavy}:1`));
