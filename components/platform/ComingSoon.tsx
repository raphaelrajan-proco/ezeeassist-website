import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Placeholder for a Platform nav item whose page has not been built yet.
 *
 * It exists so the nav never points at a 404. It is deliberately plain
 * and `noindex`: a thin page that ranks is worse than no page. Delete
 * the route entirely when the real page lands, and make sure the nav
 * entry in Navbar.tsx and Footer.tsx points at the new one.
 */
export default function ComingSoon({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="ed-bg w-full">
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-6 py-24 md:px-12 lg:px-16">
        <p
          className="text-xs uppercase mb-5"
          style={{ letterSpacing: "0.2em", fontWeight: 500, color: "var(--ed-accent-text)" }}
        >
          {eyebrow}
        </p>
        <h1
          className="ed-fg leading-[1.06] tracking-[-0.03em]"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 0.6rem + 2.8vw, 3rem)",
            maxWidth: "820px",
          }}
        >
          {title}
        </h1>
        <p className="ed-fg-muted mt-6 max-w-[560px] text-base md:text-lg leading-relaxed">
          {body}
        </p>
        <div className="mt-9">
          <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex ed-btn-primary">
            Speak to an expert
            <span className="ed-btn-arrow-badge" aria-hidden="true">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
