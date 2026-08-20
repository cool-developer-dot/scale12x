"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Capability } from "./capabilities";
import {
  CAPABILITY_ROUTES,
  type CapabilityRoute,
} from "./topology";

export type RoutePhase =
  | "idle"
  | "activate"
  | "inbound"
  | "core"
  | "outbound"
  | "settle";

export type SignalLeg = {
  pathId: string;
  key: number;
  duration: number;
  reversed: boolean;
  kind: "primary" | "secondary";
};

type Options = {
  /** Entrance complete and continuous routing may begin. */
  enabled: boolean;
  /** Section in viewport + tab visible. */
  sectionActive: boolean;
  reduceMotion: boolean;
  /** Shorter travels on compact densities. */
  compact: boolean;
  /** Desktop-only secondary micro-signals. */
  allowSecondary?: boolean;
};

const ACTIVATE_MS = 320;
const CORE_HOLD_MS = 380;
const SETTLE_MS = 480;
const HOVER_RESUME_MS = 600;
const SECONDARY_MIN_MS = 7500;
const SECONDARY_MAX_MS = 11500;

function routeIndex(id: Capability["id"]) {
  return CAPABILITY_ROUTES.findIndex((r) => r.id === id);
}

function nextIndex(i: number) {
  return (i + 1) % CAPABILITY_ROUTES.length;
}

function travelDurations(route: CapabilityRoute, compact: boolean) {
  const scale = compact ? 0.82 : 1;
  const inbound = Math.round(route.durationMs * 0.33 * scale);
  const outbound = Math.round(route.durationMs * 0.3 * scale);
  return { inbound, outbound };
}

/**
 * Single controlled capability → core → output sequence.
 * One timeout chain. Clean pause / hover override / seamless loop.
 */
export function useCapabilitySequence({
  enabled,
  sectionActive,
  reduceMotion,
  compact,
  allowSecondary = false,
}: Options) {
  const [activeId, setActiveId] = useState<Capability["id"] | null>(null);
  const [routePhase, setRoutePhase] = useState<RoutePhase>("idle");
  const [corePulse, setCorePulse] = useState(false);
  const [primarySignal, setPrimarySignal] = useState<SignalLeg | null>(null);
  const [secondarySignal, setSecondarySignal] = useState<SignalLeg | null>(null);
  const [illuminateInbound, setIlluminateInbound] = useState<string | null>(
    null,
  );
  const [illuminateOutbound, setIlluminateOutbound] = useState<string | null>(
    null,
  );

  const indexRef = useRef(0);
  const activeIdRef = useRef<Capability["id"] | null>(null);
  const hoverIdRef = useRef<Capability["id"] | null>(null);
  const hoverPausedRef = useRef(false);
  const resumeTimerRef = useRef(0);
  const chainTimerRef = useRef(0);
  const secondaryTimerRef = useRef(0);
  const pulseTimerRef = useRef(0);
  const signalKeyRef = useRef(0);
  const runningRef = useRef(false);
  const genRef = useRef(0);

  const setActive = useCallback((id: Capability["id"] | null) => {
    activeIdRef.current = id;
    setActiveId(id);
  }, []);

  const clearChain = useCallback(() => {
    window.clearTimeout(chainTimerRef.current);
    chainTimerRef.current = 0;
  }, []);

  const clearSecondary = useCallback(() => {
    window.clearTimeout(secondaryTimerRef.current);
    secondaryTimerRef.current = 0;
  }, []);

  const pulseCore = useCallback(() => {
    setCorePulse(true);
    window.clearTimeout(pulseTimerRef.current);
    pulseTimerRef.current = window.setTimeout(() => setCorePulse(false), 480);
  }, []);

  const nextSignalKey = () => {
    signalKeyRef.current += 1;
    return signalKeyRef.current;
  };

  const runCycle = useCallback(
    (startIndex: number, generation: number) => {
      if (generation !== genRef.current) return;
      if (hoverPausedRef.current) return;
      if (!runningRef.current) return;

      const route = CAPABILITY_ROUTES[startIndex];
      if (!route) return;

      indexRef.current = startIndex;
      const { inbound, outbound } = travelDurations(route, compact);
      const fixed = ACTIVATE_MS + CORE_HOLD_MS + SETTLE_MS;
      const quiet = Math.max(
        180,
        route.durationMs - inbound - outbound - fixed,
      );

      const schedule = (ms: number, fn: () => void) => {
        clearChain();
        chainTimerRef.current = window.setTimeout(() => {
          if (generation !== genRef.current) return;
          if (hoverPausedRef.current) return;
          if (!runningRef.current) return;
          fn();
        }, ms);
      };

      // PHASE A — activate
      setActive(route.id);
      setRoutePhase("activate");
      setIlluminateInbound(route.inboundPath);
      setIlluminateOutbound(null);
      setPrimarySignal(null);

      schedule(ACTIVATE_MS, () => {
        // PHASE B+C — illuminate + inbound travel
        setRoutePhase("inbound");
        setPrimarySignal({
          pathId: route.inboundPath,
          key: nextSignalKey(),
          duration: inbound / 1000,
          reversed: false,
          kind: "primary",
        });

        schedule(inbound, () => {
          // PHASE D — core response
          setRoutePhase("core");
          setPrimarySignal(null);
          pulseCore();

          schedule(CORE_HOLD_MS, () => {
            // PHASE E — outbound
            setRoutePhase("outbound");
            setIlluminateOutbound(route.outboundPath);
            setPrimarySignal({
              pathId: route.outboundPath,
              key: nextSignalKey(),
              duration: outbound / 1000,
              reversed: false,
              kind: "primary",
            });

            schedule(outbound, () => {
              // PHASE F — settle
              setRoutePhase("settle");
              setPrimarySignal(null);

              schedule(SETTLE_MS, () => {
                // Soft settle — clear route wake first; keep activeId
                // until next cycle wakes (no all-off flash).
                setIlluminateInbound(null);
                setIlluminateOutbound(null);
                setRoutePhase("idle");

                const nxt = nextIndex(startIndex);
                indexRef.current = nxt;
                schedule(quiet, () => {
                  if (generation !== genRef.current) return;
                  runCycle(nxt, generation);
                });
              });
            });
          });
        });
      });
    },
    [clearChain, compact, pulseCore, setActive],
  );

  const stopRunning = useCallback(() => {
    runningRef.current = false;
    clearChain();
    setPrimarySignal(null);
  }, [clearChain]);

  const startRunning = useCallback(
    (fromIndex?: number) => {
      if (reduceMotion || !enabled) return;
      genRef.current += 1;
      const generation = genRef.current;
      runningRef.current = true;
      const idx =
        typeof fromIndex === "number" ? fromIndex : indexRef.current;
      runCycle(idx, generation);
    },
    [enabled, reduceMotion, runCycle],
  );

  // Master enable / visibility gate
  useEffect(() => {
    if (reduceMotion || !enabled) {
      stopRunning();
      setActive(null);
      setIlluminateInbound(null);
      setIlluminateOutbound(null);
      setRoutePhase("idle");
      return;
    }

    if (!sectionActive || hoverPausedRef.current) {
      stopRunning();
      return;
    }

    if (!runningRef.current) {
      startRunning(indexRef.current);
    }
  }, [enabled, sectionActive, reduceMotion, startRunning, stopRunning, setActive]);

  // Secondary micro-signal (desktop only, max one, desynced)
  useEffect(() => {
    if (!allowSecondary || reduceMotion || !enabled || !sectionActive) {
      clearSecondary();
      setSecondarySignal(null);
      return;
    }

    let cancelled = false;

    const scheduleSecondary = () => {
      clearSecondary();
      const wait =
        SECONDARY_MIN_MS +
        Math.random() * (SECONDARY_MAX_MS - SECONDARY_MIN_MS);
      secondaryTimerRef.current = window.setTimeout(() => {
        if (cancelled || hoverPausedRef.current) {
          scheduleSecondary();
          return;
        }
        const current = activeIdRef.current;
        const pool = CAPABILITY_ROUTES.filter((r) => r.id !== current);
        const pick =
          pool[Math.floor(Math.random() * pool.length)] ?? CAPABILITY_ROUTES[0];
        const dur = 2.4 + Math.random() * 0.8;
        setSecondarySignal({
          pathId: pick.inboundPath,
          key: nextSignalKey(),
          duration: dur,
          reversed: false,
          kind: "secondary",
        });
        secondaryTimerRef.current = window.setTimeout(() => {
          setSecondarySignal(null);
          scheduleSecondary();
        }, dur * 1000 + 200);
      }, wait);
    };

    scheduleSecondary();
    return () => {
      cancelled = true;
      clearSecondary();
    };
  }, [allowSecondary, reduceMotion, enabled, sectionActive, clearSecondary]);

  const overrideCapability = useCallback(
    (id: Capability["id"]) => {
      if (reduceMotion || !enabled) {
        setActive(id);
        return;
      }

      window.clearTimeout(resumeTimerRef.current);
      hoverPausedRef.current = true;
      hoverIdRef.current = id;
      stopRunning();

      const idx = routeIndex(id);
      if (idx < 0) return;
      indexRef.current = idx;

      const route = CAPABILITY_ROUTES[idx];
      const { inbound, outbound } = travelDurations(route, compact);

      genRef.current += 1;
      const generation = genRef.current;

      setActive(id);
      setRoutePhase("activate");
      setIlluminateInbound(route.inboundPath);
      setIlluminateOutbound(null);
      setPrimarySignal(null);

      clearChain();
      chainTimerRef.current = window.setTimeout(() => {
        if (generation !== genRef.current) return;
        setRoutePhase("inbound");
        setPrimarySignal({
          pathId: route.inboundPath,
          key: nextSignalKey(),
          duration: inbound / 1000,
          reversed: false,
          kind: "primary",
        });

        chainTimerRef.current = window.setTimeout(() => {
          if (generation !== genRef.current) return;
          setRoutePhase("core");
          setPrimarySignal(null);
          pulseCore();

          chainTimerRef.current = window.setTimeout(() => {
            if (generation !== genRef.current) return;
            setRoutePhase("outbound");
            setIlluminateOutbound(route.outboundPath);
            setPrimarySignal({
              pathId: route.outboundPath,
              key: nextSignalKey(),
              duration: outbound / 1000,
              reversed: false,
              kind: "primary",
            });

            chainTimerRef.current = window.setTimeout(() => {
              if (generation !== genRef.current) return;
              setRoutePhase("settle");
              setPrimarySignal(null);
              // Hold active while hovered — do not advance
            }, outbound);
          }, CORE_HOLD_MS);
        }, inbound);
      }, ACTIVATE_MS);
    },
    [compact, enabled, pulseCore, reduceMotion, stopRunning, clearChain, setActive],
  );

  const releaseOverride = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    const hovered = hoverIdRef.current;
    hoverIdRef.current = null;

    resumeTimerRef.current = window.setTimeout(() => {
      hoverPausedRef.current = false;
      if (!enabled || reduceMotion || !sectionActive) return;

      const from =
        hovered != null
          ? nextIndex(Math.max(0, routeIndex(hovered)))
          : nextIndex(indexRef.current);
      indexRef.current = from;
      startRunning(from);
    }, HOVER_RESUME_MS);
  }, [enabled, reduceMotion, sectionActive, startRunning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      genRef.current += 1;
      clearChain();
      clearSecondary();
      window.clearTimeout(resumeTimerRef.current);
      window.clearTimeout(pulseTimerRef.current);
    };
  }, [clearChain, clearSecondary]);

  return {
    activeId,
    routePhase,
    corePulse,
    primarySignal,
    secondarySignal,
    illuminateInbound,
    illuminateOutbound,
    overrideCapability,
    releaseOverride,
  };
}
