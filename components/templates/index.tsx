import type { ComponentType } from "react";
import type { TemplateId } from "@/types/cv";
import { TemplateAurora } from "./Aurora";
import { TemplateEditorial } from "./Editorial";
import { TemplateMono } from "./Mono";
import { TemplateBold } from "./Bold";
import type { TemplateProps } from "./shared";

export type TemplateEntry = {
  name: string;
  sub: string;
  render: ComponentType<TemplateProps>;
};

export const TEMPLATES: Record<TemplateId, TemplateEntry> = {
  aurora:    { name: "Aurora",    sub: "Duas colunas, moderno", render: TemplateAurora },
  editorial: { name: "Editorial", sub: "Serifa, magazine",      render: TemplateEditorial },
  mono:      { name: "Mono",      sub: "Minimal, monoespaçado", render: TemplateMono },
  bold:      { name: "Bold",      sub: "Cabeçalho marcado",     render: TemplateBold },
};
