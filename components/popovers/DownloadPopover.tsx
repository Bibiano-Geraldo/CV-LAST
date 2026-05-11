"use client";

import type { RefObject } from "react";
import { I } from "@/components/icons";
import { Popover } from "./Popover";

const opts = [
  { label: "PDF (alta qualidade)", sub: "Recomendado para envio · 2 págs", primary: true },
  { label: "PDF — A4 sem fotos", sub: "Para sistemas ATS antigos" },
  { label: "DOCX", sub: "Editável no Word" },
  { label: "TXT simples", sub: "Sem formatação" },
];

export function DownloadPopover({
  open,
  anchor,
  onClose,
}: {
  open: boolean;
  anchor: RefObject<HTMLElement | null>;
  onClose: () => void;
}) {
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="bottom" align="end" width={280} offset={8} bottomSheetOnMobile>
      <div style={{ padding: 6 }}>
        {opts.map((o, i) => (
          <button
            key={i}
            onClick={onClose}
            style={{ display: "flex", width: "100%", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 7, background: "transparent", border: 0, textAlign: "left" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tint)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <I.Download size={15} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: o.primary ? 600 : 500 }}>{o.label}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{o.sub}</div>
            </div>
            {o.primary && (
              <span className="chip lime" style={{ height: 20, fontSize: 10.5, padding: "0 7px" }}>recomendado</span>
            )}
          </button>
        ))}
      </div>
    </Popover>
  );
}
