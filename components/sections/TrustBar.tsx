import LogoMarquee from "@/components/logo-marquee";

/**
 * The trust bar on the legacy `/industries/franchising` route.
 *
 * It renders the shared marquee, so the roster stays single-source: one
 * edit to `lib/logos.ts` moves this, the home hero and every sub-page
 * strip together. It used to draw its own row of tiles, which is how a
 * page ends up showing a stale treatment after everything else is fixed.
 *
 * The label is passed here because this placement has no hero above it
 * to introduce the row.
 */
export default function TrustBar() {
  return (
    <LogoMarquee
      tone="auto"
      label="Trusted by leading franchise and multi-location brands."
      className="py-14"
    />
  );
}
