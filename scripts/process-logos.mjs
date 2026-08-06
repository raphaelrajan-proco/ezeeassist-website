/**
 * Normalise every trusted-by logo into a transparent, trimmed asset.
 *
 *   node scripts/process-logos.mjs
 *
 * Re-runnable. Reads `public/logos/_source/`, writes `public/logos/brands/`.
 * The source folder is the archive: drop a new logo there and re-run.
 *
 * ── Why each step exists ───────────────────────────────────
 * 1. SVG wins. If a vector exists it is copied through untouched; nothing
 *    below improves on it.
 * 2. Background comes off by CONNECTED-COMPONENT FLOOD FILL from the
 *    edges, not by keying every white pixel. Several of these marks have
 *    intentional white knockouts inside a coloured badge, and a global
 *    key punches holes straight through them.
 * 3. The fill only seeds from edge pixels that are actually background.
 *    Two files would break a naive version: real-property-management has
 *    a navy corner and horsepower-brands has near-black corners. Neither
 *    seeds, so neither is damaged.
 * 4. Feathering the boundary is what stops the 1px grey halo that
 *    otherwise reads as a dirty outline on the dark hero. Keying alone
 *    leaves the anti-aliased fringe fully opaque.
 * 5. Trim to the true alpha bounding box, so spacing in the marquee is
 *    between MARKS rather than between whatever padding each file shipped.
 * 6. Export 2x webp with a png fallback, and report intrinsic dimensions
 *    for the manifest so layout never shifts.
 * 7. Dark-ink-only marks get an `-on-dark` variant, recoloured so the
 *    neutral ink goes light while coloured elements keep their hue.
 */
import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";

const SRC = "public/logos/_source";
const OUT = "public/logos/brands";
const REPORT = "public/logos/_source/report.json";

/** Common raster height. Optical sizing is the manifest's `scale`. */
const CAP_H = 128;
/** A pixel this light, connected to an edge, is background. */
const BG_MIN = 245;
/** Boundary pixels lighter than this get feathered instead of kept. */
const FEATHER_FROM = 200;

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const satOf = (r, g, b) => {
  const mx = Math.max(r, g, b);
  return mx === 0 ? 0 : (mx - Math.min(r, g, b)) / mx;
};

/** True when the pixel is transparent or near-white. */
function isBg(d, o) {
  if (d[o + 3] < 16) return true;
  return d[o] >= BG_MIN && d[o + 1] >= BG_MIN && d[o + 2] >= BG_MIN;
}

/**
 * Clear the background by flood fill from every edge pixel that is
 * itself background, then feather the boundary.
 * Returns { data, cleared } with alpha rewritten in place.
 */
function cutBackground(data, w, h) {
  const bg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0, tail = 0;

  const push = (x, y) => {
    const i = y * w + x;
    if (bg[i]) return;
    if (!isBg(data, i * 4)) return;
    bg[i] = 1;
    queue[tail++] = i;
  };

  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }

  while (head < tail) {
    const i = queue[head++];
    const x = i % w, y = (i / w) | 0;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }

  let cleared = 0;
  for (let i = 0; i < w * h; i++) if (bg[i]) { data[i * 4 + 3] = 0; cleared++; }

  /* Feather: an opaque pixel touching cleared space, still light enough
     to be part of the anti-aliased fringe, becomes partly transparent in
     proportion to how far it is from pure white. This is the difference
     between a clean edge and a grey outline on the dark hero. */
  const src = Uint8Array.from(data);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (bg[i] || src[i * 4 + 3] === 0) continue;
      let touches = false;
      for (let dy = -1; dy <= 1 && !touches; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          if (bg[ny * w + nx]) { touches = true; break; }
        }
      }
      if (!touches) continue;
      const o = i * 4;
      const mn = Math.min(src[o], src[o + 1], src[o + 2]);
      if (mn <= FEATHER_FROM) continue;
      const a = Math.round(((255 - mn) / (255 - FEATHER_FROM)) * 255);
      data[o + 3] = Math.min(data[o + 3], Math.max(0, a));
    }
  }
  return cleared / (w * h);
}

/** Alpha bounding box, so spacing is between marks not padding. */
function bbox(data, w, h) {
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 8) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) return null;
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

/** The hero band the logos sit on, sampled from the built page. */
const HERO = { r: 16, g: 59, b: 90 };
/** Ink below this ratio against the hero is effectively invisible. */
const MIN_RATIO = 2.5;
/** A mark needs a light variant once this much of its ink fails. */
const FAIL_SHARE = 0.15;

/**
 * How much of a mark's ink disappears against the hero navy.
 *
 * **This replaced a "is the whole mark dark" test, which was wrong.**
 * That version asked for >=60% dark ink and <25% colour, and passed all
 * but four logos. Most of this roster is a coloured icon beside a dark
 * wordmark: the icon satisfies the colour test while the wordmark, which
 * carries the brand NAME, vanishes on the hero. Measuring the share of
 * ink that actually fails a contrast ratio catches those; measuring the
 * mark's overall darkness never could.
 */
function inkProfile(data, w, h) {
  const bl = lum(HERO.r, HERO.g, HERO.b) / 255;
  let failing = 0, total = 0;
  for (let i = 0; i < w * h; i++) {
    const o = i * 4;
    if (data[o + 3] < 128) continue;
    total++;
    const l = lum(data[o], data[o + 1], data[o + 2]) / 255;
    const ratio = (Math.max(l, bl) + 0.05) / (Math.min(l, bl) + 0.05);
    if (ratio < MIN_RATIO) failing++;
  }
  return { failPct: total ? failing / total : 0, total };
}

/**
 * Light variant: raise LIGHTNESS until the ink clears the hero band,
 * holding hue and saturation.
 *
 * **The first version only touched neutral ink** (saturation <= 0.25),
 * on the theory that anything coloured was already visible. It is not:
 * Art of Drawers is a dark maroon serif, The DRIPBaR a deep teal, Nani's
 * Gelato a brown script. All are saturated, all failed, and all were
 * left untouched and invisible.
 *
 * Working in HSL and moving only L keeps the brand hue intact, which is
 * the whole requirement: a maroon wordmark stays maroon, just light
 * enough to read. Pixels that already pass are not touched at all, so a
 * logo's light and coloured parts come through unchanged.
 *
 * Returns counts so a mark that had to be flattened can be flagged.
 */
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn;
  const s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h;
  if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (mx === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}
function hslToRgb(h, s, l) {
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [Math.round(f(h + 1 / 3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1 / 3) * 255)];
}

function toLightVariant(data, w, h) {
  const bl = lum(HERO.r, HERO.g, HERO.b) / 255;
  const ratioOf = (L) => (Math.max(L, bl) + 0.05) / (Math.min(L, bl) + 0.05);
  let untouched = 0, lifted = 0, flattened = 0;

  for (let i = 0; i < w * h; i++) {
    const o = i * 4;
    if (data[o + 3] < 8) continue;
    const [r, g, b] = [data[o], data[o + 1], data[o + 2]];
    if (ratioOf(lum(r, g, b) / 255) >= MIN_RATIO) { untouched++; continue; }

    const [hh, ss, ll] = rgbToHsl(r, g, b);
    let nl = ll, out = [r, g, b], ok = false;
    // Walk lightness up in small steps, keeping hue and saturation.
    for (let step = 0; step < 40; step++) {
      nl = Math.min(1, nl + 0.025);
      out = hslToRgb(hh, ss, nl);
      if (ratioOf(lum(...out) / 255) >= 3.0) { ok = true; break; }
    }
    data[o] = out[0]; data[o + 1] = out[1]; data[o + 2] = out[2];
    if (ok) lifted++; else flattened++;
  }
  return { untouched, lifted, flattened, silhouette: untouched === 0 && lifted === 0 };
}

/* ── Run ─────────────────────────────────────────────────── */

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const report = [];
const files = readdirSync(SRC).filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f)).sort();

for (const file of files) {
  const { name, ext } = parse(file);
  const srcPath = join(SRC, file);

  if (ext.toLowerCase() === ".svg") {
    copyFileSync(srcPath, join(OUT, `${name}.svg`));
    report.push({ name, vector: true, src: `/logos/brands/${name}.svg` });
    console.log(`${name.padEnd(30)} vector, copied through`);
    continue;
  }

  const input = sharp(srcPath).ensureAlpha();
  const meta = await sharp(srcPath).metadata();
  let { data, info } = await input.raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  const clearedPct = cutBackground(data, w, h);
  const box = bbox(data, w, h);
  if (!box) { console.log(`${name.padEnd(30)} !! fully transparent after cut, skipped`); continue; }

  /* Raw in, so the output format must be stated: sharp cannot infer one
     from a raw buffer and throws "unsupported image format" without it. */
  const trimmed = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract(box)
    .png()
    .toBuffer();

  // Common cap height at 2x for retina.
  const out2x = sharp(trimmed).resize({ height: CAP_H * 2, withoutEnlargement: false });
  const png = await out2x.clone().png({ compressionLevel: 9 }).toBuffer();
  const webp = await out2x.clone().webp({ quality: 92 }).toBuffer();
  writeFileSync(join(OUT, `${name}.png`), png);
  writeFileSync(join(OUT, `${name}.webp`), webp);

  const outMeta = await sharp(png).metadata();
  const { data: outData, info: outInfo } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
  const ink = inkProfile(outData, outInfo.width, outInfo.height);
  const darkInk = ink.failPct >= FAIL_SHARE;

  const entry = {
    name,
    src: `/logos/brands/${name}.webp`,
    fallback: `/logos/brands/${name}.png`,
    width: Math.round(outMeta.width / 2),
    height: Math.round(outMeta.height / 2),
    ar: +(outMeta.width / outMeta.height).toFixed(2),
    sourceWasJpeg: /jpe?g/i.test(ext),
    clearedPct: +(clearedPct * 100).toFixed(0),
    inkFailingOnHero: +(ink.failPct * 100).toFixed(0),
    lowRes: Math.min(meta.width, meta.height) < 120,
  };

  if (darkInk) {
    const lightRaw = Uint8Array.from(outData);
    const res = toLightVariant(lightRaw, outInfo.width, outInfo.height);
    const lightPng = await sharp(Buffer.from(lightRaw), { raw: { width: outInfo.width, height: outInfo.height, channels: 4 } })
      .png({ compressionLevel: 9 }).toBuffer();
    const lightWebp = await sharp(Buffer.from(lightRaw), { raw: { width: outInfo.width, height: outInfo.height, channels: 4 } })
      .webp({ quality: 92 }).toBuffer();
    writeFileSync(join(OUT, `${name}-on-dark.png`), lightPng);
    writeFileSync(join(OUT, `${name}-on-dark.webp`), lightWebp);
    entry.srcOnDark = `/logos/brands/${name}-on-dark.webp`;
    entry.fallbackOnDark = `/logos/brands/${name}-on-dark.png`;
    entry.onDarkIsSilhouette = res.silhouette;
  }

  report.push(entry);
  console.log(
    `${name.padEnd(30)} ${String(meta.width + "x" + meta.height).padEnd(12)} cleared ${String(entry.clearedPct + "%").padEnd(5)} ` +
    `-> ${outMeta.width}x${outMeta.height}` +
    (darkInk ? `  ${String(entry.inkFailingOnHero + "% fails").padEnd(10)}+ on-dark${entry.onDarkIsSilhouette ? " (SILHOUETTE, review)" : " (recoloured)"}` : "") +
    (entry.lowRes ? "  [LOW-RES]" : "")
  );
}

writeFileSync(REPORT, JSON.stringify(report, null, 2));
console.log(`\n${report.length} logos processed. Report: ${REPORT}`);
console.log("dark-ink variants:", report.filter((r) => r.srcOnDark).map((r) => r.name).join(", ") || "none");
console.log("silhouette fallbacks (review):", report.filter((r) => r.onDarkIsSilhouette).map((r) => r.name).join(", ") || "none");
console.log("low-res sources:", report.filter((r) => r.lowRes).map((r) => r.name).join(", ") || "none");
