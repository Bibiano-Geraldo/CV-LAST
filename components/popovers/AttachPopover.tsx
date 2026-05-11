"use client";

import type { RefObject } from "react";
import { I, type IconName } from "@/components/icons";
import type { ChatAttachmentKind } from "@/types/chat";
import { Popover } from "./Popover";

type Item = { icon: IconName; label: string; hint: string; kind: ChatAttachmentKind };

const items: Item[] = [
  { icon: "FileText", label: "Anexar documento", hint: "PDF, DOCX — usar como base", kind: "doc" },
  { icon: "Camera", label: "Foto de perfil", hint: "para incluir no currículo", kind: "photo" },
  { icon: "Briefcase", label: "Anúncio da vaga", hint: "cola o link ou anexa", kind: "jd" },
  { icon: "Linkedin", label: "Importar do LinkedIn", hint: "puxa dados do perfil", kind: "linkedin" },
];

export function AttachPopover({
  open,
  anchor,
  onClose,
  onAttach,
}: {
  open: boolean;
  anchor: RefObject<HTMLElement | null>;
  onClose: () => void;
  onAttach: (kind: ChatAttachmentKind) => void;
}) {
  return (
    <Popover open={open} anchor={anchor} onClose={onClose} side="top" align="start" width={300} offset={10} bottomSheetOnMobile>
      <div style={{ padding: 6 }}>
        {items.map((it, i) => {
          const Ic = I[it.icon];
          return (
            <button
              key={i}
              onClick={() => {
                onAttach(it.kind);
                onClose();
              }}
              className="menu-item is-rich"
            >
              <div style={{ width: 30, height: 30, borderRadius: 7, background: "var(--bg-tint)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand)", flexShrink: 0 }}>
                <Ic size={15} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{it.label}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 1 }}>{it.hint}</div>
              </div>
            </button>
          );
        })}
      </div>
    </Popover>
  );
}
