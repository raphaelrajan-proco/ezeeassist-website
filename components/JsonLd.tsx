/**
 * Injects a JSON-LD structured data block into the page <head>.
 * Validate output at https://search.google.com/test/rich-results
 * and https://validator.schema.org
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default JsonLd;
