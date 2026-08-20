"use client";

import { useEffect, useRef, useState } from "react";
import {
  getCalendlyEmbedUrl,
  getCalendlyFrameHeight,
} from "@/lib/booking";

const embedUrl = getCalendlyEmbedUrl();

type CalendlyMessage = {
  event?: string;
  payload?: { height?: number };
};

function isCalendlyOrigin(origin: string) {
  return origin.includes("calendly.com");
}

export default function CalendlyEmbed() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(720);
  const readyRef = useRef(false);

  useEffect(() => {
    const root = frameRef.current?.parentElement;
    if (!root) return;

    const applyHeight = (value: number) => {
      const next = Math.ceil(value);
      setHeight(next);
      root.style.minHeight = `${next}px`;
      if (frameRef.current) {
        frameRef.current.style.height = `${next}px`;
      }
    };

    applyHeight(getCalendlyFrameHeight(window.innerWidth));

    const markReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      root.dataset.ready = "true";
    };

    const onMessage = (event: MessageEvent) => {
      if (!isCalendlyOrigin(String(event.origin || ""))) return;
      markReady();

      let data: CalendlyMessage | null = null;
      if (typeof event.data === "string") {
        try {
          data = JSON.parse(event.data) as CalendlyMessage;
        } catch {
          return;
        }
      } else if (event.data && typeof event.data === "object") {
        data = event.data as CalendlyMessage;
      }

      const nextHeight = data?.payload?.height;
      if (
        data?.event === "calendly.page_height" &&
        typeof nextHeight === "number" &&
        nextHeight > 480
      ) {
        applyHeight(nextHeight);
      }
    };

    const onResize = () => {
      if (readyRef.current) return;
      applyHeight(getCalendlyFrameHeight(window.innerWidth));
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("resize", onResize, { passive: true });

    const fallback = window.setTimeout(markReady, 1200);

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      className="book-calendly"
      data-ready="false"
      style={{ minHeight: height }}
    >
      <p className="book-calendly__loading" aria-live="polite">
        Loading scheduling availability…
      </p>

      <iframe
        ref={frameRef}
        title="Schedule a strategy call with Scale12x"
        src={embedUrl}
        className="book-calendly__iframe"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ height }}
      />
    </div>
  );
}
