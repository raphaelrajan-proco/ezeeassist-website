import LogoMarquee from "@/components/logo-marquee";

/**
 * The customer marquee as it sits under a sub-page hero.
 *
 * A thin wrapper that owns only the vertical rhythm, so the gap between
 * every hero and its first real section stays identical. Everything about
 * how the strip looks lives in `LogoMarquee`.
 *
 * **No horizontal padding and no max-width here.** The marquee is
 * full-bleed and anything that constrains it is the bug this replaced:
 * the strip used to sit inside `mx-auto max-w-7xl px-6`, which clipped
 * the track to 1136px in a 1440px viewport and left about six logos
 * visible, so a running marquee read as a short static row.
 */
export default function HeroLogoStrip() {
  return <LogoMarquee tone="auto" className="py-10 md:py-12" />;
}
