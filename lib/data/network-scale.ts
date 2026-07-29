/**
 * Single source of truth for network scale figures on the homepage.
 * Every brand or location count rendered on the homepage must read
 * from this constant so the figures cannot drift apart again.
 */
// TODO: confirm current figures. Deck states 60+/4,500+. A 70+/5,000+ revision is pending human confirmation.
export const NETWORK_SCALE = {
  brands: "60+",
  locations: "4,500+",
  users: "10,000+",
} as const;

/** Numeric form for count-up animations (strips the thousands separator and +). */
export function networkScaleNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ""), 10);
}
