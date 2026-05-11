import type { TemplateId } from "@/types/cv";

export function MiniTemplate({ id, accent }: { id: TemplateId; accent: string }) {
  const bar = (w: string, c = accent, h = 3) => (
    <div style={{ height: h, width: w, background: c, borderRadius: 1, opacity: 0.85 }} />
  );
  const line = (w: string) => <div style={{ height: 2, width: w, background: "#d8d5cc", borderRadius: 1 }} />;

  if (id === "aurora")
    return (
      <>
        <div style={{ width: "34%", background: accent, padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ width: 18, height: 18, borderRadius: 99, background: "rgba(255,255,255,.4)" }} />
          <div style={{ height: 3, width: "80%", background: "rgba(255,255,255,.7)" }} />
          <div style={{ height: 2, width: "60%", background: "rgba(255,255,255,.45)" }} />
          <div style={{ marginTop: 6 }} />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ height: 2, width: 30 + i * 4 + "%", background: "rgba(255,255,255,.4)", marginBottom: 3 }} />
          ))}
        </div>
        <div style={{ flex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {bar("28%")}{line("90%")}{line("85%")}{line("60%")}
          <div style={{ marginTop: 6 }} />
          {bar("36%")}{line("70%")}{line("90%")}{line("78%")}{line("50%")}
        </div>
      </>
    );
  if (id === "editorial")
    return (
      <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ height: 8, width: "55%", background: "#1a1816", borderRadius: 1 }} />
        <div style={{ height: 2, width: "30%", background: accent }} />
        <div style={{ height: 1, width: "100%", background: accent, opacity: 0.8, marginTop: 3 }} />
        <div style={{ height: 3, width: "90%", background: "#cfcbbf", marginTop: 6 }} />
        <div style={{ height: 3, width: "85%", background: "#cfcbbf" }} />
        <div style={{ marginTop: 6 }} />
        {bar("30%")}{line("88%")}{line("82%")}{line("70%")}
      </div>
    );
  if (id === "mono")
    return (
      <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 2, width: "22%", background: "#9c9787" }} />
        <div style={{ height: 7, width: "70%", background: "#1a1816" }} />
        <div style={{ width: 3, height: 14, background: accent, alignSelf: "flex-end", marginTop: -14 }} />
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "22% 1fr", gap: 5 }}>
          <div style={{ height: 2, background: "#cfcbbf" }} /><div style={{ height: 2, background: "#d8d5cc" }} />
          <div style={{ height: 2, background: "#cfcbbf" }} /><div style={{ height: 2, background: "#d8d5cc" }} />
          <div style={{ height: 2, background: "#cfcbbf" }} /><div style={{ height: 2, background: "#d8d5cc" }} />
        </div>
      </div>
    );
  if (id === "bold")
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ background: accent, padding: 8, display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: "rgba(255,255,255,.4)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 4, width: "60%", background: "rgba(255,255,255,.85)" }} />
            <div style={{ height: 2, width: "40%", background: "rgba(255,255,255,.55)", marginTop: 2 }} />
          </div>
        </div>
        <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {bar("32%", "#1a1816", 2.5)}{line("85%")}{line("70%")}
          <div style={{ marginTop: 4 }} />
          {bar("28%", "#1a1816", 2.5)}{line("70%")}{line("85%")}{line("55%")}
        </div>
      </div>
    );
  return null;
}
