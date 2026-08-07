import LogoMarquee from "@/components/sections/LogoMarquee";

/**
 * The customer logo marquee, sized to sit directly under a sub-page hero.
 *
 * One component rather than three copies of the same padding, so the gap
 * between every hero and its first real section stays identical. The
 * padding is deliberately shorter than a normal band's: this is a strip
 * riding under the hero, not a section of its own, and giving it full
 * section padding pushed the first heading well below the fold.
 *
 * `trustLine` is the homepage's only difference, and it is a prop rather
 * than a second component because a second component is exactly how the
 * two strips drifted apart the first time. Sub-page heroes pass nothing.
 */
export default function HeroLogoStrip({ trustLine = false }: { trustLine?: boolean }) {
  return (
    /* `ed-logo-band` (pure white), not `ed-bg`.

       The chips behind the marks are white and carry no outline, which
       makes them invisible on a white band. `ed-bg` is white in light
       mode, so that held there, but in dark mode it is near-black and the
       strip came back as fifty white boxes with the page showing through
       the gaps. The band has to be white for the chips to disappear, and
       the chips have to stay because half these files ship an opaque
       white background of their own. Same treatment as the homepage. */
    <section className="ed-logo-band w-full" aria-label="Customers">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-10 md:py-12">
        {trustLine && (
          <p
            className="mb-7 text-center uppercase md:mb-8"
            style={{
              /* Measured 9.7px at 390 and 10.7px at 1205, both under the
                 type floor, so this is a flat 12px at every width. */
              fontSize: "max(var(--ed-type-floor, 12px), clamp(0.609rem, 0.525rem + 0.19vw, 0.703rem))",
              fontWeight: 600,
              /* 0.13em, down from the 0.16em it carried on the blue. Dark
                 text on white sets visually wider than pale text on a dark
                 photograph at the same tracking, so holding 0.16em here
                 read as stretched rather than spaced. */
              letterSpacing: "0.13em",
              /* A literal, NOT `--ed-fg`. This band is `ed-logo-band`,
                 which is #FFFFFF in both themes, while `--ed-fg` flips to
                 near-white in dark mode. Reading the token here put white
                 text on a white band and the line vanished. Same reason
                 the footer carries its own palette. */
              color: "#0A0A0A",
            }}
          >
            Trusted by leading franchise and multi-location brands.
          </p>
        )}
        <LogoMarquee />
      </div>
    </section>
  );
}
