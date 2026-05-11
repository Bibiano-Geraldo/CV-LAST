"use client";

import { useMemo, useRef, useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { AvatarPopover } from "@/components/popovers/AvatarPopover";
import { Popover } from "@/components/popovers/Popover";
import { RECENT_CHATS, SAMPLE_CVS, type SavedCV } from "@/lib/data";
import { useViewport } from "@/hooks/useViewport";
import { I } from "@/components/icons";
import { CVGallery } from "./CVGallery";

type View = "grid" | "list";
type Sort = "recent" | "name" | "starred";

export function CurriculosShell() {
  const vp = useViewport();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<View>("grid");
  const [sort, setSort] = useState<Sort>("recent");
  const [query, setQuery] = useState("");

  const avatarRef = useRef<HTMLButtonElement>(null);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: SavedCV[] = q
      ? SAMPLE_CVS.filter(
          (c) => c.name.toLowerCase().includes(q) || c.tag?.toLowerCase().includes(q),
        )
      : SAMPLE_CVS.slice();
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "starred")
      list.sort((a, b) => Number(!!b.starred) - Number(!!a.starred));
    return list;
  }, [query, sort]);

  const cls = [
    "app",
    sidebarOpen && !vp.isMobile ? "sb-open" : "",
    vp.isMobile ? "is-mobile" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      {vp.isMobile && sidebarOpen && (
        <div className="sb-backdrop" onClick={() => setSidebarOpen(false)} />
      )}
      {(!vp.isMobile || sidebarOpen) && (
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
          avatarRef={avatarRef}
          onAvatarClick={() => setAvatarOpen(true)}
          chats={RECENT_CHATS}
          activeChatId={null}
          onSelectChat={(id) => {
            window.location.href = `/?chat=${id}`;
          }}
          onNewChat={() => {
            window.location.href = "/";
          }}
        />
      )}

      <main
        className="cv-main"
        style={{
          minWidth: 0,
          minHeight: 0,
          overflow: "auto",
          background:
            "radial-gradient(ellipse 700px 420px at 8% -6%, color-mix(in oklab, var(--brand) 7%, transparent) 0%, transparent 70%), radial-gradient(ellipse 600px 420px at 96% 4%, color-mix(in oklab, var(--lime) 7%, transparent) 0%, transparent 70%), var(--bg)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top app bar — mobile only */}
        {vp.isMobile && !sidebarOpen && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 14px",
              background: "var(--bg)",
              borderBottom: "1px solid var(--line-soft)",
            }}
          >
            <button
              className="icon-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menu"
              style={{ width: 36, height: 36 }}
            >
              <I.Menu size={18} />
            </button>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
              Os meus currículos
            </span>
          </div>
        )}

        <div
          className="cv-page"
          style={{
            flex: 1,
            maxWidth: 1240,
            width: "100%",
            margin: "0 auto",
            padding: "56px 32px 80px",
          }}
        >
          {/* Page header */}
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
                  ? `${filtered.length} de ${SAMPLE_CVS.length} documentos`
                  : `${SAMPLE_CVS.length} documentos`}
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
                Os meus currículos
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
              <span>Novo currículo</span>
              <span className="cta-arrow" aria-hidden style={{ width: 26, height: 26, fontSize: 16, fontWeight: 400, lineHeight: 1 }}>
                +
              </span>
            </button>
          </header>

          {/* Toolbar */}
          <Toolbar
            query={query}
            onQuery={setQuery}
            sort={sort}
            onSort={setSort}
            view={view}
            onView={setView}
          />

          {/* Gallery */}
          <div style={{ marginTop: 24 }}>
            {filtered.length === 0 ? (
              <EmptyState query={query} />
            ) : (
              <CVGallery items={filtered} view={view} />
            )}
          </div>
        </div>
      </main>

      <AvatarPopover open={avatarOpen} anchor={avatarRef} onClose={() => setAvatarOpen(false)} />
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
      {/* Search */}
      <div
        style={{
          flex: "1 1 240px",
          minWidth: 220,
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: 36,
          padding: "0 12px",
          background: "var(--bg-elev)",
          border: "1px solid var(--line)",
          borderRadius: 10,
        }}
      >
        <I.Search size={14} style={{ color: "var(--ink-3)" }} />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Procurar por nome ou etiqueta…"
          aria-label="Procurar"
          style={{
            flex: 1,
            border: 0,
            outline: "none",
            background: "transparent",
            fontSize: 13,
            color: "var(--ink)",
            fontFamily: "inherit",
            minWidth: 0,
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

      {/* Sort */}
      <SortDropdown sort={sort} onSort={onSort} />

      {/* View toggle */}
      <div className="seg" style={{ height: 36 }}>
        <button
          type="button"
          onClick={() => onView("grid")}
          aria-label="Vista em grelha"
          className="seg-btn"
          style={{ color: view === "grid" ? "var(--brand)" : undefined }}
        >
          <I.Layers size={14} />
        </button>
        <span className="seg-div" />
        <button
          type="button"
          onClick={() => onView("list")}
          aria-label="Vista em lista"
          className="seg-btn"
          style={{ color: view === "list" ? "var(--brand)" : undefined }}
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

function EmptyState({ query }: { query: string }) {
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
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background:
            "linear-gradient(135deg, var(--brand) 0%, color-mix(in oklab, var(--brand) 72%, var(--lime)) 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 12px 28px color-mix(in oklab, var(--brand) 28%, transparent), 0 1px 0 rgba(255,255,255,.18) inset",
          marginBottom: 20,
        }}
      >
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
          : "Começa uma conversa no editor — o primeiro currículo é construído enquanto falas."}
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
