"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { I } from "@/components/icons";
import { SAMPLE_CV } from "@/lib/data";
import { TEMPLATES } from "@/components/templates";
import { CustomizePanel } from "@/components/popovers/CustomizePanel";
import type { TemplateId } from "@/types/cv";

export type CanvasPanelProps = {
  template: TemplateId;
  accent: string;
  zoom: number;
  onZoom: (z: number) => void;
  fitMode: boolean;
  onFitMode: (v: boolean) => void;
  templateBtnRef: RefObject<HTMLButtonElement | null>;
  shareBtnRef: RefObject<HTMLButtonElement | null>;
  downloadBtnRef: RefObject<HTMLButtonElement | null>;
  onOpenTemplate: () => void;
  onOpenShare: () => void;
  onOpenDownload: () => void;
  onOpenCustomize: () => void;
  onBack: () => void;
  isMobile: boolean;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  showPins: boolean;
  isEmpty: boolean;
  customizeOpen: boolean;
  onCloseCustomize: () => void;
  fontSize: number;
  onFontSize: (v: number) => void;
  lineHeight: number;
  onLineHeight: (v: number) => void;
  density: string;
  onDensity: (v: string) => void;
  onAccent: (v: string) => void;
};

export function CanvasPanel(props: CanvasPanelProps) {
  const {
    template, accent, zoom, onZoom, fitMode, onFitMode,
    onOpenTemplate, onOpenShare, onOpenDownload, onOpenCustomize,
    templateBtnRef, shareBtnRef, downloadBtnRef,
    showPins, isEmpty, customizeOpen, onCloseCustomize,
    onBack, isMobile, fullscreen, onToggleFullscreen,
    fontSize, onFontSize, lineHeight, onLineHeight, density, onDensity, onAccent,
  } = props;

  const Tpl = TEMPLATES[template].render;
  const scrollRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const [docH, setDocH] = useState(1123);

  useEffect(() => {
    if (!docRef.current) return;
    const el = docRef.current;
    const update = () => setDocH(el.offsetHeight || 1123);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [template, isEmpty, fontSize, lineHeight, density]);

  const lastFitRef = useRef(0);
  useEffect(() => {
    if (!fitMode || !scrollRef.current) return;
    const el = scrollRef.current;
    let raf = 0;
    const recalc = () => {
      const w = el.clientWidth;
      const pad = w < 600 ? 24 : 48;
      const raw = Math.min(1.2, Math.max(0.28, (w - pad) / 794));
      const fit = +raw.toFixed(2);
      if (Math.abs(fit - lastFitRef.current) < 0.005) return;
      lastFitRef.current = fit;
      onZoom(fit);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(recalc);
    };
    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitMode]);

  const docStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: "top left",
    width: 794,
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: fitMode ? "none" : "transform .2s cubic-bezier(.2,.9,.3,1)",
    willChange: "transform",
    "--cv-inv-zoom": 1 / Math.max(zoom, 0.01),
  } as CSSProperties;

  return (
    <section style={{ display: "flex", flexDirection: "column", height: "100%", minWidth: 0, background: "var(--bg-tint)", position: "relative" }}>
      <header
        className="canvas-header"
        style={{
          height: 56, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 14px",
          borderBottom: "1px solid var(--line-soft)",
          background: "var(--bg)", gap: 8,
          zIndex: 4, flexWrap: "nowrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: "0 1 auto" }}>
          {isMobile && (
            <button
              className="icon-btn"
              onClick={onBack}
              title="Voltar ao chat"
              aria-label="Voltar ao chat"
              style={{ width: 36, height: 36, flexShrink: 0, background: "var(--bg-elev)", border: "1px solid var(--line)" }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          <div className="seg" style={{ minWidth: 0, flex: "0 1 auto" }}>
            <button ref={templateBtnRef} className="seg-btn seg-wide" onClick={onOpenTemplate}>
              <I.Layers size={13} />
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>{TEMPLATES[template].name}</span>
              <I.ChevronDown size={11} style={{ color: "var(--ink-3)", flexShrink: 0, marginLeft: -2 }} />
            </button>
            <div className="seg-div" />
            <button data-customize-trigger className="seg-btn" onClick={onOpenCustomize} title="Personalizar" aria-label="Personalizar">
              <I.Palette size={13} />
              <span className="lbl-md">Personalizar</span>
            </button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div className="seg">
            <button
              className="seg-btn"
              onClick={() => {
                onFitMode(false);
                onZoom(Math.max(0.4, +(zoom - 0.1).toFixed(2)));
              }}
              aria-label="Diminuir zoom"
              title="Diminuir"
            >
              <I.Minus size={13} />
            </button>
            <button className="seg-btn seg-zoom" onClick={() => onFitMode(true)} title="Ajustar à largura">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: ".02em", color: fitMode ? "var(--brand)" : "var(--ink-2)" }}>
                {fitMode ? "Auto" : `${Math.round(zoom * 100)}%`}
              </span>
            </button>
            <button
              className="seg-btn"
              onClick={() => {
                onFitMode(false);
                onZoom(Math.min(1.5, +(zoom + 0.1).toFixed(2)));
              }}
              aria-label="Aumentar zoom"
              title="Aumentar"
            >
              <I.Plus size={13} />
            </button>
            {!isMobile && (
              <>
                <div className="seg-div" />
                <button className="seg-btn" onClick={onToggleFullscreen} title={fullscreen ? "Sair do ecrã inteiro" : "Ecrã inteiro"}>
                  {fullscreen ? <I.Minimize size={13} /> : <I.Maximize size={13} />}
                </button>
              </>
            )}
          </div>

          <div className="seg">
            <button ref={shareBtnRef} className="seg-btn" onClick={onOpenShare} title="Partilhar">
              <I.Share size={13} />
              <span className="lbl-md">Partilhar</span>
            </button>
            <div className="seg-div" />
            <button ref={downloadBtnRef} className="seg-btn seg-primary" onClick={onOpenDownload} title="Descarregar PDF">
              <I.Download size={13} />
              <span className="lbl-md">PDF</span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="canvas-scroll"
        style={{
          flex: 1, overflow: "auto",
          scrollbarGutter: "stable",
          padding: "24px 16px 60px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--brand) 4%, transparent) 0%, transparent 50%), var(--bg-tint)",
        }}
      >
        <div style={{ width: 794 * zoom, height: docH * zoom, position: "relative", flexShrink: 0 }}>
          <div ref={docRef} className="cv-doc" style={docStyle}>
            {isEmpty ? <EmptyDoc /> : <Tpl cv={SAMPLE_CV} accent={accent} showPins={showPins} fontSize={fontSize} lineHeight={lineHeight} />}
          </div>
        </div>
      </div>

      <CustomizePanel
        open={customizeOpen}
        onClose={onCloseCustomize}
        accent={accent}
        onAccent={onAccent}
        fontSize={fontSize}
        onFontSize={onFontSize}
        lineHeight={lineHeight}
        onLineHeight={onLineHeight}
        density={density}
        onDensity={onDensity}
      />
    </section>
  );
}

function EmptyDoc() {
  return (
    <div
      className="a4 a4-empty"
      style={{
        width: 794, height: 1123, background: "#fff", position: "relative",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: 260,
        boxShadow: "0 2px 6px rgba(15,16,12,.05),0 12px 36px rgba(15,16,12,.08)",
        borderRadius: 2, overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #e8e5dd 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.5,
          maskImage: "radial-gradient(ellipse at 50% 28%, #000 22%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 28%, #000 22%, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "relative", textAlign: "center", display: "flex",
          flexDirection: "column", alignItems: "center", gap: 18, padding: 40, maxWidth: 420,
        }}
      >
        <div
          style={{
            width: 64, height: 64, borderRadius: 14, background: "#f4f1e9",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid #e6e2d6",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9c9787" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h9l4 4v14H6z" />
            <path d="M15 3v4h4" />
            <path d="M9 13h6M9 17h4M9 9h2" />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 18, fontWeight: 550, color: "#3a3830", letterSpacing: "-.01em" }}>O seu documento aparecerá aqui</div>
          <div style={{ fontSize: 13, color: "#9c9787", lineHeight: 1.5 }}>
            Comece uma conversa à esquerda — o CV vai sendo construído em tempo real à medida que partilha as suas experiências.
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#bcb6a6", letterSpacing: ".08em", textTransform: "uppercase", marginTop: 6 }}>
          A4 · pré-visualização vazia
        </div>
      </div>
    </div>
  );
}
