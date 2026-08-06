import LogoMarquee from "@/components/sections/LogoMarquee";

/**
 * The customer logo marquee, sized to sit directly under a sub-page hero.
 *
 * One component rather than three copies of the same padding, so the gap
 * between every hero and its first real section stays identical. The
 * padding is deliberately shorter than a normal band's: this is a strip
 * riding under the hero, not a section of its own, and giving it full
 * section padding pushed the first heading well below the fold.
 */
export default function HeroLogoStrip() {
  return (
    /* `ed-logo-band` rather than `ed-bg`: the marks float with no
       chip, which only reads on a light surface. See globals.css. */
    <section className="ed-logo-band w-full" aria-label="Customers">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-10 md:py-12">
        <LogoMarquee />
      </div>
    </section>
  );
}
