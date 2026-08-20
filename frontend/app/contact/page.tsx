import type { Metadata } from "next";
import SiteHeader from "@/components/header/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact: Scale12x",
  description:
    "Start a growth conversation with Scale12x. Tell us what you’re building and we’ll come back with the right next step.",
  openGraph: {
    title: "Contact: Scale12x",
    description:
      "Start a growth conversation with Scale12x. Tell us what you’re building and we’ll come back with the right next step.",
    type: "website",
    url: "https://scale12x.com/contact",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="contact-route">
      <SiteHeader />
      <main className="flex min-h-full flex-1 flex-col">
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
