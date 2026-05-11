// Chat panel. Two states:
//  - empty: hero greeting + quick prompts + input
//  - conversation: message list + sticky input
// Input has intelligent focus (autofocus, Cmd+K to refocus, focus after sending)

function ChatPanel({ state, thread, onSubmit, onClearAttachments, attachments, onAddAttachment, language, onLanguageChange, showBack, onBack, onOpenPreview, onOpenMenu }) {
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [draft, setDraft] = useState("");
  const [attachOpen, setAttachOpen] = useState(false);
  const attachBtnRef = useRef(null);

  // Intelligent focus — auto-focus on mount and when state changes; refocus on key press
  useEffect(() => {
    inputRef.current?.focus();
  }, [state]);

  useEffect(() => {
    const onKey = (e) => {
      // If user types regular char and nothing else is focused, refocus input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length === 1) inputRef.current?.focus();
      if (e.key === "/") { e.preventDefault(); inputRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-scroll bottom when thread changes
  useEffect(() => {
    if (state === "conversation" && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state, thread]);

  const send = () => {
    if (!draft.trim() && !attachments.length) return;
    onSubmit?.(draft);
    setDraft("");
    inputRef.current?.focus();
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section className="chat-panel" style={{
      display:"flex", flexDirection:"column", height:"100%", minWidth:0,
      borderRight:"1px solid var(--line)", background:"var(--bg)"
    }}>
      {/* Header */}
      <header className="chat-header" style={{
        height:54, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 16px", background:"var(--bg)", gap:10
      }}>
        <div style={{display:"flex", alignItems:"center", gap:8, minWidth:0, flex:1}}>
          {onOpenMenu && (
            <button className="icon-btn" onClick={onOpenMenu} aria-label="Abrir menu" style={{width:36, height:36, flexShrink:0}}>
              <I.Menu size={18}/>
            </button>
          )}
          {showBack && (
            <button className="icon-btn" onClick={onBack} title="Voltar" style={{width:32, height:32, flexShrink:0}}>
              <I.ArrowLeft size={15}/>
            </button>
          )}
          {state === "conversation" ? (
            <EditableTitle initial="CV para Lead Designer @ Linear"/>
          ) : (
            <>
              <I.Sparkle size={13} style={{color:"var(--brand)"}}/>
              <span style={{fontSize:13.5, fontWeight:500, color:"var(--ink-2)"}}>Nova conversa</span>
            </>
          )}
        </div>
        {onOpenPreview && (
          <button className="icon-btn preview-btn" onClick={onOpenPreview} title="Ver pré-visualização" style={{width:34, height:34}}>
            <I.Eye size={16}/>
          </button>
        )}
      </header>

      {/* Body — scrollable content */}
      <div ref={scrollRef} style={{flex:1, overflowY:"auto", overflowX:"hidden", display:"flex", flexDirection:"column", minHeight:0}}>
        {state === "empty" ? <EmptyState onPrompt={(t)=>{setDraft(t); setTimeout(()=>inputRef.current?.focus(),0);}}/> : <Conversation thread={thread}/>}
      </div>

      {/* Composer — sticky, fixed height area */}
      <Composer
        inputRef={inputRef}
        draft={draft} onDraft={setDraft} onKey={onKey} onSend={send}
        attachments={attachments} onAddAttachment={onAddAttachment} onClearAttachments={onClearAttachments}
        attachBtnRef={attachBtnRef} attachOpen={attachOpen} setAttachOpen={setAttachOpen}
        language={language} onLanguageChange={onLanguageChange}
        empty={state==="empty"}
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────────────────
function EmptyState({ onPrompt }) {
  return (
    <div className="empty-hero" style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px 30px", gap:32, animation:"fadeUp .3s ease"}}>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:12, textAlign:"center", maxWidth:520}}>
        <div style={{
          width:54, height:54, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center",
          background:"linear-gradient(135deg, var(--brand) 0%, color-mix(in oklab, var(--brand) 75%, var(--lime)) 100%)",
          boxShadow:"0 12px 28px color-mix(in oklab, var(--brand) 30%, transparent), 0 1px 0 rgba(255,255,255,.2) inset",
          color:"#fff"
        }}>
          <I.Sparkles size={22}/>
        </div>
        <h1 style={{margin:0, fontFamily:"var(--font-serif)", fontWeight:500, fontSize:32, lineHeight:1.05, letterSpacing:"-.015em", color:"var(--ink)"}}>
          O que vamos criar hoje, Aïcha?
        </h1>
        <p style={{margin:0, fontSize:14, color:"var(--ink-3)", lineHeight:1.55, maxWidth:440}}>
          Conta-me sobre ti ou cola um anúncio — eu trato do currículo enquanto conversamos. Podes também escolher uma destas formas de começar:
        </p>
      </div>

      {/* Quick prompts */}
      <div className="quick-prompts" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, width:"100%", maxWidth:520}}>
        {QUICK_PROMPTS.map((p, i) => {
          const Ic = I[p.icon];
          return (
            <button key={i} onClick={()=>onPrompt(p.label + ". ")}
              style={{display:"flex", alignItems:"flex-start", gap:11, padding:"12px 14px", borderRadius:12, background:"var(--bg-elev)", border:"1px solid var(--line)", textAlign:"left", transition:"all .12s"}}
              onMouseEnter={(e)=>{e.currentTarget.style.borderColor="var(--brand)"; e.currentTarget.style.boxShadow="0 2px 8px color-mix(in oklab, var(--brand) 8%, transparent)";}}
              onMouseLeave={(e)=>{e.currentTarget.style.borderColor="var(--line)"; e.currentTarget.style.boxShadow="none";}}>
              <div style={{width:28, height:28, borderRadius:8, background:"var(--brand-soft)", color:"var(--brand)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0}}>
                <Ic size={14}/>
              </div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:13, fontWeight:500, color:"var(--ink)"}}>{p.label}</div>
                <div style={{fontSize:11.5, color:"var(--ink-3)", marginTop:2}}>{p.hint}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Disclosure */}
      <div style={{display:"flex", gap:14, alignItems:"center", color:"var(--ink-3)", fontSize:11, fontFamily:"var(--font-mono)", letterSpacing:".02em"}}>
        <span style={{display:"flex", gap:5, alignItems:"center"}}><span style={{width:6, height:6, borderRadius:99, background:"var(--lime)"}}/>folio v0.4</span>
        <span>·</span>
        <span>privado por defeito</span>
        <span>·</span>
        <span>2 línguas activas</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSATION (thread of messages)
// ─────────────────────────────────────────────────────────────────────────────
function Conversation({ thread }) {
  const lastMessage = thread[thread.length - 1];
  const showTyping = lastMessage?.role === "user";
  return (
    <div className="chat-scroll-pad" style={{padding:"22px 22px 12px", display:"flex", flexDirection:"column", gap:18, animation:"fadeUp .3s ease"}}>
      <ContextStrip />
      {thread.map((m, i) => <Message key={i} m={m} />)}
      {showTyping && <ThinkingBubble />}
    </div>
  );
}

function ContextStrip() {
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
      background:"var(--bg-elev)", border:"1px dashed var(--line)", borderRadius:10,
      fontSize:12, color:"var(--ink-3)"
    }}>
      <I.Target size={14} style={{color:"var(--brand)", flexShrink:0}}/>
      <span style={{flex:1, minWidth:0}}>
        A adaptar para <b style={{color:"var(--ink-2)", fontWeight:600}}>Lead Product Designer</b> · <span style={{fontFamily:"var(--font-mono)", fontSize:11}}>linear.app/careers</span>
      </span>
      <button className="btn ghost" style={{height:24, fontSize:11.5, padding:"0 7px"}}>
        <I.Close size={11}/> Remover
      </button>
    </div>
  );
}

function Message({ m }) {
  if (m.role === "user") return <UserMessage m={m}/>;
  if (m.role === "ai-inline" && m.kind === "ats") return <AtsCard m={m}/>;
  return <AiMessage m={m}/>;
}

function UserMessage({ m }) {
  return (
    <div style={{display:"flex", justifyContent:"flex-end"}}>
      <div style={{maxWidth:"82%", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6}}>
        {m.attachments && (
          <div style={{display:"flex", gap:6, flexWrap:"wrap", justifyContent:"flex-end"}}>
            {m.attachments.map((a,i)=>(
              <span className="chip" key={i} style={{background:"var(--bg-elev)", height:28}}>
                {a.kind==="pdf" ? <I.FileText size={12}/> : <I.Image size={12}/>}
                <span style={{maxWidth:160, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{a.name}</span>
                <span style={{color:"var(--ink-4)", fontFamily:"var(--font-mono)", fontSize:10}}>{a.size}</span>
              </span>
            ))}
          </div>
        )}
        <div style={{
          padding:"10px 14px", background:"var(--brand-soft)", color:"var(--ink)",
          borderRadius:"16px 16px 4px 16px", fontSize:13.5, lineHeight:1.5,
          border:"1px solid color-mix(in oklab, var(--brand) 12%, transparent)"
        }}>
          {m.body}
        </div>
      </div>
    </div>
  );
}

function AiMessage({ m }) {
  return (
    <div style={{display:"flex", gap:11, alignItems:"flex-start"}}>
      <div style={{
        width:28, height:28, borderRadius:8, flexShrink:0, marginTop:1,
        background:"linear-gradient(135deg, var(--brand) 0%, color-mix(in oklab, var(--brand) 75%, var(--lime)) 100%)",
        display:"flex", alignItems:"center", justifyContent:"center", color:"#fff"
      }}>
        <I.Sparkle size={14}/>
      </div>
      <div style={{flex:1, minWidth:0, maxWidth:560}}>
        <div style={{
          padding:"10px 14px", background:"var(--bg-elev)", color:"var(--ink-2)",
          borderRadius:"4px 16px 16px 16px", fontSize:13.5, lineHeight:1.55,
          border:"1px solid var(--line)"
        }} dangerouslySetInnerHTML={{ __html: m.body.replace(/\*\*(.+?)\*\*/g,"<b style='color:var(--ink);font-weight:600'>$1</b>").replace(/\*(.+?)\*/g,"<i style='color:var(--brand-ink)'>$1</i>") }}/>

        {m.actions && (
          <div style={{display:"flex", gap:6, marginTop:8}}>
            {m.actions.map((a,i)=>{
              const Ic = I[a.icon];
              return (
                <button key={i} className="btn pop-btn" style={{height:28, fontSize:12, padding:"0 10px"}}>
                  <Ic size={12}/>{a.label}
                </button>
              );
            })}
          </div>
        )}

        {m.suggestions && (
          <div style={{display:"flex", gap:6, flexWrap:"wrap", marginTop:8}}>
            {m.suggestions.map((s,i)=>(
              <button key={i} className="btn pop-btn" style={{height:28, fontSize:12, padding:"0 10px", borderRadius:99, borderColor:"color-mix(in oklab, var(--brand) 25%, var(--line))"}}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AtsCard({ m }) {
  return (
    <div style={{display:"flex", gap:11, alignItems:"flex-start"}}>
      <div style={{
        width:28, height:28, borderRadius:8, flexShrink:0, marginTop:1,
        background:"var(--brand-soft)", color:"var(--brand)",
        display:"flex", alignItems:"center", justifyContent:"center"
      }}>
        <I.Gauge size={14}/>
      </div>
      <div style={{flex:1, padding:"12px 14px", background:"var(--bg-elev)", borderRadius:12, border:"1px solid var(--line)", maxWidth:560}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8}}>
          <div>
            <div style={{fontSize:12.5, fontWeight:600, color:"var(--ink)"}}>{m.body}</div>
            <div style={{fontSize:11, color:"var(--ink-3)", marginTop:2}}>Compatibilidade com palavras-chave da vaga</div>
          </div>
          <ScoreDial value={m.score}/>
        </div>

        <div style={{display:"flex", flexDirection:"column", gap:8, marginTop:10}}>
          <div>
            <div style={{fontSize:10.5, fontFamily:"var(--font-mono)", color:"var(--ink-3)", letterSpacing:".06em", marginBottom:4}}>ENCONTRADAS</div>
            <div style={{display:"flex", flexWrap:"wrap", gap:5}}>
              {m.matched.map((k,i)=>(
                <span key={i} className="chip lime" style={{height:22, fontSize:11, padding:"0 8px"}}><I.Check size={11}/>{k}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:10.5, fontFamily:"var(--font-mono)", color:"var(--ink-3)", letterSpacing:".06em", marginBottom:4}}>EM FALTA</div>
            <div style={{display:"flex", flexWrap:"wrap", gap:5}}>
              {m.missing.map((k,i)=>(
                <span key={i} className="chip" style={{height:22, fontSize:11, padding:"0 8px", background:"transparent", borderColor:"var(--line)"}}>
                  <span style={{width:5, height:5, borderRadius:99, background:"#cfcbbf"}}/>{k}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{marginTop:10, display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:8, borderTop:"1px solid var(--line-soft)"}}>
          <span style={{fontSize:11, color:"var(--ink-3)"}}>Quer que eu incorpore as 3 em falta?</span>
          <button className="btn primary" style={{height:26, fontSize:11.5, padding:"0 10px"}}>Sim, incorporar</button>
        </div>
      </div>
    </div>
  );
}

function ScoreDial({ value }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  const dash = c * (value/100);
  return (
    <div style={{position:"relative", width:42, height:42, flexShrink:0}}>
      <svg width="42" height="42" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={r} stroke="var(--bg-tint)" strokeWidth="3.5" fill="none"/>
        <circle cx="18" cy="18" r={r} stroke="var(--brand)" strokeWidth="3.5" fill="none"
                strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
                transform="rotate(-90 18 18)"/>
      </svg>
      <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11.5, fontWeight:600, fontFamily:"var(--font-mono)", color:"var(--brand)"}}>
        {value}
      </div>
    </div>
  );
}

function ThinkingBubble() {
  // Subtle "AI typing" indicator
  return (
    <div style={{display:"flex", gap:11, alignItems:"flex-start", opacity:.55}}>
      <div style={{
        width:28, height:28, borderRadius:8, flexShrink:0,
        background:"linear-gradient(135deg, var(--brand) 0%, color-mix(in oklab, var(--brand) 75%, var(--lime)) 100%)",
        display:"flex", alignItems:"center", justifyContent:"center", color:"#fff"
      }}>
        <I.Sparkle size={14}/>
      </div>
      <div style={{display:"flex", gap:4, padding:"12px 14px", background:"var(--bg-elev)", border:"1px solid var(--line)", borderRadius:"4px 16px 16px 16px"}}>
        <Dot delay={0}/><Dot delay={.18}/><Dot delay={.36}/>
      </div>
    </div>
  );
}
const Dot = ({delay}) => <span style={{width:5, height:5, borderRadius:99, background:"var(--ink-4)", animation:`pulse 1.2s ${delay}s infinite`}}/>;

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSER — fixed-height, sticky bottom. Does not grow with content.
// ─────────────────────────────────────────────────────────────────────────────
function Composer({ inputRef, draft, onDraft, onKey, onSend, attachments, onAddAttachment, onClearAttachments, attachBtnRef, attachOpen, setAttachOpen, language, onLanguageChange, empty }) {
  return (
    <div className="composer-wrap" style={{flexShrink:0, padding:"10px 18px 18px"}}>
      {/* Attachments row (only if any) */}
      {attachments.length > 0 && (
        <div style={{display:"flex", gap:6, marginBottom:8, flexWrap:"wrap"}}>
          {attachments.map((a,i)=>(
            <span key={i} className="chip" style={{height:28, paddingRight:4, background:"var(--bg-elev)"}}>
              {a.kind==="pdf" ? <I.FileText size={12}/> : a.kind==="photo" ? <I.Image size={12}/> : <I.Briefcase size={12}/>}
              <span style={{maxWidth:160, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{a.name}</span>
              <button className="icon-btn" style={{width:20, height:20}} onClick={onClearAttachments}><I.Close size={11}/></button>
            </span>
          ))}
        </div>
      )}

      <div style={{
        background:"var(--bg-elev)", border:"1px solid var(--line)", borderRadius:14,
        boxShadow:"var(--shadow-sm)", display:"flex", flexDirection:"column",
        transition:"border-color .15s, box-shadow .15s",
      }}
      onFocus={(e)=>{e.currentTarget.style.borderColor="color-mix(in oklab, var(--brand) 30%, var(--line))"; e.currentTarget.style.boxShadow="0 0 0 3px color-mix(in oklab, var(--brand) 10%, transparent)";}}
      onBlur={(e)=>{e.currentTarget.style.borderColor="var(--line)"; e.currentTarget.style.boxShadow="var(--shadow-sm)";}}>

        {/* Input — single visible line; horizontally clipped, single line text input keeps height stable */}
        <input
          ref={inputRef}
          className="chat-input"
          value={draft}
          onChange={(e)=>onDraft(e.target.value)}
          onKeyDown={onKey}
          placeholder={empty ? 'Conta o que queres criar… (ex: «adapta o meu CV à vaga X»)' : 'Escreve uma mensagem…'}
          style={{
            padding:"14px 16px 4px", fontSize:14, fontFamily:"inherit",
            width:"100%"
          }}
        />

        {/* Action bar — left = attach + tools; right = mic + send */}
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 8px 8px"}}>
          <div style={{display:"flex", alignItems:"center", gap:2}}>
            <button ref={attachBtnRef} className="icon-btn" title="Anexar" onClick={()=>setAttachOpen(true)} style={{width:30, height:30}}>
              <I.Plus size={16}/>
            </button>
            <Divider />
            <button className="icon-btn" title="Adaptar a uma vaga" style={{width:30, height:30}}>
              <I.Target size={14}/>
            </button>
            <button className="icon-btn" title="Sugestões" style={{width:30, height:30}}>
              <I.Sparkle size={14}/>
            </button>
            <LangSelect value={language} onChange={onLanguageChange}/>
          </div>

          <div style={{display:"flex", alignItems:"center", gap:6}}>
            <button className="icon-btn" title="Ditar" style={{width:30, height:30}}>
              <I.Mic size={14}/>
            </button>
            <button onClick={onSend} disabled={!draft.trim() && !attachments.length}
              style={{
                width:32, height:32, borderRadius:9, border:0,
                background: (draft.trim() || attachments.length) ? "var(--brand)" : "var(--bg-tint)",
                color: (draft.trim() || attachments.length) ? "#fff" : "var(--ink-4)",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .12s",
                cursor: (draft.trim() || attachments.length) ? "pointer" : "not-allowed"
              }}>
              <I.ArrowUp size={15}/>
            </button>
          </div>
        </div>
      </div>

      {/* Hint row removed for less noise */}

      <AttachPopover open={attachOpen} anchor={attachBtnRef} onClose={()=>setAttachOpen(false)}
                     onAttach={(kind)=>onAddAttachment(kind)} />
    </div>
  );
}

const Divider = () => <div style={{width:1, height:18, background:"var(--line-soft)", margin:"0 6px"}}/>;

function LangSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const langs = [
    { code:"pt", label:"Português", flag:"🇵🇹" },
    { code:"en", label:"English",   flag:"🇬🇧" },
    { code:"fr", label:"Français",  flag:"🇫🇷" },
    { code:"es", label:"Español",   flag:"🇪🇸" },
  ];
  const current = langs.find(l => l.code === value) || langs[0];
  return (
    <>
      <button ref={ref} onClick={()=>setOpen(true)} className="icon-btn" style={{width:"auto", padding:"0 8px", height:28, fontSize:11.5, fontFamily:"var(--font-mono)", letterSpacing:".04em", color:"var(--ink-3)", textTransform:"uppercase", gap:5}}>
        <I.Languages size={13}/>
        {current.code}
        <I.ChevronDown size={11}/>
      </button>
      <Popover open={open} anchor={ref} onClose={()=>setOpen(false)} side="top" align="start" width={170}>
        <div style={{padding:4}}>
          {langs.map(l => (
            <button key={l.code} onClick={()=>{onChange(l.code); setOpen(false);}}
              style={{display:"flex", width:"100%", alignItems:"center", gap:9, padding:"7px 9px", borderRadius:6, border:0, background:l.code===value ? "var(--bg-tint)" : "transparent", textAlign:"left", fontSize:12.5, color:"var(--ink-2)"}}>
              <span style={{fontSize:14}}>{l.flag}</span>
              <span style={{flex:1}}>{l.label}</span>
              {l.code===value && <I.Check size={13} style={{color:"var(--brand)"}}/>}
            </button>
          ))}
        </div>
      </Popover>
    </>
  );
}

function EditableTitle({ initial }) {
  const [val, setVal] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (editing && ref.current) { ref.current.focus(); ref.current.select(); } }, [editing]);
  const stop = () => setEditing(false);
  return (
    <div style={{display:"flex", alignItems:"center", gap:7, minWidth:0, flex:1}}
         onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <I.Sparkle size={13} style={{color:"var(--brand)", flexShrink:0}}/>
      {editing ? (
        <input ref={ref} value={val} onChange={(e)=>setVal(e.target.value)}
          onBlur={stop} onKeyDown={(e)=>{ if (e.key==="Enter"||e.key==="Escape") stop(); }}
          style={{flex:1, minWidth:0, fontSize:13.5, fontWeight:500, color:"var(--ink)", background:"var(--bg-tint)", border:"1px solid var(--line)", outline:"none", borderRadius:6, padding:"4px 8px", fontFamily:"inherit", letterSpacing:"-.005em"}}/>
      ) : (
        <button onClick={()=>setEditing(true)} title="Clique para renomear"
          style={{display:"flex", alignItems:"center", gap:6, minWidth:0, flex:1, background: hover ? "var(--bg-tint)" : "transparent", border:0, padding:"4px 8px", borderRadius:6, cursor:"text", transition:"background .12s, color .12s", textAlign:"left"}}>
          <span style={{fontSize:13.5, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", color:"var(--ink)"}}>{val}</span>
          <I.Edit size={11} style={{color:"var(--ink-3)", opacity: hover ? 1 : 0, transition:"opacity .12s", flexShrink:0}}/>
        </button>
      )}
    </div>
  );
}

Object.assign(window, { ChatPanel });
