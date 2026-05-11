"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

export type PopoverProps = {
  open: boolean;
  onClose?: () => void;
  anchor: RefObject<HTMLElement | null>;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  offset?: number;
  width?: number;
  bottomSheetOnMobile?: boolean;
};

export function Popover({
  open,
  onClose,
  anchor,
  children,
  side = "bottom",
  align = "end",
  offset = 8,
  width,
  bottomSheetOnMobile = false,
}: PopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [isSheet, setIsSheet] = useState<boolean>(
    () => bottomSheetOnMobile && typeof window !== "undefined" && window.innerWidth < 900,
  );
  const [effW, setEffW] = useState<number>(width ?? 260);

  useEffect(() => {
    if (!bottomSheetOnMobile) return;
    const on = () => setIsSheet(window.innerWidth < 900);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bottomSheetOnMobile]);

  useLayoutEffect(() => {
    if (!open || isSheet || !anchor.current) return;
    const r = anchor.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const reqW = width ?? 260;
    const W = Math.min(reqW, vw - 24);
    setEffW(W);
    const H = ref.current?.offsetHeight ?? 260;
    let top = 0;
    let left = 0;

    if (side === "bottom") top = r.bottom + offset;
    if (side === "top") top = r.top - offset - H;
    if (side === "right") { top = r.top; left = r.right + offset; }
    if (side === "left") { top = r.top; left = r.left - offset - W; }

    if (side === "bottom" || side === "top") {
      if (align === "start") left = r.left;
      if (align === "end") left = r.right - W;
      if (align === "center") left = r.left + r.width / 2 - W / 2;
    }

    if (side === "bottom" && top + H > vh - 12) top = Math.max(12, r.top - offset - H);
    if (side === "top" && top < 12) top = r.bottom + offset;
    if ((side === "right" || side === "left") && top + H > vh - 12) top = Math.max(12, vh - H - 12);

    left = Math.max(12, Math.min(left, vw - W - 12));

    setPos({ top, left });
  }, [open, anchor, side, align, offset, width, isSheet]);

  useLayoutEffect(() => {
    if (!open || !ref.current || !anchor.current) return;
    const r = anchor.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const H = ref.current.offsetHeight;
    let top = pos.top;
    if (side === "bottom" && r.bottom + offset + H > vh - 12) top = Math.max(12, r.top - offset - H);
    if ((side === "right" || side === "left") && top + H > vh - 12) top = Math.max(12, vh - H - 12);
    if (top !== pos.top) setPos((p) => ({ ...p, top }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t)) return;
      if (anchor.current?.contains(t)) return;
      onClose?.();
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose, anchor]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  if (isSheet) {
    return createPortal(
      <>
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(15,16,12,.32)",
            zIndex: 69,
            animation: "fadeIn .18s ease",
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
          }}
        />
        <div
          ref={ref}
          className="caret-pop"
          style={{
            position: "fixed",
            left: 0, right: 0, bottom: 0, top: "auto",
            width: "100%", maxWidth: "100%",
            maxHeight: "85dvh",
            borderRadius: "16px 16px 0 0",
            overflowY: "auto",
            zIndex: 70,
            paddingBottom: "env(safe-area-inset-bottom)",
            animation: "slideUp .22s cubic-bezier(.2,.9,.3,1)",
          }}
        >
          <div
            style={{
              display: "flex", justifyContent: "center", padding: "8px 0 4px",
              position: "sticky", top: 0, background: "var(--bg-elev)", zIndex: 1,
            }}
          >
            <div style={{ width: 36, height: 4, borderRadius: 99, background: "var(--line)" }} />
          </div>
          {children}
        </div>
      </>,
      document.body,
    );
  }

  return createPortal(
    <div
      ref={ref}
      className="caret-pop"
      style={{
        top: pos.top,
        left: pos.left,
        width: effW,
        maxWidth: "calc(100vw - 24px)",
        maxHeight: "calc(100dvh - 24px)",
        overflowY: "auto",
        animation: "popIn .14s cubic-bezier(.2,.9,.3,1)",
      }}
    >
      {children}
    </div>,
    document.body,
  );
}
