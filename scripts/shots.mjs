/**
 * Homepage screenshot harness.
 *
 *   npm run shots
 *
 * Captures the homepage at every width in WIDTHS: one full-page image
 * plus one image per section, into a gitignored folder. Alongside the
 * images it writes `audit.json` and `audit.md` with the automated
 * checks that are tedious to eyeball — horizontal overflow, tap targets
 * under 44px, fixed-width elements, SVGs without a viewBox, and text
 * under 14px.
 *
 * Environment:
 *   BASE_URL   point at an already-running server instead of spawning
 *              one, e.g. BASE_URL=https://staging.example.com npm run shots
 *   WIDTHS     comma-separated override, e.g. WIDTHS=390,1440
 *   OUT        output directory, default ./screenshots
 *
 * With no BASE_URL the script serves the production build itself, so
 * what you photograph is what ships. Run `npm run build` first; a dev
 * server is not used deliberately, because dev-only overlays and
 * unminified layout shifts show up in the images.
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile, rm, access } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";

const WIDTHS = (process.env.WIDTHS ?? "390,430,768,1024,1205,1440")
  .split(",").map((w) => parseInt(w.trim(), 10)).filter(Boolean);
const OUT = path.resolve(process.env.OUT ?? "screenshots");

/* Height is only the viewport for the per-section shots; full-page
   captures ignore it. Tall enough that a section shot shows context. */
const VIEWPORT_H = 900;

/* Homepage sections in document order. `sel` is preferred; `nth` is the
   positional fallback for the hero, which carries no id. Keep this list
   in step with app/page.tsx. */
const SECTIONS = [
  { name: "01-hero",       nth: 0 },
  { name: "02-coachs-week", sel: "#the-week" },
  { name: "03-the-system",  sel: "#the-system" },
  { name: "04-capabilities", sel: "#capabilities" },
  { name: "05-always-on",   sel: "#always-on" },
  { name: "06-impact",      sel: "#impact" },
  { name: "07-trust",       sel: "#trust" },
  { name: "08-proof",       sel: "#proof" },
  { name: "09-objections",  sel: "#objections" },
  { name: "10-final-cta",   sel: "#book" },
];

/* Chrome persists nothing between runs here, so the banners would appear
   in every single image. Seeded before first paint. */
const SEED_STORAGE = `
  try {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('ezee-announcement-2026-readiness', 'dismissed');
    localStorage.setItem('exit-intent-dismissed', '1');
  } catch (e) {}
`;

/* ── The automated checks ────────────────────────────────
   Runs in the page. Everything here is a fact a screenshot cannot give
   you: computed sizes, hit-box areas, and attributes. */
const AUDIT = `(() => {
  const out = { overflow: null, smallTargets: [], fixedWidths: [], svgNoViewBox: [], smallText: [] };
  const label = (el) => {
    const id = el.id ? '#' + el.id : '';
    const cls = typeof el.className === 'string' && el.className
      ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.') : '';
    const txt = (el.innerText || el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 40);
    return el.tagName.toLowerCase() + id + cls + (txt ? ' "' + txt + '"' : '');
  };
  const section = (el) => {
    const s = el.closest('section');
    return s ? (s.id ? '#' + s.id : 'section') : '(outside a section)';
  };

  // 1. Horizontal overflow, plus which elements stick out past the viewport.
  const docW = document.documentElement.scrollWidth;
  const vw = window.innerWidth;
  out.overflow = { docWidth: docW, innerWidth: vw, overflows: docW > vw + 1 };
  if (out.overflow.overflows) {
    out.overflow.culprits = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > vw + 1 && getComputedStyle(el).position !== 'fixed';
      })
      .slice(0, 12)
      .map((el) => ({ el: label(el), right: Math.round(el.getBoundingClientRect().right), section: section(el) }));
  }

  // 2. Tap targets under 44px. Only things a finger is meant to hit.
  for (const el of document.querySelectorAll('a[href], button, [role="button"], input, select, summary')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;               // hidden
    if (getComputedStyle(el).visibility === 'hidden') continue;
    if (r.height >= 44 && r.width >= 44) continue;
    // A link inside a paragraph is prose, not a control; skip inline text links.
    const disp = getComputedStyle(el).display;
    if (el.tagName === 'A' && disp === 'inline' && el.closest('p, li, blockquote')) continue;
    out.smallTargets.push({ el: label(el), w: Math.round(r.width), h: Math.round(r.height), section: section(el) });
  }

  // 3. Fixed pixel widths that cannot reflow. Ignores max-width and
  //    anything narrower than 200px, which is usually an icon or chip.
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    const w = cs.width;
    if (!w.endsWith('px')) continue;
    const px = parseFloat(w);
    if (px < 200) continue;
    // Only flag when the author set it, not when layout resolved it.
    const inline = el.style.width;
    const declared = inline && inline.endsWith('px');
    if (!declared) continue;
    if (cs.maxWidth !== 'none' && cs.maxWidth.endsWith('%')) continue;
    out.fixedWidths.push({ el: label(el), width: Math.round(px), section: section(el) });
  }

  // 4. SVGs without a viewBox cannot scale.
  for (const svg of document.querySelectorAll('svg')) {
    if (!svg.getAttribute('viewBox')) {
      const r = svg.getBoundingClientRect();
      out.svgNoViewBox.push({ el: label(svg), w: Math.round(r.width), h: Math.round(r.height), section: section(svg) });
    }
  }

  // 5. Rendered text under 14px. Leaf nodes with real text only, so a
  //    wrapper does not report its children's size.
  const seen = new Set();
  for (const el of document.querySelectorAll('body *')) {
    if (el.children.length > 0) continue;
    const txt = (el.textContent || '').trim();
    if (!txt) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const size = parseFloat(cs.fontSize);
    if (size >= 14) continue;
    const key = Math.round(size * 10) + '|' + label(el);
    if (seen.has(key)) continue;
    seen.add(key);
    out.smallText.push({ el: label(el), size: +size.toFixed(1), section: section(el) });
  }
  return JSON.stringify(out);
})()`;

/* ── Server ─────────────────────────────────────────────── */

async function freePort() {
  return new Promise((res, rej) => {
    const s = createServer();
    s.on("error", rej);
    s.listen(0, () => { const { port } = s.address(); s.close(() => res(port)); });
  });
}

async function waitForServer(url, timeoutMs = 90_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const r = await fetch(url, { redirect: "manual" });
      if (r.status < 500) return true;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function startServer() {
  try {
    await access(".next");
  } catch {
    console.error("\nNo production build found. Run `npm run build` first.\n");
    process.exit(1);
  }
  const port = await freePort();
  const proc = spawn("npx", ["next", "start", "-p", String(port)], {
    stdio: "ignore", detached: false,
  });
  const url = `http://127.0.0.1:${port}`;
  if (!(await waitForServer(url))) {
    proc.kill();
    console.error(`\nServer did not come up on ${url}.\n`);
    process.exit(1);
  }
  return { url, proc };
}

/* ── Run ────────────────────────────────────────────────── */

const external = process.env.BASE_URL;
let server = null;
let baseUrl = external;
if (!baseUrl) {
  console.log("Starting the production server…");
  server = await startServer();
  baseUrl = server.url;
}
console.log(`Shooting ${baseUrl} at ${WIDTHS.join(", ")}\n`);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const findings = {};

try {
  for (const width of WIDTHS) {
    const dir = path.join(OUT, String(width));
    await mkdir(dir, { recursive: true });

    const ctx = await browser.newContext({
      viewport: { width, height: VIEWPORT_H },
      deviceScaleFactor: 2,
      /* A real phone reports coarse pointer and touch. Layouts that key
         off hover would otherwise be photographed in their desktop
         state at 390. */
      hasTouch: width <= 768,
      isMobile: width <= 768,
      reducedMotion: "no-preference",
    });
    await ctx.addInitScript(SEED_STORAGE);
    const page = await ctx.newPage();

    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60_000 });

    /* Walk the page so every whileInView entrance fires and every lazy
       image decodes, then return to the top before capturing. */
    const docHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < docHeight; y += Math.round(VIEWPORT_H * 0.7)) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(160);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);

    await page.screenshot({ path: path.join(dir, `${width}-00-full.png`), fullPage: true });
    process.stdout.write(`  ${width}  full`);

    for (const s of SECTIONS) {
      const el = s.sel
        ? page.locator(s.sel).first()
        : page.locator("main section").nth(s.nth);
      if (!(await el.count())) { process.stdout.write(` · ${s.name}:MISSING`); continue; }
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      await el.screenshot({ path: path.join(dir, `${width}-${s.name}.png`) })
        .catch(async () => {
          /* A section taller than the capture limit still yields a
             viewport-framed shot rather than nothing. */
          await page.screenshot({ path: path.join(dir, `${width}-${s.name}.png`) });
        });
      process.stdout.write(` · ${s.name}`);
    }
    process.stdout.write("\n");

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    findings[width] = JSON.parse(await page.evaluate(AUDIT));

    await ctx.close();
  }
} finally {
  await browser.close();
  if (server) server.proc.kill();
}

/* ── Reports ────────────────────────────────────────────── */

await writeFile(path.join(OUT, "audit.json"), JSON.stringify(findings, null, 2));

const lines = ["# Automated mobile audit", "", `Source: ${baseUrl}`, ""];
for (const width of WIDTHS) {
  const f = findings[width];
  lines.push(`## ${width}px`, "");
  lines.push(
    f.overflow.overflows
      ? `**Horizontal overflow:** document is ${f.overflow.docWidth}px in a ${f.overflow.innerWidth}px viewport.`
      : `**Horizontal overflow:** none (${f.overflow.docWidth}px = viewport).`,
    "",
  );
  for (const c of f.overflow.culprits ?? []) lines.push(`- \`${c.el}\` reaches ${c.right}px — ${c.section}`);
  if (f.overflow.culprits?.length) lines.push("");

  const group = (title, rows, fmt) => {
    lines.push(`**${title}:** ${rows.length}`, "");
    for (const r of rows.slice(0, 25)) lines.push(`- ${fmt(r)}`);
    if (rows.length > 25) lines.push(`- …and ${rows.length - 25} more`);
    lines.push("");
  };
  group("Tap targets under 44px", f.smallTargets, (r) => `\`${r.el}\` ${r.w}×${r.h} — ${r.section}`);
  group("Author-set fixed widths ≥200px", f.fixedWidths, (r) => `\`${r.el}\` ${r.width}px — ${r.section}`);
  group("SVGs without viewBox", f.svgNoViewBox, (r) => `\`${r.el}\` ${r.w}×${r.h} — ${r.section}`);
  group("Text under 14px", f.smallText, (r) => `${r.size}px \`${r.el}\` — ${r.section}`);
}
await writeFile(path.join(OUT, "audit.md"), lines.join("\n"));

console.log(`\nWrote images, audit.json and audit.md to ${OUT}\n`);
