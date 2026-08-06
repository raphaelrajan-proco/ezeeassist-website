/**
 * Verification for the trusted-by marquee. Asserts rather than eyeballs:
 * no horizontal scroll from the full-bleed breakout, the track is really
 * full width, the animation is really running, and the pixels immediately
 * around the marks match the band (which is what catches a surviving
 * white box).
 *
 *   node scripts/verify-marquee.mjs <baseUrl> <outDir>
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:55670";
const OUT = process.argv[3] || "/tmp/marquee";
mkdirSync(OUT, { recursive: true });

const PAGES = [
  { path: "/", tag: "home" },
  { path: "/platform/answers", tag: "sub" },
];
const WIDTHS = [390, 768, 1440, 1920];
const fails = [];
const note = (m) => { fails.push(m); console.log("  FAIL " + m); };

const browser = await chromium.launch();

for (const theme of ["light", "dark"]) {
  for (const { path, tag } of PAGES) {
    for (const w of WIDTHS) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      await page.goto(BASE + path, { waitUntil: "networkidle" });
      if (theme === "dark") {
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await page.waitForTimeout(200);
      }
      await page.evaluate(() => {
        const s = document.querySelector("section.lm");
        if (s) s.scrollIntoView({ block: "center" });
      });
      await page.waitForTimeout(900);

      const id = `${theme}/${tag}@${w}`;

      // 1. No horizontal scroll introduced anywhere on the page.
      const scroll = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        cw: document.documentElement.clientWidth,
      }));
      if (scroll.sw !== scroll.cw) note(`${id} horizontal scroll: scrollWidth ${scroll.sw} vs clientWidth ${scroll.cw}`);

      // 2. The viewport really spans the window.
      const geom = await page.evaluate(() => {
        const vp = document.querySelector("section.lm .lm-viewport");
        if (!vp) return null;
        const r = vp.getBoundingClientRect();
        const cs = getComputedStyle(vp);
        const sec = document.querySelector("section.lm");
        const ss = getComputedStyle(sec);
        return {
          left: Math.round(r.left), width: Math.round(r.width), inner: window.innerWidth,
          radius: parseFloat(cs.borderTopLeftRadius),
          shadow: cs.boxShadow,
          secRadius: parseFloat(ss.borderTopLeftRadius),
          secShadow: ss.boxShadow,
          secBorder: ss.borderTopWidth,
          masked: cs.maskImage !== "none" || cs.webkitMaskImage !== "none",
        };
      });
      if (!geom) { note(`${id} no marquee found`); await page.close(); continue; }
      if (Math.abs(geom.width - geom.inner) > 2 || Math.abs(geom.left) > 2)
        note(`${id} not full-bleed: left ${geom.left}, width ${geom.width} vs viewport ${geom.inner}`);
      if (geom.radius > 0.5 || geom.secRadius > 0.5) note(`${id} rounded corner present`);
      if (geom.shadow !== "none" || geom.secShadow !== "none") note(`${id} box-shadow present`);
      if (parseFloat(geom.secBorder) > 0) note(`${id} border present`);
      if (!geom.masked) note(`${id} edge fade mask missing`);

      // 3. The animation is genuinely running (transform changes over ~1s).
      const visibleTrack = () => {
        const t = [...document.querySelectorAll(".lm-track")].find((el) => el.offsetParent !== null || getComputedStyle(el).display !== "none");
        return t;
      };
      const t1 = await page.evaluate(() => {
        const t = [...document.querySelectorAll(".lm-track")].find((el) => getComputedStyle(el).display !== "none");
        return t ? getComputedStyle(t).transform : "NONE";
      });
      await page.waitForTimeout(1000);
      const t2 = await page.evaluate(() => {
        const t = [...document.querySelectorAll(".lm-track")].find((el) => getComputedStyle(el).display !== "none");
        return t ? getComputedStyle(t).transform : "NONE";
      });
      if (t1 === t2) note(`${id} track transform did not change in 1s (animation not running): ${t1}`);

      // 4. Track must overflow the viewport, or the loop shows a gap.
      const trackW = await page.evaluate(() => {
        const t = [...document.querySelectorAll(".lm-track")].find((el) => getComputedStyle(el).display !== "none");
        return t ? Math.round(t.getBoundingClientRect().width) : 0;
      });
      if (trackW < geom.inner * 2) note(`${id} track ${trackW}px is under 2x viewport ${geom.inner}px, loop will show a gap`);

      /* 5. The GAPS between marks must be the band colour.

         An earlier version sampled the row's top and bottom pixel rows,
         which was meaningless: the viewport is exactly as tall as the
         marks, so those rows run through the logos themselves and every
         page "failed". Sampling the gaps is what actually detects a
         baked-in plate, because a plate fills the space a gap should
         leave empty. */
      const gapCheck = await page.evaluate(() => {
        const track = [...document.querySelectorAll(".lm-track")].find((el) => getComputedStyle(el).display !== "none");
        const kids = [...track.children];
        const vp = document.querySelector("section.lm .lm-viewport").getBoundingClientRect();
        const pts = [];
        for (let i = 0; i < kids.length - 1; i++) {
          const a = kids[i].getBoundingClientRect();
          const b = kids[i + 1].getBoundingClientRect();
          const mid = (a.right + b.left) / 2;
          // Only gaps well inside the fade, and wide enough to sample.
          if (b.left - a.right < 12) continue;
          if (mid < vp.width * 0.15 || mid > vp.width * 0.85) continue;
          pts.push(Math.round(mid));
        }
        return { pts: pts.slice(0, 24), top: Math.round(vp.top), height: Math.round(vp.height) };
      });
      if (gapCheck.height < 4) note(`${id} marquee viewport collapsed to ${gapCheck.height}px`);
      else if (gapCheck.pts.length) {
        /* Clip a few pixels ABOVE the row too, and compare each gap to the
           same column just above it. The hero band is a gradient
           photograph, so a single reference pixel taken from the far left
           does not describe the background 700px away; same-column is the
           only comparison that holds on both a flat band and a gradient. */
        const PAD = 6;
        const top = Math.max(0, gapCheck.top - PAD);
        const shot = await page.screenshot({ clip: { x: 0, y: top, width: geom.inner, height: gapCheck.height + (gapCheck.top - top) } });
        const { data, info } = await sharp(shot).raw().toBuffer({ resolveWithObject: true });
        const px = (x, y) => { const o = (y * info.width + x) * info.channels; return [data[o], data[o + 1], data[o + 2]]; };
        const above = 1;
        const mid = Math.round((gapCheck.top - top) + gapCheck.height / 2);
        let bad = 0;
        for (const x of gapCheck.pts) {
          const xx = Math.min(x, info.width - 1);
          const ref = px(xx, above);
          const p = px(xx, mid);
          if (Math.abs(p[0] - ref[0]) + Math.abs(p[1] - ref[1]) + Math.abs(p[2] - ref[2]) > 30) bad++;
        }
        if (bad) note(`${id} ${bad}/${gapCheck.pts.length} gaps between marks are not the band colour (baked plate)`);
      }

      await page.screenshot({ path: `${OUT}/${theme}-${tag}-${w}.png` });
      await page.close();
    }
  }
}

// 6. Loop seam: sample mid-cycle and confirm the track is one continuous run.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/platform/answers", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const seam = await page.evaluate(() => {
    const track = document.querySelector(".lm-track");
    const kids = [...track.children];
    const half = kids.length / 2;
    const a = kids[0].getBoundingClientRect();
    const b = kids[half].getBoundingClientRect();
    // The element half way along must sit exactly one half-track to the right.
    const period = track.getBoundingClientRect().width / 2;
    return { delta: Math.round(b.left - a.left), period: Math.round(period), count: kids.length };
  });
  if (Math.abs(seam.delta - seam.period) > 2)
    note(`loop seam: element at the halfway index is ${seam.delta}px along but the period is ${seam.period}px`);
  else console.log(`  seam OK: halfway element sits at ${seam.delta}px, period ${seam.period}px, ${seam.count} items`);
  await page.evaluate(() => { document.querySelector(".lm-track").style.animationDelay = "-25s"; });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/seam-midcycle.png` });
  await page.close();
}

await browser.close();
console.log(fails.length ? `\n${fails.length} FAILURES` : "\nAll assertions passed.");
process.exit(fails.length ? 1 : 0);
