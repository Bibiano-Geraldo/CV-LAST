"use client";

import { useSyncExternalStore } from "react";

export type Viewport = { w: number; isMobile: boolean; isCompact: boolean };

const SSR_DEFAULT: Viewport = { w: 1280, isMobile: false, isCompact: false };

let cachedSnapshot: Viewport | null = null;

function compute(w: number): Viewport {
  return { w, isMobile: w < 900, isCompact: w < 1180 };
}

function subscribe(cb: () => void): () => void {
  const onResize = () => {
    cachedSnapshot = compute(window.innerWidth);
    cb();
  };
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);
  return () => {
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
  };
}

function getSnapshot(): Viewport {
  const w = window.innerWidth;
  if (!cachedSnapshot || cachedSnapshot.w !== w) {
    cachedSnapshot = compute(w);
  }
  return cachedSnapshot;
}

function getServerSnapshot(): Viewport {
  return SSR_DEFAULT;
}

export function useViewport(): Viewport {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
