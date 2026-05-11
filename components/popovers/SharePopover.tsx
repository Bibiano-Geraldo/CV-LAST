"use client";

import { useState, type RefObject } from "react";
import { I } from "@/components/icons";
import { Popover } from "./Popover";

export function SharePopover({
  open,
  anchor,
  onClose,
}: {
  open: boolean;
  anchor: RefObject<HTMLElement | null>;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const url = "folio.so/r/aicha-2026-lead-designer";
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="bottom" align="end" width={340} offset={8} bottomSheetOnMobile>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Partilhar este currículo</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>Qualquer pessoa com o link pode ver — não edita.</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px 6px 10px", background: "var(--bg-tint)", borderRadius: 8, border: "1px solid var(--line-soft)" }}>
          <I.Link size={14} />
          <span style={{ flex: 1, fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--ink-2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{url}</span>
          <button
            className="btn"
            style={{ height: 28, padding: "0 9px", fontSize: 11.5 }}
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }}
          >
            {copied ? (<><I.Check size={13} /> Copiado</>) : (<><I.Copy size={13} /> Copiar</>)}
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "var(--ink-2)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" defaultChecked style={{ accentColor: "var(--brand)" }} />
            Permitir descarregar PDF
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" style={{ accentColor: "var(--brand)" }} />
            Expira em 30 dias
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6, borderTop: "1px solid var(--line-soft)" }}>
          <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--font-mono)" }}>4 visualizações esta semana</span>
          <button className="btn ghost" style={{ height: 26, fontSize: 11.5, padding: "0 6px" }}>
            <I.Settings size={12} /> Mais opções
          </button>
        </div>
      </div>
    </Popover>
  );
}
