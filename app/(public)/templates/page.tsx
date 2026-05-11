import type { Metadata } from "next";
import type { TemplateId } from "@/types/cv";
import { TEMPLATES } from "@/components/templates";
import { TemplateCard } from "./TemplateCard";

export const metadata: Metadata = {
  title: "Templates — Folio",
  description:
    "Galeria de modelos de currículo. Cada um é editável em conversação natural — escolhe um e começa.",
};

const ACCENT = "#1A6D75";

const TAGLINES: Record<TemplateId, string> = {
  aurora: "Duas colunas, voz firme.",
  editorial: "Vive em revistas, não em formulários.",
  mono: "Quando o trabalho fala por ti.",
  bold: "Entra de cabeça.",
};

export default function TemplatesPage() {
  const entries = Object.entries(TEMPLATES) as [TemplateId, (typeof TEMPLATES)[TemplateId]][];

  return (
    <div
      style={{
        position: "relative",
        background:
          "radial-gradient(ellipse 800px 500px at 12% -8%, color-mix(in oklab, var(--brand) 8%, transparent) 0%, transparent 70%), radial-gradient(ellipse 700px 500px at 95% 10%, color-mix(in oklab, var(--lime) 8%, transparent) 0%, transparent 70%)",
      }}
    >
      <div className="tpl-page" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 24px 48px" }}>
        <header className="tpl-hero" style={{ maxWidth: 740, marginBottom: 72 }}>
          {/* Single deliberate brand stroke above the headline */}
          <div
            aria-hidden
            style={{
              width: 40,
              height: 3,
              background: ACCENT,
              borderRadius: 2,
              marginBottom: 28,
            }}
          />

          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px, 6vw, 72px)",
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: "-.025em",
              color: "var(--ink)",
            }}
          >
            Modelos pensados para serem lidos,{" "}
            <em style={{ fontStyle: "italic", color: ACCENT }}>não passados à frente.</em>
          </h1>

          <p
            style={{
              margin: "26px 0 0",
              fontSize: 16.5,
              lineHeight: 1.65,
              color: "var(--ink-3)",
              maxWidth: 540,
            }}
          >
            Quatro composições, escolhidas pela forma como organizam a leitura — não pela decoração.
            Escolhe um e começa a editar em conversa.
          </p>
        </header>

        <section
          className="tpl-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(232px, 1fr))",
            gap: 32,
          }}
        >
          {entries.map(([id, t]) => (
            <TemplateCard key={id} id={id} name={t.name} tagline={TAGLINES[id]} accent={ACCENT} />
          ))}
        </section>

        {/* Princípios — editorial three-column closing */}
        <section
          className="principles"
          aria-label="Princípios"
          style={{
            marginTop: 112,
            paddingTop: 48,
            borderTop: "1px solid var(--line)",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            columnGap: 0,
          }}
        >
          {PRINCIPLES.map((p, i) => (
            <Principle key={p.title} no={i + 1} title={p.title} body={p.body} accent={ACCENT} last={i === PRINCIPLES.length - 1} />
          ))}
        </section>

      </div>
    </div>
  );
}

const PRINCIPLES = [
  {
    title: "Editável por conversa",
    body: "Sem painéis de configuração. Conta o que mudar — o documento actualiza enquanto falas.",
  },
  {
    title: "Pronto para ATS",
    body: "Estrutura limpa: nenhum modelo esconde dados em colunas que sistemas antigos partem ao meio.",
  },
  {
    title: "A4 nativo",
    body: "O que vês no editor é exactamente o que sai em PDF — sem surpresas, sem reflows.",
  },
];

function Principle({
  no,
  title,
  body,
  accent,
  last,
}: {
  no: number;
  title: string;
  body: string;
  accent: string;
  last: boolean;
}) {
  return (
    <div
      style={{
        padding: "0 28px",
        borderRight: last ? "none" : "1px solid var(--line-soft)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
      className="principle-col"
    >
      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 28,
          fontWeight: 400,
          lineHeight: 1,
          color: accent,
          letterSpacing: "-.01em",
        }}
      >
        {String(no).padStart(2, "0")}
      </span>
      <h3
        style={{
          margin: 0,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: "-.005em",
          color: "var(--ink)",
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "var(--ink-3)",
          maxWidth: "32ch",
        }}
      >
        {body}
      </p>
    </div>
  );
}
