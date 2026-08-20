import dynamic from "next/dynamic";
import SiteHeader from "@/components/header/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import HeroSection from "@/components/hero/HeroSection";

/** Below-fold islands — SSR HTML preserved, JS code-split from the critical path */
const ProofSection = dynamic(() => import("@/components/proof/ProofSection"));
const ServicesSection = dynamic(
  () => import("@/components/services/ServicesSection"),
);
const TrustedBySection = dynamic(
  () => import("@/components/trusted/TrustedBySection"),
);
const OperationalFrameworkSection = dynamic(
  () => import("@/components/work/OperationalFrameworkSection"),
);
const TestimonialsSection = dynamic(
  () => import("@/components/testimonials/TestimonialsSection"),
);
const FinalCtaSection = dynamic(() => import("@/components/cta/FinalCtaSection"));

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-full flex-1 flex-col">
        <HeroSection />
        <ProofSection />
        <ServicesSection />
        <TrustedBySection />
        <OperationalFrameworkSection />
        <TestimonialsSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
