"use client";
import { T } from "@/lib/tokens";
interface Stat { label:string; value:number; icon:string; color:string; }
export function StatCards({ stats }:{ stats:Stat[] }) {
  return (
    <>
      <style>{`
        .stat-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:10px; margin-bottom:20px; }
        @media(max-width:768px){ .stat-grid { grid-template-columns:repeat(2,1fr); } .stat-grid > *:last-child { grid-column: span 2; } }
      `}</style>
      <div className="stat-grid">
        {stats.map(c=>(
          <div key={c.label} style={{ background:T.card, border:`0.5px solid ${T.border}`, borderRadius:T.radiusLg, padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontSize:11.5, color:T.muted, fontWeight:500 }}>{c.label}</span>
              <div style={{ width:26, height:26, borderRadius:7, background:`${c.color}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className={`ti ${c.icon}`} style={{ fontSize:13, color:c.color }} />
              </div>
            </div>
            <div style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.04em", color:c.color }}>{c.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}
