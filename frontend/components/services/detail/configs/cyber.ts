import type { ServiceConfig } from "../types";

export const CYBER_SERVICE: ServiceConfig = {
  slug: "cybersecurity",
  index: "05",
  eyebrow: "05 / CYBERSECURITY",
  serviceName: "Cybersecurity",
  headline: {
    soft: ["Secure the systems"],
    accent: ["your business depends on."],
  },
  description:
    "Strengthen applications, infrastructure, identities, and cloud environments with security engineered into every layer.",
  primaryCta: { label: "Strengthen security", href: "/contact" },
  metadata: ["ARCHITECTURE", "IDENTITY", "MONITORING", "HARDENING"],
  seoTitle: "Cybersecurity | Scale 12x",
  seoDescription:
    "Security architecture, cloud security, application protection, identity, monitoring, and hardening for modern digital systems.",
  visual: {
    inputLabel: "Expanding surface",
    outputLabel: "Controlled posture",
    coreLabel: "SECURITY LAYER",
    coreTitle: "SECURITY CORE",
    variant: "cyber",
    accentMode: "cobalt",
    inputs: [
      { id: "traffic", title: "Network traffic", subtitle: "Inbound demand", icon: "traffic" },
      { id: "identities", title: "Identities", subtitle: "Users & machines", icon: "users" },
      { id: "apps", title: "Applications", subtitle: "Exposed surfaces", icon: "interface" },
      { id: "cloud-envs", title: "Cloud environments", subtitle: "Shared risk", icon: "cloud" },
      { id: "vulnerabilities", title: "Vulnerabilities", subtitle: "Known gaps", icon: "constraint" },
      { id: "signals", title: "Security signals", subtitle: "Live telemetry", icon: "signal" },
    ],
    outputs: [
      { id: "perimeter", title: "Security perimeter", subtitle: "Controlled entry", icon: "secure" },
      { id: "iam", title: "Access control", subtitle: "Least privilege", icon: "check-route" },
      { id: "appsec", title: "Application security", subtitle: "Safer releases", icon: "architecture" },
      { id: "cloudsec", title: "Cloud security", subtitle: "Hardened estate", icon: "cloud" },
      { id: "monitoring", title: "Monitoring", subtitle: "Continuous visibility", icon: "insight" },
      { id: "posture", title: "Hardened posture", subtitle: "Reduced exposure", icon: "secure" },
    ],
    stages: [
      { id: "inspect", label: "Inspect" },
      { id: "verify", label: "Verify" },
      { id: "protect", label: "Protect" },
      { id: "monitor", label: "Monitor" },
      { id: "harden", label: "Harden" },
    ],
    pairings: [
      { inputId: "traffic", outputId: "perimeter" },
      { inputId: "identities", outputId: "iam" },
      { inputId: "apps", outputId: "appsec" },
      { inputId: "cloud-envs", outputId: "cloudsec" },
      { inputId: "signals", outputId: "monitoring" },
      { inputId: "vulnerabilities", outputId: "posture" },
    ],
    mobileInputIds: ["traffic", "identities", "apps"],
    mobileOutputIds: ["perimeter", "iam", "posture"],
  },
};
