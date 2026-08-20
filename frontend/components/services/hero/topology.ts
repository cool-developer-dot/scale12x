import type { Capability } from "./capabilities";

export const VIEW = { w: 1000, h: 620 } as const;

/** Right-biased intelligence core (~65% across the visual) */
export const CORE = { x: 642, y: 268 } as const;

export type PathStyle = "white" | "cobalt" | "active" | "secondary" | "micro";

export type SystemPathDef = {
  id: string;
  d: string;
  style: PathStyle;
  dashed?: boolean;
  width?: number;
  /** Draw phase: incoming | outgoing | spine | micro */
  phase: "incoming" | "outgoing" | "micro";
  delay: number;
  /** Capability id that emphasizes this path on hover */
  capability?: Capability["id"];
  /** Include in ambient signal rotation */
  signal?: boolean;
  /** Hide on compact/mobile */
  desktopOnly?: boolean;
};

export type AnchorNode = {
  id: string;
  x: number;
  y: number;
  kind: "primary" | "secondary" | "micro";
  fill: "cobalt" | "white-ring" | "outline" | "muted";
  desktopOnly?: boolean;
};

/**
 * Clean Scale12x capability topology — three depth tiers only.
 * Primary routes carry the operating sequence; secondary support;
 * construction is sparse and core-adjacent.
 */
export const SYSTEM_PATHS: SystemPathDef[] = [
  // ——— PRIMARY INCOMING (left → core) ———
  {
    id: "in-upper-white",
    d: `M 28 92 H 210 H 340 C 410 92, 455 150, 510 200 C 555 240, 595 260, ${CORE.x} ${CORE.y}`,
    style: "white",
    width: 1.4,
    phase: "incoming",
    delay: 0.55,
    capability: "01",
    signal: true,
  },
  {
    id: "in-dotted-cobalt",
    d: `M 40 168 H 180 C 260 168, 300 200, 360 230 C 430 265, 520 272, ${CORE.x} ${CORE.y}`,
    style: "cobalt",
    dashed: true,
    width: 1.3,
    phase: "incoming",
    delay: 0.62,
    capability: "02",
    signal: true,
  },
  {
    id: "in-tech-elbow",
    d: `M 36 340 H 150 V 300 H 280 C 360 300, 420 285, 490 275 C 545 268, 590 268, ${CORE.x} ${CORE.y}`,
    style: "white",
    width: 1.25,
    phase: "incoming",
    delay: 0.7,
    capability: "03",
    signal: true,
  },
  {
    id: "in-mid-secondary",
    d: `M 55 230 H 200 C 280 230, 340 250, 420 262 C 500 274, 575 270, ${CORE.x} ${CORE.y}`,
    style: "secondary",
    width: 1,
    phase: "incoming",
    delay: 0.66,
    capability: "04",
    signal: true,
  },

  // ——— PRIMARY OUTGOING (core → right) ———
  {
    id: "out-upper-cobalt",
    d: `M ${CORE.x} ${CORE.y} C 700 250, 740 190, 800 150 H 960`,
    style: "cobalt",
    width: 1.4,
    phase: "outgoing",
    delay: 0.95,
    capability: "05",
    signal: true,
  },
  {
    id: "out-mid-white",
    d: `M ${CORE.x} ${CORE.y} H 760 H 920`,
    style: "white",
    width: 1.3,
    phase: "outgoing",
    delay: 1.02,
    capability: "06",
    signal: true,
  },
  {
    id: "out-lower-cobalt",
    d: `M ${CORE.x} ${CORE.y} C 700 300, 760 340, 820 355 H 970`,
    style: "cobalt",
    width: 1.25,
    phase: "outgoing",
    delay: 1.08,
    capability: "07",
    signal: true,
  },

  // ——— ONE secondary support route (midground) ———
  {
    id: "out-support-arc",
    d: `M ${CORE.x} ${CORE.y} C 690 230, 730 160, 780 110 C 820 75, 880 55, 955 48`,
    style: "secondary",
    dashed: true,
    width: 0.9,
    phase: "outgoing",
    delay: 1.0,
    capability: "05",
    desktopOnly: true,
  },

  // ——— Sparse construction (desktop only, core-adjacent) ———
  {
    id: "micro-core-top",
    d: `M 500 80 V 140 C 500 180, 560 220, 600 245`,
    style: "micro",
    width: 0.7,
    phase: "micro",
    delay: 0.78,
    desktopOnly: true,
  },
  {
    id: "micro-out-tick",
    d: `M 860 180 V 240 H 920`,
    style: "micro",
    width: 0.7,
    phase: "micro",
    delay: 1.18,
    desktopOnly: true,
  },
];

/** Junction anchors only — no orphan micro dots */
export const ANCHOR_NODES: AnchorNode[] = [
  { id: "n1", x: 210, y: 92, kind: "secondary", fill: "white-ring" },
  { id: "n2", x: 180, y: 168, kind: "primary", fill: "cobalt" },
  { id: "n3", x: 150, y: 300, kind: "secondary", fill: "outline" },
  { id: "n5", x: 360, y: 230, kind: "secondary", fill: "white-ring" },
  { id: "n7", x: 800, y: 150, kind: "primary", fill: "cobalt" },
  { id: "n9", x: 920, y: 268, kind: "primary", fill: "white-ring" },
  { id: "n10", x: 820, y: 355, kind: "secondary", fill: "cobalt" },
  { id: "n14", x: 760, y: 268, kind: "micro", fill: "muted" },
];

/** Capability spine positions (integrated under network) */
export const SPINE_Y = 545;
export const SPINE_X = [70, 210, 350, 490, 630, 770, 910] as const;

/** Faint vertical risers from selected spine nodes into architecture */
export const SPINE_RISERS: { capability: Capability["id"]; d: string }[] = [
  {
    capability: "03",
    d: `M 350 545 V 500 C 350 460, 400 400, 470 350`,
  },
  {
    capability: "05",
    d: `M 630 545 V 480 C 630 420, 650 360, 680 320`,
  },
  {
    capability: "01",
    d: `M 70 545 V 500 C 70 460, 90 420, 120 400`,
  },
];

export const STROKE: Record<PathStyle, string> = {
  white: "rgba(210, 225, 245, 0.58)",
  cobalt: "#2563EB",
  active: "#3B82F6",
  secondary: "rgba(100, 125, 165, 0.26)",
  micro: "rgba(90, 115, 150, 0.10)",
};

/** Primary path emphasized when a capability is active (legacy single-path map). */
export const CAPABILITY_PATH: Record<Capability["id"], string> = {
  "01": "in-upper-white",
  "02": "in-dotted-cobalt",
  "03": "in-tech-elbow",
  "04": "in-mid-secondary",
  "05": "out-upper-cobalt",
  "06": "out-mid-white",
  "07": "out-lower-cobalt",
};

/**
 * Continuous signal-routing sequence.
 * Varied timings — full loop ~24–28s.
 */
export type CapabilityRoute = {
  id: Capability["id"];
  inboundPath: string;
  outboundPath: string;
  /** Full cycle duration in ms (activate → settle → handoff). */
  durationMs: number;
};

export const CAPABILITY_ROUTES: CapabilityRoute[] = [
  {
    id: "01",
    inboundPath: "in-upper-white",
    outboundPath: "out-upper-cobalt",
    durationMs: 3300,
  },
  {
    id: "02",
    inboundPath: "in-dotted-cobalt",
    outboundPath: "out-mid-white",
    durationMs: 3700,
  },
  {
    id: "03",
    inboundPath: "in-tech-elbow",
    outboundPath: "out-lower-cobalt",
    durationMs: 3400,
  },
  {
    id: "04",
    inboundPath: "in-mid-secondary",
    outboundPath: "out-mid-white",
    durationMs: 3800,
  },
  {
    id: "05",
    inboundPath: "in-upper-white",
    outboundPath: "out-upper-cobalt",
    durationMs: 3200,
  },
  {
    id: "06",
    inboundPath: "in-dotted-cobalt",
    outboundPath: "out-mid-white",
    durationMs: 3600,
  },
  {
    id: "07",
    inboundPath: "in-tech-elbow",
    outboundPath: "out-lower-cobalt",
    durationMs: 3500,
  },
];

/** Short vertical stubs above every spine node — wake with the active capability. */
export const SPINE_CONNECTORS: {
  capability: Capability["id"];
  d: string;
}[] = [
  { capability: "01", d: `M ${SPINE_X[0]} ${SPINE_Y} V ${SPINE_Y - 26}` },
  { capability: "02", d: `M ${SPINE_X[1]} ${SPINE_Y} V ${SPINE_Y - 26}` },
  { capability: "03", d: `M ${SPINE_X[2]} ${SPINE_Y} V ${SPINE_Y - 26}` },
  { capability: "04", d: `M ${SPINE_X[3]} ${SPINE_Y} V ${SPINE_Y - 26}` },
  { capability: "05", d: `M ${SPINE_X[4]} ${SPINE_Y} V ${SPINE_Y - 26}` },
  { capability: "06", d: `M ${SPINE_X[5]} ${SPINE_Y} V ${SPINE_Y - 26}` },
  { capability: "07", d: `M ${SPINE_X[6]} ${SPINE_Y} V ${SPINE_Y - 26}` },
];

/** Depth layer helpers for stroke hierarchy */
export const PATH_DEPTH: Record<PathStyle, "foreground" | "mid" | "rear"> = {
  white: "foreground",
  cobalt: "foreground",
  active: "foreground",
  secondary: "mid",
  micro: "rear",
};
