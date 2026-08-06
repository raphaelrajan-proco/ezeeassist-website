"use client";

import Image from "next/image";
import { INTEGRATION_STRIP } from "@/lib/data/integrations";
import { vendorLogo } from "@/lib/data/integration-logos";

/**
 * The integrations strip: real vendor marks beside their names, scrolling.
 *
 * One component for every placement (Reporting, Answers, and anywhere it
 * is added next), so the strip reads as one object rather than as three
 * takes on it. Same `.ig-strip` scroll and chip proportions as the
 * Integrations page.
 *
 * Marks are committed files under `public/logos/integrations/`, resolved
 * by the domain each strip entry carries. **Never hotlinked**, and never
 * from a favicon service at runtime.
 *
 * `vendorLogo` returns null for the four that resolved to a parent brand
 * rather than the product (SharePoint, OneDrive, Teams, Google Drive all
 * came back as the same Microsoft or Google mark). Those chips render the
 * name alone rather than a misleading logo, and keep their place in the
 * scroll either way.
 *
 * Decorative: the full directory lives on the Integrations page, which
 * the caller links to, so the strip is `aria-hidden`.
 */
export default function IntegrationMarquee() {
  return (
    <div
      className="ig-strip relative flex gap-2.5 overflow-hidden py-1"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="ig-strip-run flex flex-none gap-2.5">
          {INTEGRATION_STRIP.map(({ name, domain }) => {
            const mark = vendorLogo(domain);
            return (
              <span
                key={`${copy}-${name}`}
                className="ed-card-alt ed-border ed-fg-muted inline-flex flex-none items-center gap-2 whitespace-nowrap rounded-md border px-2.5 py-1"
                style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.3 }}
              >
                {mark && (
                  <Image
                    src={mark.src}
                    alt=""
                    width={15}
                    height={15}
                    className="flex-none rounded-[3px] object-contain"
                    style={{ width: 15, height: 15 }}
                  />
                )}
                {name}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
