"use client";

import { useEffect, useRef, useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { I, type IconName } from "@/components/icons";
import { MiniTemplate } from "@/components/templates/MiniTemplate";
import { Popover } from "@/components/popovers/Popover";
import type { SavedDoc } from "@/lib/data";

// Editor link is built from the doc kind so a single component serves CVs and letters.
function editorHref(doc: SavedDoc): ComponentProps<typeof Link>["href"] {
  return { pathname: "/", query: { [doc.kind === "letter" ? "letter" : "cv"]: doc.id } };
}

// ─────────────────────────────────────────────────────────────────────────────
// Editable name (double-click → input)
// ─────────────────────────────────────────────────────────────────────────────
function EditableName({
  value,
  onChange,
  href,
  editing,
  onEditingChange,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  href: ComponentProps<typeof Link>["href"];
  editing: boolean;
  onEditingChange: (v: boolean) => void;
  style?: CSSProperties;
}) {
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setDraft(value);
      requestAnimationFrame(() => {
        ref.current?.focus();
        ref.current?.select();
      });
    }
  }, [editing, value]);

  const commit = () => {
    const next = draft.trim();
    if (next && next !== value) onChange(next);
    onEditingChange(false);
  };

  if (editing) {
    return (
      <input
        ref={ref}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Enter") commit();
          if (e.key === "Escape") onEditingChange(false);
        }}
        onClick={(e) => e.preventDefault()}
        style={{
          width: "100%",
          background: "var(--bg-tint)",
          border: "1px solid color-mix(in oklab, var(--brand) 35%, var(--line))",
          outline: "none",
          borderRadius: 6,
          padding: "3px 8px",
          fontSize: style?.fontSize ?? 14,
          fontWeight: style?.fontWeight ?? 500,
          color: "var(--ink)",
          fontFamily: "inherit",
          letterSpacing: style?.letterSpacing ?? "-.005em",
          boxShadow: "0 0 0 3px color-mix(in oklab, var(--brand) 14%, transparent)",
        }}
      />
    );
  }

  return (
    <Link
      href={href as never}
      onDoubleClick={(e) => {
        e.preventDefault();
        onEditingChange(true);
      }}
      title="Duplo-clique para renomear"
      style={{
        display: "block",
        textDecoration: "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "var(--ink)",
        ...style,
      }}
    >
      {value}
    </Link>
  );
}

export function DocGallery({ items, view }: { items: SavedDoc[]; view: "grid" | "list" }) {
  if (view === "list") {
    return (
      <div
        style={{
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {items.map((doc, i) => (
          <DocRow key={doc.id} doc={doc} isLast={i === items.length - 1} />
        ))}
      </div>
    );
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(232px, 1fr))",
        gap: 24,
      }}
    >
      {items.map((doc) => (
        <DocCard key={doc.id} doc={doc} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID CARD
// ─────────────────────────────────────────────────────────────────────────────
function DocCard({ doc }: { doc: SavedDoc }) {
  const [hover, setHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(doc.name);
  const active = menuOpen;
  const href = editorHref(doc);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (editing) return;
    e.preventDefault();
    setMenuOpen(true);
  };

  return (
    <article
      className="cv-card-anim"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onContextMenu={handleContextMenu}
      style={{
        position: "relative",
        background: "var(--bg-elev)",
        borderRadius: 14,
        border: "1px solid",
        borderColor: active || hover ? "color-mix(in oklab, var(--brand) 28%, var(--line))" : "var(--line)",
        boxShadow: active
          ? "0 16px 40px color-mix(in oklab, var(--brand) 16%, transparent), 0 2px 6px rgba(15,16,12,.06)"
          : hover
          ? "0 12px 28px color-mix(in oklab, var(--brand) 12%, transparent), 0 2px 6px rgba(15,16,12,.05)"
          : "0 1px 0 rgba(15,16,12,.02), 0 4px 12px rgba(15,16,12,.04)",
        transform: hover || active ? "translateY(-2px)" : "translateY(0)",
        transition:
          "transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s cubic-bezier(.16,1,.3,1), border-color .18s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        href={href as never}
        aria-label={`Abrir ${doc.name} no editor`}
        style={{
          position: "relative",
          aspectRatio: "1 / 1.414",
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--brand) 5%, var(--bg-tint)) 0%, var(--bg-tint) 60%)",
          borderBottom: "1px solid var(--line-soft)",
          padding: 18,
          display: "block",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#fff",
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            boxShadow:
              "0 4px 12px rgba(15,16,12,.07), 0 1px 2px rgba(15,16,12,.04), 0 0 0 1px rgba(15,16,12,.04)",
            transform: hover ? "scale(1.012)" : "scale(1)",
            transition: "transform .3s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <MiniTemplate id={doc.template} accent={doc.accent} />
        </div>

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "color-mix(in oklab, var(--brand) 18%, transparent)",
            WebkitBackdropFilter: active ? "blur(4px) saturate(110%)" : "blur(0)",
            backdropFilter: active ? "blur(4px) saturate(110%)" : "blur(0)",
            opacity: active ? 1 : 0,
            transition: "opacity .22s cubic-bezier(.16,1,.3,1), backdrop-filter .25s ease",
            pointerEvents: "none",
          }}
        />

        {doc.starred && (
          <span
            aria-label="Fixado"
            title="Fixado"
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              width: 22,
              height: 22,
              borderRadius: 99,
              background: "var(--lime)",
              color: "var(--lime-ink)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(15,16,12,.10)",
            }}
          >
            <I.Star size={12} />
          </span>
        )}

        <span
          className="tabular"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            height: 22,
            padding: "0 8px",
            borderRadius: 99,
            background: "var(--bg-elev)",
            border: "1px solid var(--line-soft)",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: ".06em",
            color: "var(--ink-3)",
            display: "inline-flex",
            alignItems: "center",
            textTransform: "uppercase",
            boxShadow: "0 1px 2px rgba(15,16,12,.04)",
          }}
        >
          {doc.pages} pág
        </span>
      </Link>

      <div
        style={{
          padding: "12px 14px 14px",
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <EditableName
            value={name}
            onChange={setName}
            href={href}
            editing={editing}
            onEditingChange={setEditing}
            style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-.005em" }}
          />
          <div
            style={{
              fontSize: 11.5,
              color: "var(--ink-3)",
              marginTop: 3,
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span className="tabular" style={{ fontFamily: "var(--font-mono)", letterSpacing: ".04em" }}>{doc.updatedAt}</span>
            {doc.tag && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  color: "var(--lime-ink)",
                  background: "color-mix(in oklab, var(--lime) 28%, white)",
                  padding: "2px 8px",
                  borderRadius: 99,
                  letterSpacing: ".02em",
                }}
              >
                {doc.tag}
              </span>
            )}
          </div>
        </div>

        <DocActions
          doc={doc}
          open={menuOpen}
          onOpenChange={setMenuOpen}
          onRename={() => setEditing(true)}
        />
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIST ROW
// ─────────────────────────────────────────────────────────────────────────────
function DocRow({ doc, isLast }: { doc: SavedDoc; isLast: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(doc.name);
  const href = editorHref(doc);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (editing) return;
    e.preventDefault();
    setMenuOpen(true);
  };

  return (
    <div
      className="cv-row"
      data-active={menuOpen ? "true" : "false"}
      onContextMenu={handleContextMenu}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto auto auto",
        gap: 16,
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: isLast ? "none" : "1px solid var(--line-soft)",
      }}
    >
      <Link
        href={href as never}
        aria-label={`Abrir ${doc.name}`}
        style={{
          display: "block",
          width: 44,
          height: 60,
          background: "#fff",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid var(--line-soft)",
          flexShrink: 0,
          textDecoration: "none",
          boxShadow: "0 1px 2px rgba(15,16,12,.05)",
        }}
      >
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          <MiniTemplate id={doc.template} accent={doc.accent} />
        </div>
      </Link>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            minWidth: 0,
          }}
        >
          {doc.starred && <I.Star size={12} style={{ color: "var(--brand)", flexShrink: 0 }} />}
          <div style={{ minWidth: 0, flex: 1 }}>
            <EditableName
              value={name}
              onChange={setName}
              href={href}
              editing={editing}
              onEditingChange={setEditing}
              style={{ fontSize: 14, fontWeight: 500 }}
            />
          </div>
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: "var(--ink-3)",
            marginTop: 2,
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", letterSpacing: ".04em" }}>{doc.updatedAt}</span>
          {doc.tag && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "var(--lime-ink)",
                background: "color-mix(in oklab, var(--lime) 28%, white)",
                padding: "2px 8px",
                borderRadius: 99,
                letterSpacing: ".02em",
              }}
            >
              {doc.tag}
            </span>
          )}
        </div>
      </div>

      <span
        className="tabular"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "var(--ink-4)",
          whiteSpace: "nowrap",
        }}
      >
        {doc.pages} pág
      </span>

      <DocActions
        doc={doc}
        open={menuOpen}
        onOpenChange={setMenuOpen}
        onRename={() => setEditing(true)}
      />

      <span aria-hidden className="cv-row-chevron" style={{ color: "var(--ink-4)", display: "inline-flex" }}>
        <I.ChevronRight size={14} />
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3-DOT MENU
// ─────────────────────────────────────────────────────────────────────────────
function DocActions({
  doc,
  open,
  onOpenChange,
  onRename,
}: {
  doc: SavedDoc;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onRename?: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const setOpen = onOpenChange;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="icon-btn"
        aria-label={`Mais opções para ${doc.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        style={{
          width: 32,
          height: 32,
          background: open ? "var(--bg-tint)" : "transparent",
          color: open ? "var(--ink)" : "var(--ink-3)",
          flexShrink: 0,
        }}
      >
        <I.Dots size={16} />
      </button>

      <Popover open={open} anchor={btnRef} onClose={() => setOpen(false)} side="bottom" align="end" width={232} offset={6} bottomSheetOnMobile>
        <div style={{ padding: 6 }}>
          <MenuItem icon="Edit" label="Abrir no editor" href={editorHref(doc)} onClose={() => setOpen(false)} />
          <MenuItem icon="Star" label={doc.starred ? "Remover dos fixados" : "Fixar"} onClick={() => setOpen(false)} />
        </div>

        <div style={{ padding: 6, borderTop: "1px solid var(--line-soft)" }}>
          <MenuItem icon="Target" label="Adaptar a uma vaga" onClick={() => setOpen(false)} />
          <MenuItem icon="Languages" label="Traduzir" onClick={() => setOpen(false)} trailing={<I.ChevronRight size={12} style={{ color: "var(--ink-4)" }} />} />
          <MenuItem icon="Copy" label="Duplicar" onClick={() => setOpen(false)} />
          <MenuItem
            icon="Pencil"
            label="Renomear"
            onClick={() => {
              setOpen(false);
              onRename?.();
            }}
          />
        </div>

        <div style={{ padding: 6, borderTop: "1px solid var(--line-soft)" }}>
          <MenuItem icon="Share" label="Partilhar" onClick={() => setOpen(false)} />
          <MenuItem icon="Download" label="Descarregar PDF" onClick={() => setOpen(false)} />
        </div>

        <div style={{ padding: 6, borderTop: "1px solid var(--line-soft)" }}>
          <MenuItem icon="Trash" label="Apagar" danger onClick={() => setOpen(false)} />
        </div>
      </Popover>
    </>
  );
}

function MenuItem({
  icon,
  label,
  href,
  onClick,
  onClose,
  danger,
  trailing,
}: {
  icon: IconName;
  label: string;
  href?: ComponentProps<typeof Link>["href"];
  onClick?: () => void;
  onClose?: () => void;
  danger?: boolean;
  trailing?: ReactNode;
}) {
  const Ic = I[icon];

  const inner = (
    <>
      <Ic size={14} style={{ color: danger ? "#c53030" : "var(--ink-3)" }} />
      <span style={{ flex: 1 }}>{label}</span>
      {trailing}
    </>
  );

  const style = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: 11,
    padding: "8px 10px",
    borderRadius: 7,
    background: "transparent",
    border: 0,
    color: danger ? "#c53030" : "var(--ink-2)",
    fontSize: 13,
    textAlign: "left" as const,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background .12s ease",
  };

  if (href) {
    return (
      <Link
        href={href as never}
        style={style}
        onClick={() => onClose?.()}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tint)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {inner}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      onMouseEnter={(e) => (e.currentTarget.style.background = danger ? "color-mix(in oklab, #c53030 8%, var(--bg-elev))" : "var(--bg-tint)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {inner}
    </button>
  );
}
