"use client";
import { PanelProvider } from "@/context/PanelContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { ApplicationPanel } from "@/components/applications/ApplicationPanel";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { usePanelCtx } from "@/context/PanelContext";
import { T } from "@/lib/tokens";

function Shell({ children }: { children: React.ReactNode }) {
  const { cmdOpen } = usePanelCtx();
  return (
    <div style={{ display:"flex", height:"100vh", background:T.bg, color:T.text, overflow:"hidden" }}>
      <Sidebar />
      {/* pb on mobile to clear the bottom nav */}
      <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", paddingBottom:"env(safe-area-inset-bottom)" }}
          className="mobile-main">
          {children}
        </div>
      </main>
      <ApplicationPanel />
      {cmdOpen && <CommandPalette />}

      {/* Global style to add bottom padding on mobile so content clears the nav bar */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-main > * { padding-bottom: 80px; }
        }
      `}</style>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelProvider>
      <Shell>{children}</Shell>
    </PanelProvider>
  );
}
