/**
 * Control Center glyphs, copied verbatim from the design handoff.
 *
 * These are custom, built from the EZee Assist mark's own primitives: the
 * flat-top hexagon, the circle, and the rounded capsule. They are
 * deliberately not a generic icon set.
 *
 * **Do not substitute Lucide or Heroicons equivalents, do not redraw
 * them, and do not let an icon library get swapped in during cleanup.**
 * A previous handoff lost its logos exactly that way. If these ever need
 * to move, they stay inline SVG in a file like this one, never routed
 * through an icon library.
 *
 * Every path inherits `--cc-glyph` so the set re-tints with the theme.
 * No hardcoded hex belongs inside these SVGs.
 *
 * What each one says, so nobody improves one into meaninglessness:
 *   policies    one filled hexagon (the rule set) branching into three
 *               capsules (the locations it lands on). Set once, applied
 *               everywhere.
 *   permissions three concentric hexagons at descending scale with the
 *               innermost filled, plus two loose dots. Nested scopes.
 *   humanLoop   a filled circle (the person) and an outlined hexagon
 *               (the action), with a capsule gate and a dashed line
 *               between. The action does not proceed past the gate.
 *   activityLog three hexagon markers down the left with capsules
 *               beside them, the middle filled, dashed connectors. A
 *               sequential record.
 *   security    a filled core hexagon ringed by six small hexagons,
 *               alternating filled and outlined. A closed lattice.
 */

const SHARED = {
  width: 76,
  height: 76,
  viewBox: "0 0 76 76",
  fill: "none",
  stroke: "var(--cc-glyph)",
  strokeWidth: 1.6,
  "aria-hidden": true,
} as const;

const FILL = { fill: "var(--cc-glyph)", stroke: "none" } as const;

export function IconPolicies() {
  return (
    <svg {...SHARED}>
      <polygon points="25.5 28.47 14.5 28.47 9 38 14.5 47.53 25.5 47.53 31 38" {...FILL} />
      <rect x="40" y="19" width="28" height="9" rx="4.5" />
      <rect x="40" y="33.5" width="22" height="9" rx="4.5" />
      <rect x="40" y="48" width="28" height="9" rx="4.5" />
      <path d="M31 38h6M37 38v-14.5h3M37 38v14.5h3M37 38h3" />
    </svg>
  );
}

export function IconPermissions() {
  return (
    <svg {...SHARED}>
      <polygon points="48 20.68 28 20.68 18 38 28 55.32 48 55.32 58 38" fill="none" />
      <polygon points="44.5 26.74 31.5 26.74 25 38 31.5 49.26 44.5 49.26 51 38" fill="none" />
      <polygon points="41 32.8 35 32.8 32 38 35 43.2 41 43.2 44 38" {...FILL} />
      <circle cx="63" cy="16" r="4" {...FILL} />
      <circle cx="13" cy="60" r="4" {...FILL} />
    </svg>
  );
}

export function IconHumanLoop() {
  return (
    <svg {...SHARED}>
      <circle cx="15" cy="38" r="7.5" {...FILL} />
      <polygon points="66.5 28.47 55.5 28.47 50 38 55.5 47.53 66.5 47.53 72 38" fill="none" />
      <rect x="27.5" y="33.5" width="10" height="9" rx="4.5" {...FILL} />
      <path d="M42 38h6" />
      <path d="M38.5 24v28" strokeDasharray="3 4" />
    </svg>
  );
}

export function IconActivityLog() {
  return (
    <svg {...SHARED}>
      <polygon points="17.25 10.37 10.75 10.37 7.5 16 10.75 21.63 17.25 21.63 20.5 16" fill="none" />
      <polygon points="17.25 32.37 10.75 32.37 7.5 38 10.75 43.63 17.25 43.63 20.5 38" {...FILL} />
      <polygon points="17.25 54.37 10.75 54.37 7.5 60 10.75 65.63 17.25 65.63 20.5 60" fill="none" />
      <rect x="27" y="11.5" width="40" height="9" rx="4.5" />
      <rect x="27" y="33.5" width="31" height="9" rx="4.5" />
      <rect x="27" y="55.5" width="40" height="9" rx="4.5" />
      <path d="M14 22.5v9M14 44.5v9" strokeDasharray="2.5 3.5" />
    </svg>
  );
}

export function IconSecurity() {
  return (
    <svg {...SHARED}>
      <polygon points="43 29.34 33 29.34 28 38 33 46.66 43 46.66 48 38" {...FILL} />
      <polygon points="64.75 33.24 59.25 33.24 56.5 38 59.25 42.76 64.75 42.76 67.5 38" {...FILL} />
      <polygon points="52.75 54.02 47.25 54.02 44.5 58.78 47.25 63.55 52.75 63.55 55.5 58.78" fill="none" />
      <polygon points="28.75 54.02 23.25 54.02 20.5 58.78 23.25 63.55 28.75 63.55 31.5 58.78" {...FILL} />
      <polygon points="16.75 33.24 11.25 33.24 8.5 38 11.25 42.76 16.75 42.76 19.5 38" fill="none" />
      <polygon points="28.75 12.45 23.25 12.45 20.5 17.22 23.25 21.98 28.75 21.98 31.5 17.22" {...FILL} />
      <polygon points="52.75 12.45 47.25 12.45 44.5 17.22 47.25 21.98 52.75 21.98 55.5 17.22" fill="none" />
    </svg>
  );
}
