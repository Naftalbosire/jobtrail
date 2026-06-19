"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePanelCtx } from "@/context/PanelContext";
import { T } from "@/lib/tokens";

const NAV = [
  { href:"/dashboard",              icon:"ti-layout-dashboard", label:"Dashboard"    },
  { href:"/dashboard/applications", icon:"ti-briefcase",        label:"Applications" },
  { href:"/dashboard/calendar",     icon:"ti-calendar",         label:"Calendar"     },
];

export function Sidebar() {
  const pathname = usePathname();
  const { openNew, setCmdOpen } = usePanelCtx();

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="desktop-only" style={{ width:220, background:T.surface, borderRight:`0.5px solid ${T.border}`, display:"flex", flexDirection:"column", flexShrink:0, height:"100vh" }}>
        <div style={{ padding:"18px 18px 14px", borderBottom:`0.5px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <i className="ti ti-route" style={{ color:"#fff", fontSize:15 }} />
            </div>
            <span style={{ fontWeight:700, fontSize:15, color:T.text }}>JobTrail</span>
          </div>
        </div>
        <div style={{ padding:"10px 12px 6px" }}>
          <button onClick={()=>setCmdOpen(true)} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:T.radius, border:`0.5px solid ${T.border}`, background:T.card, color:T.muted, fontSize:12.5, cursor:"pointer" }}>
            <i className="ti ti-search" style={{ fontSize:13 }} />
            <span style={{ flex:1 }}>Search…</span>
            <kbd style={{ fontSize:10, background:T.elevated, border:`0.5px solid ${T.border}`, borderRadius:4, padding:"1px 5px", color:T.hint }}>⌘K</kbd>
          </button>
        </div>
        <nav style={{ padding:"6px 10px", flex:1 }}>
          {NAV.map(item=>{
            const active = pathname===item.href;
            return (
              <Link key={item.href} href={item.href} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 10px", borderRadius:T.radius, background:active?T.accentBg:"transparent", color:active?T.accent:T.muted, fontSize:13.5, fontWeight:active?500:400, textDecoration:"none", marginBottom:1, transition:"all 0.12s" }}>
                <i className={`ti ${item.icon}`} style={{ fontSize:16 }} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div style={{ padding:"0 12px 16px" }}>
          <button onClick={openNew} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"9px 0", borderRadius:T.radius, border:"none", background:T.accent, color:"#fff", fontSize:13.5, fontWeight:600, cursor:"pointer" }}>
            <i className="ti ti-plus" style={{ fontSize:15 }} />
            New Application
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom nav ── */}
      <nav className="mobile-only" style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:8000, background:T.surface, borderTop:`0.5px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-around", padding:"8px 0 max(8px, env(safe-area-inset-bottom))" }}>
        {NAV.map(item=>{
          const active = pathname===item.href;
          return (
            <Link key={item.href} href={item.href} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"4px 16px", textDecoration:"none", color:active?T.accent:T.muted }}>
              <i className={`ti ${item.icon}`} style={{ fontSize:22 }} />
              <span style={{ fontSize:10, fontWeight:active?600:400 }}>{item.label}</span>
            </Link>
          );
        })}
        <button onClick={openNew} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"4px 16px", background:"transparent", border:"none", cursor:"pointer", color:T.accent }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <i className="ti ti-plus" style={{ fontSize:18, color:"#fff" }} />
          </div>
          <span style={{ fontSize:10, fontWeight:500, color:T.muted }}>New</span>
        </button>
      </nav>
    </>
  );
}
