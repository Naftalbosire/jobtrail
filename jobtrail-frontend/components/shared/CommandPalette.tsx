"use client";
import { useState, useEffect, useRef } from "react";
import { usePanelCtx } from "@/context/PanelContext";
import { StatusPill } from "./StatusPill";
import { Avatar } from "./Avatar";
import { T } from "@/lib/tokens";

export function CommandPalette() {
  const { apps, setCmdOpen, openEdit, openNew } = usePanelCtx();
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const results = q ? apps.filter(a => a.company.toLowerCase().includes(q.toLowerCase()) || a.position.toLowerCase().includes(q.toLowerCase())).slice(0,7) : [];

  return (
    <div onClick={() => setCmdOpen(false)} style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:"13vh", background:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)" }}>
      <div onClick={e=>e.stopPropagation()} style={{ width:520, background:T.surface, border:`0.5px solid ${T.borderMd}`, borderRadius:T.radiusLg, overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"13px 16px", borderBottom:`0.5px solid ${T.border}` }}>
          <i className="ti ti-search" style={{ fontSize:16, color:T.hint }} />
          <input ref={ref} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search applications…" style={{ flex:1, border:"none", background:"transparent", color:T.text, fontSize:14, outline:"none" }} />
          <kbd style={{ fontSize:10, background:T.elevated, border:`0.5px solid ${T.border}`, borderRadius:5, padding:"2px 6px", color:T.hint }}>ESC</kbd>
        </div>
        <div style={{ maxHeight:360, overflowY:"auto" }}>
          {!q && (
            <div onClick={()=>{ setCmdOpen(false); openNew(); }} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 16px", cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=T.elevated} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ width:28, height:28, borderRadius:7, background:T.accentBg, display:"flex", alignItems:"center", justifyContent:"center" }}><i className="ti ti-plus" style={{ fontSize:14, color:T.accent }} /></div>
              <span style={{ fontSize:13.5, color:T.text, fontWeight:500 }}>New Application</span>
            </div>
          )}
          {results.map(app => (
            <div key={app.id} onClick={()=>{ setCmdOpen(false); openEdit(app); }} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px", cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=T.elevated} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <Avatar name={app.company} size={30} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13.5, fontWeight:600, color:T.text }}>{app.company}</div>
                <div style={{ fontSize:12, color:T.muted }}>{app.position}</div>
              </div>
              <StatusPill status={app.status} small />
            </div>
          ))}
          {q && !results.length && <div style={{ padding:"24px", textAlign:"center", fontSize:13, color:T.hint }}>No results for &ldquo;{q}&rdquo;</div>}
        </div>
      </div>
    </div>
  );
}
