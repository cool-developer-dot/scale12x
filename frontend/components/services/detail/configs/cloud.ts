import type { ServiceConfig } from "../types";

export const CLOUD_SERVICE: ServiceConfig = {
  slug: "cloud-computing",
  index: "04",
  eyebrow: "04 / CLOUD COMPUTING",
  serviceName: "Cloud computing",
  headline: {
    soft: ["Build infrastructure that scales"],
    accent: ["without slowing the business down."],
  },
  description:
    "Design, migrate, modernize, and operate secure cloud environments that improve reliability, performance, and scalability.",
  primaryCta: { label: "Discuss cloud architecture", href: "/contact" },
  metadata: ["ARCHITECTURE", "MIGRATION", "DEVOPS", "RELIABILITY"],
  seoTitle: "Cloud computing | Scale 12x",
  seoDescription:
    "Cloud architecture, migration, DevOps, security, and infrastructure built for reliable, scalable digital operations.",
  visual: {
    inputLabel: "Legacy pressure",
    outputLabel: "Resilient cloud",
    coreLabel: "CLOUD LAYER",
    coreTitle: "CLOUD CORE",
    variant: "cloud",
    accentMode: "cobalt",
    inputs: [
      { id: "workloads", title: "Workloads", subtitle: "Apps & services", icon: "pipeline" },
      { id: "data-estates", title: "Data estates", subtitle: "Stores & streams", icon: "database" },
      { id: "ops-debt", title: "Ops debt", subtitle: "Manual pressure", icon: "ops" },
      { id: "security-reqs", title: "Security needs", subtitle: "Controls & trust", icon: "secure" },
      { id: "cost-signal", title: "Cost signals", subtitle: "Spend clarity", icon: "measure" },
      { id: "delivery", title: "Delivery pace", subtitle: "Release friction", icon: "sync" },
    ],
    outputs: [
      { id: "architecture", title: "Cloud architecture", subtitle: "Clear topology", icon: "architecture" },
      { id: "migration", title: "Migration path", subtitle: "Controlled cutover", icon: "pipeline" },
      { id: "iac", title: "Infrastructure as Code", subtitle: "Repeatable envs", icon: "infra" },
      { id: "cicd", title: "CI/CD pipelines", subtitle: "Faster release", icon: "workflow" },
      { id: "hardening", title: "Cloud hardening", subtitle: "Secure by default", icon: "secure" },
      { id: "optimize", title: "Cost & performance", subtitle: "Efficient scale", icon: "measure" },
    ],
    stages: [
      { id: "assess", label: "Assess" },
      { id: "design", label: "Design" },
      { id: "migrate", label: "Migrate" },
      { id: "automate", label: "Automate" },
      { id: "optimize", label: "Optimize" },
    ],
    pairings: [
      { inputId: "workloads", outputId: "architecture" },
      { inputId: "data-estates", outputId: "migration" },
      { inputId: "ops-debt", outputId: "iac" },
      { inputId: "delivery", outputId: "cicd" },
      { inputId: "security-reqs", outputId: "hardening" },
      { inputId: "cost-signal", outputId: "optimize" },
    ],
    mobileInputIds: ["workloads", "ops-debt", "security-reqs"],
    mobileOutputIds: ["architecture", "cicd", "hardening"],
  },
};
