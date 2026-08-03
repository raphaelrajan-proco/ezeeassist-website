/**
 * The closing band's base colour, shared by the closing section, the
 * booking page and the editorial footer: each one's bottom fade resolves
 * to exactly this, so no seam appears between them.
 *
 * It lives in its own plain module rather than in FinalCTA because the
 * booking page is a server component. Importing a constant from a
 * "use client" module gives a server component a client reference, not
 * the string, and the gradient it lands in silently computes to none.
 */
export const CLOSING_BASE = "#042036";
