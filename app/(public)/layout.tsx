import type { ReactNode } from "react";
import { SiteHeader } from "@/components/public/SiteHeader";
import { SiteFooter } from "@/components/public/SiteFooter";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="public-root">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
