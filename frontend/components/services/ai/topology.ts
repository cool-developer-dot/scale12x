import type { WorkflowNodeId, WorkflowOutputId } from "./data";

/** Compacted viewBox — denser machine, paths recalculated from layout */
export const VIEW = { w: 1000, h: 540 } as const;
export const VIEW_MOBILE = { w: 390, h: 500 } as const;

export const CORE = { x: 500, y: 214 } as const;
export const CORE_MOBILE = { x: 195, y: 240 } as const;

export type NodeRect = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

/**
 * Input cards — slight stagger (fragmented), ~16px vertical gaps.
 * Brought closer to core for a unified machine feel.
 */
export const INPUT_LAYOUT: Record<WorkflowNodeId, NodeRect> = {
  emails: { id: "emails", x: 10, y: 34, w: 156, h: 48 },
  spreadsheets: { id: "spreadsheets", x: 18, y: 98, w: 156, h: 48 },
  chat: { id: "chat", x: 6, y: 162, w: 156, h: 48 },
  reports: { id: "reports", x: 20, y: 226, w: 156, h: 48 },
  approvals: { id: "approvals", x: 12, y: 290, w: 156, h: 48 },
  data: { id: "data", x: 16, y: 354, w: 156, h: 48 },
};

/** Output cards — aligned, closer to core. */
export const OUTPUT_LAYOUT: Record<WorkflowOutputId, NodeRect> = {
  workflows: { id: "workflows", x: 788, y: 34, w: 188, h: 48 },
  responses: { id: "responses", x: 788, y: 98, w: 188, h: 48 },
  insights: { id: "insights", x: 788, y: 162, w: 188, h: 48 },
  sync: { id: "sync", x: 788, y: 226, w: 188, h: 48 },
  "approvals-out": { id: "approvals-out", x: 788, y: 290, w: 188, h: 48 },
  pipelines: { id: "pipelines", x: 788, y: 354, w: 188, h: 48 },
};

export const INPUT_LAYOUT_MOBILE: Record<
  "emails" | "chat" | "approvals",
  NodeRect
> = {
  emails: { id: "emails", x: 16, y: 44, w: 148, h: 46 },
  chat: { id: "chat", x: 16, y: 200, w: 148, h: 46 },
  approvals: { id: "approvals", x: 16, y: 356, w: 148, h: 46 },
};

export const OUTPUT_LAYOUT_MOBILE: Record<
  "responses" | "workflows" | "approvals-out",
  NodeRect
> = {
  responses: { id: "responses", x: 226, y: 44, w: 148, h: 46 },
  workflows: { id: "workflows", x: 226, y: 200, w: 148, h: 46 },
  "approvals-out": { id: "approvals-out", x: 226, y: 356, w: 148, h: 46 },
};

function midRight(r: NodeRect) {
  return { x: r.x + r.w, y: r.y + r.h / 2 };
}

function midLeft(r: NodeRect) {
  return { x: r.x, y: r.y + r.h / 2 };
}

/** Authored cubic routes — fragmented inbound, clean outbound. */
export type RouteDef = {
  id: WorkflowNodeId;
  inbound: string;
  outbound: string;
  outboundTarget: WorkflowOutputId;
  inboundScale: number;
  outboundScale: number;
};

function inboundCurve(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend: number,
) {
  const mx = from.x + (to.x - from.x) * 0.42;
  const c1x = from.x + 40;
  const c1y = from.y + bend * 0.35;
  const c2x = mx + 16;
  const c2y = to.y - bend * 0.15;
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

function outboundCurve(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend: number,
) {
  const c1x = from.x + 56;
  const c1y = from.y + bend * 0.2;
  const c2x = to.x - 48;
  const c2y = to.y - bend * 0.1;
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

const PAIRINGS: {
  input: WorkflowNodeId;
  output: WorkflowOutputId;
  bendIn: number;
  bendOut: number;
  inboundScale: number;
  outboundScale: number;
}[] = [
  {
    input: "emails",
    output: "responses",
    bendIn: -18,
    bendOut: -12,
    inboundScale: 0.95,
    outboundScale: 0.95,
  },
  {
    input: "spreadsheets",
    output: "pipelines",
    bendIn: 32,
    bendOut: 36,
    inboundScale: 1.12,
    outboundScale: 1.15,
  },
  {
    input: "chat",
    output: "workflows",
    bendIn: -24,
    bendOut: -28,
    inboundScale: 1.05,
    outboundScale: 1.08,
  },
  {
    input: "reports",
    output: "insights",
    bendIn: -8,
    bendOut: -6,
    inboundScale: 1.0,
    outboundScale: 0.98,
  },
  {
    input: "approvals",
    output: "approvals-out",
    bendIn: 6,
    bendOut: 5,
    inboundScale: 0.98,
    outboundScale: 0.95,
  },
  {
    input: "data",
    output: "sync",
    bendIn: -20,
    bendOut: -16,
    inboundScale: 1.1,
    outboundScale: 1.05,
  },
];

export const DESKTOP_ROUTES: RouteDef[] = PAIRINGS.map((p) => {
  const input = INPUT_LAYOUT[p.input];
  const output = OUTPUT_LAYOUT[p.output];
  const from = midRight(input);
  const toOut = midLeft(output);
  const coreIn = { x: CORE.x - 48, y: CORE.y };
  const coreOut = { x: CORE.x + 48, y: CORE.y };
  return {
    id: p.input,
    inbound: inboundCurve(from, coreIn, p.bendIn),
    outbound: outboundCurve(coreOut, toOut, p.bendOut),
    outboundTarget: p.output,
    inboundScale: p.inboundScale,
    outboundScale: p.outboundScale,
  };
});

const MOBILE_PAIRINGS: {
  input: "emails" | "chat" | "approvals";
  output: "responses" | "workflows" | "approvals-out";
  bendIn: number;
  bendOut: number;
}[] = [
  { input: "emails", output: "responses", bendIn: -12, bendOut: -10 },
  { input: "chat", output: "workflows", bendIn: 0, bendOut: 0 },
  { input: "approvals", output: "approvals-out", bendIn: 14, bendOut: 12 },
];

export const MOBILE_ROUTES: RouteDef[] = MOBILE_PAIRINGS.map((p) => {
  const input = INPUT_LAYOUT_MOBILE[p.input];
  const output = OUTPUT_LAYOUT_MOBILE[p.output];
  const from = midRight(input);
  const toOut = midLeft(output);
  const coreIn = { x: CORE_MOBILE.x - 36, y: CORE_MOBILE.y };
  const coreOut = { x: CORE_MOBILE.x + 36, y: CORE_MOBILE.y };
  return {
    id: p.input,
    inbound: inboundCurve(from, coreIn, p.bendIn),
    outbound: outboundCurve(coreOut, toOut, p.bendOut),
    outboundTarget: p.output,
    inboundScale: 1,
    outboundScale: 1,
  };
});

export function routeFor(
  id: WorkflowNodeId,
  mobile: boolean,
): RouteDef | undefined {
  const list = mobile ? MOBILE_ROUTES : DESKTOP_ROUTES;
  return list.find((r) => r.id === id);
}
