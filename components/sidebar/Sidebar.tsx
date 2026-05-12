"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Children, type ReactNode, type RefObject } from "react";
import { I, type IconName } from "@/components/icons";
import type { RecentChat } from "@/types/chat";

export type SidebarProps = {
  open: boolean;
  onToggle: () => void;
  avatarRef: RefObject<HTMLButtonElement | null>;
  onAvatarClick: () => void;
  chats: RecentChat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
};

export function Sidebar({
  open,
  onToggle,
  avatarRef,
  onAvatarClick,
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  const pathname = usePathname() ?? "";
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  if (!open) {
    return (
      <aside
        style={{
          width: 56, height: "100vh", flexShrink: 0,
          borderRight: "1px solid var(--line)",
          background: "var(--bg)",
          display: "flex", flexDirection: "column",
          alignItems: "center", padding: "12px 8px", gap: 6,
          position: "relative", zIndex: 5,
        }}
      >
        <button className="icon-btn" onClick={onToggle} title="Abrir barra lateral" style={{ width: 36, height: 36 }}>
          <I.PanelLeft size={17} />
        </button>
        <button
          className="icon-btn"
          onClick={onNewChat}
          title="Nova conversa"
          style={{ width: 36, height: 36, background: "var(--brand-soft)", color: "var(--brand)" }}
        >
          <I.Plus size={17} />
        </button>
        <CollapsedNavLink href="/curriculos" title="Os meus currículos" icon="FileText" active={isActive("/curriculos")} />
        <CollapsedNavLink href="/cartas" title="Cartas de apresentação" icon="Mail" active={isActive("/cartas")} />
        <CollapsedNavLink href="/templates" title="Templates" icon="Layers" active={isActive("/templates")} />

        <div style={{ flex: 1 }} />

        <button
          ref={avatarRef}
          onClick={onAvatarClick}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "var(--brand)", color: "#fff",
            border: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,.08)",
          }}
        >
          AM
        </button>
      </aside>
    );
  }

  return (
    <aside
      style={{
        width: 264, height: "100vh", flexShrink: 0,
        borderRight: "1px solid var(--line)",
        background: "var(--bg)",
        display: "flex", flexDirection: "column",
        position: "relative", zIndex: 5,
        animation: "drawerIn .22s cubic-bezier(.2,.9,.3,1)",
      }}
    >
      <header style={{ padding: "12px 12px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, paddingLeft: 4 }}>
          <I.Logo size={22} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-.01em" }}>Folio</span>
            <span style={{ fontSize: 10.5, color: "var(--ink-3)", fontFamily: "var(--font-mono)", letterSpacing: ".02em" }}>v0.4</span>
          </div>
        </div>
        <button className="icon-btn" onClick={onToggle} title="Recolher" style={{ width: 30, height: 30 }}>
          <I.PanelLeft size={16} />
        </button>
      </header>

      <div style={{ padding: "6px 12px 10px" }}>
        <button onClick={onNewChat} className="new-chat-btn">
          <I.Plus size={15} />
          <span style={{ flex: 1, textAlign: "left" }}>Nova conversa</span>
        </button>
      </div>

      <div style={{ padding: "0 12px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 32, padding: "0 10px", background: "var(--bg-tint)", borderRadius: 8, border: "1px solid transparent" }}>
          <I.Search size={14} style={{ color: "var(--ink-3)" }} />
          <input
            placeholder="Procurar nas conversas"
            aria-label="Procurar nas conversas"
            style={{ flex: 1, background: "transparent", border: 0, outline: "none", fontSize: 12.5, color: "var(--ink)", fontFamily: "inherit", minWidth: 0 }}
          />
        </div>
      </div>

      <div style={{ padding: "0 8px 8px" }}>
        <NavItem icon="FileText" label="Os meus currículos" count={6} href="/curriculos" active={isActive("/curriculos")} />
        <NavItem icon="Mail" label="Cartas de apresentação" count={3} href="/cartas" active={isActive("/cartas")} />
        <NavItem icon="Layers" label="Templates" count={4} href="/templates" active={isActive("/templates")} />
      </div>

      <div style={{ height: 1, background: "var(--line-soft)", margin: "0 14px 8px" }} />

      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 8px", minHeight: 0 }}>
        <ChatGroup title="Fixados">
          {chats.filter((c) => c.pinned).map((c) => (
            <ChatItem key={c.id} chat={c} active={c.id === activeChatId} onClick={() => onSelectChat(c.id)} />
          ))}
        </ChatGroup>
        <ChatGroup title="Recentes">
          {chats.filter((c) => !c.pinned).map((c) => (
            <ChatItem key={c.id} chat={c} active={c.id === activeChatId} onClick={() => onSelectChat(c.id)} />
          ))}
        </ChatGroup>
      </div>

      <div style={{ padding: "10px 12px 12px", display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid var(--line-soft)" }}>
        <button
          ref={avatarRef}
          onClick={onAvatarClick}
          aria-label="Abrir menu de utilizador"
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--brand)", color: "#fff",
            border: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0,
          }}
        >
          AM
        </button>
        <button onClick={onAvatarClick} className="profile-row" aria-label="Abrir menu de utilizador">
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Aïcha Mondlane</div>
            <div style={{ fontSize: 10.5, color: "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Plano Pro · 240 créditos</div>
          </div>
          <I.ChevronDown size={13} style={{ color: "var(--ink-3)", flexShrink: 0 }} />
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, count, href, active }: { icon: IconName; label: string; count?: number; href?: string; active?: boolean }) {
  const Ic = I[icon];
  const className = `nav-item${active ? " is-active" : ""}`;
  const content = (
    <>
      <Ic size={14} className="nav-icon" />
      <span style={{ flex: 1, fontSize: 12.5, fontWeight: active ? 550 : 450 }}>{label}</span>
      {count != null && (
        <span
          className="nav-count tabular"
          style={{
            fontSize: 10.5,
            color: "var(--ink-4)",
            fontFamily: "var(--font-mono)",
            letterSpacing: ".02em",
            background: "var(--bg-tint)",
            padding: "2px 6px",
            borderRadius: 99,
            lineHeight: 1,
            transition: "background .14s ease, color .14s ease",
          }}
        >
          {count}
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={className} aria-current={active ? "page" : undefined} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }
  return <button className={className}>{content}</button>;
}

function CollapsedNavLink({ href, title, icon, active }: { href: string; title: string; icon: IconName; active: boolean }) {
  const Ic = I[icon];
  return (
    <Link
      href={href as never}
      title={title}
      aria-label={title}
      aria-current={active ? "page" : undefined}
      className={`icon-btn${active ? " nav-active" : ""}`}
      style={{ width: 36, height: 36, textDecoration: "none" }}
    >
      <Ic size={16} />
    </Link>
  );
}

function ChatGroup({ title, children }: { title: string; children: ReactNode }) {
  const items = Children.toArray(children);
  if (!items.length) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ padding: "6px 10px 4px", fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-4)" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>{items}</div>
    </div>
  );
}

function ChatItem({ chat, active, onClick }: { chat: RecentChat; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`chat-item${active ? " is-active" : ""}`}>
      <I.MessageCircle size={13} style={{ color: active ? "var(--brand)" : "var(--ink-4)", flexShrink: 0 }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: active ? 500 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{chat.title}</div>
      </div>
      <span
        className="icon-btn chat-action"
        role="button"
        tabIndex={-1}
        aria-label={`Mais opções para ${chat.title}`}
        onClick={(e) => e.stopPropagation()}
        style={{ width: 22, height: 22 }}
      >
        <I.Dots size={13} />
      </span>
    </button>
  );
}
