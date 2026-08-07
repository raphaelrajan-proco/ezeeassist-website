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
 * Those are advisory. On top of them sit three hard rules that exit the
 * run non-zero, so a regression cannot land quietly:
 *
 *   - no `main section` whose scrollWidth exceeds the viewport
 *   - no interactive target under 24px in either dimension
 *   - no rendered text under 12px
 *
 * The known masked marquees are excluded by class; SVG text is exempt
 * from the type rule because its font-size is in viewBox user units.
 *
 * Environment:
 *   BASE_URL   point at an already-running server instead of spawning
 *              one, e.g. BASE_URL=https://staging.example.com npm run shots
 *   WIDTHS     comma-separated override, e.g. WIDTHS=390,1440
 *   OUT        output directory, default ./screenshots
 *   SHOTS_NO_FAIL  capture images without the non-zero exit
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
  const out = { overflow: null, smallTargets: [], fixedWidths: [], svgNoViewBox: [], smallText: [], failures: [] };
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

  // ── 6. Regression guard ──────────────────────────────────
  // The four checks above are advisory: they list things worth a look.
  // These three are hard failures, and \`npm run shots\` exits non-zero
  // when any of them fires. Thresholds are the floors agreed for the
  // mobile pass, not the aspirational numbers: 12px type, 24px targets
  // (WCAG 2.2 AA), and no section wider than the viewport.
  //
  // Note the tap-target guard is 24, not the 44 used by check 2 above.
  // 44 is the iOS guideline and plenty of legitimate controls sit under
  // it; 24 is the accessibility conformance floor and nothing should.
  const KNOWN_WIDE = /ed-logo-marquee|animate-marquee|ed-conn-track|ed-os-marquee-track/;
  const inKnownWide = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (KNOWN_WIDE.test(String(n.className && n.className.baseVal || n.className || ''))) return true;
    }
    return false;
  };

  // 6a. A section may not be wider than the viewport. Measured on
  //     scrollWidth, not the painted box: \`.theme-editorial\` clips x, so
  //     an overflowing section reports a correct rect and hides the
  //     content instead. That is the failure mode this exists to catch.
  for (const sec of document.querySelectorAll('main section')) {
    if (inKnownWide(sec)) continue;
    const over = sec.scrollWidth - vw;
    if (over > 1) {
      out.failures.push({
        rule: 'section-overflow',
        detail: label(sec) + ' content is ' + sec.scrollWidth + 'px in a ' + vw + 'px viewport (+' + over + ')',
      });
    }
  }

  // 6b. No interactive target under 24px in either dimension.
  for (const t of out.smallTargets) {
    if (Math.min(t.w, t.h) >= 24) continue;
    out.failures.push({ rule: 'tap-target-under-24', detail: t.el + ' is ' + t.w + '×' + t.h + ' — ' + t.section });
  }

  // 6c. No rendered text under 12px. SVG is exempt: font-size inside a
  //     viewBox is user units and scales with the artwork.
  for (const el of document.querySelectorAll('body *')) {
    if (el.children.length > 0) continue;
    if (el.closest('svg')) continue;
    const txt = (el.textContent || '').trim();
    if (!txt) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const size = parseFloat(cs.fontSize);
    if (size >= 12) continue;
    // The one carve-out, agreed for the mobile pass: uppercase mono
    // labels carrying letter-spacing may sit at 10.5px below 768px.
    // They are tagged .ed-mono-label and globals.css re-points the
    // floor variable for them. Nothing else may go under 12.
    // (No backticks in this comment: the whole block is a template
    // literal, and one backtick here ends the string.)
    if (vw < 768 && size >= 10.5 && el.closest('.ed-mono-label')) continue;
    out.failures.push({ rule: 'text-under-12', detail: size.toFixed(1) + 'px ' + label(el) + ' — ' + section(el) });
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

  const fails = f.failures ?? [];
  lines.push(`**Guard failures:** ${fails.length}`, "");
  for (const r of fails) lines.push(`- \`${r.rule}\` — ${r.detail}`);
  lines.push("");
}
await writeFile(path.join(OUT, "audit.md"), lines.join("\n"));

console.log(`\nWrote images, audit.json and audit.md to ${OUT}\n`);

/* ── Regression guard ────────────────────────────────────
   Advisory findings are written to the report and the run passes. The
   three guard rules are hard: any hit and the run exits 1, so this can
   be wired to CI or a pre-push hook without further glue. Set
   SHOTS_NO_FAIL=1 to capture images from a known-broken state without
   the non-zero exit.

   KNOWN carries issues that are already triaged and scheduled, so the
   guard starts green and goes red only on something new. Each entry
   must name the section and its audit verdict, and must be deleted the
   moment that work lands — an entry that outlives its fix turns the
   guard back into decoration. They are still printed on every run. */
const KNOWN = [
  {
    rule: "section-overflow",
    match: /section#the-system/,
    why: "MOBILE-AUDIT.md verdict: Re-render. 1210px internal diagram, cannot reflow by CSS. Not touched by the foundation pass.",
  },
];

const all = WIDTHS.flatMap((w) => (findings[w].failures ?? []).map((r) => ({ ...r, width: w })));
const isKnown = (r) => KNOWN.find((k) => k.rule === r.rule && k.match.test(r.detail));
const known = all.filter(isKnown);
const failed = all.filter((r) => !isKnown(r));

const report = (rows, label, log) => {
  const byRule = {};
  for (const r of rows) (byRule[r.rule] ??= []).push(r);
  for (const [rule, rs] of Object.entries(byRule)) {
    log(`  ${rule} — ${rs.length}`);
    /* One line per distinct detail; the same element failing at six
       widths is one problem, not six. */
    const uniq = [...new Set(rs.map((r) => r.detail))];
    for (const d of uniq.slice(0, 12)) {
      const at = rs.filter((r) => r.detail === d).map((r) => r.width).join(",");
      log(`    [${at}] ${d}`);
    }
    if (uniq.length > 12) log(`    …and ${uniq.length - 12} more`);
    log("");
  }
};

if (known.length) {
  console.log(`Regression guard: ${known.length} known, allowed\n`);
  report(known, "known", console.log);
  for (const k of KNOWN) console.log(`  ${k.rule} ${k.match} — ${k.why}\n`);
}
if (failed.length) {
  console.error(`REGRESSION GUARD FAILED: ${failed.length} new failure(s) across ${WIDTHS.length} widths\n`);
  report(failed, "new", console.error);
  if (!process.env.SHOTS_NO_FAIL) process.exit(1);
} else {
  console.log("Regression guard: pass (no new failures)\n");
}
