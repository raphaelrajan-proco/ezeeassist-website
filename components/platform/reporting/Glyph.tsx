/**
 * One icon renderer for the whole Reporting page.
 *
 * Icons are stored as a space-separated list of subpaths (`"M4 7h16v13H4z
 * M4 7l2-3h12l2 3"`), the prototype's own encoding, and split back apart
 * here. That keeps `data.ts` a table rather than a pile of JSX.
 *
 * Always decorative: every glyph sits beside its own label, so it is
 * `aria-hidden` and never carries an accessible name. Stroke is
 * `currentColor`, so the caller sets the hue.
 */
export function Glyph({ d, size = 17 }: { d: string; size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.split(" M").map((seg, i) => (
        <path key={i} d={i ? `M${seg}` : seg} />
      ))}
    </svg>
  );
}
