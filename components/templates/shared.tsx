import type { CSSProperties, ReactNode } from "react";
import type { CVExperience } from "@/types/cv";

export type TemplateProps = {
  cv: import("@/types/cv").CV;
  accent: string;
  showPins?: boolean;
  fontSize?: number;
  lineHeight?: number;
};

export function PhotoSlot({ size = 78, round = true }: { size?: number; round?: boolean }) {
  return (
    <div
      className="ph"
      style={{
        width: size,
        height: size,
        borderRadius: round ? "50%" : 8,
        flexShrink: 0,
      }}
    >
      foto
    </div>
  );
}

type PinProps = {
  n: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  title?: string;
};
export function AIPin({ n, top, left, right, title }: PinProps) {
  return (
    <div className="ai-pin" style={{ top, left, right }} title={title}>
      <span>{n}</span>
    </div>
  );
}

export function H({
  children,
  accent,
  sectionAccent,
}: {
  children: ReactNode;
  accent?: string;
  sectionAccent?: boolean;
}) {
  return (
    <h3
      style={{
        margin: 0,
        fontSize: sectionAccent ? 10 : 11,
        fontWeight: 600,
        letterSpacing: ".09em",
        textTransform: "uppercase",
        color: sectionAccent ? "rgba(255,255,255,.7)" : accent ?? "#1a1816",
        paddingBottom: sectionAccent ? 0 : 6,
        borderBottom: sectionAccent ? "none" : `1px solid ${accent ?? "#1a1816"}30`,
        fontFamily: "var(--font-ui)",
      }}
    >
      {children}
    </h3>
  );
}

export function SerifH({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <h3
      style={{
        margin: 0,
        fontFamily: "var(--font-serif)",
        fontSize: 20,
        fontWeight: 500,
        letterSpacing: "-.01em",
        color: "#1a1816",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ width: 18, height: 1.5, background: accent } as CSSProperties} />
      {children}
    </h3>
  );
}

export function BoldH({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <h3
      style={{
        margin: 0,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: "-.01em",
        color: accent,
        lineHeight: 1.1,
      }}
    >
      {children}
    </h3>
  );
}

export function ExpBlock({ e, accent }: { e: CVExperience; accent?: string }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1a1816", letterSpacing: "-.005em" }}>{e.role}</div>
          <div style={{ fontSize: 11, color: accent ?? "#3a372f", fontWeight: 500 }}>{e.company}</div>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "#9c9787", whiteSpace: "nowrap" }}>
          {e.from} – {e.to} · {e.location}
        </div>
      </div>
      <ul style={{ margin: "6px 0 0 0", padding: "0 0 0 14px", color: "#3a372f", fontSize: 11, lineHeight: 1.55 }}>
        {e.bullets.map((b, j) => (
          <li key={j} style={{ marginBottom: 2 }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
