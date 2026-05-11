"use client";

import type { RefObject } from "react";
import { I, type IconName } from "@/components/icons";
import { Popover } from "./Popover";

type Item = { icon: IconName; label: string; kbd?: string; danger?: boolean };

const groups: Item[][] = [
  [
    { icon: "User", label: "Perfil" },
    { icon: "Settings", label: "Configurações", kbd: "⌘," },
    { icon: "Bell", label: "Notificações" },
    { icon: "Help", label: "Ajuda & atalhos", kbd: "?" },
  ],
  [{ icon: "LogOut", label: "Terminar sessão", danger: true }],
];

export function AvatarPopover({
  open,
  anchor,
  onClose,
}: {
  open: boolean;
  anchor: RefObject<HTMLElement | null>;
  onClose: () => void;
}) {
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="right" align="start" width={260} offset={8}>
      <div style={{ padding: "14px 14px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--line-soft)" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13 }}>
          AM
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Aïcha Mondlane</div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>aicha@adicional.co.mz</div>
        </div>
      </div>
      <div style={{ padding: 6 }}>
        <div style={{ padding: "8px 10px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--font-mono)", letterSpacing: ".04em" }}>PLANO</span>
          <span style={{ fontSize: 11.5, fontWeight: 500, color: "var(--lime-ink)", background: "color-mix(in oklab, var(--lime) 30%, white)", padding: "2px 8px", borderRadius: 99 }}>Pro · 240 créditos</span>
        </div>
      </div>
      {groups.map((group, gi) => (
        <div key={gi} style={{ padding: "4px 6px", borderTop: gi === 0 ? "none" : "1px solid var(--line-soft)" }}>
          {group.map((it, i) => {
            const Ic = I[it.icon];
            return (
              <button
                key={i}
                onClick={onClose}
                title={it.kbd ? `${it.label} · ${it.kbd}` : it.label}
                className={`menu-item${it.danger ? " is-danger" : ""}`}
              >
                <Ic size={15} />
                <span style={{ flex: 1 }}>{it.label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </Popover>
  );
}
