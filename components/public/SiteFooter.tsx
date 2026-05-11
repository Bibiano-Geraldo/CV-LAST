import Link from "next/link";
import { I } from "@/components/icons";

type Col = { title: string; links: { label: string; href: string; soon?: boolean }[] };

const COLUMNS: Col[] = [
  {
    title: "Produto",
    links: [
      { label: "Currículos", href: "/" },
      { label: "Cartas de apresentação", href: "/" },
      { label: "Templates", href: "/templates" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog", href: "#", soon: true },
      { label: "FAQ", href: "#", soon: true },
      { label: "Guias de carreira", href: "#", soon: true },
      { label: "Exemplos de CV", href: "#", soon: true },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#", soon: true },
      { label: "Preços", href: "#", soon: true },
      { label: "Contacto", href: "#", soon: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "/legal/privacidade" },
      { label: "Termos de uso", href: "/legal/termos" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        marginTop: 56,
        borderTop: "1px solid var(--line)",
        background: "color-mix(in oklab, var(--bg-tint) 60%, var(--bg))",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 32px" }}>
        {/* Top — brand + columns */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 1.3fr) repeat(4, minmax(0, 1fr))",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Brand block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <Link
              href="/"
              aria-label="Folio — página inicial"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", color: "var(--ink)" }}
            >
              <I.Logo size={22} />
              <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-.01em" }}>Folio</span>
            </Link>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 17,
                lineHeight: 1.5,
                color: "var(--ink-2)",
                maxWidth: 300,
              }}
            >
              Conta o que mudar — o currículo actualiza enquanto falas.
            </p>

            <Link
              href="/"
              className="cta-brand"
              style={{
                marginTop: 4,
                alignSelf: "flex-start",
                gap: 10,
                height: 40,
                padding: "0 8px 0 18px",
                fontSize: 13,
                fontWeight: 500,
                boxShadow: "0 2px 0 var(--brand-ink), 0 8px 22px color-mix(in oklab, var(--brand) 22%, transparent)",
              }}
            >
              Abrir editor
              <span className="cta-arrow" aria-hidden style={{ width: 24, height: 24, fontSize: 13 }}>
                →
              </span>
            </Link>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 14,
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink {...l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Lime hairline divider — a single deliberate brand stroke */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ width: 56, height: 3, background: "var(--lime)", borderRadius: 2 }} />
          <div style={{ flex: 1, height: 1, background: "var(--line-soft)" }} />
        </div>

        {/* Bottom strip — only legal essentials */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 12.5,
            color: "var(--ink-3)",
          }}
        >
          <span>© {year} Folio. Todos os direitos reservados.</span>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link href="/legal/privacidade" className="footer-link" style={miniLink}>
              Privacidade
            </Link>
            <Link href="/legal/termos" className="footer-link" style={miniLink}>
              Termos
            </Link>
            <Link href="/legal/cookies" className="footer-link" style={miniLink}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const miniLink = {
  color: "var(--ink-3)",
  textDecoration: "none",
  fontSize: 12.5,
} as const;

function FooterLink({ label, href, soon }: { label: string; href: string; soon?: boolean }) {
  if (soon) {
    return (
      <span
        aria-disabled="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13.5,
          color: "var(--ink-4)",
          cursor: "not-allowed",
        }}
      >
        {label}
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
      </span>
    );
  }
  return (
    <Link
      href={href as never}
      className="footer-link"
      style={{
        fontSize: 13.5,
        color: "var(--ink-2)",
        textDecoration: "none",
        transition: "color .14s ease",
      }}
    >
      {label}
    </Link>
  );
}
