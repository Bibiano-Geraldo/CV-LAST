"use client";

import Link from "next/link";
import { useState } from "react";
import { MiniTemplate } from "@/components/templates/MiniTemplate";
import type { TemplateId } from "@/types/cv";

export function TemplateCard({
  id,
  name,
  tagline,
  accent,
}: {
  id: TemplateId;
  name: string;
  tagline: string;
  accent: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={{ pathname: "/", query: { template: id } }}
      aria-label={`Usar modelo ${name}`}
      className="tpl-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        background: "var(--bg-elev)",
        borderRadius: 16,
        border: "1px solid",
        borderColor: hover
          ? "color-mix(in oklab, var(--brand) 32%, var(--line))"
          : "var(--line)",
        boxShadow: hover
          ? "0 14px 36px color-mix(in oklab, var(--brand) 14%, transparent), 0 2px 6px rgba(15,16,12,.05)"
          : "0 1px 0 rgba(15,16,12,.02), 0 4px 16px rgba(15,16,12,.04)",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        transition:
          "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s cubic-bezier(.16,1,.3,1), border-color .18s",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Thumbnail — passe-partout, paper-on-surface feel */}
      <div
        style={{
          position: "relative",
          aspectRatio: "1 / 1.414",
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--brand) 5%, var(--bg-tint)) 0%, var(--bg-tint) 60%)",
          borderBottom: "1px solid var(--line-soft)",
          padding: 18,
        }}
      >
        {/* Inner A4 with realistic document depth */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "#fff",
            borderRadius: 3,
            overflow: "hidden",
            display: "flex",
            boxShadow: hover
              ? "0 10px 24px rgba(15,16,12,.10), 0 2px 4px rgba(15,16,12,.05), 0 0 0 1px rgba(15,16,12,.04)"
              : "0 4px 12px rgba(15,16,12,.07), 0 1px 2px rgba(15,16,12,.04), 0 0 0 1px rgba(15,16,12,.04)",
            transform: hover ? "scale(1.015)" : "scale(1)",
            transition:
              "transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s cubic-bezier(.16,1,.3,1)",
            transformOrigin: "center",
          }}
        >
          <MiniTemplate id={id} accent={accent} />
        </div>

        {/* Brand-tinted veil — desktop hover only */}
        <div
          aria-hidden
          className="tpl-veil"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--brand) 10%, transparent) 0%, color-mix(in oklab, var(--brand) 26%, transparent) 100%)",
            opacity: hover ? 1 : 0,
            transition: "opacity .25s cubic-bezier(.16,1,.3,1)",
            pointerEvents: "none",
          }}
        />

        {/* Centered CTA — desktop hover */}
        <div
          className="tpl-hover-cta"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity .25s cubic-bezier(.16,1,.3,1), transform .3s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <span
            className="cta-brand"
            style={{
              display: "inline-flex",
              gap: 10,
              height: 40,
              padding: "0 7px 0 18px",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "-.005em",
              boxShadow:
                "0 1px 0 rgba(255,255,255,.18) inset, 0 10px 26px color-mix(in oklab, var(--brand) 38%, transparent), 0 2px 6px rgba(15,16,12,.12)",
            }}
          >
            Usar este modelo
            <span className="cta-arrow" aria-hidden style={{ width: 26, height: 26, fontSize: 14 }}>
              →
            </span>
          </span>
        </div>
      </div>

      {/* Caption — integrated, gallery label feel */}
      <div
        style={{
          padding: "16px 18px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 400,
              letterSpacing: "-.015em",
              color: "var(--ink)",
              lineHeight: 1.05,
            }}
          >
            {name}
            <span style={{ color: accent }}>.</span>
          </h3>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 14.5,
              color: "var(--ink-3)",
              marginTop: 6,
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Touch-only CTA — shown on devices without hover */}
        <span
          className="tpl-touch-cta"
          aria-hidden
          style={{
            display: "none",
            alignItems: "center",
            gap: 8,
            color: "var(--brand)",
            fontWeight: 500,
            fontSize: 13,
            paddingTop: 2,
          }}
        >
          Usar este modelo
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: 99,
              background: "var(--lime)",
              color: "var(--lime-ink)",
              fontWeight: 700,
              fontSize: 11,
              lineHeight: 1,
            }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
