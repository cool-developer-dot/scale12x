"use client";

import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SPLINE_SCENE =
  "https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode";

const SCENE_BG = "#05070d";

type QualityTier = "high" | "mid" | "low";

type HeroSplineBackgroundProps = {
  sampleTargetRef?: RefObject<HTMLElement | null>;
  onLumaChange?: (luma: number) => void;
};

type SplineRenderer = {
  setPixelRatio: (ratio: number) => void;
  setSize?: (width: number, height: number, updateStyle?: boolean) => void;
  shadowMap?: { enabled: boolean };
  pipeline?: {
    taaPass?: { enabled: boolean };
    postprocessingState?: Record<string, unknown>;
    updatePostprocessing?: (state: Record<string, unknown>) => void;
  };
};

type SplineAppInternal = Application & {
  _renderer?: SplineRenderer;
  renderMode?: "auto" | "manual" | "continuous";
};

/** Baseline postprocessing captured once per Application (pre-tuning). */
const baselinePp = new WeakMap<object, Record<string, unknown>>();

const MOBILE_VIEWPORT_MQ = "(max-width: 767px)";

function isCoarsePointer(): boolean {
  return window.matchMedia("(pointer: coarse)").matches;
}

function isNarrowViewport(): boolean {
  return window.matchMedia(MOBILE_VIEWPORT_MQ).matches;
}

function isTabletViewport(): boolean {
  return window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches;
}

/**
 * Skip Spline entirely on mobile (≤767px) and capability constraints.
 * Mobile must not mount / load / run the scene — CSS hide is not enough.
 */
function shouldSkipHeavyScene(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia(MOBILE_VIEWPORT_MQ).matches) return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };

  if (nav.connection?.saveData) return true;
  const type = nav.connection?.effectiveType;
  if (type === "slow-2g" || type === "2g") return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return true;
  if (
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency <= 2
  ) {
    return true;
  }

  return false;
}

function resolveQualityTier(): QualityTier {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: { effectiveType?: string };
  };

  if (isNarrowViewport() || isCoarsePointer()) return "low";

  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory;
  const slowNet =
    nav.connection?.effectiveType === "3g" ||
    nav.connection?.effectiveType === "2g";

  if (slowNet || (typeof mem === "number" && mem <= 4) || cores <= 4) {
    return "mid";
  }

  if (isTabletViewport()) return "mid";
  return "high";
}

/**
 * Backing-pixel budgets so large viewports drop DPR before GPU fill explodes.
 * High budget = 1080p × cover 1.4 × DPR 2 (Retina native at the common hero size).
 */
const HIGH_BACKING_BUDGET = 1920 * 1080 * 1.4 * 1.4 * 2 * 2;
const MID_BACKING_BUDGET = 1920 * 1080 * 1.4 * 1.4 * 1.75 * 1.75;
const LOW_BACKING_BUDGET = 1920 * 1080 * 1.4 * 1.4 * 1.25 * 1.25;

function snapDpr(value: number): number {
  return Math.min(2, Math.max(1, Math.round(value * 4) / 4));
}

function capDprByBackingArea(
  maxDpr: number,
  cssW: number,
  cssH: number,
  budget: number,
): number {
  const area = Math.max(1, cssW * cssH);
  return snapDpr(Math.min(maxDpr, Math.sqrt(budget / area)));
}

/**
 * Adaptive DPR: Retina-native on capable desktops, area-capped on large viewports.
 * Pass cover-scaled CSS size (the setSize args) so the budget matches the buffer.
 * Never allow uncontrolled devicePixelRatio (e.g. 3× phones).
 */
function resolveAdaptiveDpr(
  tier: QualityTier,
  cssW: number,
  cssH: number,
): number {
  const native = window.devicePixelRatio || 1;

  if (tier === "low") {
    return capDprByBackingArea(
      Math.min(native, 1.25),
      cssW,
      cssH,
      LOW_BACKING_BUDGET,
    );
  }

  if (tier === "mid") {
    const maxCap = isTabletViewport() ? 1.5 : 1.75;
    return capDprByBackingArea(
      Math.min(native, maxCap),
      cssW,
      cssH,
      MID_BACKING_BUDGET,
    );
  }

  const cores =
    (navigator as Navigator & { hardwareConcurrency?: number })
      .hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const powerful = cores >= 8 && (mem === undefined || mem >= 8);
  const maxCap = powerful ? 2 : 1.75;

  return capDprByBackingArea(
    Math.min(native, maxCap),
    cssW,
    cssH,
    HIGH_BACKING_BUDGET,
  );
}

function cloneEffect(
  effect: unknown,
  patch: Record<string, unknown>,
): Record<string, unknown> | undefined {
  if (!effect || typeof effect !== "object") return undefined;
  return { ...(effect as Record<string, unknown>), ...patch };
}

function deepClonePp(state: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(JSON.stringify(state)) as Record<string, unknown>;
}

/**
 * CSS cover scale on `.hero-spline__canvas` (inherited by the WebGL canvas).
 * Buffer size must use this so backing pixels match the post-scale footprint.
 */
function readHeroSplineCover(el: HTMLElement): number {
  const raw = getComputedStyle(el).getPropertyValue("--hero-spline-cover").trim();
  const cover = Number.parseFloat(raw);
  if (!Number.isFinite(cover) || cover <= 0) return 1;
  return cover;
}

function syncRenderResolution(app: Application, tier: QualityTier): void {
  const internal = app as SplineAppInternal;
  const renderer = internal._renderer;
  if (!renderer) return;

  internal.renderMode = "continuous";

  const canvas = app.canvas;
  const parent = canvas?.parentElement;
  if (canvas && parent && typeof renderer.setSize === "function") {
    const cover = readHeroSplineCover(canvas);
    const w = Math.max(1, Math.round(parent.clientWidth * cover));
    const h = Math.max(1, Math.round(parent.clientHeight * cover));
    renderer.setPixelRatio(resolveAdaptiveDpr(tier, w, h));
    renderer.setSize(w, h, false);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    return;
  }

  renderer.setPixelRatio(
    resolveAdaptiveDpr(tier, window.innerWidth, window.innerHeight),
  );
}

/**
 * Strip muddy post-FX; keep the particle sculpture crisp.
 * Uses Spline runtime pipeline APIs (same path the editor uses).
 * Always derives from a one-time baseline so resize cannot compound bloom cuts.
 */
function applySharpQuality(app: Application, tier: QualityTier): void {
  const internal = app as SplineAppInternal;
  const renderer = internal._renderer;
  if (!renderer) return;

  syncRenderResolution(app, tier);

  if (renderer.shadowMap && tier !== "high") {
    renderer.shadowMap.enabled = false;
  }

  const pipeline = renderer.pipeline;
  if (!pipeline) return;

  // TAA softens particle edges into a smear — prefer SMAA-only sharpness
  if (pipeline.taaPass) {
    pipeline.taaPass.enabled = false;
  }

  const live = pipeline.postprocessingState;
  if (!live || typeof pipeline.updatePostprocessing !== "function") return;

  if (!baselinePp.has(app)) {
    baselinePp.set(app, deepClonePp(live));
  }
  const state = baselinePp.get(app)!;

  /** Highlight-only bloom: high threshold, tight Kawase, low intensity. */
  const bloomTune =
    tier === "high"
      ? {
          intensityScale: 0.22,
          intensityMax: 0.28,
          blurScale: 0.28,
          threshold: 0.68,
          smoothing: 0.04,
          kernel: 1,
        }
      : tier === "mid"
        ? {
            intensityScale: 0.16,
            intensityMax: 0.22,
            blurScale: 0.24,
            threshold: 0.72,
            smoothing: 0.035,
            kernel: 1,
          }
        : {
            intensityScale: 0.12,
            intensityMax: 0.16,
            blurScale: 0.2,
            threshold: 0.76,
            smoothing: 0.03,
            kernel: 0,
          };

  const next: Record<string, unknown> = {
    ...state,
    enabled: Boolean(state.enabled),
    depthOfField: cloneEffect(state.depthOfField, { enabled: false }),
    chromaticAberration: cloneEffect(state.chromaticAberration, {
      enabled: false,
    }),
    pixelation: cloneEffect(state.pixelation, { enabled: false }),
    noise: cloneEffect(state.noise, { enabled: false }),
    hueSaturation: cloneEffect(state.hueSaturation, { enabled: false }),
  };

  const bloom = state.bloom as Record<string, unknown> | undefined;
  if (bloom) {
    const intensity =
      typeof bloom.intensity === "number" ? bloom.intensity : 1;
    const bloomOn = Boolean(bloom.enabled);
    next.bloom = {
      ...bloom,
      enabled: bloomOn,
      intensity: bloomOn
        ? Math.min(intensity * bloomTune.intensityScale, bloomTune.intensityMax)
        : intensity,
      blurScale: Math.min(
        typeof bloom.blurScale === "number" ? bloom.blurScale : 1,
        bloomTune.blurScale,
      ),
      luminanceThreshold: Math.max(
        typeof bloom.luminanceThreshold === "number"
          ? bloom.luminanceThreshold
          : 0.25,
        bloomTune.threshold,
      ),
      luminanceSmoothing: bloomTune.smoothing,
      kernelSize: Math.min(
        typeof bloom.kernelSize === "number" ? bloom.kernelSize : 3,
        bloomTune.kernel,
      ),
    };
  }

  const vignette = state.vignette as Record<string, unknown> | undefined;
  if (vignette) {
    next.vignette = cloneEffect(vignette, {
      enabled: Boolean(vignette.enabled) && tier === "high",
      darkness: Math.min(
        typeof vignette.darkness === "number" ? vignette.darkness : 1,
        0.35,
      ),
    });
  }

  const bc = state.brightnessContrast as Record<string, unknown> | undefined;
  if (bc) {
    next.brightnessContrast = cloneEffect(bc, {
      enabled: Boolean(bc.enabled) && tier === "high",
      brightness: 0,
      contrast: 0.08,
    });
  }

  pipeline.updatePostprocessing(next);
}

/**
 * Spline galaxy backdrop — sharp adaptive DPR, highlight-only bloom,
 * pauses offscreen / hidden-tab, reports luma for adaptive hero text.
 *
 * Note: “Built with Spline” watermark is baked into this scene export
 * (SplineWatermark). Removal requires a paid Spline plan + re-export with
 * Play Settings → Hide Spline Logo. We do not CSS-cover or clear the watermark.
 */
export default function HeroSplineBackground({
  sampleTargetRef,
  onLumaChange,
}: HeroSplineBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const probeRef = useRef<HTMLCanvasElement | null>(null);
  const gateTimerRef = useRef(0);
  const qualityRef = useRef<QualityTier>("high");
  const tunedRef = useRef(false);
  const onLumaRef = useRef(onLumaChange);
  onLumaRef.current = onLumaChange;

  // true until client capability checks run — solid fallback only
  const [skipScene, setSkipScene] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const mobileMq = window.matchMedia(MOBILE_VIEWPORT_MQ);
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applySkip = () => {
      const skip = shouldSkipHeavyScene();
      qualityRef.current = resolveQualityTier();
      setSkipScene(skip);
      if (skip) {
        // Drop WebGL so a later desktop resize remounts cleanly
        appRef.current = null;
        tunedRef.current = false;
        setReady(false);
        setGateOpen(false);
      }
    };

    applySkip();
    setMounted(true);

    mobileMq.addEventListener("change", applySkip);
    mqReduce.addEventListener("change", applySkip);
    return () => {
      mobileMq.removeEventListener("change", applySkip);
      mqReduce.removeEventListener("change", applySkip);
    };
  }, []);

  const syncPlayback = useCallback(() => {
    const app = appRef.current;
    if (!app) return;

    const visible = document.visibilityState === "visible";
    const rect = rootRef.current?.getBoundingClientRect();
    const inView = rect
      ? rect.bottom > 40 && rect.top < window.innerHeight - 40
      : true;

    if (visible && inView) {
      app.play();
      (app as SplineAppInternal).renderMode = "continuous";
    } else {
      app.stop();
    }
  }, []);

  const handleLoad = useCallback(
    (app: Application) => {
      appRef.current = app;
      try {
        app.setBackgroundColor(SCENE_BG);
      } catch {
        // ignore
      }

      qualityRef.current = resolveQualityTier();
      try {
        applySharpQuality(app, qualityRef.current);
        tunedRef.current = true;
      } catch {
        // Scene still usable if quality hooks fail
      }

      // Coarse pointers: drop mouse orbit cost; keep base animation
      if (isCoarsePointer()) {
        try {
          app.setGlobalEvents(false);
        } catch {
          // ignore
        }
      }

      setReady(true);
      syncPlayback();

      if (gateTimerRef.current) window.clearTimeout(gateTimerRef.current);
      gateTimerRef.current = window.setTimeout(() => {
        gateTimerRef.current = 0;
        setGateOpen(true);
      }, 180);
    },
    [syncPlayback],
  );

  useEffect(() => {
    return () => {
      if (gateTimerRef.current) window.clearTimeout(gateTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (skipScene || !ready) return;

    syncPlayback();

    const onVisibility = () => syncPlayback();
    document.addEventListener("visibilitychange", onVisibility);

    const root = rootRef.current;
    const io =
      root &&
      new IntersectionObserver(
        ([entry]) => {
          const app = appRef.current;
          if (!app) return;
          if (entry?.isIntersecting && document.visibilityState === "visible") {
            app.play();
            (app as SplineAppInternal).renderMode = "continuous";
          } else {
            app.stop();
          }
        },
        { threshold: 0.08, rootMargin: "24px" },
      );

    if (root && io) io.observe(root);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
    };
  }, [skipScene, ready, syncPlayback]);

  // Debounced resize — DPR/size always; full PP retune only when tier changes
  useEffect(() => {
    if (skipScene || !ready) return;

    const root = rootRef.current;
    if (!root) return;

    let timer = 0;
    let lastW = 0;
    let lastH = 0;
    let lastCover = 0;
    let lastTier = qualityRef.current;

    const apply = () => {
      const app = appRef.current;
      if (!app) return;
      const coverEl =
        app.canvas ??
        root.querySelector<HTMLElement>(".hero-spline__canvas") ??
        root;
      const cover = readHeroSplineCover(coverEl);
      const w = Math.round(root.clientWidth * cover);
      const h = Math.round(root.clientHeight * cover);
      const tier = resolveQualityTier();
      const sizeChanged =
        Math.abs(w - lastW) >= 2 ||
        Math.abs(h - lastH) >= 2 ||
        Math.abs(cover - lastCover) >= 0.01;
      const tierChanged = tier !== lastTier;

      if (!sizeChanged && !tierChanged) return;
      lastW = w;
      lastH = h;
      lastCover = cover;
      lastTier = tier;
      qualityRef.current = tier;

      try {
        if (tierChanged || !tunedRef.current) {
          applySharpQuality(app, tier);
          tunedRef.current = true;
        } else {
          syncRenderResolution(app, tier);
        }
      } catch {
        // ignore
      }
      syncPlayback();
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(apply, 120);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(root);

    const coverMqs = [
      window.matchMedia("(min-aspect-ratio: 16/9)"),
      window.matchMedia("(max-aspect-ratio: 3/4)"),
    ];
    for (const mq of coverMqs) mq.addEventListener("change", schedule);

    return () => {
      window.clearTimeout(timer);
      ro.disconnect();
      for (const mq of coverMqs) mq.removeEventListener("change", schedule);
    };
  }, [skipScene, ready, syncPlayback]);

  // Sparse luminance sampling — interval only, no permanent RAF / setState storm
  useEffect(() => {
    if (skipScene || !ready || !gateOpen) {
      onLumaRef.current?.(0.08);
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    let timer = 0;
    let lastBucket = -1;
    let inView = true;

    const probe =
      probeRef.current ??
      (() => {
        const c = document.createElement("canvas");
        c.width = 12;
        c.height = 9;
        probeRef.current = c;
        return c;
      })();

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.05 },
    );
    io.observe(root);

    const sample = () => {
      if (!inView || document.visibilityState !== "visible") return;

      const glCanvas = root.querySelector("canvas");
      const target = sampleTargetRef?.current;
      if (!glCanvas || !target) return;

      const ctx = probe.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const rootBox = root.getBoundingClientRect();
      const textBox = target.getBoundingClientRect();
      const cover = readHeroSplineCover(glCanvas);
      const scaleX = glCanvas.width / Math.max(rootBox.width * cover, 1);
      const scaleY = glCanvas.height / Math.max(rootBox.height * cover, 1);

      const sx = Math.max(0, (textBox.left - rootBox.left) * scaleX);
      const sy = Math.max(0, (textBox.top - rootBox.top) * scaleY);
      const sw = Math.max(1, textBox.width * scaleX);
      const sh = Math.max(1, textBox.height * scaleY);

      try {
        ctx.clearRect(0, 0, probe.width, probe.height);
        ctx.drawImage(
          glCanvas,
          sx,
          sy,
          sw,
          sh,
          0,
          0,
          probe.width,
          probe.height,
        );
        const { data } = ctx.getImageData(0, 0, probe.width, probe.height);
        let sum = 0;
        const step = 4 * 8;
        for (let i = 0; i < data.length; i += step) {
          const r = data[i] ?? 0;
          const g = data[i + 1] ?? 0;
          const b = data[i + 2] ?? 0;
          sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
        }
        const luma = sum / ((data.length / step) * 255);
        const bucket = Math.round(luma * 12);
        if (bucket !== lastBucket) {
          lastBucket = bucket;
          onLumaRef.current?.(luma);
        }
      } catch {
        if (lastBucket !== 1) {
          lastBucket = 1;
          onLumaRef.current?.(0.1);
        }
      }
    };

    timer = window.setInterval(sample, 480);
    sample();

    return () => {
      window.clearInterval(timer);
      io.disconnect();
    };
  }, [skipScene, ready, gateOpen, sampleTargetRef]);

  return (
    <div ref={rootRef} className="hero-spline" aria-hidden="true">
      <div className="hero-spline__fallback" />

      {mounted && !skipScene && (
        <Suspense fallback={null}>
          <div className={`hero-spline__canvas${ready ? " is-ready" : ""}`}>
            <Spline
              scene={SPLINE_SCENE}
              onLoad={handleLoad}
              renderOnDemand={false}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Suspense>
      )}

      <div
        className={`hero-spline__gate${gateOpen || skipScene ? " is-open" : ""}`}
      />
    </div>
  );
}
