import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/header/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import ServicesHero from "@/components/services/hero/ServicesHero";
import ServicesGallery from "@/components/services/gallery/ServicesGallery";
import ServicesProcess from "@/components/services/process/ServicesProcess";

const ProofSection = dynamic(() => import("@/components/proof/ProofSection"));

export const metadata: Metadata = {
  title: "Services: Scale12x",
  description:
    "One system. Every growth lever. Strategy, creative, technology and AI, connected into one operating model.",
  openGraph: {
    title: "Services: Scale12x",
    description:
      "One system. Every growth lever. Strategy, creative, technology and AI, connected into one operating model.",
    type: "website",
    url: "https://scale12x.com/services",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-full flex-1 flex-col">
        <ServicesHero />
        <ServicesGallery />
        <ServicesProcess />
        <ProofSection />
      </main>
      <SiteFooter />
    </>
  );
}
