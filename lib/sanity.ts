import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
// SanityImageSource is re-exported from the root of @sanity/image-url
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* ─── Types ─────────────────────────────────────────────── */

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  mainImage?: SanityImageSource;
  body?: Block[];
}

export interface Block {
  _type: string;
  _key: string;
  style?: string;
  children?: Span[];
  markDefs?: unknown[];
}

export interface Span {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

/* ─── Queries ────────────────────────────────────────────── */

export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    category,
    mainImage
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author,
    publishedAt,
    excerpt,
    category,
    mainImage,
    body
  }
`;

export const ALL_SLUGS_QUERY = `
  *[_type == "post"] { "slug": slug.current }
`;
