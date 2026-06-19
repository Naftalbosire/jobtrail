"use client";
import { usePanelCtx } from "@/context/PanelContext";
import { StatCards } from "@/components/dashboard/StatCards";
import { T } from "@/lib/tokens";
import { Avatar } from "@/components/shared/Avatar";
import { StatusPill } from "@/components/shared/StatusPill";

export default function DashboardPage() {
  const { apps, openEdit } = usePanelCtx();
  const stats = [
    { label:"Total",      value:apps.length,                                                                   icon:"ti-briefcase", color:"#818CF8" },
    { label:"Awaiting",   value:apps.filter(a=>["applied","shortlisted","waiting"].includes(a.status)).length, icon:"ti-clock",     color:"#60A5FA" },
    { label:"Interviews", value:apps.filter(a=>["interview","technical"].includes(a.status)).length,           icon:"ti-users",     color:"#FBBF24" },
    { label:"Offers",     value:apps.filter(a=>a.status==="offer").length,                                     icon:"ti-check",     color:"#34D399" },
    { label:"Rejected",   value:apps.filter(a=>a.status==="rejected").length,                                  icon:"ti-x",         color:"#F87171" },
  ];
  const recent   = [...apps].sort((a,b)=>new Date(b.dateApplied).getTime()-new Date(a.dateApplied).getTime()).slice(0,5);
  const upcoming = apps.filter(a=>a.followUp&&new Date(a.followUp)>=new Date()).sort((a,b)=>new Date(a.followUp).getTime()-new Date(b.followUp).getTime()).slice(0,4);

  return (
    <div style={{ flex:1, overflow:"auto", padding:"20px 16px" }}>
      {/* Mobile header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }} className="mobile-only">
          <div style={{ width:26, height:26, borderRadius:7, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <i className="ti ti-route" style={{ color:"#fff", fontSize:13 }} />
          </div>
          <span style={{ fontWeight:700, fontSize:15, color:T.text }}>JobTrail</span>
        </div>
        <h1 className="desktop-only" style={{ fontSize:20, fontWeight:700, margin:0, color:T.text }}>Overview</h1>
      </div>

      <StatCards stats={stats} />

      {/* Cards stack on mobile */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:16 }}>
        {/* Recent */}
        <div style={{ background:T.card, border:`0.5px solid ${T.border}`, borderRadius:T.radiusLg, padding:"18px 20px" }}>
          <p style={{ fontSize:11, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.07em", margin:"0 0 14px" }}>Recent Activity</p>
          {recent.map(a=>(
            <div key={a.id} onClick={()=>openEdit(a)} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:`0.5px solid ${T.border}`, cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.opacity="0.75"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <Avatar name={a.company} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.company}</div>
                <div style={{ fontSize:11.5, color:T.muted, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.position}</div>
              </div>
              <StatusPill status={a.status} small />
            </div>
          ))}
        </div>
        {/* Follow-ups */}
        <div style={{ background:T.card, border:`0.5px solid ${T.border}`, borderRadius:T.radiusLg, padding:"18px 20px" }}>
          <p style={{ fontSize:11, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.07em", margin:"0 0 14px" }}>Upcoming Follow-ups</p>
          {upcoming.length===0&&<p style={{ fontSize:13, color:T.hint }}>No upcoming follow-ups.</p>}
          {upcoming.map(a=>(
            <div key={a.id} onClick={()=>openEdit(a)} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 0", borderBottom:`0.5px solid ${T.border}`, cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.opacity="0.75"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <i className="ti ti-calendar-event" style={{ fontSize:16, color:"#FBBF24", flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:500, color:T.text }}>{a.company}</div>
                <div style={{ fontSize:11.5, color:T.muted, fontFamily:"monospace" }}>{a.followUp}</div>
              </div>
              <StatusPill status={a.status} small />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
