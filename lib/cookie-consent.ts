const STORAGE_KEY = "cookie-consent";
const CONSENT_EVENT = "cookie-consent-changed";

/** Returns true only if the user has explicitly accepted cookies. */
export function hasConsentedToCookies(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "accepted";
}

/** Dispatches a custom event so analytics components can react to consent changes. */
export function dispatchConsentEvent(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Calls callback immediately and re-calls it whenever consent changes. Returns cleanup fn. */
export function onConsentChange(callback: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}
