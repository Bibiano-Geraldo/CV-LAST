"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { I } from "@/components/icons";
import { useViewport } from "@/hooks/useViewport";

const palette = ["#1A6D75", "#0F4A50", "#3B4A6B", "#7A4F22", "#9A3B3B", "#3A4A2A", "#1a1816"];
const fonts = ["DM Sans", "Inter", "Fraunces", "Geist", "Helvetica"];
const margins = ["Estreita", "Padrão", "Larga"];

export function CustomizePanel({
  open,
  onClose,
  accent,
  onAccent,
  fontSize,
  onFontSize,
  lineHeight,
  onLineHeight,
  density,
  onDensity,
}: {
  open: boolean;
  onClose: () => void;
  accent: string;
  onAccent: (v: string) => void;
  fontSize: number;
  onFontSize: (v: number) => void;
  lineHeight: number;
  onLineHeight: (v: number) => void;
  density: string;
  onDensity: (v: string) => void;
}) {
  const vp = useViewport();
  const isMobile = vp.isMobile;
  const panelRef = useRef<HTMLDivElement>(null);

  const [font, setFont] = useState("DM Sans");
  const [margin, setMargin] = useState("Padrão");
  const [showPhoto, setShowPhoto] = useState(true);
  const [showColorHeader, setShowColorHeader] = useState(true);
  const [showAiComments, setShowAiComments] = useState(true);
  const [showWatermark, setShowWatermark] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || isMobile) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (!t || !panelRef.current) return;
      if (panelRef.current.contains(t)) return;
      // Ignore clicks on the trigger button (so it can toggle, not double-fire)
      const trigger = (t as HTMLElement).closest?.('[data-customize-trigger]');
      if (trigger) return;
      onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, isMobile, onClose]);

  if (!open) return null;

  const body = (
    <>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 10px", borderBottom: "1px solid var(--line-soft)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <I.Palette size={15} />
          <span style={{ fontWeight: 600, fontSize: 13 }}>Personalizar modelo</span>
        </div>
        {!isMobile && (
          <button className="icon-btn" onClick={onClose} aria-label="Fechar" style={{ width: 26, height: 26 }}>
            <I.Close size={14} />
          </button>
        )}
      </header>

      <div style={{ padding: "12px 14px 16px", display: "flex", flexDirection: "column", gap: 18, overflowY: "auto", flex: 1 }}>
        <Section title="Cor de acento">
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {palette.map((c) => (
              <button
                key={c}
                onClick={() => onAccent(c)}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: c,
                  border: c === accent ? "2px solid var(--ink)" : "1px solid var(--line)",
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,.5)",
                }}
              >
                {c === accent && <I.Check size={12} style={{ color: "#fff", filter: "drop-shadow(0 1px 1px rgba(0,0,0,.3))" }} />}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Tipografia">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {fonts.map((f) => (
              <button
                key={f}
                onClick={() => setFont(f)}
                style={{
                  height: 30, fontSize: 12, fontFamily: f,
                  border: f === font ? "1.5px solid var(--brand)" : "1px solid var(--line)",
                  borderRadius: 7,
                  background: f === font ? "var(--bg-tint)" : "var(--bg-elev)",
                  color: "var(--ink)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Tamanho do texto" right={fontSize + "%"}>
          <input
            type="range" min={85} max={120} value={fontSize}
            onChange={(e) => onFontSize(+e.target.value)}
            style={{ width: "100%", accentColor: "var(--brand)" }}
          />
        </Section>

        <Section title="Espaçamento entre linhas" right={lineHeight.toFixed(2)}>
          <input
            type="range" min={1.2} max={1.8} step={0.05} value={lineHeight}
            onChange={(e) => onLineHeight(+e.target.value)}
            style={{ width: "100%", accentColor: "var(--brand)" }}
          />
        </Section>

        <Section title="Densidade">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderRadius: 8, padding: 2, background: "var(--bg-tint)" }}>
            {["Compacto", "Regular", "Espaçoso"].map((d) => (
              <button
                key={d}
                onClick={() => onDensity(d)}
                style={{
                  height: 28, fontSize: 11.5, fontWeight: 500,
                  border: 0, borderRadius: 6,
                  background: d === density ? "var(--bg-elev)" : "transparent",
                  color: "var(--ink-2)",
                  boxShadow: d === density ? "0 1px 2px rgba(0,0,0,.06)" : "none",
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Margens da página">
          <div style={{ display: "flex", gap: 4 }}>
            {margins.map((m) => (
              <button
                key={m}
                onClick={() => setMargin(m)}
                style={{
                  flex: 1, height: 28, fontSize: 11.5,
                  border: m === margin ? "1.5px solid var(--brand)" : "1px solid var(--line)",
                  borderRadius: 7,
                  background: m === margin ? "var(--bg-tint)" : "var(--bg-elev)",
                  color: "var(--ink-2)",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Mostrar">
          <Toggle label="Foto de perfil" value={showPhoto} onChange={setShowPhoto} />
          <Toggle label="Cabeçalho colorido" value={showColorHeader} onChange={setShowColorHeader} />
          <Toggle label="Comentários da IA" value={showAiComments} onChange={setShowAiComments} />
          <Toggle label="Marca d'água «criado em Folio»" value={showWatermark} onChange={setShowWatermark} />
        </Section>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(15,16,12,.32)", zIndex: 69,
            animation: "fadeIn .18s ease",
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
          }}
        />
        <div
          className="caret-pop"
          role="dialog"
          aria-label="Personalizar modelo"
          style={{
            position: "fixed",
            left: 0, right: 0, bottom: 0, top: "auto",
            width: "100%", maxWidth: "100%",
            maxHeight: "85dvh",
            borderRadius: "16px 16px 0 0",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
            zIndex: 70,
            paddingBottom: "env(safe-area-inset-bottom)",
            animation: "slideUp .22s cubic-bezier(.2,.9,.3,1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 4px", background: "var(--bg-elev)", flexShrink: 0 }}>
            <div style={{ width: 36, height: 4, borderRadius: 99, background: "var(--line)" }} />
          </div>
          {body}
        </div>
      </>
    );
  }

  return (
    <div
      ref={panelRef}
      className="customize-panel"
      style={{
        position: "absolute",
        right: 14, top: 60, bottom: 14,
        width: 280,
        zIndex: 30,
        background: "var(--bg-elev)",
        border: "1px solid var(--line)",
        borderRadius: 14,
        boxShadow: "var(--shadow-lg)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        animation: "slideIn .18s cubic-bezier(.2,.9,.3,1)",
      }}
    >
      {body}
    </div>
  );
}

function Section({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-3)" }}>{title}</span>
        {right && <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>{right}</span>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const v = value;
  return (
    <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", fontSize: 12.5, color: "var(--ink-2)" }}>
      <span>{label}</span>
      <button
        onClick={() => onChange(!v)}
        type="button"
        style={{
          width: 32, height: 18,
          borderRadius: 99,
          background: v ? "var(--brand)" : "#d8d5cc",
          border: 0, position: "relative",
          transition: "background .15s",
        }}
      >
        <span
          style={{
            position: "absolute", top: 2,
            left: v ? 16 : 2,
            width: 14, height: 14,
            borderRadius: "50%", background: "#fff",
            transition: "left .15s",
            boxShadow: "0 1px 2px rgba(0,0,0,.2)",
          }}
        />
      </button>
    </label>
  );
}
