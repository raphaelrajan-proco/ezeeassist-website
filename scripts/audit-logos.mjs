/**
 * Step 0 audit for the trusted-by logo set.
 *
 * Reports, per file: format, intrinsic size, whether an alpha channel
 * exists AND is actually used, the four corner pixels, and whether the
 * mark is dark-ink-only (so it will disappear on the dark hero).
 *
 * Read-only. Writes nothing.
 */
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIR = "public/logos/brands";
const HERO_NAVY = [12, 38, 60]; // sampled from the hero, see report

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function classifyCorner(px) {
  const [r, g, b, a] = px;
  if (a < 16) return "transparent";
  if (r >= 250 && g >= 250 && b >= 250) return "pure-white";
  if (r >= 240 && g >= 240 && b >= 240) return "off-white";
  return `rgb(${r},${g},${b})`;
}

const rows = [];

for (const file of readdirSync(DIR).sort()) {
  if (!/\.(png|jpe?g|webp|svg)$/i.test(file)) continue;
  const path = join(DIR, file);
  const bytes = statSync(path).size;

  if (/\.svg$/i.test(file)) {
    rows.push({ file, format: "svg", size: "vector", alpha: "n/a", corners: "n/a", ink: "n/a", bytes });
    continue;
  }

  const meta = await sharp(path).metadata();
  const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;
  const at = (x, y) => {
    const o = (y * w + x) * ch;
    return [data[o], data[o + 1], data[o + 2], data[o + 3]];
  };
  const corners = [at(0, 0), at(w - 1, 0), at(0, h - 1), at(w - 1, h - 1)];
  const cornerKinds = corners.map(classifyCorner);

  // Is the alpha channel actually used, or just present?
  let clear = 0;
  for (let i = 3; i < data.length; i += ch) if (data[i] < 16) clear++;
  const clearPct = clear / (w * h);

  /* Ink analysis over the pixels that are NOT background. Background is
     "opaque and near-white" plus anything already transparent, which
     approximates what the flood fill will remove. */
  let dark = 0, light = 0, coloured = 0, inkTotal = 0;
  for (let i = 0; i < w * h; i++) {
    const o = i * ch;
    const [r, g, b, a] = [data[o], data[o + 1], data[o + 2], data[o + 3]];
    if (a < 16) continue;
    if (r >= 240 && g >= 240 && b >= 240) continue; // near-white = background
    inkTotal++;
    const L = lum(r, g, b);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat > 0.25) coloured++;
    else if (L < 110) dark++;
    else if (L > 170) light++;
  }
  const pct = (n) => (inkTotal ? Math.round((n / inkTotal) * 100) : 0);

  // Contrast of the ink against the hero navy, worst case.
  const heroL = lum(...HERO_NAVY);
  let minRatio = 21;
  for (let i = 0; i < w * h; i += 7) {
    const o = i * ch;
    if (data[o + 3] < 128) continue;
    const [r, g, b] = [data[o], data[o + 1], data[o + 2]];
    if (r >= 240 && g >= 240 && b >= 240) continue;
    const L = lum(r, g, b) / 255;
    const hl = heroL / 255;
    const ratio = (Math.max(L, hl) + 0.05) / (Math.min(L, hl) + 0.05);
    if (ratio < minRatio) minRatio = ratio;
  }

  rows.push({
    file,
    format: meta.format,
    size: `${meta.width}x${meta.height}`,
    alpha: meta.hasAlpha ? (clearPct > 0.02 ? `yes (${Math.round(clearPct * 100)}% clear)` : "channel only, unused") : "NO",
    corners: [...new Set(cornerKinds)].join("/"),
    ink: `dark ${pct(dark)}% / light ${pct(light)}% / colour ${pct(coloured)}%`,
    darkInkOnly: pct(dark) >= 60 && pct(coloured) < 25,
    heroContrast: minRatio.toFixed(2),
    bytes,
  });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(pad("FILE", 32) + pad("FMT", 5) + pad("SIZE", 12) + pad("ALPHA", 22) + pad("CORNERS", 22) + "INK");
console.log("-".repeat(140));
for (const r of rows) {
  console.log(pad(r.file, 32) + pad(r.format, 5) + pad(r.size, 12) + pad(r.alpha, 22) + pad(r.corners, 22) + r.ink);
}

console.log("\n\n=== SUMMARY ===");
console.log("total:", rows.length);
console.log("real transparency:", rows.filter((r) => String(r.alpha).startsWith("yes")).length);
console.log("opaque background:", rows.filter((r) => r.alpha === "NO" || r.alpha === "channel only, unused").length);
console.log("\nDARK-INK-ONLY (will vanish on the dark hero):");
rows.filter((r) => r.darkInkOnly).forEach((r) => console.log(`  ${pad(r.file, 32)} ${r.ink}   hero contrast ${r.heroContrast}:1`));
console.log("\nLOW RESOLUTION (short edge < 120px, needs re-sourcing):");
rows.filter((r) => r.size !== "vector" && Math.min(...r.size.split("x").map(Number)) < 120)
  .forEach((r) => console.log(`  ${pad(r.file, 32)} ${r.size}`));
console.log("\nJPEG (no alpha possible, must be re-keyed or re-sourced):");
rows.filter((r) => r.format === "jpeg").forEach((r) => console.log(`  ${pad(r.file, 32)} ${r.size}`));
