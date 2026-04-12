import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — EZee Assist",
  description: "EZee Assist privacy policy — how we collect, use, and protect your data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly to us, such as when you fill out a contact form, book a demo, or communicate with us. This may include your name, email address, phone number, company name, and job title.

We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. We use cookies and similar tracking technologies to collect this information.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use the information we collect to:
• Respond to your inquiries and provide customer support
• Send you information about our products and services
• Schedule and conduct product demonstrations
• Improve and optimize our website and services
• Comply with legal obligations
• Analyze website traffic and usage patterns`,
  },
  {
    title: "3. Cookies",
    body: `We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.

We use the following types of cookies:
• Essential cookies: Required for the website to function properly
• Analytics cookies: Help us understand how visitors interact with our website
• Marketing cookies: Used to track visitors across websites for advertising purposes`,
  },
  {
    title: "4. Information Sharing",
    body: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, subject to those parties agreeing to keep this information confidential.

We may also disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.`,
  },
  {
    title: "5. Data Retention",
    body: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.`,
  },
  {
    title: "6. Your Rights",
    body: `Depending on your location, you may have certain rights regarding your personal information, including:
• The right to access the personal information we hold about you
• The right to request correction of inaccurate information
• The right to request deletion of your personal information
• The right to opt out of marketing communications
• The right to data portability

To exercise any of these rights, please contact us at privacy@ezeeassist.com.`,
  },
  {
    title: "7. Data Security",
    body: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "8. Third-Party Services",
    body: `Our website may contain links to third-party websites or integrate third-party services (such as HubSpot for chat and scheduling). This privacy policy does not apply to those third-party services, and we encourage you to review their privacy policies. We are not responsible for the privacy practices of third-party services.`,
  },
  {
    title: "9. Children's Privacy",
    body: `Our website and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us and we will take steps to delete such information.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the effective date. We encourage you to review this policy periodically for any changes.`,
  },
  {
    title: "11. Contact Us",
    body: `If you have any questions about this privacy policy or our privacy practices, please contact us at:

EZee Assist
Email: privacy@ezeeassist.com
Phone: +1 (855) 777-3933`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative w-full border-b border-[#E5E7EB] dark:border-white/[0.06] bg-hero-gradient">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              Legal
            </p>
            <h1
              className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Privacy Policy
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              Effective date: April 10, 2026
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="w-full bg-white dark:bg-[#0D0D0D]">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-12">
              EZee Assist (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at{" "}
              <span className="font-semibold text-[#0A0A0A] dark:text-[#F0F0F0]">ezeeassist.com</span>.
            </p>

            <div className="space-y-10">
              {sections.map(({ title, body }) => (
                <div key={title}>
                  <h2
                    className="text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-4"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {title}
                  </h2>
                  <div className="text-base leading-8 text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
