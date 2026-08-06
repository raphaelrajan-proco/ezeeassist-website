import type { LegalBlock } from "@/lib/data/legal-privacy";

/**
 * Renders a legal document from its extracted blocks.
 *
 * **It adds nothing.** No intro paragraph, no reworded headings, no
 * effective date of its own: the source page carries its own date as the
 * first block, and anything written here would be a second, conflicting
 * version of a legal document.
 *
 * Consecutive `li` blocks are grouped into one `<ul>`, so a list reads as
 * a list rather than as a run of paragraphs with bullets drawn on.
 */
export default function LegalBody({ blocks }: { blocks: LegalBlock[] }) {
  const out: React.ReactNode[] = [];
  let bullets: { key: number; text: string }[] = [];

  const flush = () => {
    if (!bullets.length) return;
    out.push(
      <ul
        key={`ul-${bullets[0].key}`}
        className="my-4 list-disc space-y-2 pl-6 text-base leading-8 text-gray-600 dark:text-gray-400"
      >
        {bullets.map((b) => (
          <li key={b.key}>{b.text}</li>
        ))}
      </ul>
    );
    bullets = [];
  };

  blocks.forEach((b, i) => {
    if (b.t === "li") {
      bullets.push({ key: i, text: b.s });
      return;
    }
    flush();
    if (b.t === "h4") {
      out.push(
        <h2
          key={i}
          className="mt-10 mb-4 text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0]"
          style={{ letterSpacing: "-0.01em" }}
        >
          {b.s}
        </h2>
      );
    } else {
      out.push(
        <p key={i} className="mb-4 text-base leading-8 text-gray-600 dark:text-gray-400">
          {b.s}
        </p>
      );
    }
  });
  flush();

  return <>{out}</>;
}
