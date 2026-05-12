"use client";

import { useEffect } from "react";

/**
 * Detecta a altura do teclado virtual e expõe-a como CSS variable `--kb-inset`
 * em `<html>`. Usa a VisualViewport API — fiável em iOS Safari (que não
 * redimensiona o layout viewport quando o teclado abre) e em Android quando
 * `interactive-widget=resizes-content` não está activo.
 *
 * Também adiciona a classe `kb-open` em `<html>` enquanto o teclado está
 * aberto, para o CSS poder ajustar transições/scroll.
 */
export function useKeyboardInset() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      raf = 0;
      // Diferença entre layout viewport e visual viewport = altura do teclado
      // (mais qualquer chrome do browser que tenha encolhido a área visível).
      const inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      // Threshold baixo para evitar falsos positivos (ex.: barra de URL a
      // recolher conta como ~60px em Safari iOS). Só consideramos teclado
      // quando o inset é significativo.
      const isKb = inset > 120;
      root.style.setProperty("--kb-inset", `${isKb ? inset : 0}px`);
      root.classList.toggle("kb-open", isKb);
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    vv.addEventListener("resize", schedule);
    vv.addEventListener("scroll", schedule);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      vv.removeEventListener("resize", schedule);
      vv.removeEventListener("scroll", schedule);
      root.style.removeProperty("--kb-inset");
      root.classList.remove("kb-open");
    };
  }, []);
}
