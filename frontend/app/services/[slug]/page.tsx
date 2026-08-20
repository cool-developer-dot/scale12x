import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/header/SiteHeader";
import SiteFooter from "@/components/footer/SiteFooter";
import ServiceHero from "@/components/services/detail/ServiceHero";
import {
  SERVICE_SLUGS,
  getServiceConfig,
} from "@/components/services/detail/configs";
import { getWhyItMatters } from "@/components/services/detail/why";
import { getCoreCapabilities } from "@/components/services/detail/capabilities";

const WhyItMatters = dynamic(
  () => import("@/components/services/detail/why/WhyItMatters"),
);
const CoreCapabilities = dynamic(
  () => import("@/components/services/detail/capabilities/CoreCapabilities"),
);
const FinalCtaSection = dynamic(
  () => import("@/components/cta/FinalCtaSection"),
);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getServiceConfig(slug);
  if (!config) return { title: "Services: Scale12x" };
  return {
    title: config.seoTitle,
    description: config.seoDescription,
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      type: "website",
      url: `https://scale12x.com/services/${config.slug}`,
    },
    alternates: {
      canonical: `/services/${config.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getServiceConfig(slug);
  if (!config) notFound();

  const why = getWhyItMatters(config.slug);
  const capabilities = getCoreCapabilities(config.slug);

  return (
    <>
      <SiteHeader />
      <main className="flex min-h-full flex-1 flex-col">
        <ServiceHero config={config} />
        <WhyItMatters config={why} />
        <CoreCapabilities config={capabilities} />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
