/**
 * Single source of truth for network scale figures on the homepage.
 * Every brand or location count rendered on the homepage must read
 * from this constant so the figures cannot drift apart again.
 */
// Confirmed 2026-07-31: the network reads 70+ brands and 5,000+ locations.
// The deck's older 60+/4,500+ pair is superseded and is being reconciled
// outside this repo.
export const NETWORK_SCALE = {
  brands: "70+",
  locations: "5,000+",
  users: "10,000+",
} as const;

/** Numeric form for count-up animations (strips the thousands separator and +). */
export function networkScaleNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ""), 10);
}
