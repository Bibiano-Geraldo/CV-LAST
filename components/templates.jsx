// CV Templates. All render inside an A4 page (794×1123 CSS px @ 96dpi).
// Each template has its own typography + composition.
// Accent color is passed in so users can recolor any template.

const cvBaseStyle = `
  .a4{width:794px;height:1123px;background:#fff;color:#1a1816;position:relative;
      overflow:hidden;flex-shrink:0;box-shadow:0 2px 6px rgba(15,16,12,.05),0 12px 36px rgba(15,16,12,.08);
      border-radius:2px}
  .a4 .ph{display:inline-block;border-radius:50%;background:repeating-linear-gradient(45deg,#e8e5dd 0 6px,#efede5 6px 12px);color:#9c9787;font-family:var(--font-mono);font-size:9px;display:flex;align-items:center;justify-content:center;text-align:center}
  .a4-pagebreak{display:flex;align-items:center;gap:10px;width:100%;color:#9c9787;font-family:var(--font-mono);font-size:10px;padding:14px 0;letter-spacing:.04em}
  .a4-pagebreak::before,.a4-pagebreak::after{content:"";flex:1;height:1px;background:linear-gradient(to right,transparent,#e0ddd2,transparent)}

  /* Inline AI comment pin */
  .ai-pin{position:absolute;width:22px;height:22px;border-radius:50% 50% 50% 4px;background:var(--brand);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;box-shadow:0 4px 12px rgba(26,109,117,.35);transform:rotate(-90deg);font-family:var(--font-ui);cursor:default;z-index:3}
  .ai-pin span{transform:rotate(90deg)}
  .ai-pin:hover{transform:rotate(-90deg) scale(1.1)}
`;

// Inject once
(() => {
  if (document.getElementById("cv-base-style")) return;
  const s = document.createElement("style");
  s.id = "cv-base-style";
  s.textContent = cvBaseStyle;
  document.head.appendChild(s);
})();

// Shared helpers
const PhotoSlot = ({ size = 78, round = true }) => (
  <div className="ph" style={{
    width: size, height: size, borderRadius: round ? "50%" : 8,
    flexShrink: 0
  }}>foto</div>
);

const AIPin = ({ n, top, left, right, title }) => (
  <div className="ai-pin" style={{ top, left, right }} title={title}><span>{n}</span></div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 1 — "Aurora" (default) — modern two-column with teal sidebar
// ─────────────────────────────────────────────────────────────────────────────
function TemplateAurora({ cv, accent, showPins }) {
  return (
    <>
      {/* Page 1 */}
      <div className="a4" style={{display:"grid", gridTemplateColumns:"272px 1fr"}}>
        {/* Sidebar */}
        <aside style={{background:accent, color:"#fff", padding:"38px 28px", display:"flex", flexDirection:"column", gap:24}}>
          <PhotoSlot size={108} />
          <div>
            <div style={{fontFamily:"var(--font-serif)", fontSize:28, lineHeight:1.05, fontWeight:500, letterSpacing:"-.01em"}}>{cv.name}</div>
            <div style={{fontSize:11.5, opacity:.85, marginTop:4, letterSpacing:".02em"}}>{cv.role}</div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:7, fontSize:10.5, opacity:.92}}>
            <span style={{display:"flex", alignItems:"center", gap:7}}><I.AtSign size={12} w={1.4}/>{cv.email}</span>
            <span style={{display:"flex", alignItems:"center", gap:7}}><I.Phone size={12} w={1.4}/>{cv.phone}</span>
            <span style={{display:"flex", alignItems:"center", gap:7}}><I.MapPin size={12} w={1.4}/>{cv.location}</span>
            <span style={{display:"flex", alignItems:"center", gap:7}}><I.Linkedin size={12} w={1.4}/>{cv.linkedin}</span>
            <span style={{display:"flex", alignItems:"center", gap:7}}><I.Globe size={12} w={1.4}/>{cv.website}</span>
          </div>

          <div>
            <H sectionAccent>Competências</H>
            <div style={{display:"flex", flexWrap:"wrap", gap:5, marginTop:8}}>
              {cv.skills.map((s,i)=>(
                <span key={i} style={{fontSize:9.5, padding:"3px 8px", borderRadius:99, background:"rgba(255,255,255,.16)", border:"1px solid rgba(255,255,255,.22)"}}>{s}</span>
              ))}
            </div>
          </div>

          <div>
            <H sectionAccent>Idiomas</H>
            <div style={{display:"flex", flexDirection:"column", gap:5, marginTop:8, fontSize:10.5}}>
              {cv.languages.map((l,i)=>(
                <div key={i} style={{display:"flex", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,.18)", paddingBottom:4}}>
                  <span style={{fontWeight:500}}>{l.name}</span><span style={{opacity:.75}}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main style={{padding:"40px 36px 32px", position:"relative"}}>
          {showPins && <AIPin n={1} top={32} right={-10} title="Sugestão de reformulação" />}

          <section>
            <H accent={accent}>Perfil</H>
            <p style={{fontSize:11, lineHeight:1.55, color:"#3a372f", margin:"8px 0 0", maxWidth:430}}>{cv.summary}</p>
          </section>

          <section style={{marginTop:24, position:"relative"}}>
            <H accent={accent}>Experiência</H>
            {showPins && <AIPin n={2} top={32} right={-10} title="Mover este bullet ao topo" />}
            <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:18}}>
              {cv.experience.slice(0,2).map((e,i)=>(
                <ExpBlock key={i} e={e} accent={accent} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <div className="a4-pagebreak"><span>página 1 / 2</span></div>

      {/* Page 2 */}
      <div className="a4" style={{display:"grid", gridTemplateColumns:"272px 1fr"}}>
        <aside style={{background:accent, color:"#fff", padding:"38px 28px", display:"flex", flexDirection:"column", gap:24}}>
          <div>
            <H sectionAccent>Reconhecimentos</H>
            <div style={{display:"flex", flexDirection:"column", gap:10, marginTop:8, fontSize:10.5}}>
              {cv.extras.awards.map((a,i)=>(
                <div key={i}><div style={{fontWeight:500}}>{a.title}</div><div style={{opacity:.75}}>{a.body}</div></div>
              ))}
            </div>
          </div>

          <div>
            <H sectionAccent>Stack</H>
            <div style={{display:"flex", flexDirection:"column", gap:5, marginTop:8, fontSize:10.5, opacity:.9}}>
              <span>React, TypeScript, Tailwind</span>
              <span>Figma, FigJam, Penpot</span>
              <span>Notion, Linear, Github</span>
            </div>
          </div>

          <div style={{marginTop:"auto", fontSize:9.5, opacity:.6, fontFamily:"var(--font-mono)"}}>
            Disponível para mudança<br/>desde Jan 2026
          </div>
        </aside>

        <main style={{padding:"40px 36px 32px"}}>
          <section>
            <H accent={accent}>Experiência (continuação)</H>
            <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:18}}>
              {cv.experience.slice(2).map((e,i)=>(
                <ExpBlock key={i} e={e} accent={accent} />
              ))}
            </div>
          </section>

          <section style={{marginTop:22}}>
            <H accent={accent}>Educação</H>
            <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:10}}>
              {cv.education.map((ed,i)=>(
                <div key={i} style={{display:"flex", justifyContent:"space-between", fontSize:11}}>
                  <div><div style={{fontWeight:500, color:"#1a1816"}}>{ed.degree}</div><div style={{color:"#6b6759"}}>{ed.school}</div></div>
                  <div style={{color:"#9c9787", fontFamily:"var(--font-mono)", fontSize:10}}>{ed.year}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{marginTop:22, position:"relative"}}>
            <H accent={accent}>Projectos</H>
            {showPins && <AIPin n={3} top={32} right={-10} title="Adicionar Folio kit aqui" />}
            <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:10}}>
              {cv.extras.projects.map((p,i)=>(
                <div key={i} style={{fontSize:11}}>
                  <div style={{fontWeight:500}}>{p.name}</div>
                  <div style={{color:"#6b6759", marginTop:2}}>{p.body}</div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

const H = ({ children, accent, sectionAccent }) => (
  <h3 style={{
    margin:0, fontSize: sectionAccent ? 10 : 11,
    fontWeight:600, letterSpacing:".09em", textTransform:"uppercase",
    color: sectionAccent ? "rgba(255,255,255,.7)" : (accent || "#1a1816"),
    paddingBottom: sectionAccent ? 0 : 6,
    borderBottom: sectionAccent ? "none" : `1px solid ${accent || "#1a1816"}30`,
    fontFamily:"var(--font-ui)"
  }}>{children}</h3>
);

const ExpBlock = ({ e, accent, classic }) => (
  <div style={{position:"relative"}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:12}}>
      <div>
        <div style={{fontSize:12.5, fontWeight:600, color:"#1a1816", letterSpacing:"-.005em"}}>{e.role}</div>
        <div style={{fontSize:11, color: accent || "#3a372f", fontWeight:500}}>{e.company}</div>
      </div>
      <div style={{fontFamily:"var(--font-mono)", fontSize:9.5, color:"#9c9787", whiteSpace:"nowrap"}}>
        {e.from} – {e.to} · {e.location}
      </div>
    </div>
    <ul style={{margin:"6px 0 0 0", padding:"0 0 0 14px", color:"#3a372f", fontSize:11, lineHeight:1.55}}>
      {e.bullets.map((b,j)=><li key={j} style={{marginBottom:2}}>{b}</li>)}
    </ul>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 2 — "Editorial" — single column, serif headers, magazine feel
// ─────────────────────────────────────────────────────────────────────────────
function TemplateEditorial({ cv, accent, showPins }) {
  return (
    <>
      <div className="a4" style={{padding:"56px 64px 48px", display:"flex", flexDirection:"column", gap:22, position:"relative"}}>
        {showPins && <AIPin n={1} top={64} right={28} title="Sugestão de tom" />}

        <header style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:24, paddingBottom:18, borderBottom:`1.5px solid ${accent}`}}>
          <div>
            <div style={{fontFamily:"var(--font-serif)", fontSize:44, fontWeight:500, lineHeight:.98, letterSpacing:"-.02em", color:"#1a1816"}}>{cv.name}</div>
            <div style={{fontSize:13, color:accent, marginTop:6, fontWeight:500}}>{cv.role}</div>
            <div style={{fontSize:10.5, color:"#6b6759", marginTop:14, display:"flex", gap:14, flexWrap:"wrap"}}>
              <span>{cv.email}</span><span>·</span><span>{cv.phone}</span><span>·</span>
              <span>{cv.location}</span><span>·</span><span>{cv.website}</span>
            </div>
          </div>
          <PhotoSlot size={84} round={false} />
        </header>

        <section>
          <p style={{fontFamily:"var(--font-serif)", fontStyle:"italic", fontSize:14, lineHeight:1.5, color:"#3a372f", margin:0, maxWidth:580, fontWeight:400}}>
            "{cv.summary}"
          </p>
        </section>

        <section style={{position:"relative"}}>
          <SerifH accent={accent}>Experiência</SerifH>
          {showPins && <AIPin n={2} top={4} right={-26} title="Reordenar bullets" />}
          <div style={{marginTop:12, display:"flex", flexDirection:"column", gap:18}}>
            {cv.experience.slice(0,2).map((e,i)=><ExpBlock key={i} e={e} accent={accent}/>)}
          </div>
        </section>

        <section>
          <SerifH accent={accent}>Competências</SerifH>
          <div style={{marginTop:8, fontSize:11, lineHeight:1.7, color:"#3a372f"}}>
            {cv.skills.join(" · ")}
          </div>
        </section>
      </div>

      <div className="a4-pagebreak"><span>página 1 / 2</span></div>

      <div className="a4" style={{padding:"56px 64px 48px", display:"flex", flexDirection:"column", gap:22}}>
        <section>
          <SerifH accent={accent}>Experiência (cont.)</SerifH>
          <div style={{marginTop:12}}>
            {cv.experience.slice(2).map((e,i)=><ExpBlock key={i} e={e} accent={accent}/>)}
          </div>
        </section>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:36}}>
          <section>
            <SerifH accent={accent}>Educação</SerifH>
            <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:10}}>
              {cv.education.map((ed,i)=>(
                <div key={i} style={{fontSize:11}}>
                  <div style={{fontWeight:600}}>{ed.degree}</div>
                  <div style={{color:"#6b6759"}}>{ed.school} · {ed.year}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SerifH accent={accent}>Idiomas</SerifH>
            <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:6}}>
              {cv.languages.map((l,i)=>(
                <div key={i} style={{fontSize:11, display:"flex", justifyContent:"space-between", borderBottom:"1px solid #efede5", paddingBottom:4}}>
                  <span style={{fontWeight:500}}>{l.name}</span><span style={{color:"#6b6759"}}>{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section style={{position:"relative"}}>
          <SerifH accent={accent}>Reconhecimentos & projectos</SerifH>
          {showPins && <AIPin n={3} top={4} right={-26} title="Sugestão de adição" />}
          <div style={{marginTop:10, display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}}>
            {[...cv.extras.awards, ...cv.extras.projects].map((x,i)=>(
              <div key={i} style={{fontSize:11}}>
                <div style={{fontWeight:600}}>{x.title || x.name}</div>
                <div style={{color:"#6b6759", marginTop:2}}>{x.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

const SerifH = ({ accent, children }) => (
  <h3 style={{
    margin:0, fontFamily:"var(--font-serif)", fontSize:20, fontWeight:500,
    letterSpacing:"-.01em", color:"#1a1816", display:"flex", alignItems:"center", gap:10
  }}>
    <span style={{width:18, height:1.5, background:accent}}/>
    {children}
  </h3>
);

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 3 — "Mono" — minimal, mono labels, lots of whitespace
// ─────────────────────────────────────────────────────────────────────────────
function TemplateMono({ cv, accent, showPins }) {
  const Lbl = ({ children }) => (
    <div style={{fontFamily:"var(--font-mono)", fontSize:9.5, letterSpacing:".12em", textTransform:"uppercase", color:"#9c9787"}}>{children}</div>
  );
  return (
    <>
      <div className="a4" style={{padding:"68px 70px", display:"flex", flexDirection:"column", gap:28, position:"relative"}}>
        {showPins && <AIPin n={1} top={68} right={42} title="Verifique alinhamento à vaga" />}

        <header style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:24}}>
          <div>
            <Lbl>{cv.role}</Lbl>
            <div style={{fontSize:38, fontWeight:400, lineHeight:1, letterSpacing:"-.025em", marginTop:6, color:"#1a1816"}}>{cv.name}</div>
            <div style={{marginTop:18, fontFamily:"var(--font-mono)", fontSize:10, color:"#3a372f", display:"flex", flexDirection:"column", gap:3}}>
              <span>{cv.email}</span>
              <span>{cv.phone}</span>
              <span>{cv.location} · {cv.linkedin}</span>
            </div>
          </div>
          <div style={{width:6, height:80, background:accent, borderRadius:1, marginTop:4}}/>
        </header>

        <section style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:20}}>
          <Lbl>Perfil</Lbl>
          <p style={{margin:0, fontSize:12, lineHeight:1.6, color:"#3a372f"}}>{cv.summary}</p>
        </section>

        <section style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:20, position:"relative"}}>
          <Lbl>Experiência</Lbl>
          {showPins && <AIPin n={2} top={-2} left={-30} title="Bullet movido ao topo" />}
          <div style={{display:"flex", flexDirection:"column", gap:20}}>
            {cv.experience.slice(0,2).map((e,i)=>(
              <div key={i}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                  <div style={{fontSize:13, fontWeight:500}}>{e.role}, <span style={{color:accent}}>{e.company}</span></div>
                  <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#9c9787"}}>{e.from}—{e.to}</div>
                </div>
                <ul style={{margin:"6px 0 0", padding:"0 0 0 14px", fontSize:11, lineHeight:1.6, color:"#3a372f"}}>
                  {e.bullets.map((b,j)=><li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:20}}>
          <Lbl>Competências</Lbl>
          <div style={{fontSize:11, lineHeight:1.7, color:"#3a372f"}}>
            {cv.skills.map((s,i)=>(
              <span key={i}>
                {s}{i<cv.skills.length-1 && <span style={{color:"#cfcbbf", margin:"0 6px"}}>/</span>}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="a4-pagebreak"><span>página 1 / 2</span></div>

      <div className="a4" style={{padding:"68px 70px", display:"flex", flexDirection:"column", gap:28}}>
        <section style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:20}}>
          <Lbl>Cont.</Lbl>
          <div style={{display:"flex", flexDirection:"column", gap:20}}>
            {cv.experience.slice(2).map((e,i)=>(
              <div key={i}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                  <div style={{fontSize:13, fontWeight:500}}>{e.role}, <span style={{color:accent}}>{e.company}</span></div>
                  <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#9c9787"}}>{e.from}—{e.to}</div>
                </div>
                <ul style={{margin:"6px 0 0", padding:"0 0 0 14px", fontSize:11, lineHeight:1.6, color:"#3a372f"}}>
                  {e.bullets.map((b,j)=><li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:20}}>
          <Lbl>Educação</Lbl>
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {cv.education.map((ed,i)=>(
              <div key={i} style={{fontSize:11.5, display:"flex", justifyContent:"space-between"}}>
                <div><b style={{fontWeight:500}}>{ed.degree}</b> · <span style={{color:"#6b6759"}}>{ed.school}</span></div>
                <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"#9c9787"}}>{ed.year}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:20}}>
          <Lbl>Idiomas</Lbl>
          <div style={{fontSize:11, color:"#3a372f"}}>
            {cv.languages.map((l,i)=>(<span key={i}>{l.name} <span style={{color:"#9c9787"}}>({l.level})</span>{i<cv.languages.length-1?" · ":""}</span>))}
          </div>
        </section>

        <section style={{display:"grid", gridTemplateColumns:"110px 1fr", gap:20, position:"relative"}}>
          <Lbl>Projectos</Lbl>
          {showPins && <AIPin n={3} top={-2} left={-30} title="Adicionar Folio kit" />}
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {cv.extras.projects.map((p,i)=>(
              <div key={i} style={{fontSize:11.5}}>
                <b style={{fontWeight:500}}>{p.name}</b>
                <div style={{color:"#6b6759", marginTop:2}}>{p.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 4 — "Bold" — accent-block header, modern bold
// ─────────────────────────────────────────────────────────────────────────────
function TemplateBold({ cv, accent, showPins }) {
  return (
    <>
      <div className="a4" style={{display:"flex", flexDirection:"column", position:"relative"}}>
        {showPins && <AIPin n={1} top={42} right={42} title="Tom mais focado em impacto" />}

        <header style={{background:accent, color:"#fff", padding:"40px 48px", display:"flex", alignItems:"center", gap:24}}>
          <PhotoSlot size={92} />
          <div style={{flex:1}}>
            <div style={{fontSize:34, fontWeight:600, lineHeight:1, letterSpacing:"-.02em"}}>{cv.name}</div>
            <div style={{fontSize:13, opacity:.85, marginTop:6, letterSpacing:".02em"}}>{cv.role}</div>
          </div>
          <div style={{textAlign:"right", fontSize:10.5, opacity:.92, display:"flex", flexDirection:"column", gap:3}}>
            <span>{cv.email}</span><span>{cv.phone}</span><span>{cv.location}</span><span>{cv.linkedin}</span>
          </div>
        </header>

        <div style={{padding:"32px 48px", flex:1, display:"flex", flexDirection:"column", gap:22}}>
          <section style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:24}}>
            <BoldH accent={accent}>Perfil</BoldH>
            <p style={{margin:0, fontSize:11.5, lineHeight:1.55, color:"#3a372f"}}>{cv.summary}</p>
          </section>

          <section style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:24, position:"relative"}}>
            <BoldH accent={accent}>Experiência</BoldH>
            {showPins && <AIPin n={2} top={-2} left={-32} title="Compass ao topo" />}
            <div style={{display:"flex", flexDirection:"column", gap:18}}>
              {cv.experience.slice(0,2).map((e,i)=><ExpBlock key={i} e={e} accent={accent}/>)}
            </div>
          </section>

          <section style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:24}}>
            <BoldH accent={accent}>Competências</BoldH>
            <div style={{display:"flex", flexWrap:"wrap", gap:5}}>
              {cv.skills.map((s,i)=>(
                <span key={i} style={{fontSize:10.5, padding:"4px 10px", border:`1px solid ${accent}40`, borderRadius:99, color:"#3a372f"}}>{s}</span>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="a4-pagebreak"><span>página 1 / 2</span></div>

      <div className="a4" style={{padding:"40px 48px 32px", display:"flex", flexDirection:"column", gap:22}}>
        <section style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:24}}>
          <BoldH accent={accent}>Experiência</BoldH>
          <div style={{display:"flex", flexDirection:"column", gap:18}}>
            {cv.experience.slice(2).map((e,i)=><ExpBlock key={i} e={e} accent={accent}/>)}
          </div>
        </section>
        <section style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:24}}>
          <BoldH accent={accent}>Educação</BoldH>
          <div style={{display:"flex", flexDirection:"column", gap:8}}>
            {cv.education.map((ed,i)=>(
              <div key={i} style={{fontSize:11.5}}>
                <b style={{fontWeight:600}}>{ed.degree}</b> · <span style={{color:"#6b6759"}}>{ed.school}, {ed.year}</span>
              </div>
            ))}
          </div>
        </section>
        <section style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:24}}>
          <BoldH accent={accent}>Idiomas</BoldH>
          <div style={{display:"flex", gap:18, flexWrap:"wrap", fontSize:11.5}}>
            {cv.languages.map((l,i)=>(<span key={i}><b style={{fontWeight:600}}>{l.name}</b> <span style={{color:"#9c9787"}}>{l.level}</span></span>))}
          </div>
        </section>
        <section style={{display:"grid", gridTemplateColumns:"160px 1fr", gap:24, position:"relative"}}>
          <BoldH accent={accent}>Projectos</BoldH>
          {showPins && <AIPin n={3} top={-2} left={-32} title="Adicionar Folio kit" />}
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            {cv.extras.projects.map((p,i)=>(
              <div key={i} style={{fontSize:11.5}}>
                <b style={{fontWeight:600}}>{p.name}</b>
                <div style={{color:"#6b6759", marginTop:2}}>{p.body}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

const BoldH = ({ accent, children }) => (
  <h3 style={{margin:0, fontSize:18, fontWeight:700, letterSpacing:"-.01em", color:accent, lineHeight:1.1}}>{children}</h3>
);

// Template registry
const TEMPLATES = {
  aurora:    { name: "Aurora",    sub: "Duas colunas, moderno",     render: TemplateAurora },
  editorial: { name: "Editorial", sub: "Serifa, magazine",          render: TemplateEditorial },
  mono:      { name: "Mono",      sub: "Minimal, monoespaçado",     render: TemplateMono },
  bold:      { name: "Bold",      sub: "Cabeçalho marcado",         render: TemplateBold },
};

Object.assign(window, { TEMPLATES });
