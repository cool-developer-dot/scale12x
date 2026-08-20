import type { ServiceRoutePairing } from "./types";

/** Wider canvas — left ~26% / center ~42% / right ~26% */
export const VIEW = { w: 1120, h: 700 } as const;
export const VIEW_MOBILE = { w: 390, h: 780 } as const;

export const CORE = { x: 560, y: 268 } as const;
export const CORE_MOBILE = { x: 195, y: 392 } as const;

export type NodeRect = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const CARD_H = 80;
const CARD_GAP = 14;
const CARD_START_Y = 54;

function stackY(i: number) {
  return CARD_START_Y + i * (CARD_H + CARD_GAP);
}

/** Desktop input slots — ~26% column, slight stagger for fragmented feel */
export const INPUT_SLOTS: Omit<NodeRect, "id">[] = [
  { x: 10, y: stackY(0), w: 268, h: CARD_H },
  { x: 18, y: stackY(1), w: 268, h: CARD_H },
  { x: 8, y: stackY(2), w: 268, h: CARD_H },
  { x: 20, y: stackY(3), w: 268, h: CARD_H },
  { x: 12, y: stackY(4), w: 268, h: CARD_H },
  { x: 16, y: stackY(5), w: 268, h: CARD_H },
];

/** Desktop output slots — aligned, cleaner column */
export const OUTPUT_SLOTS: Omit<NodeRect, "id">[] = [
  { x: 842, y: stackY(0), w: 268, h: CARD_H },
  { x: 842, y: stackY(1), w: 268, h: CARD_H },
  { x: 842, y: stackY(2), w: 268, h: CARD_H },
  { x: 842, y: stackY(3), w: 268, h: CARD_H },
  { x: 842, y: stackY(4), w: 268, h: CARD_H },
  { x: 842, y: stackY(5), w: 268, h: CARD_H },
];

/** Mobile stacked: 3 inputs → core → 3 outputs */
const M_CARD_W = 358;
const M_CARD_H = 64;
const M_CARD_X = 16;

export const INPUT_SLOTS_MOBILE: Omit<NodeRect, "id">[] = [
  { x: M_CARD_X, y: 36, w: M_CARD_W, h: M_CARD_H },
  { x: M_CARD_X, y: 112, w: M_CARD_W, h: M_CARD_H },
  { x: M_CARD_X, y: 188, w: M_CARD_W, h: M_CARD_H },
];

export const OUTPUT_SLOTS_MOBILE: Omit<NodeRect, "id">[] = [
  { x: M_CARD_X, y: 548, w: M_CARD_W, h: M_CARD_H },
  { x: M_CARD_X, y: 624, w: M_CARD_W, h: M_CARD_H },
  { x: M_CARD_X, y: 700, w: M_CARD_W, h: M_CARD_H },
];

const STAGGERS = [0, 8, -4, 10, 2, 6];

function midRight(r: NodeRect) {
  return { x: r.x + r.w, y: r.y + r.h / 2 };
}

function midLeft(r: NodeRect) {
  return { x: r.x, y: r.y + r.h / 2 };
}

function midBottom(r: NodeRect) {
  return { x: r.x + r.w / 2, y: r.y + r.h };
}

function midTop(r: NodeRect) {
  return { x: r.x + r.w / 2, y: r.y };
}

function inboundCurve(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend: number,
) {
  const mx = from.x + (to.x - from.x) * 0.48;
  const c1x = from.x + 48;
  const c1y = from.y + bend * 0.32;
  const c2x = mx + 12;
  const c2y = to.y - bend * 0.12;
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

function outboundCurve(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend: number,
) {
  const c1x = from.x + 64;
  const c1y = from.y + bend * 0.18;
  const c2x = to.x - 52;
  const c2y = to.y - bend * 0.1;
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

/** Vertical mobile routes: card → core → card */
function inboundVertical(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend: number,
) {
  const midY = from.y + (to.y - from.y) * 0.55;
  return `M ${from.x} ${from.y} C ${from.x + bend} ${midY}, ${to.x - bend * 0.4} ${to.y - 28}, ${to.x} ${to.y}`;
}

function outboundVertical(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend: number,
) {
  const midY = from.y + (to.y - from.y) * 0.45;
  return `M ${from.x} ${from.y} C ${from.x + bend * 0.35} ${from.y + 28}, ${to.x - bend} ${midY}, ${to.x} ${to.y}`;
}

export type RouteDef = {
  id: string;
  inbound: string;
  outbound: string;
  outboundTarget: string;
  inboundScale: number;
  outboundScale: number;
};

const DEFAULT_BENDS = [
  { bendIn: -22, bendOut: -14 },
  { bendIn: 36, bendOut: 32 },
  { bendIn: -28, bendOut: -26 },
  { bendIn: -10, bendOut: -8 },
  { bendIn: 8, bendOut: 6 },
  { bendIn: -24, bendOut: -18 },
];

/** Chamber edge anchors — terminate routes at chamber, not core center */
const CHAMBER_IN_X = CORE.x - 168;
const CHAMBER_OUT_X = CORE.x + 168;

export function buildDesktopRoutes(
  inputIds: string[],
  outputIds: string[],
  pairings: ServiceRoutePairing[],
): RouteDef[] {
  const inputLayout = Object.fromEntries(
    inputIds.map((id, i) => [id, { id, ...INPUT_SLOTS[i]! }]),
  ) as Record<string, NodeRect>;

  const outputLayout = Object.fromEntries(
    outputIds.map((id, i) => [id, { id, ...OUTPUT_SLOTS[i]! }]),
  ) as Record<string, NodeRect>;

  return pairings.map((p, i) => {
    const input = inputLayout[p.inputId];
    const output = outputLayout[p.outputId];
    if (!input || !output) {
      throw new Error(`Invalid pairing: ${p.inputId} → ${p.outputId}`);
    }
    const bends = DEFAULT_BENDS[i] ?? DEFAULT_BENDS[0]!;
    const bendIn = p.bendIn ?? bends.bendIn;
    const bendOut = p.bendOut ?? bends.bendOut;
    const from = midRight(input);
    const toOut = midLeft(output);
    const coreIn = { x: CHAMBER_IN_X, y: CORE.y + bendIn * 0.15 };
    const coreOut = { x: CHAMBER_OUT_X, y: CORE.y + bendOut * 0.12 };
    return {
      id: p.inputId,
      inbound: inboundCurve(from, coreIn, bendIn),
      outbound: outboundCurve(coreOut, toOut, bendOut),
      outboundTarget: p.outputId,
      inboundScale: p.inboundScale ?? 1,
      outboundScale: p.outboundScale ?? 1,
    };
  });
}

export function buildMobileRoutes(
  mobileInputIds: string[],
  mobileOutputIds: string[],
  pairings: ServiceRoutePairing[],
): RouteDef[] {
  const inputLayout = Object.fromEntries(
    mobileInputIds.map((id, i) => [id, { id, ...INPUT_SLOTS_MOBILE[i]! }]),
  ) as Record<string, NodeRect>;

  const outputLayout = Object.fromEntries(
    mobileOutputIds.map((id, i) => [id, { id, ...OUTPUT_SLOTS_MOBILE[i]! }]),
  ) as Record<string, NodeRect>;

  const mobilePairings = mobileInputIds.map((inputId, i) => {
    const preferred = pairings.find((p) => p.inputId === inputId);
    const outputId =
      preferred?.outputId && mobileOutputIds.includes(preferred.outputId)
        ? preferred.outputId
        : mobileOutputIds[i]!;
    return {
      inputId,
      outputId,
      bendIn: [-28, 0, 28][i] ?? 0,
      bendOut: [-24, 0, 24][i] ?? 0,
    };
  });

  return mobilePairings.map((p) => {
    const input = inputLayout[p.inputId]!;
    const output = outputLayout[p.outputId]!;
    const from = midBottom(input);
    const toOut = midTop(output);
    const coreIn = { x: CORE_MOBILE.x, y: CORE_MOBILE.y - 88 };
    const coreOut = { x: CORE_MOBILE.x, y: CORE_MOBILE.y + 108 };
    return {
      id: p.inputId,
      inbound: inboundVertical(from, coreIn, p.bendIn),
      outbound: outboundVertical(coreOut, toOut, p.bendOut),
      outboundTarget: p.outputId,
      inboundScale: 1,
      outboundScale: 1,
    };
  });
}

export function getInputRect(
  inputIds: string[],
  id: string,
  mobile: boolean,
): NodeRect | null {
  const idx = inputIds.indexOf(id);
  if (idx < 0) return null;
  const slot = mobile ? INPUT_SLOTS_MOBILE[idx] : INPUT_SLOTS[idx];
  if (!slot) return null;
  return { id, ...slot };
}

export function getOutputRect(
  outputIds: string[],
  id: string,
  mobile: boolean,
): NodeRect | null {
  const idx = outputIds.indexOf(id);
  if (idx < 0) return null;
  const slot = mobile ? OUTPUT_SLOTS_MOBILE[idx] : OUTPUT_SLOTS[idx];
  if (!slot) return null;
  return { id, ...slot };
}

export function inputStagger(index: number) {
  return STAGGERS[index] ?? 0;
}
