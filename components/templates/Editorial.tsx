import { AIPin, ExpBlock, PhotoSlot, SerifH, type TemplateProps } from "./shared";

export function TemplateEditorial({ cv, accent, showPins }: TemplateProps) {
  return (
    <>
      <div className="a4" style={{ padding: "56px 64px 48px", display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
        {showPins && <AIPin n={1} top={64} right={28} title="Sugestão de tom" />}

        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, paddingBottom: 18, borderBottom: `1.5px solid ${accent}` }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 44, fontWeight: 500, lineHeight: 0.98, letterSpacing: "-.02em", color: "#1a1816" }}>{cv.name}</div>
            <div style={{ fontSize: 13, color: accent, marginTop: 6, fontWeight: 500 }}>{cv.role}</div>
            <div style={{ fontSize: 10.5, color: "#6b6759", marginTop: 14, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span>{cv.email}</span><span>·</span><span>{cv.phone}</span><span>·</span>
              <span>{cv.location}</span><span>·</span><span>{cv.website}</span>
            </div>
          </div>
          <PhotoSlot size={84} round={false} />
        </header>

        <section>
          <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, lineHeight: 1.5, color: "#3a372f", margin: 0, maxWidth: 580, fontWeight: 400 }}>
            "{cv.summary}"
          </p>
        </section>

        <section style={{ position: "relative" }}>
          <SerifH accent={accent}>Experiência</SerifH>
          {showPins && <AIPin n={2} top={4} right={-26} title="Reordenar bullets" />}
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 18 }}>
            {cv.experience.slice(0, 2).map((e, i) => (<ExpBlock key={i} e={e} accent={accent} />))}
          </div>
        </section>

        <section>
          <SerifH accent={accent}>Competências</SerifH>
          <div style={{ marginTop: 8, fontSize: 11, lineHeight: 1.7, color: "#3a372f" }}>
            {cv.skills.join(" · ")}
          </div>
        </section>
      </div>

      <div className="a4-pagebreak"><span>página 1 / 2</span></div>

      <div className="a4" style={{ padding: "56px 64px 48px", display: "flex", flexDirection: "column", gap: 22 }}>
        <section>
          <SerifH accent={accent}>Experiência (cont.)</SerifH>
          <div style={{ marginTop: 12 }}>
            {cv.experience.slice(2).map((e, i) => (<ExpBlock key={i} e={e} accent={accent} />))}
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <section>
            <SerifH accent={accent}>Educação</SerifH>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {cv.education.map((ed, i) => (
                <div key={i} style={{ fontSize: 11 }}>
                  <div style={{ fontWeight: 600 }}>{ed.degree}</div>
                  <div style={{ color: "#6b6759" }}>{ed.school} · {ed.year}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SerifH accent={accent}>Idiomas</SerifH>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {cv.languages.map((l, i) => (
                <div key={i} style={{ fontSize: 11, display: "flex", justifyContent: "space-between", borderBottom: "1px solid #efede5", paddingBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{l.name}</span><span style={{ color: "#6b6759" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section style={{ position: "relative" }}>
          <SerifH accent={accent}>Reconhecimentos & projectos</SerifH>
          {showPins && <AIPin n={3} top={4} right={-26} title="Sugestão de adição" />}
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[...cv.extras.awards, ...cv.extras.projects].map((x, i) => {
              const isAward = "title" in x;
              return (
                <div key={i} style={{ fontSize: 11 }}>
                  <div style={{ fontWeight: 600 }}>{isAward ? x.title : x.name}</div>
                  <div style={{ color: "#6b6759", marginTop: 2 }}>{x.body}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
