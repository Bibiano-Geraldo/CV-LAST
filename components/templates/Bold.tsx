import { AIPin, BoldH, ExpBlock, PhotoSlot, type TemplateProps } from "./shared";

export function TemplateBold({ cv, accent, showPins }: TemplateProps) {
  return (
    <>
      <div className="a4" style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        {showPins && <AIPin n={1} top={42} right={42} title="Tom mais focado em impacto" />}

        <header style={{ background: accent, color: "#fff", padding: "40px 48px", display: "flex", alignItems: "center", gap: 24 }}>
          <PhotoSlot size={92} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 34, fontWeight: 600, lineHeight: 1, letterSpacing: "-.02em" }}>{cv.name}</div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6, letterSpacing: ".02em" }}>{cv.role}</div>
          </div>
          <div style={{ textAlign: "right", fontSize: 10.5, opacity: 0.92, display: "flex", flexDirection: "column", gap: 3 }}>
            <span>{cv.email}</span><span>{cv.phone}</span><span>{cv.location}</span><span>{cv.linkedin}</span>
          </div>
        </header>

        <div style={{ padding: "32px 48px", flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
          <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24 }}>
            <BoldH accent={accent}>Perfil</BoldH>
            <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.55, color: "#3a372f" }}>{cv.summary}</p>
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24, position: "relative" }}>
            <BoldH accent={accent}>Experiência</BoldH>
            {showPins && <AIPin n={2} top={-2} left={-32} title="Compass ao topo" />}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {cv.experience.slice(0, 2).map((e, i) => (<ExpBlock key={i} e={e} accent={accent} />))}
            </div>
          </section>

          <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24 }}>
            <BoldH accent={accent}>Competências</BoldH>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {cv.skills.map((s, i) => (
                <span key={i} style={{ fontSize: 10.5, padding: "4px 10px", border: `1px solid ${accent}40`, borderRadius: 99, color: "#3a372f" }}>{s}</span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="a4-pagebreak"><span>página 1 / 2</span></div>

      <div className="a4" style={{ padding: "40px 48px 32px", display: "flex", flexDirection: "column", gap: 22 }}>
        <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24 }}>
          <BoldH accent={accent}>Experiência</BoldH>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {cv.experience.slice(2).map((e, i) => (<ExpBlock key={i} e={e} accent={accent} />))}
          </div>
        </section>
        <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24 }}>
          <BoldH accent={accent}>Educação</BoldH>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cv.education.map((ed, i) => (
              <div key={i} style={{ fontSize: 11.5 }}>
                <b style={{ fontWeight: 600 }}>{ed.degree}</b> · <span style={{ color: "#6b6759" }}>{ed.school}, {ed.year}</span>
              </div>
            ))}
          </div>
        </section>
        <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24 }}>
          <BoldH accent={accent}>Idiomas</BoldH>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 11.5 }}>
            {cv.languages.map((l, i) => (
              <span key={i}><b style={{ fontWeight: 600 }}>{l.name}</b> <span style={{ color: "#9c9787" }}>{l.level}</span></span>
            ))}
          </div>
        </section>
        <section style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 24, position: "relative" }}>
          <BoldH accent={accent}>Projectos</BoldH>
          {showPins && <AIPin n={3} top={-2} left={-32} title="Adicionar Folio kit" />}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cv.extras.projects.map((p, i) => (
              <div key={i} style={{ fontSize: 11.5 }}>
                <b style={{ fontWeight: 600 }}>{p.name}</b>
                <div style={{ color: "#6b6759", marginTop: 2 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
