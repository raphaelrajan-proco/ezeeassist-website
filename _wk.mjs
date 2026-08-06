import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:55100/solutions/coaches", { waitUntil: "networkidle" });
await p.evaluate(() => document.querySelector("#week").scrollIntoView());
await p.waitForTimeout(600);
const read = async () => p.evaluate(() => {
  const btns = [...document.querySelectorAll('#week button[aria-pressed]')];
  const on = btns.findIndex(x => x.getAttribute("aria-pressed") === "true");
  const h3 = document.querySelector("#week h3");
  return { on, day: btns[on]?.textContent.slice(0, 3), headline: h3?.textContent };
});
console.log("initial:", JSON.stringify(await read()));
// click Friday, then Tuesday: skip-ahead and skip-back must both work
await p.click('#week button[aria-pressed]:nth-of-type(1)').catch(() => {});
const btns = await p.$$('#week button[aria-pressed]');
await btns[4].click(); await p.waitForTimeout(300);
console.log("after clicking Fri:", JSON.stringify(await read()));
await btns[1].click(); await p.waitForTimeout(300);
console.log("after clicking Tue:", JSON.stringify(await read()));
await p.waitForTimeout(6400);
console.log("after auto-advance:", JSON.stringify(await read()));
await p.close();

const p2 = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p2.goto("http://localhost:55100/solutions/coaches", { waitUntil: "networkidle" });
await p2.waitForTimeout(700);
const r2 = await p2.evaluate(() => {
  const el = (s) => document.querySelector(s);
  return [".cb-foot", ".cb-rank3", ".cp-5"].map(s => `${s.slice(1)}=${el(s) ? getComputedStyle(el(s)).opacity + "/" + getComputedStyle(el(s)).animationName : "?"}`).join("  ");
});
console.log("reduced motion:", r2);
await b.close();
