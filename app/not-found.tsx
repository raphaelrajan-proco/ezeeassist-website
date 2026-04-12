import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center bg-white dark:bg-[#0D0D0D]">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">404</p>
        <h1
          className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          Page not found.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button size="lg">Go to Homepage</Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="secondary">Contact Us</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
