"use client";

import { useRef, useState, type RefObject } from "react";
import { I } from "@/components/icons";
import type { ChatAttachment } from "@/types/chat";
import { AttachPopover } from "@/components/popovers/AttachPopover";
import { Popover } from "@/components/popovers/Popover";

export type ComposerProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  draft: string;
  onDraft: (v: string) => void;
  onKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
  attachments: ChatAttachment[];
  onAddAttachment: (kind: ChatAttachment["kind"]) => void;
  onClearAttachments: () => void;
  language: string;
  onLanguageChange: (v: string) => void;
  empty: boolean;
};

export function Composer({
  inputRef,
  draft,
  onDraft,
  onKey,
  onSend,
  attachments,
  onAddAttachment,
  onClearAttachments,
  language,
  onLanguageChange,
  empty,
}: ComposerProps) {
  const attachBtnRef = useRef<HTMLButtonElement>(null);
  const [attachOpen, setAttachOpen] = useState(false);
  return (
    <div className="composer-wrap" style={{ flexShrink: 0, padding: "10px 18px 18px" }}>
      {attachments.length > 0 && (
        <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
          {attachments.map((a, i) => (
            <span key={i} className="chip" style={{ height: 28, paddingRight: 4, background: "var(--bg-elev)" }}>
              {a.kind === "doc" ? (
                <I.FileText size={12} />
              ) : a.kind === "photo" ? (
                <I.Image size={12} />
              ) : (
                <I.Briefcase size={12} />
              )}
              <span style={{ maxWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</span>
              <button className="chip-x" onClick={onClearAttachments} aria-label={`Remover ${a.name}`}>
                <I.Close size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="composer-box">
        <input
          ref={inputRef}
          className="chat-input"
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          onKeyDown={onKey}
          placeholder={empty ? "Conta o que queres criar… (ex: «adapta o meu CV à vaga X»)" : "Escreve uma mensagem…"}
          style={{ padding: "14px 16px 4px", fontSize: 14, fontFamily: "inherit", width: "100%" }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <button ref={attachBtnRef} className="icon-btn" title="Anexar" onClick={() => setAttachOpen(true)} style={{ width: 30, height: 30 }}>
              <I.Plus size={16} />
            </button>
            <Divider />
            <button className="icon-btn" title="Adaptar a uma vaga" style={{ width: 30, height: 30 }}>
              <I.Target size={14} />
            </button>
            <button className="icon-btn" title="Sugestões" style={{ width: 30, height: 30 }}>
              <I.Sparkle size={14} />
            </button>
            <LangSelect value={language} onChange={onLanguageChange} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button className="icon-btn" title="Ditar" style={{ width: 30, height: 30 }}>
              <I.Mic size={14} />
            </button>
            <button
              onClick={onSend}
              disabled={!draft.trim() && !attachments.length}
              aria-label="Enviar mensagem"
              className={`send-btn${draft.trim() || attachments.length ? " is-ready" : ""}`}
            >
              <I.ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>

      <AttachPopover open={attachOpen} anchor={attachBtnRef} onClose={() => setAttachOpen(false)} onAttach={onAddAttachment} />
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 18, background: "var(--line-soft)", margin: "0 6px" }} />;
}

const langs = [
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

function LangSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const current = langs.find((l) => l.code === value) ?? langs[0];
  return (
    <>
      <button
        ref={ref}
        onClick={() => setOpen(true)}
        className="icon-btn"
        style={{ width: "auto", padding: "0 8px", height: 28, fontSize: 11.5, fontFamily: "var(--font-mono)", letterSpacing: ".04em", color: "var(--ink-3)", textTransform: "uppercase", gap: 5 }}
      >
        <I.Languages size={13} />
        {current.code}
        <I.ChevronDown size={11} />
      </button>
      <Popover open={open} anchor={ref} onClose={() => setOpen(false)} side="top" align="start" width={170}>
        <div style={{ padding: 4 }}>
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                onChange(l.code);
                setOpen(false);
              }}
              style={{
                display: "flex", width: "100%", alignItems: "center", gap: 9,
                padding: "7px 9px", borderRadius: 6, border: 0,
                background: l.code === value ? "var(--bg-tint)" : "transparent",
                textAlign: "left", fontSize: 12.5, color: "var(--ink-2)",
              }}
            >
              <span style={{ fontSize: 14 }}>{l.flag}</span>
              <span style={{ flex: 1 }}>{l.label}</span>
              {l.code === value && <I.Check size={13} style={{ color: "var(--brand)" }} />}
            </button>
          ))}
        </div>
      </Popover>
    </>
  );
}
