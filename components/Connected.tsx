"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  Search, MessageSquare, MessageCircle, Hash, Users, MessagesSquare,
  Mail, Globe, Smartphone, Plus, type LucideIcon,
} from "lucide-react";
import { MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE } from "@/components/growth/shared";

/**
 * Connections. Dark section between The Shift and the reveal: the
 * rolling integration browser (deck roster, franchise-native first)
 * and the channel grid carried over from the old integrations
 * section. Continuous dark block with TheSystem below it.
 */

const FG = "#F5F5F5";
const MUTED = "#A1A1AA";
const BLUE = "#00AEEF";
const DARK_CARD = "#141414";
const DARK_RULE = "#2A2A2A";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Roster (sales deck), franchise-native systems first ── */

type Row = {
  name: string;
  cat: string;
  color: string;
  /** Light tile colors get a dark letter for contrast. */
  darkLetter?: boolean;
  connected?: boolean;
};

const ROWS: Row[] = [
  // ERP and FMS
  { name: "Mindbody",         cat: "ERP & FMS",     color: "#F9423A", connected: true },
  { name: "ServiceTitan",     cat: "ERP & FMS",     color: "#F05A28", connected: true },
  { name: "FranConnect",      cat: "ERP & FMS",     color: "#0072CE", connected: true },
  { name: "Zenoti",           cat: "ERP & FMS",     color: "#7C3AED" },
  { name: "Thryv",            cat: "ERP & FMS",     color: "#FF6600" },
  // POS
  { name: "Toast",            cat: "POS",           color: "#FF4C00", connected: true },
  { name: "Square",           cat: "POS",           color: "#3E4348" },
  { name: "Lightspeed",       cat: "POS",           color: "#E8442D" },
  { name: "TouchBistro",      cat: "POS",           color: "#C8102E" },
  // CRM
  { name: "Salesforce",       cat: "CRM",           color: "#00A1E0", connected: true },
  { name: "HubSpot",          cat: "CRM",           color: "#FF7A59" },
  { name: "Airtable",         cat: "CRM",           color: "#2D7FF9" },
  { name: "HighLevel",        cat: "CRM",           color: "#188BF6" },
  { name: "monday.com",       cat: "CRM",           color: "#FF3D57" },
  // Accounting
  { name: "QuickBooks",       cat: "Accounting",    color: "#2CA01C", connected: true },
  { name: "Xero",             cat: "Accounting",    color: "#13B5EA" },
  { name: "Stripe",           cat: "Accounting",    color: "#635BFF" },
  { name: "Qvinci",           cat: "Accounting",    color: "#0E7490" },
  { name: "ProfitKeeper",     cat: "Accounting",    color: "#15803D" },
  // Drives
  { name: "Google Drive",     cat: "Drives",        color: "#34A853", connected: true },
  { name: "OneDrive",         cat: "Drives",        color: "#0078D4" },
  { name: "SharePoint",       cat: "Drives",        color: "#036C70", connected: true },
  { name: "Dropbox",          cat: "Drives",        color: "#0061FF" },
  { name: "Box",              cat: "Drives",        color: "#0061D5" },
  { name: "Notion",           cat: "Drives",        color: "#191919" },
  { name: "Amazon S3",        cat: "Drives",        color: "#E25444" },
  { name: "WordPress",        cat: "Drives",        color: "#21759B" },
  // Learning
  { name: "Docebo",           cat: "Learning",      color: "#0AB4FF", connected: true },
  { name: "TalentLMS",        cat: "Learning",      color: "#1B87E6" },
  { name: "Scribe",           cat: "Learning",      color: "#625DF5" },
  { name: "Frontify",         cat: "Learning",      color: "#2D5BFF" },
  { name: "LearningZen",      cat: "Learning",      color: "#188038" },
  // Video and comms
  { name: "Slack",            cat: "Video & comms", color: "#611F69", connected: true },
  { name: "Teams",            cat: "Video & comms", color: "#6264A7", connected: true },
  { name: "Zoom",             cat: "Video & comms", color: "#2D8CFF" },
  { name: "Loom",             cat: "Video & comms", color: "#625DF5" },
  { name: "Vimeo",            cat: "Video & comms", color: "#1AB7EA" },
  { name: "YouTube",          cat: "Video & comms", color: "#FF0000" },
  { name: "Fireflies",        cat: "Video & comms", color: "#6D28D9" },
  // Marketing
  { name: "Mailchimp",        cat: "Marketing",     color: "#FFE01B", darkLetter: true, connected: true },
  { name: "ActiveCampaign",   cat: "Marketing",     color: "#356AE6" },
  { name: "Constant Contact", cat: "Marketing",     color: "#1856ED" },
  { name: "Canva",            cat: "Marketing",     color: "#8B3DFF" },
  { name: "MediaValet",       cat: "Marketing",     color: "#0AB4FF" },
];

/* Fixed geometry: the loop travels exactly one list-length. */
const ROW_H = 48;
const LIST_H = ROWS.length * ROW_H; // 2112
const WINDOW_H = 340;
const LOOP_S = 70;

/** Seconds after cycle start at which row i enters the window's bottom edge. */
function enterTime(i: number): number {
  return Math.max(0, (i * ROW_H - WINDOW_H) / LIST_H) * LOOP_S;
}

function IntegrationRow({ row, index, animatePills }: { row: Row; index: number; animatePills: boolean }) {
  const initiallyVisible = index * ROW_H < WINDOW_H;
  const animatePill = animatePills && !initiallyVisible;
  return (
    <div
      className="flex items-center justify-between gap-3 px-4 h-12"
      style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}
    >
      <span className="flex items-center gap-2.5 min-w-0">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md text-[11px] flex-shrink-0"
          style={{ backgroundColor: row.color, color: row.darkLetter ? "#18181B" : "#FFFFFF", fontWeight: 600 }}
        >
          {row.name[0]}
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] truncate" style={{ color: MOCK_TEXT, fontWeight: 500, lineHeight: 1.2 }}>
            {row.name}
          </span>
          <span className="block text-[10px] truncate" style={{ color: MOCK_MUTED, lineHeight: 1.2 }}>
            {row.cat}
          </span>
        </span>
      </span>
      {row.connected && (
        <span
          className={animatePill ? "ed-conn-pill-anim rounded-full px-2 py-0.5 text-[9.5px] flex-shrink-0" : "rounded-full px-2 py-0.5 text-[9.5px] flex-shrink-0"}
          style={{
            backgroundColor: "rgba(22,163,74,0.12)",
            color: "#15803D",
            fontWeight: 600,
            ...(animatePill
              ? {
                  animationName: "ed-conn-pill",
                  animationDuration: `${LOOP_S}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationFillMode: "both",
                  animationDelay: `${(enterTime(index) + 0.8).toFixed(2)}s`,
                }
              : {}),
          }}
        >
          Connected
        </span>
      )}
    </div>
  );
}

function IntegrationBrowser() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div ref={ref} className={inView ? "" : "ed-conn-paused"}>
      <p className="sr-only">
        Integration browser listing 250 plus systems EZee connects to,
        franchise-native first: Mindbody, ServiceTitan, FranConnect,
        Zenoti, Thryv, Toast, Square, Lightspeed, TouchBistro,
        Salesforce, HubSpot, Airtable, HighLevel, monday.com,
        QuickBooks, Xero, Stripe, Qvinci, ProfitKeeper, Google Drive,
        OneDrive, SharePoint, Dropbox, Box, Notion, Amazon S3,
        WordPress, Docebo, TalentLMS, Scribe, Frontify, LearningZen,
        Slack, Teams, Zoom, Loom, Vimeo, YouTube, Fireflies, Mailchimp,
        ActiveCampaign, Constant Contact, Canva, MediaValet, and 242
        more.
      </p>
      <div
        aria-hidden="true"
        className="rounded-xl overflow-hidden mx-auto w-full max-w-[400px]"
        style={MOCK_SURFACE}
      >
        {/* Search header */}
        <div className="px-4 pt-4 pb-3" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "rgba(10,10,10,0.045)" }}>
            <Search aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} style={{ color: MOCK_MUTED }} />
            <span className="text-[12px]" style={{ color: MOCK_MUTED }}>
              Search 250+ integrations
            </span>
          </div>
        </div>

        {/* Rolling window: fixed height, fades top and bottom */}
        <div
          className="overflow-hidden"
          style={{
            height: `${WINDOW_H}px`,
            maskImage: "linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 32px, black calc(100% - 32px), transparent)",
          }}
        >
          <div
            className="ed-conn-track"
            style={{
              ["--roll-dist" as string]: `${LIST_H}px`,
              animationName: reduceMotion ? undefined : "ed-conn-roll",
              animationDuration: `${LOOP_S}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            {ROWS.map((r, i) => (
              <IntegrationRow key={r.name} row={r} index={i} animatePills={!reduceMotion} />
            ))}
            {/* Second copy for the seamless loop; pills rest in the
                connected state on the second pass. */}
            {!reduceMotion && ROWS.map((r) => (
              <IntegrationRow key={`${r.name}-b`} row={r} index={-1} animatePills={false} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 text-center" style={{ borderTop: `1px solid ${MOCK_HAIRLINE}` }}>
          <span className="text-[12px]" style={{ color: BLUE, fontWeight: 600 }}>
            +242 more
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Beat two: channels (carried over from the old section) ── */

const CHANNELS: { label: string; icon: LucideIcon; extensible?: boolean }[] = [
  { label: "SMS",           icon: MessageSquare },
  { label: "WhatsApp",      icon: MessageCircle },
  { label: "Slack",         icon: Hash },
  { label: "Teams",         icon: Users },
  { label: "Google Chat",   icon: MessagesSquare },
  { label: "Email",         icon: Mail },
  { label: "Web portal",    icon: Globe },
  { label: "Mobile app",    icon: Smartphone },
  { label: "Anywhere else", icon: Plus, extensible: true },
];

function ChannelGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {CHANNELS.map(({ label, icon: Icon, extensible }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
          className="flex items-center gap-2.5 rounded-xl px-4 py-3.5"
          style={{
            backgroundColor: extensible ? "transparent" : DARK_CARD,
            border: extensible ? "1.5px solid rgba(0,174,239,0.55)" : `1px solid ${DARK_RULE}`,
          }}
        >
          <Icon
            aria-hidden="true"
            className="w-5 h-5 flex-shrink-0"
            strokeWidth={1.75}
            style={{ color: BLUE }}
          />
          <span className="text-sm" style={{ color: extensible ? BLUE : FG, fontWeight: 500 }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function Connected() {
  return (
    <section id="connections" className="w-full scroll-mt-24" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-28 lg:pt-36 pb-14 lg:pb-16">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-3xl mb-14 md:mb-16"
        >
          <p className="flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] mb-8" style={{ color: BLUE, fontWeight: 500 }}>
            <span aria-hidden="true" className="block h-2 w-2 flex-shrink-0" style={{ backgroundColor: BLUE }} />
            Connections
          </p>
          <h2
            className="text-4xl md:text-5xl leading-[1.05] tracking-[-0.03em]"
            style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 500, textWrap: "balance" }}
          >
            It connects directly into everything you already run on.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
            EZee connects at the source across scheduling, POS, CRM,
            accounting, drives, learning, marketing, and comms. It reads
            from those systems and writes back to them, so answers are
            current, actions land where the work happens, agents run
            against live data, and apps ship with the right context.
            Nothing migrates and your data stays where it lives.
          </p>
        </motion.div>

        {/* Two beats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">
          {/* Beat one: the rolling browser on its dark panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: DARK_CARD, border: `1px solid ${DARK_RULE}` }}>
              <IntegrationBrowser />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["No need to move data", "Always up to date", "Guardrailed to your brand"].map((q) => (
                <span
                  key={q}
                  className="rounded-full px-3 py-1.5 text-[12.5px]"
                  style={{ backgroundColor: DARK_CARD, border: `1px solid ${DARK_RULE}`, color: MUTED, fontWeight: 600 }}
                >
                  {q}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Beat two: channels */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: BLUE, fontWeight: 600 }}>
              Every channel
            </p>
            <p
              className="text-2xl md:text-3xl tracking-[-0.02em] mb-8 max-w-md"
              style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.15 }}
            >
              Deployed in the channels your teams already work in
            </p>
            <ChannelGrid />
            <p className="mt-8 text-sm md:text-base max-w-md leading-relaxed" style={{ color: MUTED }}>
              Embedded in your tools and workflows. One platform, every surface.
            </p>
          </div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 text-base md:text-lg leading-relaxed max-w-3xl"
          style={{ color: MUTED }}
        >
          Every system connected, every action governed, all of it managed
          in one place.
        </motion.p>
      </div>
    </section>
  );
}
