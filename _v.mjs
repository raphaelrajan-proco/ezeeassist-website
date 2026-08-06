import { chromium } from "playwright";
const URL = String(process.argv[2] || "").trim();
const b = await chromium.launch();
for (const theme of ["light","dark"]) {
  const out=[];
  for (const w of [1440,1280,1205,1024,768,375]) {
    const p=await b.newPage({viewport:{width:w,height:900}});
    await p.goto(URL,{waitUntil:"networkidle"});
    if(theme==="dark") await p.evaluate(()=>document.documentElement.classList.add("dark"));
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0)});
    await p.waitForTimeout(600);
    const r=await p.evaluate(()=>{
      const de=document.documentElement,over=[];
      for(const el of document.querySelectorAll("main *, main")){
        if(el.scrollWidth>el.clientWidth+1&&el.clientWidth>0){
          const cs=getComputedStyle(el);
          if(cs.overflowX==="auto"||cs.overflowX==="scroll"||cs.overflow==="hidden")continue;
          if(el.closest(".ig-strip")||el.closest(".ed-logo-marquee"))continue;
          over.push(`${el.tagName.toLowerCase()}.${(el.className||"").toString().split(" ").slice(0,2).join(".")} +${el.scrollWidth-el.clientWidth}`)}}
      const small=[];for(const el of document.querySelectorAll("main *")){
        if(el.children.length||!el.textContent.trim()||el.closest("svg"))continue;
        const fs=parseFloat(getComputedStyle(el).fontSize);if(fs<12)small.push(`${fs}px "${el.textContent.trim().slice(0,16)}"`)}
      return {doc:de.scrollWidth,vw:de.clientWidth,over:over.slice(0,3),small:small.slice(0,3)};
    });
    out.push(`${w}:${r.doc>r.vw?"**"+r.doc+"**":"ok"}${r.over.length?" OVER["+r.over.join(" | ")+"]":""}${r.small.length?" SMALL["+r.small.join("|")+"]":""}`);
    await p.close();
  }
  console.log(`${theme.padEnd(5)} ${out.join("\n      ")}`);
}
const p=await b.newPage({viewport:{width:1205,height:900}});
await p.goto(URL,{waitUntil:"networkidle"});
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}});
await p.waitForTimeout(800);
const s=await p.evaluate(()=>{
  const t=document.querySelector("main").innerText;
  return {secs:[...document.querySelectorAll("main section")].map(x=>`${x.id||"-"}:${getComputedStyle(x).backgroundColor}`),
    h1:document.querySelectorAll("main h1").length,h2:document.querySelectorAll("main h2").length,h3:document.querySelectorAll("main h3").length,
    em:(t.match(/—/g)||[]).length,
    banned:["seamless","robust","comprehensive","powerful","unlock","supercharge","transform","streamline","leverage","empower"].filter(w=>t.toLowerCase().includes(w)),
    tbd:(t.match(/\{\{TBD/g)||[]).length,
    accent00:[...document.querySelectorAll("main *")].filter(e=>!e.children.length&&e.textContent.trim()&&getComputedStyle(e).color==="rgb(0, 174, 239)").length};
});
console.log("\nsections:");s.secs.forEach((x,i)=>console.log(` ${i+1}. ${x}`));
console.log(`h1=${s.h1} h2=${s.h2} h3=${s.h3} em=${s.em} banned=${s.banned.length?s.banned.join(","):"none"} tbd=${s.tbd} #00AEEF-text=${s.accent00}`);
await b.close();
