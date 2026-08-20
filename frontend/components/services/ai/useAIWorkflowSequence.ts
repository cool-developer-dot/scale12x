"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MOBILE_INPUT_IDS,
  AI_INPUTS,
  type WorkflowNodeId,
  type WorkflowOutputId,
  type ProcessStage,
} from "./data";
import { DESKTOP_ROUTES, MOBILE_ROUTES } from "./topology";

export type WorkflowPhase =
  | "idle"
  | "activate"
  | "inbound"
  | "process"
  | "outbound"
  | "settle";

export type SignalLeg = {
  pathD: string;
  key: number;
  duration: number;
  kind: "inbound" | "outbound";
};

type Options = {
  enabled: boolean;
  sectionActive: boolean;
  reduceMotion: boolean;
  mobile: boolean;
};

const DESKTOP_INPUT_IDS: WorkflowNodeId[] = AI_INPUTS.map((i) => i.id);

/** ~3.5–4s per transaction → ~21–24s full loop */
const ACTIVATE_MS = 260;
const INBOUND_BASE_MS = 1150;
const PROCESS_MS = 480;
const OUTBOUND_BASE_MS = 1050;
const HOLD_MS = 520;
const QUIET_MS = 280;

const STAGE_ORDER: ProcessStage["id"][] = [
  "understand",
  "reason",
  "decide",
  "act",
  "learn",
];

type CycleFn = (startIndex: number, generation: number) => void;

/**
 * Single progression controller — one timeout chain.
 * Autoplay is primary; hover never pauses or owns the sequence.
 */
export function useAIWorkflowSequence({
  enabled,
  sectionActive,
  reduceMotion,
  mobile,
}: Options) {
  const [activeInput, setActiveInput] = useState<WorkflowNodeId | null>(null);
  const [activeOutput, setActiveOutput] = useState<WorkflowOutputId | null>(
    null,
  );
  const [phase, setPhase] = useState<WorkflowPhase>("idle");
  const [activeStage, setActiveStage] = useState<ProcessStage["id"] | null>(
    null,
  );
  const [corePulse, setCorePulse] = useState(false);
  const [signal, setSignal] = useState<SignalLeg | null>(null);
  const [illuminateIn, setIlluminateIn] = useState<WorkflowNodeId | null>(null);
  const [illuminateOut, setIlluminateOut] = useState<WorkflowOutputId | null>(
    null,
  );
  const [hoveredInput, setHoveredInput] = useState<WorkflowNodeId | null>(null);
  const [hoveredOutput, setHoveredOutput] = useState<WorkflowOutputId | null>(
    null,
  );

  const indexRef = useRef(0);
  const chainRef = useRef(0);
  const genRef = useRef(0);
  const runningRef = useRef(false);
  const signalKeyRef = useRef(0);
  const stageTimersRef = useRef<number[]>([]);
  const runCycleRef = useRef<CycleFn>(() => {});

  const routes = mobile ? MOBILE_ROUTES : DESKTOP_ROUTES;
  const sequenceIds = mobile ? MOBILE_INPUT_IDS : DESKTOP_INPUT_IDS;

  const clearMain = useCallback(() => {
    window.clearTimeout(chainRef.current);
    chainRef.current = 0;
  }, []);

  const clearStages = useCallback(() => {
    stageTimersRef.current.forEach(clearTimeout);
    stageTimersRef.current = [];
  }, []);

  const clearAll = useCallback(() => {
    clearMain();
    clearStages();
  }, [clearMain, clearStages]);

  useEffect(() => {
    const nextKey = () => {
      signalKeyRef.current += 1;
      return signalKeyRef.current;
    };

    const cascadeStages = (generation: number) => {
      clearStages();
      const step = Math.floor(PROCESS_MS / STAGE_ORDER.length);
      STAGE_ORDER.forEach((stage, i) => {
        const t = window.setTimeout(() => {
          if (generation !== genRef.current) return;
          setActiveStage(stage);
        }, i * step);
        stageTimersRef.current.push(t);
      });
    };

    runCycleRef.current = (startIndex: number, generation: number) => {
      if (generation !== genRef.current) return;
      if (!runningRef.current) return;

      const ids = sequenceIds;
      const id = ids[startIndex % ids.length];
      if (!id) return;

      const route = routes.find((r) => r.id === id);
      if (!route) return;

      indexRef.current = startIndex % ids.length;

      const inboundMs = Math.round(INBOUND_BASE_MS * route.inboundScale);
      const outboundMs = Math.round(OUTBOUND_BASE_MS * route.outboundScale);

      /** Schedule next phase — does NOT clear processing stage timers */
      const schedule = (ms: number, fn: () => void) => {
        clearMain();
        chainRef.current = window.setTimeout(() => {
          if (generation !== genRef.current) return;
          if (!runningRef.current) return;
          fn();
        }, ms);
      };

      // PHASE 1 — input wake
      clearStages();
      setActiveInput(id);
      setActiveOutput(null);
      setPhase("activate");
      setIlluminateIn(id);
      setIlluminateOut(null);
      setActiveStage(null);
      setCorePulse(false);
      setSignal(null);

      schedule(ACTIVATE_MS, () => {
        // PHASE 2 — inbound travel (progressive fill + particle)
        setPhase("inbound");
        setSignal({
          pathD: route.inbound,
          key: nextKey(),
          duration: inboundMs / 1000,
          kind: "inbound",
        });

        schedule(inboundMs, () => {
          // PHASE 3 — core processing
          setPhase("process");
          setSignal(null);
          setCorePulse(true);
          cascadeStages(generation);

          schedule(PROCESS_MS, () => {
            setCorePulse(false);
            setActiveStage("learn");

            // PHASE 4 — outbound travel
            setPhase("outbound");
            setActiveOutput(route.outboundTarget);
            setIlluminateOut(route.outboundTarget);
            setSignal({
              pathD: route.outbound,
              key: nextKey(),
              duration: outboundMs / 1000,
              kind: "outbound",
            });

            schedule(outboundMs, () => {
              // PHASE 5 — hold output, then soft settle into next
              setPhase("settle");
              setSignal(null);

              schedule(HOLD_MS, () => {
                setIlluminateIn(null);
                setIlluminateOut(null);
                setActiveStage(null);
                setActiveOutput(null);
                setPhase("idle");

                const nxt = (startIndex + 1) % ids.length;
                indexRef.current = nxt;
                schedule(QUIET_MS, () => {
                  if (generation !== genRef.current) return;
                  // Keep activeInput until next activate for seamless handoff
                  runCycleRef.current(nxt, generation);
                });
              });
            });
          });
        });
      });
    };
  }, [clearMain, clearStages, routes, sequenceIds]);

  const start = useCallback(
    (fromIndex?: number) => {
      if (reduceMotion || !enabled) return;
      genRef.current += 1;
      const generation = genRef.current;
      runningRef.current = true;
      const idx =
        typeof fromIndex === "number" ? fromIndex : indexRef.current;
      runCycleRef.current(idx, generation);
    },
    [enabled, reduceMotion],
  );

  useEffect(() => {
    if (reduceMotion || !enabled) {
      runningRef.current = false;
      clearAll();
      genRef.current += 1;
      const t = window.setTimeout(() => {
        setActiveInput(null);
        setActiveOutput(null);
        setIlluminateIn(null);
        setIlluminateOut(null);
        setActiveStage(null);
        setPhase("idle");
        setCorePulse(false);
        setSignal(null);
      }, 0);
      return () => clearTimeout(t);
    }

    if (!sectionActive) {
      runningRef.current = false;
      clearAll();
      return;
    }

    if (!runningRef.current) {
      start(indexRef.current);
    }
  }, [enabled, sectionActive, reduceMotion, start, clearAll]);

  useEffect(() => {
    indexRef.current = 0;
    if (enabled && sectionActive && !reduceMotion) {
      start(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

  useEffect(() => {
    return () => {
      genRef.current += 1;
      clearAll();
    };
  }, [clearAll]);

  /** Soft related highlight only — never owns or pauses autoplay */
  const onInputHover = useCallback(
    (id: WorkflowNodeId | null) => {
      setHoveredInput(id);
      if (id) {
        const route = routes.find((r) => r.id === id);
        setHoveredOutput(route?.outboundTarget ?? null);
      } else {
        setHoveredOutput(null);
      }
    },
    [routes],
  );

  const onOutputHover = useCallback(
    (id: WorkflowOutputId | null) => {
      setHoveredOutput(id);
      if (id) {
        const route = routes.find((r) => r.outboundTarget === id);
        setHoveredInput(route?.id ?? null);
      } else {
        setHoveredInput(null);
      }
    },
    [routes],
  );

  return {
    activeInput,
    activeOutput,
    phase,
    activeStage,
    corePulse,
    signal,
    illuminateIn,
    illuminateOut,
    hoveredInput,
    hoveredOutput,
    onInputHover,
    onOutputHover,
    routes,
  };
}
