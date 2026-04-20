import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import ThemeProvider from "@/components/ThemeProvider";
import ProgressBar from "@/components/ProgressBar";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const BASE_URL = "https://www.ezeeassist.com";

// ── Organization JSON-LD (site-wide) ───────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EZee Assist",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description:
    "AI-powered operational support platform for franchise and multi-location brands. Instant, accurate answers from your brand's own knowledge — 24/7.",
  foundingDate: "2023",
  founders: [
    { "@type": "Person", name: "Raphael Rajan", jobTitle: "Co-founder & CEO" },
    { "@type": "Person", name: "Gabe Cadamuro",  jobTitle: "Co-founder & CTO" },
    { "@type": "Person", name: "Shray Mehra",    jobTitle: "Co-founder & COO" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "325 Front Street West, 4th Floor",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5V 3S9",
    addressCountry: "CA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-855-777-3933",
    email: "sales@ezeeassist.com",
    contactType: "sales",
  },
  sameAs: [
    "https://www.linkedin.com/company/ez-assist",
    "https://twitter.com/ezeeassist",
    "https://www.facebook.com/ezeeassist",
  ],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 12 },
  industry: "Business/Productivity Software",
  keywords: [
    "franchise support",
    "AI support platform",
    "franchise operations",
    "multi-location support",
    "franchisee knowledge base",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EZee Assist — AI-Powered Operational Support for Franchise Brands",
    template: "%s | EZee Assist",
  },
  description:
    "EZee Assist is an AI-powered operational support platform built for franchise and multi-location brands. Reduce support volume, answer franchisee questions instantly, and surface insights — all in one platform.",
  openGraph: {
    type: "website",
    siteName: "EZee Assist",
    url: BASE_URL,
    title: "EZee Assist — AI-Powered Operational Support for Franchise Brands",
    description:
      "Reduce support volume, answer franchisee questions instantly, and surface insights — all in one platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EZee Assist — AI-Powered Operational Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EZee Assist — AI-Powered Operational Support for Franchise Brands",
    description:
      "Reduce support volume, answer franchisee questions instantly, and surface insights — all in one platform.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          {children}
          <CookieConsent />
          <AnalyticsProvider />
          <ExitIntentPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
