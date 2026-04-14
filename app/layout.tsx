import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

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
import CookieConsent from "@/components/CookieConsent";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const BASE_URL = "https://www.ezeeassist.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EZee Assist — AI-Powered Operational Support for Franchise Brands",
    template: "%s — EZee Assist",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <CookieConsent />
          <AnalyticsProvider />
          <ExitIntentPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
