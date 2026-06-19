"use client";
import { Application } from "@/types";
import { STATUSES } from "@/constants";
import { T } from "@/lib/tokens";

export function ApplicationKanban({ apps, onOpenEdit }: { apps: Application[]; onOpenEdit: (a: Application) => void }) {
  return (
    <div style={{ display:"flex", gap:10, padding:"14px 16px", overflowX:"auto", height:"100%", alignItems:"flex-start" }}>
      {STATUSES.filter(s=>s.id!=="archived").map(s=>{
        const col = apps.filter(a=>a.status===s.id);
        return (
          <div key={s.id} style={{ width:230, flexShrink:0, background:T.surface, border:`0.5px solid ${T.border}`, borderRadius:T.radiusLg, overflow:"hidden" }}>
            <div style={{ padding:"10px 12px 8px", borderBottom:`0.5px solid ${T.border}`, display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:s.color, flexShrink:0 }} />
              <span style={{ fontSize:12.5, fontWeight:600, color:T.text, flex:1 }}>{s.label}</span>
              <span style={{ fontSize:10.5, background:T.elevated, border:`0.5px solid ${T.border}`, borderRadius:10, padding:"1px 6px", color:T.hint, fontFamily:"monospace" }}>{col.length}</span>
            </div>
            <div style={{ padding:8, display:"flex", flexDirection:"column", gap:6 }}>
              {col.map(app=>(
                <div key={app.id} onClick={()=>onOpenEdit(app)} style={{ background:T.card, border:`0.5px solid ${T.border}`, borderRadius:T.radius, padding:"10px 12px", cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderMd} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                  <div style={{ fontWeight:600, fontSize:12.5, marginBottom:2, color:T.text }}>{app.company}</div>
                  <div style={{ fontSize:11.5, color:T.muted, marginBottom:6 }}>{app.position}</div>
                  {app.followUp&&<span style={{ fontSize:10.5, color:T.hint, fontFamily:"monospace" }}>{app.followUp}</span>}
                </div>
              ))}
              {col.length===0&&<div style={{ padding:"10px 4px", fontSize:12, color:T.hint, textAlign:"center" }}>—</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
