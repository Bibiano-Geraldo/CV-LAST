"use client";

import { I, type IconName } from "@/components/icons";
import { QUICK_PROMPTS } from "@/lib/data";

export function EmptyState({ onPrompt }: { onPrompt: (t: string) => void }) {
  return (
    <div
      className="empty-hero"
      style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 24px 30px", gap: 36,
        animation: "fadeUp .3s ease",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", maxWidth: 520 }}>
        <div
          style={{
            width: 56, height: 56, borderRadius: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, var(--brand) 0%, color-mix(in oklab, var(--brand) 70%, var(--lime)) 100%)",
            boxShadow:
              "0 14px 32px color-mix(in oklab, var(--brand) 28%, transparent), 0 1px 0 rgba(255,255,255,.22) inset, 0 2px 4px rgba(15,16,12,.08)",
            color: "#fff",
            position: "relative",
          }}
        >
          <I.Sparkles size={22} />
          {/* Lime accent dot — small brand signature */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 12,
              height: 12,
              borderRadius: 99,
              background: "var(--lime)",
              border: "2px solid var(--bg)",
            }}
          />
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 36,
            lineHeight: 1.05,
            letterSpacing: "-.02em",
            color: "var(--ink)",
          }}
        >
          O que vamos criar <em style={{ fontStyle: "italic", color: "var(--brand)" }}>hoje</em>, Aïcha?
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--ink-3)",
            lineHeight: 1.6,
            maxWidth: 440,
          }}
        >
          Conta-me sobre ti ou cola um anúncio — eu trato do currículo enquanto conversamos.
        </p>
      </div>

      <div
        className="quick-prompts"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%", maxWidth: 520 }}
      >
        {QUICK_PROMPTS.map((p, i) => {
          const Ic = I[p.icon as IconName];
          return (
            <button key={i} className="qp-card" onClick={() => onPrompt(p.label + ". ")}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: "var(--brand-soft)",
                  color: "var(--brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Ic size={14} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{p.label}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2, lineHeight: 1.4 }}>
                  {p.hint}
                </div>
              </div>
              <span aria-hidden className="qp-arrow">
                →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
