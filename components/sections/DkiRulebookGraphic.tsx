import { BookOpen, CircleCheck, Paperclip } from "lucide-react";

/**
 * DKI hero graphic: 24 program rulebook tiles converging into Ki's
 * guidance card. Ported 1:1 from the design handoff, which authors it
 * at 450 x 300 and scales it with a transform. The wrapper crops it to
 * 256px of authored height and reads its scale from `--g`, which the
 * parent sets per breakpoint.
 *
 * The navy hero is the same in both themes, so every colour here is a
 * literal, never a theme token.
 */

/* [x, y, w, h, rotation, fill, label?]. Each tile rotates about its own
   centre, exactly as authored. */
const TILES: [number, number, number, number, number, string, string?][] = [
  [5.1, 40.99, 45.9, 25.5, -3, "#4D668A", "Fees"],
  [57.37, 37.16, 28.05, 25.5, 4, "#30466A"],
  [91.8, 43.54, 25.5, 22.95, 0, "#7389A6"],
  [123.68, 38.44, 24.23, 25.5, -5, "#34496B"],
  [1.27, 81.79, 25.5, 22.95, 3, "#8B9DB6"],
  [31.87, 76.69, 68.85, 25.5, 2, "#40587C", "Approvals"],
  [107.1, 80.51, 20.4, 25.5, -4, "#30466A"],
  [132.6, 77.96, 17.85, 22.95, 0, "#5E7799"],
  [2.55, 118.76, 20.4, 25.5, -2, "#34496B"],
  [28.05, 121.31, 17.85, 22.95, 5, "#A3B1C5"],
  [51, 117.49, 17.85, 25.5, 0, "#30466A"],
  [73.95, 116.21, 71.4, 25.5, -2, "#4D668A", "Estimating"],
  [1.27, 157.01, 84.15, 25.5, 2, "#40587C", "Documentation"],
  [89.25, 160.84, 17.85, 22.95, -4, "#7389A6"],
  [112.2, 155.74, 17.85, 25.5, 3, "#34496B"],
  [135.15, 159.56, 15.3, 22.95, 0, "#8B9DB6"],
  [6.38, 199.09, 28.05, 25.5, -4, "#5E7799"],
  [40.8, 195.26, 33.15, 25.5, 2, "#30466A"],
  [80.32, 200.36, 25.5, 22.95, 0, "#A3B1C5"],
  [112.2, 196.54, 33.15, 25.5, -3, "#40587C"],
  [0, 238.61, 22.95, 22.95, 0, "#34496B"],
  [29.33, 234.79, 28.05, 25.5, 4, "#7389A6"],
  [63.75, 239.89, 35.7, 22.95, -2, "#30466A"],
  [105.82, 236.06, 20.4, 25.5, 3, "#5E7799"],
];

/* Connector start points, one per row of tiles. */
const LINES: [number, number][] = [
  [147.9, 51.19],
  [150.45, 89.44],
  [145.35, 128.96],
  [150.45, 171.04],
  [145.35, 209.29],
  [126.23, 248.81],
];

const INK = "#13253D";

export default function DkiRulebookGraphic() {
  return (
    <div
      role="img"
      aria-label="Program rulebooks for fees, approvals, estimating and documentation converge into Ki's recommended estimating guidance, grounded in program rules with sources attached."
      className="relative"
      style={{ width: "calc(450px * var(--g))", height: "calc(256px * var(--g))" }}
    >
      <div
        aria-hidden="true"
        className="absolute left-0"
        style={{
          top: "calc(-22px * var(--g))",
          width: 450,
          height: 300,
          transform: "scale(var(--g))",
          transformOrigin: "0 0",
        }}
      >
        <svg width="450" height="300" viewBox="0 0 450 300" fill="none" className="absolute left-0 top-0 overflow-visible">
          {LINES.map(([x, y]) => (
            <path
              key={y}
              d={`M${x} ${y} C${x + 30} ${y} 160 150 176 150`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={1.5}
            />
          ))}
          {TILES.map(([x, y, w, h, r, fill, label]) => {
            const cx = x + w / 2;
            const cy = y + h / 2;
            return (
              <g key={`${x}-${y}`} transform={`rotate(${r} ${cx} ${cy})`}>
                <rect x={x} y={y} width={w} height={h} rx={5} fill={fill} />
                {label && (
                  <text x={cx} y={cy + 3.5} fontSize={10} fontWeight={600} textAnchor="middle" fill="#FFFFFF">
                    {label}
                  </text>
                )}
              </g>
            );
          })}
          <path d="M176 150 H192" stroke="#00AEEF" strokeWidth={3} strokeLinecap="round" />
          <circle cx={176} cy={150} r={4.5} fill="#00AEEF" />
        </svg>

        <div
          className="absolute text-left"
          style={{
            left: 192, top: "50%", transform: "translateY(-50%)", width: 258,
            background: "#FFFFFF", borderRadius: 12, padding: 16,
          }}
        >
          <div className="flex">
            <span
              style={{
                background: "#00AEEF", color: "#0F2035", fontSize: 13, lineHeight: 1.3,
                fontWeight: 700, padding: "3px 9px", borderRadius: 6,
              }}
            >
              Ki
            </span>
          </div>
          <div
            style={{
              marginTop: 9, fontSize: 16, lineHeight: 1.3, fontWeight: 600,
              letterSpacing: "-0.01em", color: INK,
            }}
          >
            Recommended estimating guidance for this job
          </div>
          <div className="flex flex-col" style={{ marginTop: 10, gap: 6 }}>
            {["Applicable fees", "Approval requirements", "Required documentation"].map((t) => (
              <div
                key={t}
                className="flex items-center"
                style={{ gap: 7, fontSize: 14.5, lineHeight: 1.3, fontWeight: 500, color: INK }}
              >
                <CircleCheck size={14} color="#00AEEF" strokeWidth={2.4} className="flex-none" />
                {t}
              </div>
            ))}
          </div>
          <div
            className="flex flex-col"
            style={{ marginTop: 11, paddingTop: 10, borderTop: "1px solid #D5E1EC", gap: 4 }}
          >
            {[
              { t: "Grounded in program rules", Icon: BookOpen },
              { t: "Sources attached", Icon: Paperclip },
            ].map(({ t, Icon }) => (
              <div
                key={t}
                className="flex items-center"
                style={{ gap: 6, fontSize: 13.5, lineHeight: 1.3, fontWeight: 500, color: "#5A6F88" }}
              >
                <Icon size={13} color="#7896B3" strokeWidth={2.2} className="flex-none" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
