"use client";

import { useEffect, useRef, useState } from "react";
import { I } from "@/components/icons";
import type { ChatAttachment, Message } from "@/types/chat";
import { Composer } from "./Composer";
import { EmptyState } from "./EmptyState";
import { Conversation } from "./Conversation";

export type ChatState = "empty" | "conversation";

export type ChatPanelProps = {
  state: ChatState;
  thread: Message[];
  onSubmit: (text: string) => void;
  attachments: ChatAttachment[];
  onAddAttachment: (kind: ChatAttachment["kind"]) => void;
  onClearAttachments: () => void;
  language: string;
  onLanguageChange: (v: string) => void;
  onOpenMenu?: (() => void) | null;
  onOpenPreview?: (() => void) | null;
};

export function ChatPanel({
  state,
  thread,
  onSubmit,
  attachments,
  onAddAttachment,
  onClearAttachments,
  language,
  onLanguageChange,
  onOpenMenu,
  onOpenPreview,
}: ChatPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, [state]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.tagName === "INPUT" || t?.tagName === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length === 1) inputRef.current?.focus();
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (state === "conversation" && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state, thread]);

  const send = () => {
    if (!draft.trim() && !attachments.length) return;
    onSubmit(draft);
    setDraft("");
    inputRef.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section
      className="chat-panel"
      style={{
        display: "flex", flexDirection: "column", height: "100%", minWidth: 0,
        borderRight: "1px solid var(--line)", background: "var(--bg)",
      }}
    >
      <header
        className="chat-header"
        style={{
          height: 56, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px",
          background: "var(--bg)", gap: 10,
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
          {onOpenMenu && (
            <button className="icon-btn" onClick={onOpenMenu} aria-label="Abrir menu" style={{ width: 36, height: 36, flexShrink: 0 }}>
              <I.Menu size={18} />
            </button>
          )}
          {state === "conversation" ? (
            <EditableTitle initial="CV para Lead Designer @ Linear" />
          ) : (
            <>
              <I.Sparkle size={13} style={{ color: "var(--brand)" }} />
              <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink-2)" }}>Nova conversa</span>
            </>
          )}
        </div>
        {onOpenPreview && (
          <button className="icon-btn preview-btn" onClick={onOpenPreview} title="Ver pré-visualização" style={{ width: 34, height: 34 }}>
            <I.Eye size={16} />
          </button>
        )}
      </header>

      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", minHeight: 0 }}>
        {state === "empty" ? (
          <EmptyState
            onPrompt={(t) => {
              setDraft(t);
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
          />
        ) : (
          <Conversation thread={thread} />
        )}
      </div>

      <Composer
        inputRef={inputRef}
        draft={draft}
        onDraft={setDraft}
        onKey={onKey}
        onSend={send}
        attachments={attachments}
        onAddAttachment={onAddAttachment}
        onClearAttachments={onClearAttachments}
        language={language}
        onLanguageChange={onLanguageChange}
        empty={state === "empty"}
      />
    </section>
  );
}

function EditableTitle({ initial }: { initial: string }) {
  const [val, setVal] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editing]);
  const stop = () => setEditing(false);
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0, flex: 1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <I.Sparkle size={13} style={{ color: "var(--brand)", flexShrink: 0 }} />
      {editing ? (
        <input
          ref={ref}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={stop}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") stop();
          }}
          style={{ flex: 1, minWidth: 0, fontSize: 13.5, fontWeight: 500, color: "var(--ink)", background: "var(--bg-tint)", border: "1px solid var(--line)", outline: "none", borderRadius: 6, padding: "4px 8px", fontFamily: "inherit", letterSpacing: "-.005em" }}
        />
      ) : (
        <button
          onClick={() => setEditing(true)}
          title="Clique para renomear"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            minWidth: 0, flex: 1,
            background: hover ? "var(--bg-tint)" : "transparent",
            border: 0, padding: "4px 8px", borderRadius: 6,
            cursor: "text", transition: "background .12s, color .12s", textAlign: "left",
          }}
        >
          <span style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--ink)" }}>{val}</span>
          <I.Edit size={11} style={{ color: "var(--ink-3)", opacity: hover ? 1 : 0, transition: "opacity .12s", flexShrink: 0 }} />
        </button>
      )}
    </div>
  );
}
