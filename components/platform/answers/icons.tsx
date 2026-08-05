/**
 * Inline icons for the Answers page.
 *
 * All decorative: every one sits beside its own text label, so they carry
 * `aria-hidden` and never an accessible name. Stroke is `currentColor` at
 * 1.8, so a caller sets the hue by setting `color` and nothing here
 * hardcodes a palette.
 *
 * Copied from the design handoff verbatim, coordinates included. Do not
 * substitute an icon font or a vendor's brand logo: these are drawn in
 * one weight so nine channel tiles read as one set rather than nine
 * borrowed marks.
 */

type P = { size?: number };

const wrap = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  "aria-hidden": true as const,
});

export function DocIcon({ size = 16 }: P) {
  return (
    <svg {...wrap(size)} strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
    </svg>
  );
}

export function MailIcon({ size = 16 }: P) {
  return (
    <svg {...wrap(size)} strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function PlayIcon({ size = 16 }: P) {
  return (
    <svg {...wrap(size)} strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5z" />
    </svg>
  );
}

export function MicIcon({ size = 16 }: P) {
  return (
    <svg {...wrap(size)} strokeLinecap="round">
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M5 11a7 7 0 0014 0" />
      <path d="M12 18v3" />
    </svg>
  );
}

export function GlobeIcon({ size = 16 }: P) {
  return (
    <svg {...wrap(size)} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3.5 3 14.5 0 18" />
      <path d="M12 3c-3 3.5-3 14.5 0 18" />
    </svg>
  );
}

export function SearchIcon({ size = 17 }: P) {
  return (
    <svg {...wrap(size)} strokeWidth={2.2} strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function ChevronDown({ size = 14 }: P) {
  return (
    <svg width={size} height={9} viewBox="0 0 14 9" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
      <path d="M1 1l6 6 6-6" />
    </svg>
  );
}

export function AlertIcon({ size = 15 }: P) {
  return (
    <svg {...wrap(size)} strokeLinecap="round">
      <path d="M12 5v9" />
      <circle cx="12" cy="18.5" r=".5" fill="currentColor" />
    </svg>
  );
}

/* ── Role avatars ── */

export function PersonIcon({ size = 18 }: P) {
  return (
    <svg {...wrap(size)} strokeLinecap="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  );
}

export function PeopleIcon({ size = 18 }: P) {
  return (
    <svg {...wrap(size)} strokeLinecap="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M4 19c0-3 2.4-5 5-5s5 2 5 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 19c.3-2.3 1.8-3.8 3.5-3.8 1 0 1.9.5 2.5 1.3" />
    </svg>
  );
}

/* ── Channel tiles ── */

export function SmsIcon({ size = 15 }: P) {
  return (
    <svg {...wrap(size)} strokeLinejoin="round">
      <path d="M4 5h16v11H9l-5 4z" />
    </svg>
  );
}

export function SlackIcon({ size = 15 }: P) {
  return (
    <svg {...wrap(size)} strokeLinecap="round">
      <path d="M9 4L7.5 20" />
      <path d="M16.5 4L15 20" />
      <path d="M4 9h17" />
      <path d="M3 15h17" />
    </svg>
  );
}

export function ChatIcon({ size = 15 }: P) {
  return (
    <svg {...wrap(size)} strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="13" rx="3" />
      <path d="M8 17v4l4-4" />
    </svg>
  );
}

export function MobileIcon({ size = 15 }: P) {
  return (
    <svg {...wrap(size)} strokeLinecap="round">
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M11 17.5h2" />
    </svg>
  );
}

export function GridIcon({ size = 15 }: P) {
  return (
    <svg {...wrap(size)} strokeLinejoin="round">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function MegaphoneIcon({ size = 15 }: P) {
  return (
    <svg {...wrap(size)} strokeLinejoin="round">
      <path d="M3 11v3l12 4V7L3 11z" />
      <path d="M15 8.5a5 5 0 010 7" />
      <path d="M7 15v4h3" />
    </svg>
  );
}
