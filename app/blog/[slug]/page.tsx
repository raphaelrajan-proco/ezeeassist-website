import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BlogPostContent from "./BlogPostContent";

const BASE_URL = "https://www.ezeeassist.com";

/* ─── Placeholder data (mirrors BlogContent.tsx) ─────────── */

const PLACEHOLDER_POSTS = [
  {
    slug: "how-franchise-brands-cut-support-tickets-by-67-percent",
    title: "How Franchise Brands Cut Support Tickets by 67% with AI",
    author: "Raphael Rajan",
    publishedAt: "2026-03-18T00:00:00Z",
    excerpt:
      "When your franchisees are asking the same questions 50 times a day, the problem isn't your team — it's your infrastructure. Here's how leading brands fixed it.",
    category: "franchise-operations",
    readTime: "6 min read",
    body: [
      { type: "h2", text: "The hidden cost of repetitive questions" },
      {
        type: "p",
        text: "Every franchise support team knows the feeling. It's Tuesday morning, and before 10am your inbox has 14 variations of the same question: \"What are the approved vendors for HVAC?\" Your team answers it — again. This isn't a staffing problem. It's a systems problem.",
      },
      {
        type: "p",
        text: "Our data across 40+ franchise brands shows that the average franchise support team spends 61% of their time answering questions that already exist somewhere in their knowledge base. They're not adding value — they're being a search engine.",
      },
      { type: "h2", text: "Why traditional approaches fail" },
      {
        type: "p",
        text: "Most brands have tried to solve this. They build an intranet. They create a FAQ page. They record training videos. These are good instincts — but they miss the core problem: franchisees don't go looking for answers. They go looking for people.",
      },
      {
        type: "p",
        text: "The fix isn't more documentation. It's delivering the right documentation at the moment of need, through the channels franchisees are already using.",
      },
      { type: "h2", text: "What 67% deflection actually looks like" },
      {
        type: "p",
        text: "One of our customers — a 200-location QSR brand — was fielding over 800 support requests per month. Six weeks after deploying EZee Assist, that number dropped to 264. The questions that remained were genuinely complex edge cases that required human judgment. Everything else was handled automatically.",
      },
      {
        type: "p",
        text: "Their support team didn't shrink — they got reallocated to higher-value work: proactive training, strategic rollouts, and new franchisee onboarding. The ROI wasn't just cost savings. It was capability expansion.",
      },
    ],
  },
  {
    slug: "why-generic-ai-fails-franchise-networks",
    title: "Why Generic AI Fails Franchise Networks (And What Actually Works)",
    author: "Shray Mehra",
    publishedAt: "2026-03-04T00:00:00Z",
    excerpt:
      "ChatGPT doesn't know your vendor approval policy. It doesn't know your regional SOPs or your brand's escalation rules. Here's why that gap matters.",
    category: "ai-technology",
    readTime: "8 min read",
    body: [
      { type: "h2", text: "The promise vs. the reality" },
      {
        type: "p",
        text: "Every franchise operator has experimented with general-purpose AI. You drop a question into ChatGPT, get a plausible-sounding answer, and think: \"This could work.\" Then a franchisee asks about your approved vendor list and the AI makes one up.",
      },
      {
        type: "p",
        text: "That's the hallucination problem — and it's existential for franchise support. Brands run on consistency. When AI gives a franchisee incorrect guidance about food safety protocols or marketing spend requirements, the consequences aren't just embarrassing. They're brand-damaging and potentially liability-creating.",
      },
      { type: "h2", text: "What makes franchise AI different" },
      {
        type: "p",
        text: "The solution isn't better prompting. It's grounding. Answers need to come from your content — your operations manuals, your vendor lists, your training videos — not from the AI's training data. Every answer should be traceable to a specific source your team approved.",
      },
      {
        type: "p",
        text: "This is why we built EZee Assist with retrieval-augmented generation (RAG) at its core. The AI doesn't guess. It retrieves. And it tells the franchisee exactly which document the answer came from.",
      },
    ],
  },
  {
    slug: "onboarding-new-franchisees-without-burning-out-your-team",
    title: "Onboarding New Franchisees Without Burning Out Your Team",
    author: "Gabe Cadamuro",
    publishedAt: "2026-02-19T00:00:00Z",
    excerpt:
      "The first 90 days are when franchisees need the most support — and when your team is stretched thinnest. Here's a smarter way to handle it.",
    category: "franchise-operations",
    readTime: "5 min read",
    body: [
      { type: "h2", text: "The onboarding paradox" },
      {
        type: "p",
        text: "New franchisees need the most help at the moment when your team has the least capacity to give it. Opening day, pre-launch week, the first month of operations — these are peak support demand periods that coincide with your team already being stretched by the logistics of a new location.",
      },
      {
        type: "p",
        text: "The result is a predictable failure pattern: support queues grow, new franchisees feel unsupported, your team feels overwhelmed, and the brand relationship starts on a rocky footing before the first customer walks through the door.",
      },
      { type: "h2", text: "Self-service from day one" },
      {
        type: "p",
        text: "The brands that onboard most effectively have one thing in common: they make it easy for new franchisees to help themselves. Not by pointing them at a 200-page manual — but by giving them a single place to ask any question and get an instant, accurate answer.",
      },
      {
        type: "p",
        text: "When new franchisees can get answers at 11pm the night before opening without calling anyone, two things happen. They feel more confident. And your team sleeps better.",
      },
    ],
  },
];

/* ─── Static params ─────────────────────────────────────── */

export async function generateStaticParams() {
  return PLACEHOLDER_POSTS.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ──────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = PLACEHOLDER_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author], images: ["/og-image.png"] },
  };
}

/* ─── Page ──────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = PLACEHOLDER_POSTS.find((p) => p.slug === slug);
  const post = found
    ? {
        ...found,
        body: found.body.map((b) => ({
          ...b,
          type: b.type as "h2" | "h3" | "p",
        })),
      }
    : null;

  // Article JSON-LD
  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: "EZee Assist",
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/logo.svg`,
          },
        },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/blog/${slug}`,
        },
      }
    : null;

  return (
    <>
      {articleSchema && <JsonLd data={articleSchema} />}
      <Navbar />
      <main className="flex flex-1 flex-col">
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  );
}
