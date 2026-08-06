"use client";

import LogoMarquee from "@/components/logo-marquee";

/** The shared logo marquee, rendered inside the hero section so the
 *  band crops at the fold.
 *
 *  The hero runs on a scrimmed photograph, so this band is transparent
 *  rather than ed-bg, and ed-on-dark pins the dark token set for
 *  LogoMarquee, which is shared with other routes and cannot be styled
 *  from here. The trust line takes an explicit colour because the dark
 *  set resolves --ed-accent-text to #00AEEF, which measures 2.3:1 on
 *  this background. */
export default function GrowthTrustStrip({ showTrustLine = false }: { showTrustLine?: boolean }) {
  return (
    /* relative is load-bearing: the hero's background image and scrims are
       an absolutely-positioned layer, and positioned elements paint above
       static ones in the same stacking context. Without it this whole
       strip renders underneath the scrim.

       `ed-on-dark` pins the dark token set for the eyebrow. The marquee
       itself does not read tokens for its marks; it takes tone="on-dark"
       and uses the light variants in both themes, because the hero is a
       dark photograph either way.

       **No padding wrapper, no panel.** This used to wrap the marquee in
       `mx-auto max-w-7xl px-6` plus a `rounded-2xl` light band, which is
       what stopped it reaching the viewport edges. */
    <div className="ed-on-dark relative w-full pt-4 pb-8 md:pt-6 md:pb-10">
      <LogoMarquee
        tone="on-dark"
        priority
        label={showTrustLine ? "Trusted by leading franchise and multi-location brands." : undefined}
      />
    </div>
  );
}
