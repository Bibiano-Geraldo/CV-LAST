"use client";

import type { RefObject } from "react";
import { I } from "@/components/icons";
import type { TemplateId } from "@/types/cv";
import { TEMPLATES } from "@/components/templates";
import { MiniTemplate } from "@/components/templates/MiniTemplate";
import { Popover } from "./Popover";

export function TemplatePopover({
  open,
  anchor,
  onClose,
  value,
  onChange,
  accent,
  onOpenCustomize,
}: {
  open: boolean;
  anchor: RefObject<HTMLElement | null>;
  onClose: () => void;
  value: TemplateId;
  onChange: (v: TemplateId) => void;
  accent: string;
  onOpenCustomize?: () => void;
}) {
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="bottom" align="end" width={420} offset={8} bottomSheetOnMobile>
      <div style={{ padding: "12px 14px 8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Modelo</div>
          <button
            className="btn ghost"
            style={{ height: 24, fontSize: 11.5, padding: "0 8px" }}
            onClick={() => {
              onOpenCustomize?.();
              onClose();
            }}
          >
            <I.Palette size={12} /> Personalizar
          </button>
        </div>
      </div>
      <div style={{ padding: "4px 10px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {(Object.entries(TEMPLATES) as [TemplateId, (typeof TEMPLATES)[TemplateId]][]).map(([id, t]) => {
          const selected = id === value;
          return (
            <button
              key={id}
              onClick={() => {
                onChange(id);
                onClose();
              }}
              style={{
                padding: 8,
                borderRadius: 9,
                border: selected ? `1.5px solid ${accent}` : "1px solid var(--line)",
                background: "var(--bg-elev)",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ aspectRatio: "1/1.41", borderRadius: 5, overflow: "hidden", background: "#fff", border: "1px solid var(--line-soft)", boxShadow: "0 1px 2px rgba(0,0,0,.04)", display: "flex" }}>
                <MiniTemplate id={id} accent={accent} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{t.sub}</div>
                </div>
                {selected && <I.Check size={14} style={{ color: accent }} />}
              </div>
            </button>
          );
        })}
      </div>
    </Popover>
  );
}

