import Link from "next/link";
import JsonLd from "./JsonLd";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

const BASE_URL = "https://www.ezeeassist.com";

/**
 * Renders visible breadcrumb navigation + injects BreadcrumbList JSON-LD.
 * Place at the top of nested page <main> sections.
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { name: "Platform", href: "/platform" },
 *     { name: "AI Agent", href: "/platform/ai-agent" },
 *   ]} />
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span className="font-semibold text-[#00AEEF]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[#00AEEF] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}

export default Breadcrumb;
