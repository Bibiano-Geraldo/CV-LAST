import { Suspense } from "react";
import { AppShell } from "./AppShell";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AppShell />
    </Suspense>
  );
}
