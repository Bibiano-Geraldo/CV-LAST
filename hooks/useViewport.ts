"use client";

import { useEffect, useState } from "react";

export type Viewport = { w: number; isMobile: boolean; isCompact: boolean };

const SSR_DEFAULT: Viewport = { w: 1280, isMobile: false, isCompact: false };

export function useViewport(): Viewport {
  // Always start with the SSR default so the first client render matches the server.
  // Real viewport is read after mount in the effect below.
  const [v, setV] = useState<Viewport>(SSR_DEFAULT);
  useEffect(() => {
    const on = () => {
      const w = window.innerWidth;
      setV({ w, isMobile: w < 900, isCompact: w < 1180 });
    };
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return v;
}
