// Floating popovers used across the app.

// Generic popover with auto-close on outside click.
// When bottomSheetOnMobile=true and viewport <900px, renders as a bottom sheet
// with backdrop instead of an anchored popover.
function Popover({ open, onClose, anchor, children, side = "bottom", align = "end", offset = 8, width, bottomSheetOnMobile = false }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });
  const [isSheet, setIsSheet] = React.useState(
    () => bottomSheetOnMobile && typeof window !== "undefined" && window.innerWidth < 900
  );
  React.useEffect(() => {
    if (!bottomSheetOnMobile) return;
    const on = () => setIsSheet(window.innerWidth < 900);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [bottomSheetOnMobile]);

  // Effective width: shrink to viewport on small screens
  const [effW, setEffW] = React.useState(width || 260);

  React.useLayoutEffect(() => {
    if (!open || isSheet) return;
    if (!anchor?.current) return;
    const r = anchor.current.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const reqW = width || 260;
    const W = Math.min(reqW, vw - 24);
    setEffW(W);
    // Estimate height — measured precisely after first paint
    const H = ref.current?.offsetHeight || 260;
    let top, left;

    if (side === "bottom") top = r.bottom + offset;
    if (side === "top")    top = r.top - offset - H;
    if (side === "right")  { top = r.top; left = r.right + offset; }
    if (side === "left")   { top = r.top; left = r.left - offset - W; }

    if (side === "bottom" || side === "top") {
      if (align === "start")  left = r.left;
      if (align === "end")    left = r.right - W;
      if (align === "center") left = r.left + r.width/2 - W/2;
    }

    // Auto-flip vertical if overflowing
    if (side === "bottom" && top + H > vh - 12) top = Math.max(12, r.top - offset - H);
    if (side === "top"    && top < 12)          top = r.bottom + offset;
    if ((side === "right" || side === "left") && top + H > vh - 12) top = Math.max(12, vh - H - 12);

    // Clamp horizontally to viewport
    left = Math.max(12, Math.min(left, vw - W - 12));

    setPos({ top, left });
  }, [open, anchor, side, align, offset, width]);

  // After first paint we know actual height — re-run measurement once
  React.useLayoutEffect(() => {
    if (!open || !ref.current || !anchor?.current) return;
    const r = anchor.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const H = ref.current.offsetHeight;
    let top = pos.top;
    if (side === "bottom" && r.bottom + offset + H > vh - 12) top = Math.max(12, r.top - offset - H);
    if (side === "right" || side === "left") {
      if (top + H > vh - 12) top = Math.max(12, vh - H - 12);
    }
    if (top !== pos.top) setPos((p) => ({ ...p, top }));
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current?.contains(e.target)) return;
      if (anchor?.current?.contains(e.target)) return;
      onClose?.();
    };
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  if (!open) return null;
  if (isSheet) {
    return (
      <>
        <div onClick={onClose} style={{
          position:"fixed", inset:0, background:"rgba(15,16,12,.32)", zIndex:69,
          animation:"fadeIn .18s ease",
          WebkitBackdropFilter:"blur(2px)", backdropFilter:"blur(2px)"
        }}/>
        <div ref={ref} className="caret-pop" style={{
          position:"fixed",
          left:0, right:0, bottom:0, top:"auto",
          width:"100%", maxWidth:"100%",
          maxHeight:"85dvh",
          borderRadius:"16px 16px 0 0",
          overflowY:"auto",
          zIndex:70,
          paddingBottom:"env(safe-area-inset-bottom)",
          animation:"slideUp .22s cubic-bezier(.2,.9,.3,1)"
        }}>
          {/* Drag handle / grabber affordance */}
          <div style={{
            display:"flex", justifyContent:"center", padding:"8px 0 4px",
            position:"sticky", top:0, background:"var(--bg-elev)", zIndex:1
          }}>
            <div style={{width:36, height:4, borderRadius:99, background:"var(--line)"}}/>
          </div>
          {children}
        </div>
      </>
    );
  }
  return (
    <div ref={ref}
         className="caret-pop"
         style={{
           top: pos.top,
           left: pos.left,
           width: effW,
           maxWidth: "calc(100vw - 24px)",
           maxHeight: "calc(100dvh - 24px)",
           overflowY: "auto",
           animation: "popIn .14s cubic-bezier(.2,.9,.3,1)"
         }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Avatar popover — user menu
// ─────────────────────────────────────────────────────────────────────────────
function AvatarPopover({ open, anchor, onClose }) {
  const items = [
    [{ icon: "User",      label: "Perfil" },
     { icon: "Settings",  label: "Configurações", kbd: "\u2318," },
     { icon: "Bell",      label: "Notificações" },
     { icon: "Help",      label: "Ajuda & atalhos", kbd: "?" }],
    [{ icon: "LogOut",    label: "Terminar sessão", danger: true }]
  ];
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="right" align="start" width={260} offset={8}>
      <div style={{padding:"14px 14px 12px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid var(--line-soft)"}}>
        <div style={{width:36, height:36, borderRadius:"50%", background:"var(--brand)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, fontSize:13}}>AM</div>
        <div style={{minWidth:0, flex:1}}>
          <div style={{fontSize:13, fontWeight:600, color:"var(--ink)"}}>Aïcha Mondlane</div>
          <div style={{fontSize:11.5, color:"var(--ink-3)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>aicha@adicional.co.mz</div>
        </div>
      </div>
      <div style={{padding:6}}>
        <div style={{padding:"8px 10px 6px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <span style={{fontSize:11, color:"var(--ink-3)", fontFamily:"var(--font-mono)", letterSpacing:".04em"}}>PLANO</span>
          <span style={{fontSize:11.5, fontWeight:500, color:"var(--lime-ink)", background:"color-mix(in oklab, var(--lime) 30%, white)", padding:"2px 8px", borderRadius:99}}>Pro · 240 créditos</span>
        </div>
      </div>
      {items.map((group, gi) => (
        <div key={gi} style={{padding:"4px 6px", borderTop: gi===0 ? "none" : "1px solid var(--line-soft)"}}>
          {group.map((it, i) => {
            const Ic = I[it.icon];
            return (
              <button key={i} onClick={()=>{ if (it.kind) onOpenGallery?.(it.kind); onClose?.(); }}
                style={{display:"flex", width:"100%", alignItems:"center", gap:10, padding:"7px 10px", borderRadius:7, background:"transparent", border:0, color: it.danger ? "#c53030" : "var(--ink-2)", fontSize:13, textAlign:"left"}}
                onMouseEnter={(e)=>e.currentTarget.style.background="var(--bg-tint)"}
                onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
                <Ic size={15} />
                <span style={{flex:1}}>{it.label}</span>
                {it.kbd && <span className="kbd">{it.kbd}</span>}
              </button>
            );
          })}
        </div>
      ))}
    </Popover>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Attach popover — opens above the + button
// ─────────────────────────────────────────────────────────────────────────────
function AttachPopover({ open, anchor, onClose, onAttach }) {
  const items = [
    { icon: "FileText", label: "Anexar documento", hint: "PDF, DOCX — usar como base", kind:"doc" },
    { icon: "Camera",   label: "Foto de perfil",  hint: "para incluir no currículo", kind:"photo" },
    { icon: "Briefcase",label: "Anúncio da vaga", hint: "cola o link ou anexa", kind:"jd" },
    { icon: "Linkedin", label: "Importar do LinkedIn", hint: "puxa dados do perfil", kind:"linkedin" },
  ];
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="top" align="start" width={300} offset={10} bottomSheetOnMobile>
      <div style={{padding:6}}>
        {items.map((it,i)=>{
          const Ic = I[it.icon];
          return (
            <button key={i} onClick={()=>{onAttach?.(it.kind); onClose?.();}}
              style={{display:"flex", width:"100%", alignItems:"flex-start", gap:11, padding:"10px 10px", borderRadius:8, background:"transparent", border:0, textAlign:"left"}}
              onMouseEnter={(e)=>e.currentTarget.style.background="var(--bg-tint)"}
              onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
              <div style={{width:30, height:30, borderRadius:7, background:"var(--bg-tint)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--brand)", flexShrink:0}}>
                <Ic size={15} />
              </div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:13, fontWeight:500, color:"var(--ink)"}}>{it.label}</div>
                <div style={{fontSize:11.5, color:"var(--ink-3)", marginTop:1}}>{it.hint}</div>
              </div>
            </button>
          );
        })}
      </div>
    </Popover>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Share popover — link with copy
// ─────────────────────────────────────────────────────────────────────────────
function SharePopover({ open, anchor, onClose }) {
  const [copied, setCopied] = React.useState(false);
  const url = "folio.so/r/aicha-2026-lead-designer";
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="bottom" align="end" width={340} offset={8} bottomSheetOnMobile>
      <div style={{padding:14, display:"flex", flexDirection:"column", gap:12}}>
        <div>
          <div style={{fontSize:13, fontWeight:600}}>Partilhar este currículo</div>
          <div style={{fontSize:11.5, color:"var(--ink-3)", marginTop:2}}>Qualquer pessoa com o link pode ver — não edita.</div>
        </div>

        <div style={{display:"flex", alignItems:"center", gap:6, padding:"6px 8px 6px 10px", background:"var(--bg-tint)", borderRadius:8, border:"1px solid var(--line-soft)"}}>
          <I.Link size={14} />
          <span style={{flex:1, fontSize:12, fontFamily:"var(--font-mono)", color:"var(--ink-2)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{url}</span>
          <button className="btn" style={{height:28, padding:"0 9px", fontSize:11.5}}
                  onClick={()=>{setCopied(true); setTimeout(()=>setCopied(false),1400);}}>
            {copied ? <><I.Check size={13}/> Copiado</> : <><I.Copy size={13}/> Copiar</>}
          </button>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:6, fontSize:12, color:"var(--ink-2)"}}>
          <label style={{display:"flex", alignItems:"center", gap:8}}>
            <input type="checkbox" defaultChecked style={{accentColor:"var(--brand)"}} />
            Permitir descarregar PDF
          </label>
          <label style={{display:"flex", alignItems:"center", gap:8}}>
            <input type="checkbox" style={{accentColor:"var(--brand)"}} />
            Expira em 30 dias
          </label>
        </div>

        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:6, borderTop:"1px solid var(--line-soft)"}}>
          <span style={{fontSize:11, color:"var(--ink-3)", fontFamily:"var(--font-mono)"}}>4 visualizações esta semana</span>
          <button className="btn ghost" style={{height:26, fontSize:11.5, padding:"0 6px"}}>
            <I.Settings size={12}/> Mais opções
          </button>
        </div>
      </div>
    </Popover>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// History popover — version timeline
// ─────────────────────────────────────────────────────────────────────────────
function HistoryPopover({ open, anchor, onClose }) {
  const versions = [
    { when: "agora",          label: "Compass movido ao topo", auto: true, current: true },
    { when: "há 4 min",       label: "Whitesmith removido"   , auto: true },
    { when: "há 8 min",       label: "Resumo reescrito (foco em sénior)", auto: true },
    { when: "há 15 min",      label: "Vaga anexada — Linear", anchor: true },
    { when: "Hoje, 10:42",    label: "Versão inicial importada de PDF" },
  ];
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="bottom" align="end" width={340} offset={8}>
      <div style={{padding:"12px 14px 6px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
          <div style={{fontSize:13, fontWeight:600}}>Histórico de versões</div>
          <button className="btn ghost" style={{height:24, fontSize:11, padding:"0 6px"}}>Limpar</button>
        </div>
        <div style={{fontSize:11.5, color:"var(--ink-3)", marginTop:2}}>Cada alteração da IA fica gravada. Podes reverter para qualquer ponto.</div>
      </div>
      <div style={{padding:"6px 8px 10px", maxHeight:300, overflowY:"auto"}}>
        {versions.map((v,i)=>(
          <div key={i} style={{display:"flex", gap:10, padding:"8px 8px", borderRadius:7, position:"relative"}}
               onMouseEnter={(e)=>e.currentTarget.style.background="var(--bg-tint)"}
               onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
            <div style={{width:18, display:"flex", justifyContent:"center", paddingTop:3}}>
              <div style={{width:8, height:8, borderRadius:"50%", background: v.current ? "var(--brand)" : (v.anchor ? "var(--lime)" : "#cfcbbf"), boxShadow: v.current ? "0 0 0 3px color-mix(in oklab, var(--brand) 20%, transparent)" : "none"}}/>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:12.5, color:"var(--ink-2)", fontWeight: v.current ? 600 : 500}}>{v.label}</div>
              <div style={{fontSize:10.5, color:"var(--ink-3)", marginTop:1, fontFamily:"var(--font-mono)"}}>{v.when}{v.auto && " · IA"}</div>
            </div>
            {!v.current && (
              <button style={{opacity:.6, background:"transparent", border:0, color:"var(--ink-3)", fontSize:11, padding:"2px 6px"}}>Reverter</button>
            )}
          </div>
        ))}
      </div>
    </Popover>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Download popover — pick format
// ─────────────────────────────────────────────────────────────────────────────
function DownloadPopover({ open, anchor, onClose }) {
  const opts = [
    { icon: "FileText", label: "PDF (alta qualidade)", sub: "Recomendado para envio · 2 págs", primary: true },
    { icon: "FileText", label: "PDF — A4 sem fotos",   sub: "Para sistemas ATS antigos" },
    { icon: "FileText", label: "DOCX",                 sub: "Editável no Word" },
    { icon: "FileText", label: "TXT simples",          sub: "Sem formatação" },
  ];
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="bottom" align="end" width={280} offset={8} bottomSheetOnMobile>
      <div style={{padding:6}}>
        {opts.map((o,i)=>(
          <button key={i} onClick={onClose}
            style={{display:"flex", width:"100%", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:7, background:"transparent", border:0, textAlign:"left"}}
            onMouseEnter={(e)=>e.currentTarget.style.background="var(--bg-tint)"}
            onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
            <I.Download size={15} />
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontSize:13, color:"var(--ink)", fontWeight: o.primary ? 600 : 500}}>{o.label}</div>
              <div style={{fontSize:11, color:"var(--ink-3)"}}>{o.sub}</div>
            </div>
            {o.primary && <span className="chip lime" style={{height:20, fontSize:10.5, padding:"0 7px"}}>recomendado</span>}
          </button>
        ))}
      </div>
    </Popover>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Template picker popover — small grid
// ─────────────────────────────────────────────────────────────────────────────
function TemplatePopover({ open, anchor, onClose, value, onChange, accent, onOpenCustomize }) {
  const list = [
    { id:"aurora",    swatches: ["#1A6D75","#fff"] },
    { id:"editorial", swatches: ["#1A6D75","#fff"] },
    { id:"mono",      swatches: ["#1A6D75","#fff"] },
    { id:"bold",      swatches: ["#1A6D75","#fff"] },
  ];
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="bottom" align="end" width={420} offset={8} bottomSheetOnMobile>
      <div style={{padding:"12px 14px 8px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
          <div style={{fontSize:13, fontWeight:600}}>Modelo</div>
          <button className="btn ghost" style={{height:24, fontSize:11.5, padding:"0 8px"}} onClick={()=>{onOpenCustomize?.(); onClose?.();}}>
            <I.Palette size={12}/> Personalizar
          </button>
        </div>
      </div>
      <div style={{padding:"4px 10px 14px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
        {Object.entries(TEMPLATES).map(([id, t])=>{
          const selected = id === value;
          return (
            <button key={id} onClick={()=>{onChange?.(id); onClose?.();}}
              style={{padding:8, borderRadius:9, border: selected ? `1.5px solid ${accent}` : "1px solid var(--line)", background:"var(--bg-elev)", textAlign:"left", display:"flex", flexDirection:"column", gap:8}}>
              <div style={{aspectRatio:"1/1.41", borderRadius:5, overflow:"hidden", background:"#fff", border:"1px solid var(--line-soft)", boxShadow:"0 1px 2px rgba(0,0,0,.04)", display:"flex"}}>
                <MiniTemplate id={id} accent={accent}/>
              </div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12, fontWeight:500}}>{t.name}</div>
                  <div style={{fontSize:10.5, color:"var(--ink-3)"}}>{t.sub}</div>
                </div>
                {selected && <I.Check size={14} style={{color:accent}}/>}
              </div>
            </button>
          );
        })}
      </div>
    </Popover>
  );
}

// Mini schematic preview of a template (no real text)
function MiniTemplate({ id, accent }) {
  const bar = (w, c=accent, h=3) => <div style={{height:h, width:w, background:c, borderRadius:1, opacity:.85}}/>;
  const line = (w) => <div style={{height:2, width:w, background:"#d8d5cc", borderRadius:1}}/>;

  if (id === "aurora") return (
    <>
      <div style={{width:"34%", background:accent, padding:8, display:"flex", flexDirection:"column", gap:5}}>
        <div style={{width:18, height:18, borderRadius:99, background:"rgba(255,255,255,.4)"}}/>
        <div style={{height:3, width:"80%", background:"rgba(255,255,255,.7)"}}/>
        <div style={{height:2, width:"60%", background:"rgba(255,255,255,.45)"}}/>
        <div style={{marginTop:6}}/>
        {[1,2,3,4].map(i=><div key={i} style={{height:2, width: 30 + (i*4)+"%", background:"rgba(255,255,255,.4)", marginBottom:3}}/>)}
      </div>
      <div style={{flex:1, padding:8, display:"flex", flexDirection:"column", gap:4}}>
        {bar("28%")}{line("90%")}{line("85%")}{line("60%")}
        <div style={{marginTop:6}}/>
        {bar("36%")}{line("70%")}{line("90%")}{line("78%")}{line("50%")}
      </div>
    </>
  );
  if (id === "editorial") return (
    <div style={{flex:1, padding:10, display:"flex", flexDirection:"column", gap:5}}>
      <div style={{height:8, width:"55%", background:"#1a1816", borderRadius:1}}/>
      <div style={{height:2, width:"30%", background:accent}}/>
      <div style={{height:1, width:"100%", background:accent, opacity:.8, marginTop:3}}/>
      <div style={{height:3, width:"90%", background:"#cfcbbf", marginTop:6}}/>
      <div style={{height:3, width:"85%", background:"#cfcbbf"}}/>
      <div style={{marginTop:6}}/>
      {bar("30%")}{line("88%")}{line("82%")}{line("70%")}
    </div>
  );
  if (id === "mono") return (
    <div style={{flex:1, padding:12, display:"flex", flexDirection:"column", gap:6}}>
      <div style={{height:2, width:"22%", background:"#9c9787"}}/>
      <div style={{height:7, width:"70%", background:"#1a1816"}}/>
      <div style={{width:3, height:14, background:accent, alignSelf:"flex-end", marginTop:-14}}/>
      <div style={{marginTop:10, display:"grid", gridTemplateColumns:"22% 1fr", gap:5}}>
        <div style={{height:2, background:"#cfcbbf"}}/><div style={{height:2, background:"#d8d5cc"}}/>
        <div style={{height:2, background:"#cfcbbf"}}/><div style={{height:2, background:"#d8d5cc"}}/>
        <div style={{height:2, background:"#cfcbbf"}}/><div style={{height:2, background:"#d8d5cc"}}/>
      </div>
    </div>
  );
  if (id === "bold") return (
    <>
      <div style={{position:"absolute"}}/>
      <div style={{display:"flex", flexDirection:"column", flex:1}}>
        <div style={{background:accent, padding:8, display:"flex", gap:5, alignItems:"center"}}>
          <div style={{width:14, height:14, borderRadius:99, background:"rgba(255,255,255,.4)"}}/>
          <div style={{flex:1}}>
            <div style={{height:4, width:"60%", background:"rgba(255,255,255,.85)"}}/>
            <div style={{height:2, width:"40%", background:"rgba(255,255,255,.55)", marginTop:2}}/>
          </div>
        </div>
        <div style={{padding:8, display:"flex", flexDirection:"column", gap:4}}>
          {bar("32%","#1a1816", 2.5)}{line("85%")}{line("70%")}
          <div style={{marginTop:4}}/>
          {bar("28%","#1a1816",2.5)}{line("70%")}{line("85%")}{line("55%")}
        </div>
      </div>
    </>
  );
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Customize panel — slide-over from right of canvas
// ─────────────────────────────────────────────────────────────────────────────
function CustomizePanel({ open, onClose, accent, onAccent, fontSize, onFontSize, lineHeight, onLineHeight, density, onDensity }) {
  if (!open) return null;
  const palette = ["#1A6D75","#0F4A50","#3B4A6B","#7A4F22","#9A3B3B","#3A4A2A","#1a1816"];
  const fonts = ["DM Sans","Inter","Fraunces","Geist","Helvetica"];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;

  return (
    <div className="customize-panel" style={{
      position: isMobile ? "fixed" : "absolute",
      right: isMobile ? 0 : 14,
      left: isMobile ? 0 : "auto",
      top: isMobile ? "auto" : 60,
      bottom: isMobile ? 0 : 14,
      width: isMobile ? "100%" : 280,
      maxHeight: isMobile ? "85dvh" : "auto",
      zIndex: isMobile ? 70 : 30,
      background:"var(--bg-elev)",
      border:"1px solid var(--line)",
      borderRadius: isMobile ? "16px 16px 0 0" : 14,
      boxShadow:"var(--shadow-lg)",
      display:"flex", flexDirection:"column",
      animation: isMobile ? "slideUp .22s cubic-bezier(.2,.9,.3,1)" : "slideIn .18s cubic-bezier(.2,.9,.3,1)",
      paddingBottom: isMobile ? "env(safe-area-inset-bottom)" : 0
    }}>
      <header style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px 10px", borderBottom:"1px solid var(--line-soft)"}}>
        <div style={{display:"flex", alignItems:"center", gap:8}}>
          <I.Palette size={15} />
          <span style={{fontWeight:600, fontSize:13}}>Personalizar modelo</span>
        </div>
        <button className="icon-btn" onClick={onClose} style={{width:26, height:26}}><I.Close size={14}/></button>
      </header>

      <div style={{padding:"12px 14px 16px", display:"flex", flexDirection:"column", gap:18, overflowY:"auto"}}>
        <Section title="Cor de acento">
          <div style={{display:"flex", gap:7, flexWrap:"wrap"}}>
            {palette.map(c=>(
              <button key={c} onClick={()=>onAccent(c)}
                style={{width:28, height:28, borderRadius:8, background:c, border: c===accent ? "2px solid var(--ink)" : "1px solid var(--line)", boxShadow:"inset 0 0 0 2px rgba(255,255,255,.5)"}}>
                {c===accent && <I.Check size={12} style={{color:"#fff", filter:"drop-shadow(0 1px 1px rgba(0,0,0,.3))"}}/>}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Tipografia">
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:6}}>
            {fonts.map(f=>(
              <button key={f} style={{height:30, fontSize:12, fontFamily:f, border:"1px solid var(--line)", borderRadius:7, background: f==="DM Sans" ? "var(--bg-tint)" : "var(--bg-elev)", color:"var(--ink)"}}>
                {f}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Tamanho do texto" right={fontSize+"%"}>
          <input type="range" min="85" max="120" value={fontSize} onChange={(e)=>onFontSize(+e.target.value)}
                 style={{width:"100%", accentColor:"var(--brand)"}}/>
        </Section>

        <Section title="Espaçamento entre linhas" right={lineHeight.toFixed(2)}>
          <input type="range" min="1.2" max="1.8" step="0.05" value={lineHeight} onChange={(e)=>onLineHeight(+e.target.value)}
                 style={{width:"100%", accentColor:"var(--brand)"}}/>
        </Section>

        <Section title="Densidade">
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0, borderRadius:8, padding:2, background:"var(--bg-tint)"}}>
            {["Compacto","Regular","Espaçoso"].map((d,i)=>(
              <button key={d} onClick={()=>onDensity(d)}
                style={{height:28, fontSize:11.5, fontWeight:500, border:0, borderRadius:6, background: d===density ? "var(--bg-elev)" : "transparent", color:"var(--ink-2)", boxShadow: d===density ? "0 1px 2px rgba(0,0,0,.06)":"none"}}>
                {d}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Margens da página">
          <div style={{display:"flex", gap:4}}>
            {["Estreita","Padrão","Larga"].map((m,i)=>(
              <button key={m} style={{flex:1, height:28, fontSize:11.5, border:"1px solid var(--line)", borderRadius:7, background: i===1 ? "var(--bg-tint)":"var(--bg-elev)", color:"var(--ink-2)"}}>{m}</button>
            ))}
          </div>
        </Section>

        <Section title="Mostrar">
          <Toggle label="Foto de perfil" on />
          <Toggle label="Cabeçalho colorido" on />
          <Toggle label="Comentários da IA" on />
          <Toggle label="Marca d'água «criado em Folio»" />
        </Section>

      </div>
    </div>
  );
}

const Section = ({ title, right, children }) => (
  <div style={{display:"flex", flexDirection:"column", gap:7}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
      <span style={{fontSize:10.5, fontWeight:600, letterSpacing:".06em", textTransform:"uppercase", color:"var(--ink-3)"}}>{title}</span>
      {right && <span style={{fontSize:11, fontFamily:"var(--font-mono)", color:"var(--ink-3)"}}>{right}</span>}
    </div>
    {children}
  </div>
);

const Toggle = ({ label, on }) => {
  const [v, setV] = React.useState(!!on);
  return (
    <label style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", fontSize:12.5, color:"var(--ink-2)"}}>
      <span>{label}</span>
      <button onClick={()=>setV(!v)} style={{width:32, height:18, borderRadius:99, background: v ? "var(--brand)" : "#d8d5cc", border:0, position:"relative", transition:"background .15s"}}>
        <span style={{position:"absolute", top:2, left: v ? 16 : 2, width:14, height:14, borderRadius:"50%", background:"#fff", transition:"left .15s", boxShadow:"0 1px 2px rgba(0,0,0,.2)"}}/>
      </button>
    </label>
  );
};

// Pop-in keyframes
(() => {
  if (document.getElementById("pop-anim")) return;
  const s = document.createElement("style");
  s.id = "pop-anim";
  s.textContent = `
    @keyframes popIn{from{opacity:0;transform:translateY(-4px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}
    @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes drawerIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
    @keyframes galBg{from{opacity:0}to{opacity:1}}
  `;
  document.head.appendChild(s);
})();

Object.assign(window, {
  Popover, AvatarPopover, AttachPopover, SharePopover, HistoryPopover, DownloadPopover, TemplatePopover, CustomizePanel, MiniTemplate
});
