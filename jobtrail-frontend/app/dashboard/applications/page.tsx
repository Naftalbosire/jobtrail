"use client";
import { useState } from "react";
import { usePanelCtx } from "@/context/PanelContext";
import { ApplicationTable } from "@/components/applications/ApplicationTable";
import { ApplicationKanban } from "@/components/applications/ApplicationKanban";
import { STATUSES } from "@/constants";
import { T } from "@/lib/tokens";
import { Application } from "@/types";
import { Avatar } from "@/components/shared/Avatar";
import { StatusPill } from "@/components/shared/StatusPill";

function MobileList({ apps, onOpenEdit }:{ apps:Application[]; onOpenEdit:(a:Application)=>void }) {
  return (
    <div style={{ padding:"8px 16px" }}>
      {apps.length===0&&<p style={{ textAlign:"center", color:T.hint, fontSize:14, padding:"40px 0" }}>No applications yet.</p>}
      {apps.map(a=>(
        <div key={a.id} onClick={()=>onOpenEdit(a)} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:`0.5px solid ${T.border}`, cursor:"pointer" }}>
          <Avatar name={a.company} size={36} />
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:600, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.company}</div>
            <div style={{ fontSize:12, color:T.muted, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.position}</div>
            <div style={{ fontSize:11, color:T.hint, marginTop:2, fontFamily:"monospace" }}>{a.dateApplied}</div>
          </div>
          <StatusPill status={a.status} small />
        </div>
      ))}
    </div>
  );
}

export default function ApplicationsPage() {
  const { apps, openEdit, openNew } = usePanelCtx();
  const [view, setView] = useState<"table"|"kanban">("table");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilter] = useState("all");

  const filtered = apps.filter(a => {
    const q = search.toLowerCase();
    return (!q||a.company.toLowerCase().includes(q)||a.position.toLowerCase().includes(q))
      && (filterStatus==="all"||a.status===filterStatus);
  });

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <style>{`
        .apps-toolbar-desktop { display:flex; }
        .apps-toolbar-mobile  { display:none; }
        .apps-table           { display:block; }
        @media(max-width:768px){
          .apps-toolbar-desktop { display:none !important; }
          .apps-toolbar-mobile  { display:flex !important; }
          .apps-table           { display:none !important; }
          .apps-mobile-list     { display:block !important; }
        }
        .apps-mobile-list { display:none; }
      `}</style>

      {/* Desktop toolbar */}
      <div className="apps-toolbar-desktop" style={{ padding:"13px 20px", borderBottom:`0.5px solid ${T.border}`, alignItems:"center", gap:10, background:T.surface, flexShrink:0 }}>
        <span style={{ fontSize:15, fontWeight:700, color:T.text, flexShrink:0 }}>Applications</span>
        <span style={{ fontSize:11, background:T.elevated, border:`0.5px solid ${T.border}`, borderRadius:20, padding:"2px 8px", color:T.muted, fontFamily:"monospace" }}>{filtered.length}</span>
        <div style={{ flex:1 }} />
        <div style={{ display:"flex", gap:1, background:T.elevated, border:`0.5px solid ${T.border}`, borderRadius:T.radius, padding:3 }}>
          {([["table","ti-list"],["kanban","ti-layout-kanban"]] as const).map(([v,ic])=>(
            <button key={v} onClick={()=>setView(v)} style={{ padding:"4px 10px", borderRadius:6, border:"none", background:view===v?T.card:"transparent", color:view===v?T.text:T.muted, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
              <i className={`ti ${ic}`} style={{ fontSize:13 }} />{v[0].toUpperCase()+v.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:7, background:T.elevated, border:`0.5px solid ${T.border}`, borderRadius:T.radius, padding:"6px 11px", width:200 }}>
          <i className="ti ti-search" style={{ fontSize:13, color:T.hint }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…" style={{ border:"none", background:"transparent", color:T.text, fontSize:13, outline:"none", width:"100%" }} />
        </div>
        <select value={filterStatus} onChange={e=>setFilter(e.target.value)} style={{ padding:"6px 10px", border:`0.5px solid ${T.border}`, borderRadius:T.radius, background:T.elevated, color:T.text, fontSize:13, cursor:"pointer" }}>
          <option value="all">All Statuses</option>
          {STATUSES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <button onClick={openNew} style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 14px", borderRadius:T.radius, border:"none", background:T.accent, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", flexShrink:0 }}>
          <i className="ti ti-plus" style={{ fontSize:13 }} />Add
        </button>
      </div>

      {/* Mobile toolbar */}
      <div className="apps-toolbar-mobile" style={{ padding:"10px 16px", borderBottom:`0.5px solid ${T.border}`, alignItems:"center", gap:8, background:T.surface, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, flex:1, background:T.elevated, border:`0.5px solid ${T.border}`, borderRadius:T.radius, padding:"8px 11px" }}>
          <i className="ti ti-search" style={{ fontSize:14, color:T.hint }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search applications…" style={{ border:"none", background:"transparent", color:T.text, fontSize:14, outline:"none", width:"100%" }} />
        </div>
        <select value={filterStatus} onChange={e=>setFilter(e.target.value)} style={{ padding:"8px 10px", border:`0.5px solid ${T.border}`, borderRadius:T.radius, background:T.elevated, color:T.text, fontSize:13, cursor:"pointer", flexShrink:0 }}>
          <option value="all">All</option>
          {STATUSES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>

      {/* Desktop table/kanban */}
      <div className="apps-table" style={{ flex:1, overflow:"auto" }}>
        {view==="table" ? <ApplicationTable apps={filtered} onOpenEdit={openEdit} /> : <ApplicationKanban apps={filtered} onOpenEdit={openEdit} />}
      </div>

      {/* Mobile list */}
      <div className="apps-mobile-list" style={{ flex:1, overflow:"auto" }}>
        <MobileList apps={filtered} onOpenEdit={openEdit} />
      </div>
    </div>
  );
}
