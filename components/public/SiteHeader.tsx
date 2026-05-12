"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { I } from "@/components/icons";
import { Popover } from "@/components/popovers/Popover";

const nav = [
  { label: "Templates", href: "/templates", active: true },
  { label: "Preços", href: "#", soon: true },
  { label: "Blog", href: "#", soon: true },
  { label: "FAQ", href: "#", soon: true },
  { label: "Sobre", href: "#", soon: true },
  { label: "Contacto", href: "#", soon: true },
];

export function SiteHeader({ activeHref }: { activeHref?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "color-mix(in oklab, var(--bg) 85%, transparent)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        backdropFilter: "saturate(140%) blur(8px)",
        borderBottom: "1px solid var(--line-soft)",
      }}
    >
      <div
        className="site-header-row"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <Link
          href="/"
          aria-label="Folio — página inicial"
          className="brand-link"
          style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "var(--ink)", transition: "opacity .15s ease" }}
        >
          <I.Logo size={22} />
          <span className="brand-wordmark" style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-.01em" }}>Folio</span>
        </Link>

        <nav className="site-nav" style={{ alignItems: "center", gap: 4, flex: 1 }}>
          {nav.map((item) => {
            const isActive = activeHref ? activeHref === item.href : item.active;
            const disabled = !!item.soon;
            return (
              <Link
                key={item.label}
                href={disabled ? "#" : (item.href as never)}
                aria-disabled={disabled || undefined}
                onClick={disabled ? (e) => e.preventDefault() : undefined}
                className={`nav-link${isActive ? " is-active" : ""}`}
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 7,
                  fontSize: 13,
                  fontWeight: 500,
                  color: isActive ? "var(--ink)" : "var(--ink-3)",
                  background: isActive ? "var(--bg-tint)" : "transparent",
                  opacity: disabled ? 0.55 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                {item.label}
                {disabled && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "var(--lime-ink)",
                      background: "color-mix(in oklab, var(--lime) 28%, white)",
                      padding: "1px 6px",
                      borderRadius: 99,
                      letterSpacing: ".02em",
                      marginLeft: 2,
                    }}
                  >
                    em breve
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger (visibility controlled by CSS) */}
        <button
          type="button"
          className="mobile-menu-trigger"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 38,
            height: 38,
            borderRadius: 9,
            border: "1px solid var(--line)",
            background: "var(--bg-elev)",
            color: "var(--ink-2)",
            cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          <I.Menu size={18} />
        </button>

        <div className="header-right-cluster" style={{ alignItems: "center", gap: 14, marginLeft: "auto" }}>
          <LanguageSelector />

          <div aria-hidden style={{ width: 1, height: 18, background: "var(--line)" }} />

          <Link
            href="/"
            className="cta-brand cta-mobile-compact"
            style={{
              gap: 8,
              height: 36,
              padding: "0 6px 0 14px",
              fontSize: 13,
              fontWeight: 500,
              boxShadow: "0 1px 0 var(--brand-ink), 0 4px 14px rgba(15,16,12,.10)",
            }}
          >
            <span>Abrir editor</span>
            <span className="cta-arrow" aria-hidden style={{ width: 24, height: 24, fontSize: 13 }}>
              →
            </span>
          </Link>
        </div>
      </div>
    </header>

    {/* Mobile drawer — rendered as sibling, outside the header's containing block */}
    {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,16,12,.32)",
              zIndex: 70,
              animation: "fadeIn .18s ease",
              WebkitBackdropFilter: "blur(2px)",
              backdropFilter: "blur(2px)",
            }}
          />
          <aside
            role="dialog"
            aria-label="Menu"
            className="safe-pad-top safe-pad-bottom safe-pad-right"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(320px, 88vw)",
              background: "var(--bg-elev)",
              zIndex: 71,
              boxShadow: "-12px 0 36px rgba(15,16,12,.14)",
              display: "flex",
              flexDirection: "column",
              animation: "slideInRight .28s cubic-bezier(.16,1,.3,1)",
            }}
          >
            {/* Drawer header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 18px",
                borderBottom: "1px solid var(--line-soft)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <I.Logo size={22} />
                <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-.01em" }}>Folio</span>
              </div>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: 0,
                  background: "var(--bg-tint)",
                  color: "var(--ink-2)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <I.Close size={16} />
              </button>
            </div>

            {/* Nav */}
            <nav
              style={{
                flex: 1,
                padding: "12px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflowY: "auto",
              }}
            >
              {nav.map((item) => {
                const disabled = !!item.soon;
                const isActive = activeHref ? activeHref === item.href : item.active;
                return (
                  <Link
                    key={item.label}
                    href={disabled ? "#" : (item.href as never)}
                    aria-disabled={disabled || undefined}
                    onClick={(e) => {
                      if (disabled) e.preventDefault();
                      else setMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 14px",
                      borderRadius: 10,
                      textDecoration: "none",
                      color: isActive ? "var(--ink)" : "var(--ink-2)",
                      background: isActive ? "var(--bg-tint)" : "transparent",
                      opacity: disabled ? 0.65 : 1,
                      cursor: disabled ? "not-allowed" : "pointer",
                      fontSize: 16,
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    <span>{item.label}</span>
                    {disabled ? (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          color: "var(--lime-ink)",
                          background: "color-mix(in oklab, var(--lime) 28%, white)",
                          padding: "2px 7px",
                          borderRadius: 99,
                          letterSpacing: ".02em",
                        }}
                      >
                        em breve
                      </span>
                    ) : (
                      <I.ChevronRight size={14} style={{ color: "var(--ink-4)" }} />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + language footer */}
            <div
              style={{
                padding: "14px 16px 18px",
                borderTop: "1px solid var(--line-soft)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="cta-brand"
                style={{
                  justifyContent: "space-between",
                  gap: 10,
                  height: 46,
                  padding: "0 8px 0 20px",
                  fontSize: 14,
                  fontWeight: 500,
                  boxShadow: "0 1px 0 var(--brand-ink), 0 6px 16px rgba(15,16,12,.10)",
                }}
              >
                <span>Abrir editor</span>
                <span className="cta-arrow" aria-hidden style={{ width: 30, height: 30, fontSize: 14 }}>
                  →
                </span>
              </Link>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "var(--ink-3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                  }}
                >
                  Idioma
                </span>
                <LanguageSelector />
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

const LANGUAGES = [
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

function LanguageSelector() {
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("pt");
  const current = LANGUAGES.find((l) => l.code === value) ?? LANGUAGES[0];

  return (
    <>
      <button
        ref={ref}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Idioma · ${current.label}`}
        className="lang-trigger"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          height: 32,
          padding: "0 11px",
          border: 0,
          background: open ? "var(--bg-tint)" : "transparent",
          color: open ? "var(--ink)" : "var(--ink-2)",
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          borderRadius: 99,
          cursor: "pointer",
          transition: "background .16s ease, color .16s ease",
        }}
      >
        <I.Globe size={12} w={1.5} style={{ color: open ? "var(--brand)" : "var(--ink-3)", transition: "color .16s ease" }} />
        {current.code}
        <I.ChevronDown
          size={11}
          style={{
            color: open ? "var(--brand)" : "var(--ink-3)",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform .22s cubic-bezier(.16,1,.3,1), color .16s ease",
          }}
        />
      </button>

      <Popover open={open} anchor={ref} onClose={() => setOpen(false)} side="bottom" align="end" width={200} offset={10}>
        <div
          style={{
            padding: "10px 12px 8px",
            borderBottom: "1px solid var(--line-soft)",
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "var(--ink-4)",
          }}
        >
          <I.Globe size={11} w={1.4} />
          Idioma
        </div>
        <ul role="listbox" style={{ listStyle: "none", margin: 0, padding: 6 }}>
          {LANGUAGES.map((l) => {
            const active = l.code === value;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  className="lang-item"
                  onClick={() => {
                    setValue(l.code);
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    gap: 11,
                    padding: "9px 10px",
                    borderRadius: 8,
                    border: 0,
                    background: active ? "var(--bg-tint)" : "transparent",
                    textAlign: "left",
                    fontSize: 13,
                    color: "var(--ink)",
                    cursor: "pointer",
                    transition: "background .14s ease, padding-left .18s cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <span style={{ fontSize: 15, lineHeight: 1 }} aria-hidden>
                    {l.flag}
                  </span>
                  <span style={{ flex: 1, fontWeight: active ? 500 : 400 }}>{l.label}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      color: active ? "var(--brand)" : "var(--ink-4)",
                    }}
                  >
                    {l.code}
                  </span>
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
