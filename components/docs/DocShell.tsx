"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Popover } from "@/components/popovers/Popover";
import { SAMPLE_CVS, SAMPLE_LETTERS, type DocKind, type SavedDoc } from "@/lib/data";
import { I } from "@/components/icons";
import { DocGallery } from "@/components/docs/DocGallery";

type View = "grid" | "list";
type Sort = "recent" | "name" | "starred";

type KindConfig = {
  source: SavedDoc[];
  title: string;
  ctaLabel: string;
  emptyEditorHint: string;
};

const KIND_CONFIG: Record<DocKind, KindConfig> = {
  cv: {
    source: SAMPLE_CVS,
    title: "Os meus currículos",
    ctaLabel: "Novo currículo",
    emptyEditorHint:
      "Começa uma conversa no editor — o primeiro currículo é construído enquanto falas.",
  },
  letter: {
    source: SAMPLE_LETTERS,
    title: "As minhas cartas",
    ctaLabel: "Nova carta",
    emptyEditorHint:
      "Começa uma conversa no editor — a primeira carta nasce ali, à medida que falas.",
  },
};

const TABS: { kind: DocKind; label: string; href: string }[] = [
  { kind: "cv", label: "Currículos", href: "/curriculos" },
  { kind: "letter", label: "Cartas", href: "/cartas" },
];

export function DocShell({ kind }: { kind: DocKind }) {
  const cfg = KIND_CONFIG[kind];
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState<Sort>("recent");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: SavedDoc[] = q
      ? cfg.source.filter(
          (c) => c.name.toLowerCase().includes(q) || c.tag?.toLowerCase().includes(q),
        )
      : cfg.source.slice();
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "starred")
      list.sort((a, b) => Number(!!b.starred) - Number(!!a.starred));
    return list;
  }, [query, sort, cfg.source]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 700px 420px at 8% -6%, color-mix(in oklab, var(--brand) 7%, transparent) 0%, transparent 70%), radial-gradient(ellipse 600px 420px at 96% 4%, color-mix(in oklab, var(--lime) 7%, transparent) 0%, transparent 70%), var(--bg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopBar activeKind={kind} />

      <main style={{ flex: 1, minWidth: 0 }}>
        <div
          className="cv-page"
          style={{
            maxWidth: 1240,
            width: "100%",
            margin: "0 auto",
            padding: "44px 32px 80px",
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 18,
              marginBottom: 36,
            }}
          >
            <div>
              <div
                aria-hidden
                style={{
                  width: 40,
                  height: 3,
                  background: "var(--brand)",
                  borderRadius: 2,
                  marginBottom: 22,
                }}
              />
              <div
                className="tabular"
                aria-live="polite"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: 10,
                }}
              >
                {query
                  ? `${filtered.length} de ${cfg.source.length} documentos`
                  : `${cfg.source.length} documentos`}
              </div>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(34px, 4.4vw, 52px)",
                  lineHeight: 1.02,
                  fontWeight: 400,
                  letterSpacing: "-.025em",
                  color: "var(--ink)",
                }}
              >
                {cfg.title}
              </h1>
            </div>

            <button
              type="button"
              className="cta-brand"
              onClick={() => (window.location.href = "/")}
              style={{
                border: 0,
                gap: 10,
                height: 40,
                padding: "0 8px 0 18px",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                boxShadow:
                  "0 1px 0 var(--brand-ink), 0 6px 18px color-mix(in oklab, var(--brand) 22%, transparent)",
              }}
            >
              <span>{cfg.ctaLabel}</span>
              <span className="cta-arrow" aria-hidden style={{ width: 26, height: 26, fontSize: 16, fontWeight: 400, lineHeight: 1 }}>
                +
              </span>
            </button>
          </header>

          <Toolbar
            query={query}
            onQuery={setQuery}
            sort={sort}
            onSort={setSort}
            view={view}
            onView={setView}
          />

          <div style={{ marginTop: 24 }}>
            {filtered.length === 0 ? (
              <EmptyState query={query} hint={cfg.emptyEditorHint} />
            ) : (
              <DocGallery items={filtered} view={view} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function TopBar({ activeKind }: { activeKind: DocKind }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        height: 56,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 12,
        padding: "0 20px",
        background: "color-mix(in oklab, var(--bg) 82%, transparent)",
        WebkitBackdropFilter: "saturate(160%) blur(10px)",
        backdropFilter: "saturate(160%) blur(10px)",
        borderBottom: "1px solid var(--line-soft)",
      }}
    >
      {/* Left — back to chat */}
      <div style={{ justifySelf: "start" }}>
        <Link
          href="/"
          className="topbar-back"
          aria-label="Voltar ao chat"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: 34,
            padding: "0 14px 0 11px",
            borderRadius: 999,
            background: "transparent",
            border: "1px solid transparent",
            color: "var(--ink-3)",
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "-.002em",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          <I.ArrowLeft size={14} style={{ flexShrink: 0 }} />
          <span>Voltar ao chat</span>
        </Link>
      </div>

      {/* Center — tabs */}
      <nav
        aria-label="Galerias"
        className="topbar-tabs"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 2,
          padding: 4,
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          boxShadow: "0 1px 0 rgba(0,0,0,.02)",
        }}
      >
        {TABS.map((t) => {
          const active = t.kind === activeKind;
          return (
            <Link
              key={t.kind}
              href={t.href as never}
              aria-current={active ? "page" : undefined}
              className={`topbar-tab${active ? " is-active" : ""}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 28,
                padding: "0 16px",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "-.005em",
                color: active ? "var(--brand)" : "var(--ink-2)",
                background: active ? "var(--brand-soft)" : "transparent",
                boxShadow: active
                  ? "inset 0 0 0 1px color-mix(in oklab, var(--brand) 18%, transparent)"
                  : "none",
                textDecoration: "none",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>

      {/* Right — intentionally empty: this view has a single purpose */}
      <div />
    </div>
  );
}

function Toolbar({
  query,
  onQuery,
  sort,
  onSort,
  view,
  onView,
}: {
  query: string;
  onQuery: (v: string) => void;
  sort: "recent" | "name" | "starred";
  onSort: (v: "recent" | "name" | "starred") => void;
  view: "grid" | "list";
  onView: (v: "grid" | "list") => void;
}) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform));
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
        padding: "12px 0 14px",
        borderBottom: "1px solid var(--line-soft)",
      }}
    >
      <div
        className="gallery-search"
        title={`Procurar (${isMac ? "⌘" : "Ctrl"} K)`}
        style={{
          flex: "1 1 240px",
          minWidth: 220,
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 36,
          padding: "0 8px 0 12px",
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
          borderRadius: 10,
        }}
      >
        <I.Search size={14} style={{ color: "var(--ink-3)", transition: "color .15s ease" }} />
        <input
          ref={searchRef}
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && query) {
              onQuery("");
              (e.target as HTMLInputElement).blur();
            }
          }}
          placeholder="Procurar por nome ou etiqueta…"
          aria-label={`Procurar (${isMac ? "⌘" : "Ctrl"} K)`}
          style={{
            flex: 1,
            border: 0,
            outline: "none",
            background: "transparent",
            fontSize: 13,
            color: "var(--ink)",
            fontFamily: "inherit",
            minWidth: 0,
            padding: 0,
          }}
        />
        {query && (
          <button
            className="icon-btn"
            onClick={() => onQuery("")}
            aria-label="Limpar pesquisa"
            style={{ width: 24, height: 24 }}
          >
            <I.Close size={12} />
          </button>
        )}
      </div>

      <SortDropdown sort={sort} onSort={onSort} />

      <div className="seg" role="group" aria-label="Vista" style={{ height: 36 }}>
        <button
          type="button"
          onClick={() => onView("grid")}
          aria-label="Vista em grelha"
          aria-pressed={view === "grid"}
          className={`seg-btn${view === "grid" ? " is-active" : ""}`}
        >
          <I.Layers size={14} />
        </button>
        <span className="seg-div" />
        <button
          type="button"
          onClick={() => onView("list")}
          aria-label="Vista em lista"
          aria-pressed={view === "list"}
          className={`seg-btn${view === "list" ? " is-active" : ""}`}
        >
          <I.Menu size={14} />
        </button>
      </div>
    </div>
  );
}

const SORT_OPTIONS: { value: "recent" | "name" | "starred"; label: string; hint: string }[] = [
  { value: "recent", label: "Mais recentes", hint: "última edição" },
  { value: "name", label: "Nome", hint: "A → Z" },
  { value: "starred", label: "Fixados primeiro", hint: "estrela no topo" },
];

function SortDropdown({
  sort,
  onSort,
}: {
  sort: "recent" | "name" | "starred";
  onSort: (v: "recent" | "name" | "starred") => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const current = SORT_OPTIONS.find((o) => o.value === sort) ?? SORT_OPTIONS[0];

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Ordenar · ${current.label}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 36,
          padding: "0 12px 0 11px",
          background: open ? "var(--bg-tint)" : "var(--bg-elev)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          color: "var(--ink-2)",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          transition: "background .14s ease, border-color .14s ease",
        }}
      >
        <I.ArrowsUpDown size={13} w={1.5} style={{ color: "var(--ink-3)" }} />
        <span style={{ color: "var(--ink)" }}>{current.label}</span>
        <I.ChevronDown
          size={12}
          style={{
            color: "var(--ink-3)",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform .22s cubic-bezier(.16,1,.3,1)",
          }}
        />
      </button>

      <Popover open={open} anchor={btnRef} onClose={() => setOpen(false)} side="bottom" align="end" width={240} offset={6}>
        <div
          style={{
            padding: "10px 14px 6px",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "var(--ink-4)",
            borderBottom: "1px solid var(--line-soft)",
          }}
        >
          Ordenar por
        </div>
        <ul role="listbox" style={{ listStyle: "none", margin: 0, padding: 6 }}>
          {SORT_OPTIONS.map((opt) => {
            const active = opt.value === sort;
            return (
              <li key={opt.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onSort(opt.value);
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 10px",
                    borderRadius: 7,
                    border: 0,
                    background: active ? "var(--bg-tint)" : "transparent",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background .14s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = "var(--bg-tint)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: active ? 600 : 500, color: "var(--ink)" }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 1, fontFamily: "var(--font-mono)", letterSpacing: ".04em" }}>
                      {opt.hint}
                    </div>
                  </div>
                  {active && <I.Check size={13} style={{ color: "var(--brand)", flexShrink: 0 }} />}
                </button>
              </li>
            );
          })}
        </ul>
      </Popover>
    </>
  );
}

function EmptyState({ query, hint }: { query: string; hint: string }) {
  return (
    <div
      style={{
        padding: "88px 24px",
        textAlign: "center",
        border: "1px dashed var(--line)",
        borderRadius: 16,
        background: "color-mix(in oklab, var(--bg-elev) 70%, transparent)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="empty-glyph" aria-hidden>
        <I.FileText size={22} />
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          fontWeight: 400,
          color: "var(--ink)",
          letterSpacing: "-.015em",
          lineHeight: 1.1,
        }}
      >
        {query ? "Sem resultados" : "Ainda nada por aqui"}
      </div>
      <div
        style={{
          fontSize: 13.5,
          color: "var(--ink-3)",
          marginTop: 8,
          maxWidth: 380,
          lineHeight: 1.55,
        }}
      >
        {query
          ? `Nada encontrado para "${query}". Tenta outro termo ou limpa a pesquisa.`
          : hint}
      </div>

      {!query && (
        <a
          href="/"
          className="cta-brand"
          style={{
            marginTop: 22,
            gap: 10,
            height: 38,
            padding: "0 8px 0 16px",
            fontSize: 13,
            fontWeight: 500,
            boxShadow:
              "0 1px 0 var(--brand-ink), 0 6px 18px color-mix(in oklab, var(--brand) 22%, transparent)",
          }}
        >
          <span>Abrir editor</span>
          <span className="cta-arrow" aria-hidden style={{ width: 24, height: 24, fontSize: 13 }}>
            →
          </span>
        </a>
      )}
    </div>
  );
}
