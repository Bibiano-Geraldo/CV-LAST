// Main app — wires sidebar, chat, canvas, popovers, tweaks panel together.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "template": "aurora",
  "accent": "#1A6D75",
  "state": "conversation",
  "sidebarOpen": false,
  "showAiPins": true,
  "fontSize": 100,
  "lineHeight": 1.45,
  "density": "Regular",
  "zoom": 0.5,
  "fitMode": true
}/*EDITMODE-END*/;

function useViewport() {
  const get = () => {
    const w = window.innerWidth;
    return { w, isMobile: w < 760, isCompact: w < 1100 };
  };
  const [v, setV] = useState(get);
  useEffect(() => {
    const on = () => setV(get());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return v;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const vp = useViewport();

  // App state
  const [sidebarOpen, setSidebarOpen] = useState(t.sidebarOpen);
  useEffect(() => setSidebarOpen(t.sidebarOpen), [t.sidebarOpen]);

  const [chatState, setChatState] = useState(t.state); // "empty" | "conversation"
  useEffect(() => setChatState(t.state), [t.state]);

  const [activeChatId, setActiveChatId] = useState("c1");
  const [thread, setThread] = useState(SAMPLE_THREAD);
  const [attachments, setAttachments] = useState([]);
  const [language, setLanguage] = useState("pt");

  // Layout state
  const [mobileView, setMobileView] = useState("chat"); // "chat" | "preview"
  const [fullscreen, setFullscreen] = useState(false);
  const showSidebar = !vp.isMobile;

  // Popovers
  const avatarRef = useRef(null);
  const templateBtnRef = useRef(null);
  const shareBtnRef = useRef(null);
  const downloadBtnRef = useRef(null);

  const [avatarOpen, setAvatarOpen]     = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [shareOpen, setShareOpen]       = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [galleryKind, setGalleryKind] = useState(null); // null | "cv" | "cover" | "templates"

  // Actions
  const onNewChat = () => {
    setChatState("empty");
    setThread([]);
    setActiveChatId(null);
    setAttachments([]);
    if (vp.isMobile) setMobileView("chat");
    if (!vp.isMobile && sidebarOpen) { /* keep sidebar */ }
  };

  const onSelectChat = (id) => {
    setActiveChatId(id);
    setChatState("conversation");
    setThread(SAMPLE_THREAD);
    if (vp.isMobile) {
      setMobileView("chat");
      setSidebarOpen(false);
    }
  };

  const onSubmit = (text) => {
    const userMsg = {
      role: "user",
      body: text,
      attachments: attachments.length ? attachments.map(a=>({kind: a.kind==="photo"?"image":"pdf", name:a.name, size:a.size})) : undefined
    };
    setThread(prev => [...prev, userMsg]);
    setAttachments([]);
    if (chatState === "empty") setChatState("conversation");

    setTimeout(() => {
      setThread(prev => [...prev, {
        role: "ai",
        body: "Compreendido. Vou refletir essa informação no currículo agora. *Confere o painel à direita* — vais ver a actualização em segundos.",
      }]);
    }, 900);
  };

  const onAddAttachment = (kind) => {
    const samples = {
      doc:      { kind:"doc",      name:"CV-2024-rascunho.pdf",   size:"312 KB" },
      photo:    { kind:"photo",    name:"headshot-2024.jpg",      size:"1.2 MB" },
      jd:       { kind:"jd",       name:"Linear — Job description.pdf", size:"204 KB" },
      linkedin: { kind:"linkedin", name:"linkedin.com/in/amondlane", size:"perfil" },
    };
    setAttachments(a => [...a, samples[kind]]);
  };

  const toggleSidebar = () => {
    const next = !sidebarOpen;
    setSidebarOpen(next);
    setTweak("sidebarOpen", next);
  };

  const setChatStateBoth = (s) => { setChatState(s); setTweak("state", s); };

  // Layout classes
  const cls = [
    "app",
    sidebarOpen && !vp.isMobile ? "sb-open" : "",
    vp.isMobile ? "is-mobile" : "",
    vp.isCompact && !vp.isMobile ? "is-compact" : "",
    fullscreen ? "is-fullscreen" : "",
    `mv-${mobileView}`
  ].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      {/* Sidebar — overlay on mobile, push on desktop */}
      {vp.isMobile && sidebarOpen && (
        <div className="sb-backdrop" onClick={()=>setSidebarOpen(false)}/>
      )}
      {showSidebar || sidebarOpen ? (
        <Sidebar
          open={sidebarOpen}
          onToggle={toggleSidebar}
          avatarRef={avatarRef}
          onAvatarClick={()=>setAvatarOpen(true)}
          chats={RECENT_CHATS}
          activeChatId={activeChatId}
          onSelectChat={onSelectChat}
          onNewChat={onNewChat}
          isMobile={vp.isMobile}
        />
      ) : null}

      {/* Floating menu button on mobile when sidebar closed */}
      {vp.isMobile && !sidebarOpen && (
        <button className="mobile-menu-btn" onClick={()=>setSidebarOpen(true)} aria-label="Abrir menu">
          <I.Menu size={18}/>
        </button>
      )}

      <div className="main">
        <ChatPanel
          state={chatState}
          thread={thread}
          onSubmit={onSubmit}
          attachments={attachments}
          onAddAttachment={onAddAttachment}
          onClearAttachments={()=>setAttachments([])}
          language={language}
          onLanguageChange={setLanguage}
          showBack={false}
          onOpenPreview={vp.isMobile ? (()=>setMobileView("preview")) : null}
        />

        <CanvasPanel
          template={t.template}
          accent={t.accent}
          zoom={t.zoom}
          onZoom={(z)=>setTweak("zoom", z)}
          fitMode={t.fitMode}
          onFitMode={(v)=>setTweak("fitMode", v)}
          templateBtnRef={templateBtnRef}
          shareBtnRef={shareBtnRef}
          downloadBtnRef={downloadBtnRef}
          onOpenTemplate={()=>setTemplateOpen(true)}
          onOpenShare={()=>setShareOpen(true)}
          onOpenDownload={()=>setDownloadOpen(true)}
          onOpenCustomize={()=>setCustomizeOpen(true)}
          onBack={()=>setMobileView("chat")}
          isMobile={vp.isMobile}
          fullscreen={fullscreen}
          onToggleFullscreen={()=>setFullscreen(!fullscreen)}
          showPins={t.showAiPins && chatState === "conversation"}
          isEmpty={chatState === "empty"}
          customizeOpen={customizeOpen}
          onCloseCustomize={()=>setCustomizeOpen(false)}
          fontSize={t.fontSize}
          onFontSize={(v)=>setTweak("fontSize", v)}
          lineHeight={t.lineHeight}
          onLineHeight={(v)=>setTweak("lineHeight", v)}
          density={t.density}
          onDensity={(v)=>setTweak("density", v)}
          onAccent={(v)=>setTweak("accent", v)}
        />
      </div>

      {/* Popovers */}
      <AvatarPopover    open={avatarOpen}    anchor={avatarRef}      onClose={()=>setAvatarOpen(false)}/>
      <TemplatePopover  open={templateOpen}  anchor={templateBtnRef} onClose={()=>setTemplateOpen(false)}
                        value={t.template} onChange={(v)=>setTweak("template", v)} accent={t.accent}
                        onOpenCustomize={()=>setCustomizeOpen(true)}/>
      <SharePopover     open={shareOpen}     anchor={shareBtnRef}    onClose={()=>setShareOpen(false)}/>
      <DownloadPopover  open={downloadOpen}  anchor={downloadBtnRef} onClose={()=>setDownloadOpen(false)}/>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Estado" />
        <TweakRadio label="Vista" value={t.state}
                    options={[{value:"empty",label:"Empty"},{value:"conversation",label:"Conversa"}]}
                    onChange={(v)=>{setTweak("state", v); setChatStateBoth(v);}} />
        <TweakToggle label="Sidebar aberta" value={t.sidebarOpen}
                     onChange={(v)=>{setTweak("sidebarOpen", v); setSidebarOpen(v);}} />
        <TweakToggle label="Comentários da IA no preview" value={t.showAiPins}
                     onChange={(v)=>setTweak("showAiPins", v)} />

        <TweakSection label="Modelo de CV" />
        <TweakRadio label="Template" value={t.template}
                    options={[
                      {value:"aurora", label:"Aurora"},
                      {value:"editorial", label:"Editorial"},
                      {value:"mono", label:"Mono"},
                      {value:"bold", label:"Bold"}
                    ]}
                    onChange={(v)=>setTweak("template", v)} />
        <TweakColor label="Cor de acento" value={t.accent}
                    options={["#1A6D75","#0F4A50","#3B4A6B","#7A4F22","#9A3B3B","#3A4A2A","#1a1816"]}
                    onChange={(v)=>setTweak("accent", v)} />

        <TweakSection label="Preview" />
        <TweakSlider label="Zoom" value={t.zoom} min={0.4} max={1.0} step={0.05}
                     onChange={(v)=>setTweak("zoom", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
