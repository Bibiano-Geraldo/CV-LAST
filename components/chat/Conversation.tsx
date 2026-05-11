"use client";

import { useState } from "react";
import { I, type IconName } from "@/components/icons";
import type { Message } from "@/types/chat";

export function Conversation({ thread }: { thread: Message[] }) {
  const lastMessage = thread[thread.length - 1];
  const showTyping = lastMessage?.role === "user";
  return (
    <div
      className="chat-scroll-pad"
      style={{ padding: "22px 22px 12px", display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .3s ease" }}
    >
      <ContextStrip />
      {thread.map((m, i) => (
        <MessageView key={i} m={m} />
      ))}
      {showTyping && <ThinkingBubble />}
    </div>
  );
}

function ContextStrip() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
        background: "var(--bg-elev)",
        border: "1px dashed var(--line)",
        borderRadius: 10,
        fontSize: 12, color: "var(--ink-3)",
      }}
    >
      <I.Target size={14} style={{ color: "var(--brand)", flexShrink: 0 }} />
      <span style={{ flex: 1, minWidth: 0 }}>
        A adaptar para <b style={{ color: "var(--ink-2)", fontWeight: 600 }}>Lead Product Designer</b>{" "}
        · <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>linear.app/careers</span>
      </span>
      <button
        className="btn ghost"
        onClick={() => setDismissed(true)}
        aria-label="Remover contexto"
        style={{ height: 24, fontSize: 11.5, padding: "0 7px" }}
      >
        <I.Close size={11} /> Remover
      </button>
    </div>
  );
}

function MessageView({ m }: { m: Message }) {
  if (m.role === "user") return <UserMessage m={m} />;
  if (m.role === "ai-inline" && m.kind === "ats") return <AtsCard m={m} />;
  return <AiMessage m={m as Extract<Message, { role: "ai" }>} />;
}

function UserMessage({ m }: { m: Extract<Message, { role: "user" }> }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ maxWidth: "82%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        {m.attachments && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {m.attachments.map((a, i) => (
              <span className="chip" key={i} style={{ background: "var(--bg-elev)", height: 28 }}>
                {a.kind === "pdf" ? <I.FileText size={12} /> : <I.Image size={12} />}
                <span style={{ maxWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</span>
                <span style={{ color: "var(--ink-4)", fontFamily: "var(--font-mono)", fontSize: 10 }}>{a.size}</span>
              </span>
            ))}
          </div>
        )}
        <div
          style={{
            padding: "10px 14px",
            background: "var(--brand-soft)",
            color: "var(--ink)",
            borderRadius: "16px 16px 4px 16px",
            fontSize: 13.5, lineHeight: 1.5,
            border: "1px solid color-mix(in oklab, var(--brand) 12%, transparent)",
          }}
        >
          {m.body}
        </div>
      </div>
    </div>
  );
}

function AiMessage({ m }: { m: Extract<Message, { role: "ai" }> }) {
  const html = m.body
    .replace(/\*\*(.+?)\*\*/g, "<b style='color:var(--ink);font-weight:600'>$1</b>")
    .replace(/\*(.+?)\*/g, "<i style='color:var(--brand-ink)'>$1</i>");
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
      <div
        style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0, marginTop: 1,
          background: "linear-gradient(135deg, var(--brand) 0%, color-mix(in oklab, var(--brand) 75%, var(--lime)) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
        }}
      >
        <I.Sparkle size={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 560 }}>
        <div
          style={{
            padding: "10px 14px",
            background: "var(--bg-elev)",
            color: "var(--ink-2)",
            borderRadius: "4px 16px 16px 16px",
            fontSize: 13.5, lineHeight: 1.55,
            border: "1px solid var(--line)",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {m.actions && (
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {m.actions.map((a, i) => {
              const Ic = I[a.icon as IconName];
              return (
                <button key={i} className="btn pop-btn" style={{ height: 28, fontSize: 12, padding: "0 10px" }}>
                  {Ic && <Ic size={12} />}
                  {a.label}
                </button>
              );
            })}
          </div>
        )}

        {m.suggestions && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
            {m.suggestions.map((s, i) => (
              <button
                key={i}
                className="btn pop-btn"
                style={{ height: 28, fontSize: 12, padding: "0 10px", borderRadius: 99, borderColor: "color-mix(in oklab, var(--brand) 25%, var(--line))" }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AtsCard({ m }: { m: Extract<Message, { role: "ai-inline" }> }) {
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
      <div
        style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0, marginTop: 1,
          background: "var(--brand-soft)", color: "var(--brand)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <I.Gauge size={14} />
      </div>
      <div style={{ flex: 1, padding: "12px 14px", background: "var(--bg-elev)", borderRadius: 12, border: "1px solid var(--line)", maxWidth: 560 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{m.body}</div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>Compatibilidade com palavras-chave da vaga</div>
          </div>
          <ScoreDial value={m.score} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
          <div>
            <div style={{ fontSize: 10.5, fontFamily: "var(--font-mono)", color: "var(--ink-3)", letterSpacing: ".06em", marginBottom: 4 }}>ENCONTRADAS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {m.matched.map((k, i) => (
                <span key={i} className="chip lime" style={{ height: 22, fontSize: 11, padding: "0 8px" }}>
                  <I.Check size={11} />
                  {k}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontFamily: "var(--font-mono)", color: "var(--ink-3)", letterSpacing: ".06em", marginBottom: 4 }}>EM FALTA</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {m.missing.map((k, i) => (
                <span
                  key={i}
                  className="chip"
                  style={{ height: 22, fontSize: 11, padding: "0 8px", background: "transparent", borderColor: "var(--line)" }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: 99, background: "#cfcbbf" }} />
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid var(--line-soft)" }}>
          <span style={{ fontSize: 11, color: "var(--ink-3)" }}>Quer que eu incorpore as 3 em falta?</span>
          <button className="btn primary" style={{ height: 26, fontSize: 11.5, padding: "0 10px" }}>
            Sim, incorporar
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreDial({ value }: { value: number }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  const dash = c * (value / 100);
  return (
    <div style={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
      <svg width="42" height="42" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={r} stroke="var(--bg-tint)" strokeWidth="3.5" fill="none" />
        <circle
          cx="18" cy="18" r={r}
          stroke="var(--brand)" strokeWidth="3.5" fill="none"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
      </svg>
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11.5, fontWeight: 600,
          fontFamily: "var(--font-mono)", color: "var(--brand)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start", opacity: 0.55 }}>
      <div
        style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: "linear-gradient(135deg, var(--brand) 0%, color-mix(in oklab, var(--brand) 75%, var(--lime)) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
        }}
      >
        <I.Sparkle size={14} />
      </div>
      <div style={{ display: "flex", gap: 4, padding: "12px 14px", background: "var(--bg-elev)", border: "1px solid var(--line)", borderRadius: "4px 16px 16px 16px" }}>
        <Dot delay={0} />
        <Dot delay={0.18} />
        <Dot delay={0.36} />
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--ink-4)", animation: `pulse 1.2s ${delay}s infinite` }} />;
}
