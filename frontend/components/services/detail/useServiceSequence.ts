"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ServiceConfig } from "./types";
import {
  buildDesktopRoutes,
  buildMobileRoutes,
  type RouteDef,
} from "./topology";

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
  config: ServiceConfig;
  enabled: boolean;
  sectionActive: boolean;
  reduceMotion: boolean;
  mobile: boolean;
};

const ACTIVATE_MS = 260;
const INBOUND_BASE_MS = 1150;
const PROCESS_MS = 580;
const OUTBOUND_BASE_MS = 1100;
const HOLD_MS = 480;
const QUIET_MS = 260;

type CycleFn = (startIndex: number, generation: number) => void;

export function useServiceSequence({
  config,
  enabled,
  sectionActive,
  reduceMotion,
  mobile,
}: Options) {
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [activeOutput, setActiveOutput] = useState<string | null>(null);
  const [phase, setPhase] = useState<WorkflowPhase>("idle");
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [corePulse, setCorePulse] = useState(false);
  const [signal, setSignal] = useState<SignalLeg | null>(null);
  const [illuminateIn, setIlluminateIn] = useState<string | null>(null);
  const [illuminateOut, setIlluminateOut] = useState<string | null>(null);
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);
  const [hoveredOutput, setHoveredOutput] = useState<string | null>(null);

  const indexRef = useRef(0);
  const chainRef = useRef(0);
  const genRef = useRef(0);
  const runningRef = useRef(false);
  const signalKeyRef = useRef(0);
  const stageTimersRef = useRef<number[]>([]);
  const runCycleRef = useRef<CycleFn>(() => {});

  const inputIds = useMemo(
    () => config.visual.inputs.map((i) => i.id),
    [config.visual.inputs],
  );
  const outputIds = useMemo(
    () => config.visual.outputs.map((o) => o.id),
    [config.visual.outputs],
  );
  const stageIds = useMemo(
    () => config.visual.stages.map((s) => s.id),
    [config.visual.stages],
  );

  const routes: RouteDef[] = useMemo(() => {
    if (mobile) {
      return buildMobileRoutes(
        config.visual.mobileInputIds,
        config.visual.mobileOutputIds,
        config.visual.pairings,
      );
    }
    return buildDesktopRoutes(inputIds, outputIds, config.visual.pairings);
  }, [mobile, config, inputIds, outputIds]);

  const sequenceIds = mobile
    ? config.visual.mobileInputIds
    : inputIds;

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
      const step = Math.floor(PROCESS_MS / Math.max(stageIds.length, 1));
      stageIds.forEach((stage, i) => {
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

      const schedule = (ms: number, fn: () => void) => {
        clearMain();
        chainRef.current = window.setTimeout(() => {
          if (generation !== genRef.current) return;
          if (!runningRef.current) return;
          fn();
        }, ms);
      };

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
        setPhase("inbound");
        setSignal({
          pathD: route.inbound,
          key: nextKey(),
          duration: inboundMs / 1000,
          kind: "inbound",
        });

        schedule(inboundMs, () => {
          setPhase("process");
          setSignal(null);
          setCorePulse(true);
          cascadeStages(generation);

          schedule(PROCESS_MS, () => {
            setCorePulse(false);
            setActiveStage(stageIds[stageIds.length - 1] ?? null);

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
                  runCycleRef.current(nxt, generation);
                });
              });
            });
          });
        });
      });
    };
  }, [clearMain, clearStages, routes, sequenceIds, stageIds]);

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
  }, [mobile, config.slug]);

  useEffect(() => {
    return () => {
      genRef.current += 1;
      clearAll();
    };
  }, [clearAll]);

  const onInputHover = useCallback(
    (id: string | null) => {
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
    (id: string | null) => {
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
    inputIds: mobile ? config.visual.mobileInputIds : inputIds,
    outputIds: mobile ? config.visual.mobileOutputIds : outputIds,
  };
}
