export type ProcessStepId = "01" | "02" | "03" | "04";

export type ProcessStep = {
  id: ProcessStepId;
  index: number;
  title: string;
  description: string;
  /** Travel time from this node to the next (ms). */
  travelMs: number;
  /** Hold at this node after arrival (ms). */
  holdMs: number;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "01",
    index: 0,
    title: "Diagnose",
    description:
      "30-minute discovery. Bottlenecks, opportunities, and the highest-leverage move.",
    travelMs: 2000,
    holdMs: 550,
  },
  {
    id: "02",
    index: 1,
    title: "Architect",
    description:
      "Custom proposal in 48 hours. Strategy, systems, and priorities in one plan.",
    travelMs: 2100,
    holdMs: 500,
  },
  {
    id: "03",
    index: 2,
    title: "Execute",
    description:
      "Kickoff in 48 hours. Senior specialists ship across growth, creative, and tech.",
    travelMs: 2000,
    holdMs: 520,
  },
  {
    id: "04",
    index: 3,
    title: "Scale",
    description:
      "Measure what works. Compound the gains. Expand with transparent reporting.",
    travelMs: 1600,
    holdMs: 750,
  },
];

export const PROCESS_COPY = {
  eyebrow: "HOW WE WORK / 01–04",
  headlineLead: "From signal to ",
  headlineAccent: "scale",
  headlineEnd: ".",
  support:
    "Discovery to signed contract in 14–21 days. Then we ship, without the handoff chaos.",
  statement: "Measure. Refine. Compound.",
} as const;

/** Horizontal spine geometry (viewBox units). */
export const SPINE = {
  w: 1200,
  h: 48,
  y: 24,
  /** Node x positions — column centers */
  nodes: [150, 450, 750, 1050] as const,
  startX: 40,
  endX: 1160,
} as const;

/** Vertical spine for mobile (viewBox units). */
export const SPINE_V = {
  w: 48,
  h: 720,
  x: 24,
  nodes: [90, 270, 450, 630] as const,
  startY: 24,
  endY: 696,
} as const;
