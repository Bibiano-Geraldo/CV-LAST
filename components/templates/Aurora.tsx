import { I } from "@/components/icons";
import { AIPin, ExpBlock, H, PhotoSlot, type TemplateProps } from "./shared";

export function TemplateAurora({ cv, accent, showPins }: TemplateProps) {
  return (
    <>
      <div className="a4" style={{ display: "grid", gridTemplateColumns: "272px 1fr" }}>
        <aside style={{ background: accent, color: "#fff", padding: "38px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
          <PhotoSlot size={108} />
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, lineHeight: 1.05, fontWeight: 500, letterSpacing: "-.01em" }}>{cv.name}</div>
            <div style={{ fontSize: 11.5, opacity: 0.85, marginTop: 4, letterSpacing: ".02em" }}>{cv.role}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 10.5, opacity: 0.92 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><I.AtSign size={12} w={1.4} />{cv.email}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><I.Phone size={12} w={1.4} />{cv.phone}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><I.MapPin size={12} w={1.4} />{cv.location}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><I.Linkedin size={12} w={1.4} />{cv.linkedin}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}><I.Globe size={12} w={1.4} />{cv.website}</span>
          </div>

          <div>
            <H sectionAccent>Competências</H>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
              {cv.skills.map((s, i) => (
                <span key={i} style={{ fontSize: 9.5, padding: "3px 8px", borderRadius: 99, background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.22)" }}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <H sectionAccent>Idiomas</H>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8, fontSize: 10.5 }}>
              {cv.languages.map((l, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.18)", paddingBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{l.name}</span><span style={{ opacity: 0.75 }}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main style={{ padding: "40px 36px 32px", position: "relative" }}>
          {showPins && <AIPin n={1} top={32} right={-10} title="Sugestão de reformulação" />}

          <section>
            <H accent={accent}>Perfil</H>
            <p style={{ fontSize: 11, lineHeight: 1.55, color: "#3a372f", margin: "8px 0 0", maxWidth: 430 }}>{cv.summary}</p>
          </section>

          <section style={{ marginTop: 24, position: "relative" }}>
            <H accent={accent}>Experiência</H>
            {showPins && <AIPin n={2} top={32} right={-10} title="Mover este bullet ao topo" />}
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 18 }}>
              {cv.experience.slice(0, 2).map((e, i) => (<ExpBlock key={i} e={e} accent={accent} />))}
            </div>
          </section>
        </main>
      </div>

      <div className="a4-pagebreak"><span>página 1 / 2</span></div>

      <div className="a4" style={{ display: "grid", gridTemplateColumns: "272px 1fr" }}>
        <aside style={{ background: accent, color: "#fff", padding: "38px 28px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <H sectionAccent>Reconhecimentos</H>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8, fontSize: 10.5 }}>
              {cv.extras.awards.map((a, i) => (
                <div key={i}><div style={{ fontWeight: 500 }}>{a.title}</div><div style={{ opacity: 0.75 }}>{a.body}</div></div>
              ))}
            </div>
          </div>

          <div>
            <H sectionAccent>Stack</H>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8, fontSize: 10.5, opacity: 0.9 }}>
              <span>React, TypeScript, Tailwind</span>
              <span>Figma, FigJam, Penpot</span>
              <span>Notion, Linear, Github</span>
            </div>
          </div>

          <div style={{ marginTop: "auto", fontSize: 9.5, opacity: 0.6, fontFamily: "var(--font-mono)" }}>
            Disponível para mudança<br />desde Jan 2026
          </div>
        </aside>

        <main style={{ padding: "40px 36px 32px" }}>
          <section>
            <H accent={accent}>Experiência (continuação)</H>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 18 }}>
              {cv.experience.slice(2).map((e, i) => (<ExpBlock key={i} e={e} accent={accent} />))}
            </div>
          </section>

          <section style={{ marginTop: 22 }}>
            <H accent={accent}>Educação</H>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {cv.education.map((ed, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <div><div style={{ fontWeight: 500, color: "#1a1816" }}>{ed.degree}</div><div style={{ color: "#6b6759" }}>{ed.school}</div></div>
                  <div style={{ color: "#9c9787", fontFamily: "var(--font-mono)", fontSize: 10 }}>{ed.year}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 22, position: "relative" }}>
            <H accent={accent}>Projectos</H>
            {showPins && <AIPin n={3} top={32} right={-10} title="Adicionar Folio kit aqui" />}
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {cv.extras.projects.map((p, i) => (
                <div key={i} style={{ fontSize: 11 }}>
                  <div style={{ fontWeight: 500 }}>{p.name}</div>
                  <div style={{ color: "#6b6759", marginTop: 2 }}>{p.body}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
