"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { CanvasPanel } from "@/components/canvas/CanvasPanel";
import { AvatarPopover } from "@/components/popovers/AvatarPopover";
import { TemplatePopover } from "@/components/popovers/TemplatePopover";
import { SharePopover } from "@/components/popovers/SharePopover";
import { DownloadPopover } from "@/components/popovers/DownloadPopover";
import { RECENT_CHATS, SAMPLE_THREAD } from "@/lib/data";
import { useViewport } from "@/hooks/useViewport";
import type { ChatAttachment, Message, MessageAttachment } from "@/types/chat";
import type { TemplateId } from "@/types/cv";

const ATTACHMENT_SAMPLES: Record<ChatAttachment["kind"], ChatAttachment> = {
  doc:      { kind: "doc",      name: "CV-2024-rascunho.pdf",            size: "312 KB" },
  photo:    { kind: "photo",    name: "headshot-2024.jpg",               size: "1.2 MB" },
  jd:       { kind: "jd",       name: "Linear — Job description.pdf",    size: "204 KB" },
  linkedin: { kind: "linkedin", name: "linkedin.com/in/amondlane",       size: "perfil" },
};

const VALID_TEMPLATES: TemplateId[] = ["aurora", "editorial", "mono", "bold"];

export function AppShell() {
  const vp = useViewport();
  const search = useSearchParams();

  // CV/template settings
  const [template, setTemplate] = useState<TemplateId>("aurora");

  // Pick up ?template=<id> on first mount and on URL change
  useEffect(() => {
    const t = search.get("template");
    if (t && (VALID_TEMPLATES as string[]).includes(t)) {
      setTemplate(t as TemplateId);
    }
  }, [search]);

  const [accent, setAccent] = useState("#1A6D75");
  const [zoom, setZoom] = useState(0.5);
  const [fitMode, setFitMode] = useState(true);
  const [fontSize, setFontSize] = useState(100);
  const [lineHeight, setLineHeight] = useState(1.45);
  const [density, setDensity] = useState("Regular");
  const [showAiPins, setShowAiPins] = useState(true);

  // App state — editor opens empty by default (clean slate, ready for first prompt)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatState, setChatState] = useState<"empty" | "conversation">("empty");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [thread, setThread] = useState<Message[]>([]);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [language, setLanguage] = useState("pt");

  // Layout
  const [mobileView, setMobileView] = useState<"chat" | "preview">("chat");
  const [fullscreen, setFullscreen] = useState(false);
  const showSidebar = !vp.isMobile;

  // Popover anchors / state
  const avatarRef = useRef<HTMLButtonElement>(null);
  const templateBtnRef = useRef<HTMLButtonElement>(null);
  const shareBtnRef = useRef<HTMLButtonElement>(null);
  const downloadBtnRef = useRef<HTMLButtonElement>(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  const onNewChat = () => {
    setChatState("empty");
    setThread([]);
    setActiveChatId(null);
    setAttachments([]);
    if (vp.isMobile) {
      setMobileView("chat");
      setSidebarOpen(false);
    }
  };

  const onSelectChat = (id: string) => {
    setActiveChatId(id);
    setChatState("conversation");
    setThread(SAMPLE_THREAD);
    if (vp.isMobile) {
      setMobileView("chat");
      setSidebarOpen(false);
    }
  };

  const onSubmit = async (text: string) => {
    const userAtts: MessageAttachment[] | undefined = attachments.length
      ? attachments.map((a) => ({
          kind: a.kind === "photo" ? "image" : "pdf",
          name: a.name,
          size: a.size,
        }))
      : undefined;
    const userMsg: Message = { role: "user", body: text, attachments: userAtts };
    const next = [...thread, userMsg];
    setThread(next);
    setAttachments([]);
    if (chatState === "empty") setChatState("conversation");

    // TODO: wire to /api/chat streaming. Placeholder echo for now.
    setTimeout(() => {
      setThread((prev) => [
        ...prev,
        {
          role: "ai",
          body:
            "Compreendido. Vou refletir essa informação no currículo agora. *Confere o painel à direita* — vais ver a actualização em segundos.",
        },
      ]);
    }, 900);
  };

  const onAddAttachment = (kind: ChatAttachment["kind"]) => {
    setAttachments((a) => [...a, ATTACHMENT_SAMPLES[kind]]);
  };

  const cls = [
    "app",
    sidebarOpen && !vp.isMobile ? "sb-open" : "",
    vp.isMobile ? "is-mobile" : "",
    vp.isCompact && !vp.isMobile ? "is-compact" : "",
    fullscreen ? "is-fullscreen" : "",
    `mv-${mobileView}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      {vp.isMobile && sidebarOpen && <div className="sb-backdrop" onClick={() => setSidebarOpen(false)} />}
      {(showSidebar || sidebarOpen) && (
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
          avatarRef={avatarRef}
          onAvatarClick={() => setAvatarOpen(true)}
          chats={RECENT_CHATS}
          activeChatId={activeChatId}
          onSelectChat={onSelectChat}
          onNewChat={onNewChat}
        />
      )}

      <div className="main">
        <ChatPanel
          state={chatState}
          thread={thread}
          onSubmit={onSubmit}
          attachments={attachments}
          onAddAttachment={onAddAttachment}
          onClearAttachments={() => setAttachments([])}
          language={language}
          onLanguageChange={setLanguage}
          onOpenMenu={vp.isMobile && !sidebarOpen ? () => setSidebarOpen(true) : null}
          onOpenPreview={vp.isMobile ? () => setMobileView("preview") : null}
        />

        <CanvasPanel
          template={template}
          accent={accent}
          zoom={zoom}
          onZoom={setZoom}
          fitMode={fitMode}
          onFitMode={setFitMode}
          templateBtnRef={templateBtnRef}
          shareBtnRef={shareBtnRef}
          downloadBtnRef={downloadBtnRef}
          onOpenTemplate={() => setTemplateOpen(true)}
          onOpenShare={() => setShareOpen(true)}
          onOpenDownload={() => setDownloadOpen(true)}
          onOpenCustomize={() => setCustomizeOpen(true)}
          onBack={() => setMobileView("chat")}
          isMobile={vp.isMobile}
          fullscreen={fullscreen}
          onToggleFullscreen={() => setFullscreen((v) => !v)}
          showPins={showAiPins && chatState === "conversation"}
          isEmpty={chatState === "empty"}
          customizeOpen={customizeOpen}
          onCloseCustomize={() => setCustomizeOpen(false)}
          fontSize={fontSize}
          onFontSize={setFontSize}
          lineHeight={lineHeight}
          onLineHeight={setLineHeight}
          density={density}
          onDensity={setDensity}
          onAccent={setAccent}
        />
      </div>

      <AvatarPopover open={avatarOpen} anchor={avatarRef} onClose={() => setAvatarOpen(false)} />
      <TemplatePopover
        open={templateOpen}
        anchor={templateBtnRef}
        onClose={() => setTemplateOpen(false)}
        value={template}
        onChange={setTemplate}
        accent={accent}
        onOpenCustomize={() => setCustomizeOpen(true)}
      />
      <SharePopover open={shareOpen} anchor={shareBtnRef} onClose={() => setShareOpen(false)} />
      <DownloadPopover open={downloadOpen} anchor={downloadBtnRef} onClose={() => setDownloadOpen(false)} />
    </div>
  );
}
