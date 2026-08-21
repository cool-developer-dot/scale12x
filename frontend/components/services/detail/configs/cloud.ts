import type { ServiceConfig } from "../types";

export const CLOUD_SERVICE: ServiceConfig = {
  slug: "cloud-computing",
  index: "04",
  eyebrow: "04 / CLOUD COMPUTING",
  serviceName: "Cloud Computing",
  headline: {
    soft: ["Build infrastructure that scales"],
    accent: ["without slowing the business down."],
  },
  description:
    "Design, migrate, modernize, and operate secure cloud environments that improve reliability, performance, and scalability.",
  primaryCta: { label: "Discuss Cloud Architecture", href: "/contact" },
  metadata: ["ARCHITECTURE", "MIGRATION", "DEVOPS", "RELIABILITY"],
  seoTitle: "Cloud Computing | Scale12x",
  seoDescription:
    "Cloud architecture, migration, DevOps, security, and infrastructure built for reliable, scalable digital operations.",
  visual: {
    inputLabel: "Legacy Pressure",
    outputLabel: "Resilient Cloud",
    coreLabel: "CLOUD LAYER",
    coreTitle: "CLOUD CORE",
    variant: "cloud",
    accentMode: "cobalt",
    inputs: [
      { id: "workloads", title: "Workloads", subtitle: "Apps & services", icon: "pipeline" },
      { id: "data-estates", title: "Data Estates", subtitle: "Stores & streams", icon: "database" },
      { id: "ops-debt", title: "Ops Debt", subtitle: "Manual pressure", icon: "ops" },
      { id: "security-reqs", title: "Security Needs", subtitle: "Controls & trust", icon: "secure" },
      { id: "cost-signal", title: "Cost Signals", subtitle: "Spend clarity", icon: "measure" },
      { id: "delivery", title: "Delivery Pace", subtitle: "Release friction", icon: "sync" },
    ],
    outputs: [
      { id: "architecture", title: "Cloud Architecture", subtitle: "Clear topology", icon: "architecture" },
      { id: "migration", title: "Migration Path", subtitle: "Controlled cutover", icon: "pipeline" },
      { id: "iac", title: "Infrastructure as Code", subtitle: "Repeatable envs", icon: "infra" },
      { id: "cicd", title: "CI/CD Pipelines", subtitle: "Faster release", icon: "workflow" },
      { id: "hardening", title: "Cloud Hardening", subtitle: "Secure by default", icon: "secure" },
      { id: "optimize", title: "Cost & Performance", subtitle: "Efficient scale", icon: "measure" },
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
