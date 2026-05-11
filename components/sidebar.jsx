// Sidebar — push drawer pattern. Closed shows a slim rail with collapse button + avatar.
// Open shows recent chats, search, new conversation.

function Sidebar({ open, onToggle, avatarRef, onAvatarClick, chats, activeChatId, onSelectChat, onNewChat, onOpenGallery }) {
  // Rail (collapsed)
  if (!open) {
    return (
      <aside style={{
        width:56, height:"100vh", flexShrink:0, borderRight:"1px solid var(--line)",
        background:"var(--bg)", display:"flex", flexDirection:"column",
        alignItems:"center", padding:"12px 8px", gap:6, position:"relative", zIndex:5
      }}>
        <button className="icon-btn" onClick={onToggle} title="Abrir barra lateral" style={{width:36, height:36}}>
          <I.PanelLeft size={17}/>
        </button>
        <button className="icon-btn" onClick={onNewChat} title="Nova conversa" style={{width:36, height:36, background:"var(--brand-soft)", color:"var(--brand)"}}>
          <I.Plus size={17}/>
        </button>
        <button className="icon-btn" onClick={()=>onOpenGallery?.("cv")} title="Os meus currículos" style={{width:36, height:36}}>
          <I.FileText size={16}/>
        </button>
        <button className="icon-btn" onClick={()=>onOpenGallery?.("cover")} title="Cartas de apresentação" style={{width:36, height:36}}>
          <I.Mail size={16}/>
        </button>
        <button className="icon-btn" onClick={()=>onOpenGallery?.("templates")} title="Templates" style={{width:36, height:36}}>
          <I.Layers size={16}/>
        </button>

        <div style={{flex:1}}/>

        <button ref={avatarRef} onClick={onAvatarClick}
                style={{width:36, height:36, borderRadius:"50%", background:"var(--brand)", color:"#fff", border:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:600, cursor:"default", boxShadow:"0 1px 2px rgba(0,0,0,.08)"}}>
          AM
        </button>
      </aside>
    );
  }

  // Drawer (open)
  return (
    <aside style={{
      width:264, height:"100vh", flexShrink:0, borderRight:"1px solid var(--line)",
      background:"var(--bg)", display:"flex", flexDirection:"column",
      position:"relative", zIndex:5,
      animation:"drawerIn .22s cubic-bezier(.2,.9,.3,1)"
    }}>
      {/* Header */}
      <header style={{padding:"12px 12px 8px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:6}}>
        <div style={{display:"flex", alignItems:"center", gap:9, paddingLeft:4}}>
          <I.Logo size={22}/>
          <div style={{display:"flex", alignItems:"baseline", gap:6}}>
            <span style={{fontWeight:600, fontSize:15, letterSpacing:"-.01em"}}>Folio</span>
            <span style={{fontSize:10.5, color:"var(--ink-3)", fontFamily:"var(--font-mono)", letterSpacing:".02em"}}>v0.4</span>
          </div>
        </div>
        <button className="icon-btn" onClick={onToggle} title="Recolher" style={{width:30, height:30}}>
          <I.PanelLeft size={16}/>
        </button>
      </header>

      {/* New chat */}
      <div style={{padding:"6px 12px 10px"}}>
        <button onClick={onNewChat}
                className="new-chat-btn"
                style={{display:"flex", width:"100%", alignItems:"center", gap:8, height:36, padding:"0 12px", borderRadius:9, background:"var(--brand)", color:"#fff", border:0, fontSize:13, fontWeight:500, boxShadow:"0 1px 2px rgba(15,16,12,.08)", cursor:"pointer", transition:"transform .12s ease, box-shadow .15s ease, background .15s ease"}}
                onMouseEnter={(e)=>e.currentTarget.style.background="color-mix(in oklab, var(--brand) 88%, #000)"}
                onMouseLeave={(e)=>e.currentTarget.style.background="var(--brand)"}>
          <I.Plus size={15}/>
          <span style={{flex:1, textAlign:"left"}}>Nova conversa</span>
        </button>
      </div>

      {/* Search */}
      <div style={{padding:"0 12px 10px"}}>
        <div style={{display:"flex", alignItems:"center", gap:8, height:32, padding:"0 10px", background:"var(--bg-tint)", borderRadius:8, border:"1px solid transparent", transition:"border .15s, background .15s"}}
             onFocus={(e)=>e.currentTarget.style.borderColor="var(--line)"}>
          <I.Search size={14} style={{color:"var(--ink-3)"}}/>
          <input placeholder="Procurar nas conversas"
                 style={{flex:1, background:"transparent", border:0, outline:"none", fontSize:12.5, color:"var(--ink)", fontFamily:"inherit", minWidth:0}}/>
        </div>
      </div>

      {/* Nav — collections */}
      <div style={{padding:"0 8px 8px"}}>
        <NavItem icon="FileText" label="Os meus currículos" count={6} onClick={()=>onOpenGallery?.("cv")}/>
        <NavItem icon="Mail"     label="Cartas de apresentação" count={3} onClick={()=>onOpenGallery?.("cover")}/>
        <NavItem icon="Layers"   label="Templates" count={4} onClick={()=>onOpenGallery?.("templates")}/>
      </div>

      <div style={{height:1, background:"var(--line-soft)", margin:"0 14px 8px"}}/>

      {/* Chat list */}
      <div style={{flex:1, overflowY:"auto", padding:"0 8px 8px", minHeight:0}}>
        <ChatGroup title="Fixados">
          {chats.filter(c=>c.pinned).map(c=>(
            <ChatItem key={c.id} chat={c} active={c.id===activeChatId} onClick={()=>onSelectChat(c.id)}/>
          ))}
        </ChatGroup>

        <ChatGroup title="Recentes">
          {chats.filter(c=>!c.pinned).map(c=>(
            <ChatItem key={c.id} chat={c} active={c.id===activeChatId} onClick={()=>onSelectChat(c.id)}/>
          ))}
        </ChatGroup>
      </div>

      <div style={{padding:"10px 12px 12px", display:"flex", alignItems:"center", gap:10, borderTop:"1px solid var(--line-soft)"}}>
        <button ref={avatarRef} onClick={onAvatarClick}
                style={{width:32, height:32, borderRadius:"50%", background:"var(--brand)", color:"#fff", border:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:600, cursor:"default", flexShrink:0}}>
          AM
        </button>
        <button onClick={onAvatarClick}
                style={{flex:1, minWidth:0, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 8px", borderRadius:8, background:"transparent", border:0, textAlign:"left"}}
                onMouseEnter={(e)=>e.currentTarget.style.background="var(--bg-tint)"}
                onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
          <div style={{minWidth:0}}>
            <div style={{fontSize:12.5, fontWeight:500, color:"var(--ink)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>Aïcha Mondlane</div>
            <div style={{fontSize:10.5, color:"var(--ink-3)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>Plano Pro · 240 créditos</div>
          </div>
          <I.ChevronDown size={13} style={{color:"var(--ink-3)", flexShrink:0}}/>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, count, onClick }) {
  const [hover, setHover] = useState(false);
  const Ic = I[icon];
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{
        display:"flex", alignItems:"center", gap:9, width:"100%",
        padding:"8px 10px", borderRadius:7, border:0,
        background: hover ? "var(--bg-tint)" : "transparent",
        color: hover ? "var(--ink)" : "var(--ink-2)",
        textAlign:"left", cursor:"pointer",
        transition:"background .12s, color .12s, transform .1s",
        transform: hover ? "translateX(1px)" : "translateX(0)"
      }}>
      {Ic && <Ic size={14} style={{color: hover ? "var(--brand)" : "var(--ink-3)", transition:"color .12s", flexShrink:0}}/>}
      <span style={{flex:1, fontSize:12.5, fontWeight:450}}>{label}</span>
      {count != null && (
        <span style={{fontSize:10.5, color:"var(--ink-4)", fontFamily:"var(--font-mono)", letterSpacing:".02em", background:"var(--bg-tint)", padding:"2px 6px", borderRadius:99, lineHeight:1}}>{count}</span>
      )}
    </button>
  );
}

function ChatGroup({ title, children }) {
  const items = React.Children.toArray(children);
  if (!items.length) return null;
  return (
    <div style={{marginTop:8}}>
      <div style={{padding:"6px 10px 4px", fontSize:10, fontFamily:"var(--font-mono)", letterSpacing:".08em", textTransform:"uppercase", color:"var(--ink-4)"}}>{title}</div>
      <div style={{display:"flex", flexDirection:"column", gap:1}}>{items}</div>
    </div>
  );
}

function ChatItem({ chat, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{
        display:"flex", alignItems:"center", gap:9, width:"100%",
        padding:"7px 10px", borderRadius:7, border:0,
        background: active ? "var(--bg-elev)" : (hover ? "var(--bg-tint)" : "transparent"),
        boxShadow: active ? "var(--shadow-sm)" : "none",
        color: active ? "var(--ink)" : "var(--ink-2)",
        textAlign:"left",
        position:"relative"
      }}>
      {active && <div style={{position:"absolute", left:-8, top:8, bottom:8, width:2, background:"var(--brand)", borderRadius:2}}/>}
      <I.MessageCircle size={13} style={{color: active ? "var(--brand)" : "var(--ink-4)", flexShrink:0}}/>
      <div style={{minWidth:0, flex:1}}>
        <div style={{fontSize:12.5, fontWeight: active ? 500 : 400, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{chat.title}</div>
      </div>
      {(hover || active) && (
        <span style={{opacity:hover?1:0, transition:"opacity .12s"}}>
          <span className="icon-btn" style={{width:22, height:22}} onClick={(e)=>e.stopPropagation()}>
            <I.Dots size={13}/>
          </span>
        </span>
      )}
    </button>
  );
}

Object.assign(window, { Sidebar });
