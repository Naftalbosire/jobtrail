"use client";
import { Application } from "@/types";
import { StatusPill } from "@/components/shared/StatusPill";
import { Avatar } from "@/components/shared/Avatar";
import { T } from "@/lib/tokens";

const DocBadge = ({ label, color }: { label:string; color:string }) => (
  <span style={{ fontSize:10.5, background:`${color}18`, color, borderRadius:5, padding:"2px 6px", fontFamily:"monospace", fontWeight:600 }}>{label}</span>
);

export function ApplicationTable({ apps, onOpenEdit }: { apps: Application[]; onOpenEdit: (a: Application) => void }) {
  return (
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
      <thead>
        <tr style={{ borderBottom:`0.5px solid ${T.border}`, background:T.surface, position:"sticky", top:0, zIndex:1 }}>
          {["Company","Role","Location","Applied","Method","Follow-up","Status","Docs"].map(h=>(
            <th key={h} style={{ padding:"9px 16px", textAlign:"left", fontSize:11, fontWeight:600, color:T.hint, letterSpacing:"0.05em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {apps.length===0 && <tr><td colSpan={8} style={{ padding:"60px", textAlign:"center", color:T.hint, fontSize:14 }}>No applications yet. Hit <strong style={{ color:T.text }}>New Application</strong> to get started.</td></tr>}
        {apps.map(app=>(
          <tr key={app.id} onClick={()=>onOpenEdit(app)} style={{ borderBottom:`0.5px solid ${T.border}`, cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=T.surface} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <td style={{ padding:"11px 16px" }}><div style={{ display:"flex", alignItems:"center", gap:10 }}><Avatar name={app.company} /><span style={{ fontWeight:600, color:T.text }}>{app.company}</span></div></td>
            <td style={{ padding:"11px 16px", color:T.muted }}>{app.position}</td>
            <td style={{ padding:"11px 16px", color:T.hint, fontSize:12 }}>{app.location||"—"}</td>
            <td style={{ padding:"11px 16px", color:T.hint, fontFamily:"monospace", fontSize:12 }}>{app.dateApplied}</td>
            <td style={{ padding:"11px 16px", color:T.muted, fontSize:12 }}>{app.method}</td>
            <td style={{ padding:"11px 16px", color:app.followUp&&new Date(app.followUp)<new Date()?"#FB923C":T.hint, fontFamily:"monospace", fontSize:12 }}>{app.followUp||"—"}</td>
            <td style={{ padding:"11px 16px" }}><StatusPill status={app.status} /></td>
            <td style={{ padding:"11px 16px" }}><div style={{ display:"flex", gap:3 }}>{app.attachments?.some(a=>a.type==="cv")&&<DocBadge label="CV" color="#818CF8"/>}{app.attachments?.some(a=>a.type==="cover")&&<DocBadge label="CL" color="#22D3EE"/>}</div></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
