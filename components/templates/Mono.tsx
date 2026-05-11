import type { ReactNode } from "react";
import { AIPin, type TemplateProps } from "./shared";

function Lbl({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: ".12em", textTransform: "uppercase", color: "#9c9787" }}>
      {children}
    </div>
  );
}

export function TemplateMono({ cv, accent, showPins }: TemplateProps) {
  return (
    <>
      <div className="a4" style={{ padding: "68px 70px", display: "flex", flexDirection: "column", gap: 28, position: "relative" }}>
        {showPins && <AIPin n={1} top={68} right={42} title="Verifique alinhamento à vaga" />}

        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
          <div>
            <Lbl>{cv.role}</Lbl>
            <div style={{ fontSize: 38, fontWeight: 400, lineHeight: 1, letterSpacing: "-.025em", marginTop: 6, color: "#1a1816" }}>{cv.name}</div>
            <div style={{ marginTop: 18, fontFamily: "var(--font-mono)", fontSize: 10, color: "#3a372f", display: "flex", flexDirection: "column", gap: 3 }}>
              <span>{cv.email}</span>
              <span>{cv.phone}</span>
              <span>{cv.location} · {cv.linkedin}</span>
            </div>
          </div>
          <div style={{ width: 6, height: 80, background: accent, borderRadius: 1, marginTop: 4 }} />
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20 }}>
          <Lbl>Perfil</Lbl>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "#3a372f" }}>{cv.summary}</p>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20, position: "relative" }}>
          <Lbl>Experiência</Lbl>
          {showPins && <AIPin n={2} top={-2} left={-30} title="Bullet movido ao topo" />}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {cv.experience.slice(0, 2).map((e, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{e.role}, <span style={{ color: accent }}>{e.company}</span></div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#9c9787" }}>{e.from}—{e.to}</div>
                </div>
                <ul style={{ margin: "6px 0 0", padding: "0 0 0 14px", fontSize: 11, lineHeight: 1.6, color: "#3a372f" }}>
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20 }}>
          <Lbl>Competências</Lbl>
          <div style={{ fontSize: 11, lineHeight: 1.7, color: "#3a372f" }}>
            {cv.skills.map((s, i) => (
              <span key={i}>
                {s}{i < cv.skills.length - 1 && <span style={{ color: "#cfcbbf", margin: "0 6px" }}>/</span>}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="a4-pagebreak"><span>página 1 / 2</span></div>

      <div className="a4" style={{ padding: "68px 70px", display: "flex", flexDirection: "column", gap: 28 }}>
        <section style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20 }}>
          <Lbl>Cont.</Lbl>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {cv.experience.slice(2).map((e, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{e.role}, <span style={{ color: accent }}>{e.company}</span></div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#9c9787" }}>{e.from}—{e.to}</div>
                </div>
                <ul style={{ margin: "6px 0 0", padding: "0 0 0 14px", fontSize: 11, lineHeight: 1.6, color: "#3a372f" }}>
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20 }}>
          <Lbl>Educação</Lbl>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cv.education.map((ed, i) => (
              <div key={i} style={{ fontSize: 11.5, display: "flex", justifyContent: "space-between" }}>
                <div><b style={{ fontWeight: 500 }}>{ed.degree}</b> · <span style={{ color: "#6b6759" }}>{ed.school}</span></div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#9c9787" }}>{ed.year}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20 }}>
          <Lbl>Idiomas</Lbl>
          <div style={{ fontSize: 11, color: "#3a372f" }}>
            {cv.languages.map((l, i) => (
              <span key={i}>{l.name} <span style={{ color: "#9c9787" }}>({l.level})</span>{i < cv.languages.length - 1 ? " · " : ""}</span>
            ))}
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 20, position: "relative" }}>
          <Lbl>Projectos</Lbl>
          {showPins && <AIPin n={3} top={-2} left={-30} title="Adicionar Folio kit" />}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cv.extras.projects.map((p, i) => (
              <div key={i} style={{ fontSize: 11.5 }}>
                <b style={{ fontWeight: 500 }}>{p.name}</b>
                <div style={{ color: "#6b6759", marginTop: 2 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
