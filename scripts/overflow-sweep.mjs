/**
 * Horizontal overflow sweep.
 *
 *   1. In app/globals.css, change `.theme-editorial { overflow-x: clip }`
 *      to `visible`
 *   2. npm run build
 *   3. node scripts/overflow-sweep.mjs   (URL=http://localhost:PORT)
 *   4. change it back to `clip` and rebuild
 *
 * Step 1 is the whole point and is why this is not wired to a npm script.
 * `overflow-x: clip` on the theme root does not prevent overflow, it
 * hides it: an element 500px wide in a 390px viewport reports a correct
 * bounding rect and silently loses its right-hand content, so the usual
 * "does the document scroll horizontally" check reports clean. Flipping
 * to `visible` is what makes the leaks measurable.
 *
 * Reports every element that paints past a viewport edge and every
 * element whose content is wider than its own box, outermost offender
 * first. The masked marquees are designed to be wider than the viewport
 * and are excluded by class, as is anything under a CSS mask.
 *
 * `npm run shots` carries the durable regression guard. This is the
 * exploratory tool for deciding what a leak actually is.
 */
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const URL = process.env.URL;
const WIDTHS = [390, 430, 768, 1024, 1205, 1440];
/* The two masked marquees are designed to be wider than the viewport and
   are excluded by name, per the brief. */
const MARQUEE = /ed-logo-marquee|animate-marquee|ed-conn-track|ed-os-marquee-track/;

const b = await chromium.launch();
const all = {};

for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  await ctx.addInitScript(`try{localStorage.setItem('cookie-consent','accepted');localStorage.setItem('ezee-announcement-2026-readiness','dismissed');localStorage.setItem('exit-intent-dismissed','1');}catch(e){}`);
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "networkidle" });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(140); }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);

  all[w] = await p.evaluate((mq) => {
    const rx = new RegExp(mq);
    const vw = document.documentElement.clientWidth;
    const path = (el) => {
      const bits = [];
      for (let n = el; n && n !== document.body && bits.length < 3; n = n.parentElement) {
        const c = String(n.className?.baseVal ?? n.className ?? "").trim().split(/\s+/).filter(Boolean).slice(0, 3).join(".");
        bits.unshift(n.tagName.toLowerCase() + (c ? "." + c : ""));
      }
      return bits.join(" > ");
    };
    const masked = (el) => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        const cn = String(n.className?.baseVal ?? n.className ?? "");
        if (rx.test(cn)) return true;
        const cs = getComputedStyle(n);
        if (cs.maskImage !== "none" || cs.webkitMaskImage !== "none") return true;
      }
      return false;
    };

    const out = [];
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
      if (cs.position === "fixed") continue;
      /* Screen-reader-only text is a 1x1 clipped box whose scrollWidth is
         the whole paragraph. Visually it does not exist. */
      if (el.classList.contains("sr-only") || cs.clip !== "auto" || cs.clipPath !== "none") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const past = Math.round(r.right - vw);
      const before = Math.round(-r.left);
      const selfScroll = Math.round(el.scrollWidth - el.clientWidth);
      const bleeds = past > 1 || before > 1;
      /* Content wider than its box counts whatever overflow-x says. With
         `visible` it paints outside and the ancestor clip eats it, which
         is the silent case this sweep exists to find; with auto/hidden it
         is a scroller. Requiring a non-visible overflow-x here is what hid
         #the-system (scrollWidth 500 in a 390 box) on the first pass. */
      const scrolls = selfScroll > 1;
      if (!bleeds && !scrolls) continue;
      /* Report the outermost offender only: if the parent already bleeds
         by as much, this element is just riding along inside it. */
      const pr = el.parentElement?.getBoundingClientRect();
      if (pr && bleeds && Math.round(pr.right - vw) >= past && Math.round(-pr.left) >= before) continue;
      out.push({
        sec: el.closest("section[id]")?.id || el.closest("header,footer,nav")?.tagName.toLowerCase() || "chrome",
        path: path(el),
        w: Math.round(r.width),
        past: past > 1 ? past : 0,
        before: before > 1 ? before : 0,
        scroll: scrolls ? selfScroll : 0,
        masked: masked(el),
        text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
      });
    }
    return { vw, out };
  }, MARQUEE.source);
  await ctx.close();
}
await b.close();

for (const w of WIDTHS) {
  const { vw, out } = all[w];
  const real = out.filter((x) => !x.masked);
  const mask = out.filter((x) => x.masked);
  console.log(`\n=== ${w}px (vw ${vw}) — ${real.length} leaks, ${mask.length} masked/marquee (excluded) ===`);
  for (const x of real.sort((a, b2) => (b2.past + b2.before + b2.scroll) - (a.past + a.before + a.scroll))) {
    const how = [x.past && `+${x.past}R`, x.before && `+${x.before}L`, x.scroll && `scroll+${x.scroll}`].filter(Boolean).join(" ");
    console.log(`  ${x.sec.padEnd(13)} ${how.padEnd(22)} w=${String(x.w).padEnd(6)} ${x.path.slice(0, 62)}`);
    if (x.text) console.log(`  ${" ".repeat(13)} ${JSON.stringify(x.text)}`);
  }
}
writeFileSync("scripts/diag-overflow.json", JSON.stringify(all, null, 1));
console.log("\nwrote scripts/diag-overflow.json");
