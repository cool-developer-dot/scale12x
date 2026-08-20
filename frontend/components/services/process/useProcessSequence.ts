"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "./data";

export type SignalLeg = {
  key: number;
  from: number;
  to: number;
  duration: number;
};

type Options = {
  enabled: boolean;
  sectionActive: boolean;
  reduceMotion: boolean;
  /** Vertical timeline uses different path endpoints. */
  vertical?: boolean;
};

const HOVER_RESUME_MS = 650;
const REENTRY_FADE_MS = 420;

/**
 * Single controlled process sequence.
 * React only updates on meaningful step / signal-leg changes.
 */
export function useProcessSequence({
  enabled,
  sectionActive,
  reduceMotion,
}: Options) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [signal, setSignal] = useState<SignalLeg | null>(null);
  const [illuminateTo, setIlluminateTo] = useState(0);

  const indexRef = useRef(0);
  const hoverPausedRef = useRef(false);
  const hoverIndexRef = useRef<number | null>(null);
  const resumeTimerRef = useRef(0);
  const chainTimerRef = useRef(0);
  const genRef = useRef(0);
  const runningRef = useRef(false);
  const signalKeyRef = useRef(0);

  const clearChain = useCallback(() => {
    window.clearTimeout(chainTimerRef.current);
    chainTimerRef.current = 0;
  }, []);

  const nextKey = () => {
    signalKeyRef.current += 1;
    return signalKeyRef.current;
  };

  const runLoop = useCallback(
    (startIndex: number, generation: number) => {
      if (generation !== genRef.current) return;
      if (hoverPausedRef.current || !runningRef.current) return;

      const step = PROCESS_STEPS[startIndex];
      if (!step) return;

      indexRef.current = startIndex;
      setActiveIndex(startIndex);
      setIlluminateTo(startIndex);

      const schedule = (ms: number, fn: () => void) => {
        clearChain();
        chainTimerRef.current = window.setTimeout(() => {
          if (generation !== genRef.current) return;
          if (hoverPausedRef.current || !runningRef.current) return;
          fn();
        }, ms);
      };

      // Hold at current node, then travel to next (or exit past 04)
      schedule(step.holdMs, () => {
        const isLast = startIndex >= PROCESS_STEPS.length - 1;
        const toIndex = isLast ? PROCESS_STEPS.length : startIndex + 1;
        const duration = step.travelMs / 1000;

        setSignal({
          key: nextKey(),
          from: startIndex,
          to: toIndex,
          duration,
        });

        // Illuminate progresses with the travel
        setIlluminateTo(toIndex > PROCESS_STEPS.length - 1 ? startIndex : toIndex);

        schedule(step.travelMs, () => {
          setSignal(null);

          if (isLast) {
            // Soft exit past Scale, then quiet re-entry from left
            schedule(REENTRY_FADE_MS, () => {
              setIlluminateTo(0);
              indexRef.current = 0;
              schedule(280, () => {
                if (generation !== genRef.current) return;
                runLoop(0, generation);
              });
            });
            return;
          }

          const nxt = startIndex + 1;
          indexRef.current = nxt;
          setActiveIndex(nxt);
          setIlluminateTo(nxt);
          runLoop(nxt, generation);
        });
      });
    },
    [clearChain],
  );

  const stopRunning = useCallback(() => {
    runningRef.current = false;
    clearChain();
    setSignal(null);
  }, [clearChain]);

  const startRunning = useCallback(
    (fromIndex?: number) => {
      if (reduceMotion || !enabled) return;
      genRef.current += 1;
      const generation = genRef.current;
      runningRef.current = true;
      const idx =
        typeof fromIndex === "number" ? fromIndex : indexRef.current;
      runLoop(idx, generation);
    },
    [enabled, reduceMotion, runLoop],
  );

  useEffect(() => {
    if (reduceMotion || !enabled) {
      stopRunning();
      setActiveIndex(0);
      setIlluminateTo(reduceMotion ? PROCESS_STEPS.length - 1 : 0);
      return;
    }

    if (!sectionActive || hoverPausedRef.current) {
      stopRunning();
      return;
    }

    if (!runningRef.current) {
      startRunning(indexRef.current);
    }
  }, [enabled, sectionActive, reduceMotion, startRunning, stopRunning]);

  const overrideStep = useCallback(
    (index: number) => {
      if (reduceMotion || !enabled) {
        setActiveIndex(index);
        setIlluminateTo(index);
        return;
      }

      window.clearTimeout(resumeTimerRef.current);
      hoverPausedRef.current = true;
      hoverIndexRef.current = index;
      stopRunning();

      indexRef.current = index;
      setActiveIndex(index);
      setIlluminateTo(index);
      setSignal(null);
    },
    [enabled, reduceMotion, stopRunning],
  );

  const releaseOverride = useCallback(() => {
    window.clearTimeout(resumeTimerRef.current);
    const hovered = hoverIndexRef.current;
    hoverIndexRef.current = null;

    resumeTimerRef.current = window.setTimeout(() => {
      hoverPausedRef.current = false;
      if (!enabled || reduceMotion || !sectionActive) return;

      const from =
        hovered != null
          ? (hovered + 1) % PROCESS_STEPS.length
          : (indexRef.current + 1) % PROCESS_STEPS.length;
      indexRef.current = from;
      startRunning(from);
    }, HOVER_RESUME_MS);
  }, [enabled, reduceMotion, sectionActive, startRunning]);

  useEffect(() => {
    return () => {
      genRef.current += 1;
      clearChain();
      window.clearTimeout(resumeTimerRef.current);
    };
  }, [clearChain]);

  return {
    activeIndex,
    signal,
    illuminateTo,
    overrideStep,
    releaseOverride,
  };
}
