import { logosFor, type Logo, type LogoSet } from "@/lib/logos";

/**
 * The trusted-by logo marquee. One component, both placements.
 *
 * ── Full bleed ─────────────────────────────────────────────
 * This renders its own `<section className="w-full">`, which is how every
 * other full-bleed band on this site works: sections span the viewport
 * and an inner `mx-auto max-w-7xl` constrains CONTENT. The marquee is
 * deliberately not inside that inner wrapper.
 *
 * **Do not reach for `left-1/2 -mx-[50vw] w-screen`.** It is unnecessary
 * given the convention above, and `.theme-editorial` sets
 * `overflow-x: clip`, so a viewport-unit breakout would be clipped rather
 * than bleeding. It also risks a horizontal scrollbar, since `100vw`
 * includes the scrollbar width on some platforms.
 *
 * ── The loop ───────────────────────────────────────────────
 * The list is rendered `COPIES` times in one flex track and the track is
 * animated 0 to -50%. Because the second half is an exact repeat of the
 * first, -50% lands on a pixel-identical frame and the loop is seamless
 * with no measurement JS and no reset flash.
 *
 * `COPIES` is 4, not 2: at 1920 a single pass of this roster does not
 * fill the viewport twice over, and a track that runs out mid-screen
 * breaks the illusion. It stays a multiple of 2 so -50% remains a whole
 * number of copies.
 *
 * Duration scales with the item count via `--marquee-duration`, so the
 * marks travel at a constant speed as the roster grows instead of the
 * whole strip speeding up.
 *
 * ── tone ───────────────────────────────────────────────────
 * Theme and surface are not the same thing, which is why this is a prop
 * and not a `dark:` variant:
 *
 *   "on-dark"  the home hero. Always the light variants, in BOTH themes,
 *              because the hero is a dark photograph either way.
 *   "auto"     the below-hero strip. Follows the theme.
 *
 * `auto` renders both image sets and toggles them with `dark:` classes
 * rather than branching on `useTheme()`. That keeps the component a
 * server component, makes it SSR-safe, and means no flash on hydration.
 */

const COPIES = 4;
/** Seconds per logo per pass. 50 logos lands around 50s. */
const SECONDS_PER_LOGO = 1;

type Props = {
  tone?: "auto" | "on-dark";
  set?: LogoSet;
  /** The eyebrow above the row. Off by default; the hero supplies its own. */
  label?: string;
  /** True for the home hero, which is above the fold. */
  priority?: boolean;
  className?: string;
};

function Mark({
  logo,
  variant,
  hidden,
  priority,
  copy,
  className = "",
}: {
  logo: Logo;
  variant: "colour" | "on-dark";
  /** Duplicate copies are decorative and must not be announced. */
  hidden: boolean;
  priority: boolean;
  copy: number;
  className?: string;
}) {
  const useDark = variant === "on-dark" && logo.srcOnDark;
  const src = useDark ? logo.srcOnDark! : logo.src;
  const fallback = useDark ? logo.fallbackOnDark : logo.fallback;
  const scale = logo.scale ?? 1;

  /* Plain <picture>, not next/image: the source is already exported at
     2x at a fixed cap height, so there is nothing for the optimiser to
     do, and next/image would add a wrapper that fights `h-full w-auto`. */
  return (
    <picture data-copy={copy} className={`block shrink-0 ${className}`}>
      {fallback && <source srcSet={src} type="image/webp" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallback ?? src}
        alt={hidden ? "" : logo.alt}
        aria-hidden={hidden || undefined}
        width={logo.width}
        height={logo.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="w-auto max-w-none object-contain"
        style={{ height: `${scale * 100}%` }}
        draggable={false}
      />
    </picture>
  );
}

export default function LogoMarquee({
  tone = "auto",
  set = "page",
  label,
  priority = false,
  className = "",
}: Props) {
  const list = logosFor(set);
  const duration = `${list.length * SECONDS_PER_LOGO}s`;

  const row = (variant: "colour" | "on-dark", extra = "") => (
    <div
      /* **The spacing is per item, not flex `gap`.** With `gap` the track
         measures `sum + (n-1) * gap` while the element at the halfway
         index sits at `sum/2 + (n/2) * gap`, so -50% lands half a gap off
         and the loop shows a 40px jump at `lg`. Folding the gap into each
         item makes the repeating unit exactly item+gap, so half the track
         is exactly half the items. */
      className={`lm-track flex w-max items-center ${extra}`}
      style={{ ["--marquee-duration" as string]: duration }}
    >
      {Array.from({ length: COPIES }).flatMap((_, copy) =>
        list.map((logo) => (
          <Mark
            key={`${variant}-${copy}-${logo.name}`}
            /* Reduced motion hides every copy but the first, leaving one
               scrollable row. CSS cannot count to the roster length, so
               the copy index has to be in the DOM. */
            copy={copy}
            logo={logo}
            variant={variant}
            /* Only the first copy carries real alt text. */
            hidden={copy > 0}
            priority={priority && copy === 0}
            className="h-7 me-12 md:h-9 md:me-16 lg:h-10 lg:me-20"
          />
        ))
      )}
    </div>
  );

  return (
    <section
      aria-label="Customer logos"
      className={`lm w-full ${tone === "auto" ? "ed-bg-alt" : ""} ${className}`}
    >
      {label && (
        <p className="lm-label mx-auto max-w-7xl px-6 pb-5 text-center md:px-12 lg:px-16">{label}</p>
      )}
      {/* overflow-hidden lives here and only here. No panel, no radius,
          no border, no shadow: the edge fade is what makes it read as
          intentional rather than clipped. */}
      <div className="lm-viewport w-full overflow-hidden">
        {tone === "on-dark" ? (
          row("on-dark")
        ) : (
          /* Both variants occupy the SAME grid cell, so exactly one is
             visible and whichever it is defines the height.

             **Not absolute positioning.** Stacking the dark row with
             `absolute inset-0` collapsed the strip to zero height in dark
             mode: the light row is `dark:hidden` so nothing was left in
             flow, and an absolutely positioned child cannot give its
             parent height. The bug is invisible in light mode. */
          <div className="grid">
            {row("colour", "dark:hidden [grid-area:1/1]")}
            {row("on-dark", "hidden dark:flex [grid-area:1/1]")}
          </div>
        )}
      </div>
    </section>
  );
}
