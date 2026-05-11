// Gallery overlay — shows user's CVs, cover letters or template picker.
// Full-screen modal over main area with grid of A4 thumbnails.

const { useState: _gS, useEffect: _gE } = React;

const GALLERY_CONFIG = {
  cv: {
    title: "Os meus currículos",
    sub: "6 documentos · última edição há 12 min",
    ctaLabel: "Novo currículo",
    docs: [
      { id:"cv1", name:"Lead Designer — Linear",       updated:"agora",       template:"aurora",    accent:"#1A6D75", role:"Senior Product Designer" },
      { id:"cv2", name:"Design Director — Compass",    updated:"há 2 dias",   template:"editorial", accent:"#1A6D75", role:"Design Director" },
      { id:"cv3", name:"Staff Designer — Vercel",      updated:"há 5 dias",   template:"mono",      accent:"#1F8A5B", role:"Staff Product Designer" },
      { id:"cv4", name:"Design Lead — Stripe",         updated:"há 1 semana", template:"bold",      accent:"#0F4A50", role:"Design Lead" },
      { id:"cv5", name:"Mestre — versão portuguesa",   updated:"há 2 semanas",template:"aurora",    accent:"#1A6D75", role:"Senior Product Designer" },
      { id:"cv6", name:"Versão pré-2024 (arquivo)",    updated:"há 3 meses",  template:"editorial", accent:"#7A4F22", role:"Product Designer" },
    ],
  },
  cover: {
    title: "Cartas de apresentação",
    sub: "3 documentos · adaptadas a vagas específicas",
    ctaLabel: "Nova carta",
    docs: [
      { id:"co1", name:"Linear — Lead Designer",       updated:"agora",       template:"editorial", accent:"#1A6D75", kind:"cover", to:"Equipa de Design, Linear" },
      { id:"co2", name:"Compass — abertura espontânea",updated:"há 4 dias",   template:"mono",      accent:"#3B4A6B", kind:"cover", to:"Compass HR" },
      { id:"co3", name:"Vercel — Staff Designer",      updated:"há 1 semana", template:"aurora",    accent:"#1F8A5B", kind:"cover", to:"Hiring Manager, Vercel" },
    ],
  },
  templates: {
    title: "Templates",
    sub: "4 modelos · escolha um e personalize",
    ctaLabel: null,
    docs: [
      { id:"t-aurora",    name:"Aurora",    updated:"Moderno · duas colunas",  template:"aurora",    accent:"#1A6D75" },
      { id:"t-editorial", name:"Editorial", updated:"Serifa · revista",        template:"editorial", accent:"#1A6D75" },
      { id:"t-mono",      name:"Mono",      updated:"Minimal · whitespace",    template:"mono",      accent:"#1A6D75" },
      { id:"t-bold",      name:"Bold",      updated:"Bloco de acento",         template:"bold",      accent:"#1A6D75" },
    ],
  },
};

function GalleryOverlay({ open, kind, onClose, onSelect }) {
  const [hovered, setHovered] = _gS(null);
  const [q, setQ] = _gS("");

  _gE(() => {
    if (!open) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open]);

  if (!open) return null;
  const cfg = GALLERY_CONFIG[kind] || GALLERY_CONFIG.cv;
  const docs = cfg.docs.filter(d => !q || d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="gallery-bg" style={{
      position:"fixed", inset:0, zIndex:60,
      background:"color-mix(in oklab, var(--bg-tint) 75%, transparent)",
      backdropFilter:"blur(16px) saturate(140%)",
      WebkitBackdropFilter:"blur(16px) saturate(140%)",
      animation:"galBg .22s ease",
      display:"flex", flexDirection:"column"
    }}>
      {/* Header */}
      <header style={{
        flexShrink:0, padding:"22px 32px 16px",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:16
      }}>
        <div style={{display:"flex", alignItems:"baseline", gap:12, minWidth:0}}>
          <h2 style={{margin:0, fontSize:22, fontWeight:600, letterSpacing:"-.02em", color:"var(--ink)"}}>{cfg.title}</h2>
          <span style={{fontSize:12, color:"var(--ink-3)", fontFamily:"var(--font-mono)", letterSpacing:".02em"}}>{cfg.sub}</span>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{display:"flex", alignItems:"center", gap:8, height:34, padding:"0 12px", background:"var(--bg-elev)", borderRadius:8, border:"1px solid var(--line)", minWidth:240}}>
            <I.Search size={14} style={{color:"var(--ink-3)"}}/>
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Procurar…"
                   style={{flex:1, background:"transparent", border:0, outline:"none", fontSize:13, color:"var(--ink)", fontFamily:"inherit", minWidth:0}}/>
          </div>
          {cfg.ctaLabel && (
            <button className="btn primary" style={{height:34, padding:"0 13px", fontSize:13}}>
              <I.Plus size={14}/> {cfg.ctaLabel}
            </button>
          )}
          <button className="icon-btn" onClick={onClose} title="Fechar" style={{width:34, height:34}}>
            <I.Close size={16}/>
          </button>
        </div>
      </header>

      {/* Grid */}
      <div style={{
        flex:1, overflowY:"auto", padding:"8px 32px 40px",
        display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",
        gap:24, alignContent:"start"
      }}>
        {docs.map((d, i) => (
          <DocCard key={d.id} doc={d} kind={kind} hovered={hovered===d.id}
            onHover={(h)=>setHovered(h ? d.id : null)}
            onClick={()=>onSelect?.(d)}
            delay={i*30}/>
        ))}
        {docs.length === 0 && (
          <div style={{gridColumn:"1/-1", textAlign:"center", padding:"60px 0", color:"var(--ink-3)", fontSize:13}}>Nenhum resultado para "{q}"</div>
        )}
      </div>
    </div>
  );
}

function DocCard({ doc, kind, hovered, onHover, onClick, delay }) {
  return (
    <button onClick={onClick}
      onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)}
      style={{
        appearance:"none", border:0, background:"transparent",
        display:"flex", flexDirection:"column", gap:10, padding:0,
        cursor:"pointer", textAlign:"left", animation:`fadeUp .35s ease ${delay}ms both`
      }}>
      {/* Thumbnail */}
      <div style={{
        aspectRatio:"794 / 1123",
        background:"#fff", borderRadius:6, overflow:"hidden",
        boxShadow: hovered
          ? "0 18px 40px rgba(15,16,12,.16), 0 2px 0 rgba(15,16,12,.04)"
          : "0 2px 6px rgba(15,16,12,.05), 0 8px 24px rgba(15,16,12,.08)",
        border:"1px solid var(--line-soft)",
        transition:"transform .25s cubic-bezier(.2,.9,.3,1), box-shadow .25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        position:"relative"
      }}>
        <ThumbScaled template={doc.template} accent={doc.accent} kind={kind === "cover" ? "cover" : "cv"}/>
        {kind === "cv" && (
          <div style={{
            position:"absolute", top:8, right:8, padding:"3px 7px",
            background:"rgba(15,16,12,.78)", color:"#fff", borderRadius:4,
            fontSize:9.5, fontFamily:"var(--font-mono)", letterSpacing:".05em",
            textTransform:"uppercase", opacity: hovered ? 1 : 0, transition:"opacity .2s"
          }}>Abrir</div>
        )}
      </div>
      {/* Meta */}
      <div style={{display:"flex", flexDirection:"column", gap:2, padding:"0 2px"}}>
        <div style={{display:"flex", alignItems:"center", gap:7}}>
          <span style={{width:6, height:6, borderRadius:99, background:doc.accent, flexShrink:0}}/>
          <div style={{fontSize:13, fontWeight:520, color:"var(--ink)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", letterSpacing:"-.005em"}}>{doc.name}</div>
        </div>
        <div style={{fontSize:11, color:"var(--ink-3)", fontFamily:"var(--font-mono)", letterSpacing:".01em", paddingLeft:13}}>{doc.updated}</div>
      </div>
    </button>
  );
}

// Mini A4 thumbnail that scales the real template down using transform.
function ThumbScaled({ template, accent, kind }) {
  const ref = React.useRef(null);
  const [scale, setScale] = _gS(0.25);

  _gE(() => {
    if (!ref.current) return;
    const recalc = () => {
      const w = ref.current.clientWidth;
      setScale(w / 794);
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} style={{width:"100%", height:"100%", position:"relative", overflow:"hidden", background:"#fff", pointerEvents:"none"}}>
      <div style={{
        width:794, height:1123,
        transform:`scale(${scale})`, transformOrigin:"top left",
        position:"absolute", top:0, left:0
      }}>
        {kind === "cover"
          ? <CoverLetterThumb accent={accent}/>
          : <CVThumb template={template} accent={accent}/>}
      </div>
    </div>
  );
}

function CVThumb({ template, accent }) {
  const Tpl = TEMPLATES[template]?.render;
  if (!Tpl) return null;
  return <Tpl cv={SAMPLE_CV} accent={accent} showPins={false} fontSize={100} lineHeight={1.45}/>;
}

function CoverLetterThumb({ accent }) {
  // Lightweight cover letter mock
  return (
    <div style={{width:794, height:1123, background:"#fff", padding:"96px 88px", fontFamily:"var(--font-serif, Georgia, serif)", color:"#1a1816", boxSizing:"border-box"}}>
      <div style={{borderBottom:`2px solid ${accent}`, paddingBottom:18, marginBottom:32}}>
        <div style={{fontSize:30, fontWeight:600, letterSpacing:"-.02em"}}>Aïcha Mondlane</div>
        <div style={{fontSize:13, color:"#6a6657", marginTop:4, fontFamily:"var(--font-mono)", letterSpacing:".02em"}}>aicha@folio.so · +258 84 000 0000</div>
      </div>
      <div style={{fontSize:12, color:"#6a6657", marginBottom:24, fontFamily:"var(--font-mono)"}}>{new Date().toLocaleDateString("pt-PT", {day:"numeric", month:"long", year:"numeric"})}</div>
      <div style={{marginBottom:20, fontSize:14, fontWeight:500}}>À equipa de Recrutamento,</div>
      {[1,2,3,4].map(i => (
        <div key={i} style={{marginBottom:14, fontSize:13.5, lineHeight:1.75, color:"#2a2820"}}>
          {Array(38).fill("·").map((_,j) => (
            <span key={j} style={{display:"inline-block", height:5, width: 4+Math.random()*30, background:"#e3e0d4", margin:"3px 4px 3px 0", borderRadius:2, verticalAlign:"middle"}}/>
          ))}
        </div>
      ))}
      <div style={{marginTop:32}}>
        <div style={{fontSize:13.5, color:"#2a2820"}}>Com os melhores cumprimentos,</div>
        <div style={{fontSize:18, marginTop:24, fontStyle:"italic", color:accent}}>Aïcha Mondlane</div>
      </div>
    </div>
  );
}

Object.assign(window, { GalleryOverlay });
