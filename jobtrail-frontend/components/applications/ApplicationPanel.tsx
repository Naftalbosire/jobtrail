"use client";
import { useState, useEffect } from "react";
import { usePanelCtx } from "@/context/PanelContext";
import { STATUSES, METHODS, INDUSTRIES, TIMELINE_ICONS, TIMELINE_COLORS } from "@/constants";
import { StatusPill } from "@/components/shared/StatusPill";
import { T, inputStyle } from "@/lib/tokens";

const Field = ({ label, children }:{ label:string; children:React.ReactNode }) => (
  <div style={{ marginBottom:14 }}>
    <label style={{ display:"block", fontSize:11, color:T.muted, marginBottom:5, fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase" }}>{label}</label>
    {children}
  </div>
);

const UploadZone = ({ type, label, icon, color, att, onUpload, onRemove }:any) => att ? (
  <div style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 13px", border:`0.5px solid ${T.borderMd}`, borderRadius:T.radiusLg, background:T.elevated, marginBottom:10 }}>
    <i className={`ti ${icon}`} style={{ fontSize:20, color, flexShrink:0 }} />
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ fontSize:13, fontWeight:500, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{att.name}</div>
      <div style={{ fontSize:11, color:T.hint }}>{att.size}</div>
    </div>
    <button onClick={()=>onUpload(type)} style={{ background:"transparent", border:"none", cursor:"pointer", color:T.muted, padding:4 }}><i className="ti ti-refresh" style={{ fontSize:14 }} /></button>
    <button onClick={()=>onRemove(att.name)} style={{ background:"transparent", border:"none", cursor:"pointer", color:"#F87171", padding:4 }}><i className="ti ti-trash" style={{ fontSize:14 }} /></button>
  </div>
) : (
  <button onClick={()=>onUpload(type)} style={{ width:"100%", padding:"20px 0", border:`1px dashed ${T.borderMd}`, borderRadius:T.radiusLg, background:"transparent", color:T.muted, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:6, marginBottom:10 }} onMouseEnter={e=>e.currentTarget.style.borderColor=color} onMouseLeave={e=>e.currentTarget.style.borderColor=T.borderMd}>
    <i className="ti ti-upload" style={{ fontSize:22, color:T.hint }} />
    <span style={{ fontSize:13, fontWeight:500 }}>Upload {label}</span>
    <span style={{ fontSize:11, color:T.hint }}>PDF · DOC · DOCX</span>
  </button>
);

export function ApplicationPanel() {
  const { panelOpen, draft, setDraft, isNew, saveApp, deleteApp, closePanel, triggerUpload } = usePanelCtx();
  const [tab, setTab] = useState<"details"|"documents"|"timeline">("details");
  useEffect(()=>{ if(panelOpen) setTab("details"); },[panelOpen]);
  if(!draft) return null;

  const f = (key:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>
    setDraft(p=>({...p,[key]:e.target.value}));

  const cvAtt    = draft.attachments?.find(a=>a.type==="cv");
  const clAtt    = draft.attachments?.find(a=>a.type==="cover");
  const otherAtt = draft.attachments?.filter(a=>a.type==="other")??[];
  const removeAtt = (name:string)=>setDraft(p=>({...p,attachments:p.attachments.filter(a=>a.name!==name)}));

  return (
    <>
      <style>{`
        .panel-width { width: 440px; }
        @media(max-width:768px){ .panel-width { width: 100% !important; } }
        .grid-2col { display:grid; grid-template-columns:1fr 1fr; gap:0 12px; }
        @media(max-width:480px){ .grid-2col { grid-template-columns:1fr; } }
      `}</style>
      <div style={{ position:"fixed", inset:0, zIndex:9000, display:"flex", justifyContent:"flex-end", pointerEvents:panelOpen?"auto":"none" }}>
        <div onClick={closePanel} style={{ position:"absolute", inset:0, background:panelOpen?"rgba(0,0,0,0.6)":"transparent", transition:"background 0.25s", backdropFilter:panelOpen?"blur(2px)":"none" }} />
        <div className="panel-width" style={{ position:"relative", zIndex:1, background:T.surface, borderLeft:`0.5px solid ${T.border}`, display:"flex", flexDirection:"column", height:"100%", transform:panelOpen?"translateX(0)":"translateX(100%)", transition:"transform 0.28s cubic-bezier(0.4,0,0.2,1)" }}>

          {/* Header */}
          <div style={{ padding:"16px 20px", borderBottom:`0.5px solid ${T.border}`, display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:15, fontWeight:700, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{isNew?"New Application":draft.company||"Edit"}</div>
              {!isNew&&draft.position&&<div style={{ fontSize:12, color:T.muted, marginTop:1 }}>{draft.position}</div>}
            </div>
            {!isNew&&<StatusPill status={draft.status} small />}
            <button onClick={closePanel} style={{ width:32, height:32, border:`0.5px solid ${T.border}`, borderRadius:T.radius, background:T.elevated, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.muted, flexShrink:0 }}>
              <i className="ti ti-x" style={{ fontSize:16 }} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", borderBottom:`0.5px solid ${T.border}`, padding:"0 20px", flexShrink:0 }}>
            {(["details","documents","timeline"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ padding:"10px 12px", border:"none", borderBottom:`2px solid ${tab===t?T.accent:"transparent"}`, background:"transparent", color:tab===t?T.accent:T.muted, fontSize:13, cursor:"pointer", fontWeight:tab===t?600:400, marginRight:2 }}>
                {t[0].toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>

          {/* Body */}
          <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 12px", WebkitOverflowScrolling:"touch" } as any}>
            {tab==="details"&&(
              <>
                <div className="grid-2col">
                  <Field label="Company *"><input value={draft.company} onChange={f("company")} placeholder="Naftec Solutions" style={inputStyle} /></Field>
                  <Field label="Position *"><input value={draft.position} onChange={f("position")} placeholder="Software Engineer" style={inputStyle} /></Field>
                </div>
                <Field label="Status">
                  <select value={draft.status} onChange={f("status")} style={inputStyle}>
                    {STATUSES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </Field>
                <div className="grid-2col">
                  <Field label="Date Applied"><input type="date" value={draft.dateApplied} onChange={f("dateApplied")} style={inputStyle} /></Field>
                  <Field label="Follow-up"><input type="date" value={draft.followUp} onChange={f("followUp")} style={inputStyle} /></Field>
                </div>
                <div className="grid-2col">
                  <Field label="Method"><select value={draft.method} onChange={f("method")} style={inputStyle}>{METHODS.map(m=><option key={m}>{m}</option>)}</select></Field>
                  <Field label="Industry"><select value={draft.industry} onChange={f("industry")} style={inputStyle}><option value="">Select…</option>{INDUSTRIES.map(i=><option key={i}>{i}</option>)}</select></Field>
                </div>
                <Field label="Location"><input value={draft.location} onChange={f("location")} placeholder="Nairobi . Remote" style={inputStyle} /></Field>
                <div className="grid-2col">
                  <Field label="Salary"><input value={draft.salary} onChange={f("salary")} placeholder="Kes 120k–150k" style={inputStyle} /></Field>
                  <Field label="Contact Email"><input value={draft.contact} onChange={f("contact")} placeholder="hr@company.com" style={inputStyle} /></Field>
                </div>
                <Field label="Job URL"><input value={draft.url} onChange={f("url")} placeholder="https://…" style={inputStyle} /></Field>
                <Field label="Notes"><textarea value={draft.notes} onChange={f("notes")} rows={3} placeholder="Notes, impressions…" style={{...inputStyle,resize:"vertical"}} /></Field>
              </>
            )}

            {tab==="documents"&&(
              <>
                <p style={{ fontSize:13, color:T.muted, margin:"0 0 18px", lineHeight:1.6 }}>Upload the exact CV and cover letter used for this application.</p>
                <p style={{ fontSize:11, fontWeight:600, color:T.hint, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>CV / Résumé</p>
                <UploadZone type="cv" label="CV" icon="ti-file-text" color="#818CF8" att={cvAtt} onUpload={triggerUpload} onRemove={removeAtt} />
                <p style={{ fontSize:11, fontWeight:600, color:T.hint, textTransform:"uppercase", letterSpacing:"0.07em", margin:"6px 0 8px" }}>Cover Letter</p>
                <UploadZone type="cover" label="Cover Letter" icon="ti-file-description" color="#22D3EE" att={clAtt} onUpload={triggerUpload} onRemove={removeAtt} />
                {otherAtt.length>0&&(
                  <>
                    <p style={{ fontSize:11, fontWeight:600, color:T.hint, textTransform:"uppercase", letterSpacing:"0.07em", margin:"6px 0 8px" }}>Other</p>
                    {otherAtt.map(att=>(
                      <div key={att.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", border:`0.5px solid ${T.border}`, borderRadius:T.radius, marginBottom:6 }}>
                        <i className="ti ti-file" style={{ fontSize:16, color:T.muted }} />
                        <div style={{ flex:1, fontSize:13, color:T.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{att.name}</div>
                        <span style={{ fontSize:11, color:T.hint }}>{att.size}</span>
                        <button onClick={()=>removeAtt(att.name)} style={{ background:"transparent", border:"none", cursor:"pointer", color:"#F87171", padding:4 }}><i className="ti ti-trash" style={{ fontSize:13 }} /></button>
                      </div>
                    ))}
                  </>
                )}
                <button onClick={()=>triggerUpload("other")} style={{ display:"flex", alignItems:"center", gap:7, padding:"8px 12px", border:`0.5px solid ${T.border}`, borderRadius:T.radius, background:"transparent", color:T.muted, cursor:"pointer", fontSize:13, marginTop:4 }}>
                  <i className="ti ti-plus" style={{ fontSize:13 }} /> Add another document
                </button>
              </>
            )}

            {tab==="timeline"&&(
              <>
                {!draft.timeline?.length&&<p style={{ fontSize:13, color:T.hint }}>No events yet.</p>}
                {(draft.timeline??[]).map((ev,i)=>{
                  const ic=TIMELINE_ICONS[ev.type]??"ti-point";
                  const co=TIMELINE_COLORS[ev.type]??T.muted;
                  return (
                    <div key={i} style={{ display:"flex", gap:12, marginBottom:18 }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                        <div style={{ width:30, height:30, borderRadius:"50%", background:`${co}18`, display:"flex", alignItems:"center", justifyContent:"center", border:`0.5px solid ${co}40` }}>
                          <i className={`ti ${ic}`} style={{ fontSize:13, color:co }} />
                        </div>
                        {i<(draft.timeline?.length??0)-1&&<div style={{ width:"0.5px", flex:1, minHeight:12, background:T.border, marginTop:4 }} />}
                      </div>
                      <div style={{ paddingTop:5 }}>
                        <div style={{ fontSize:13, fontWeight:500, color:T.text }}>{ev.event}</div>
                        <div style={{ fontSize:11.5, color:T.hint, marginTop:2, fontFamily:"monospace" }}>{ev.date}</div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding:"12px 20px", borderTop:`0.5px solid ${T.border}`, display:"flex", gap:8, flexShrink:0, background:T.surface }}>
            {!isNew&&<button onClick={()=>{ if(window.confirm("Delete this application?")) deleteApp(draft.id); }} style={{ padding:"8px 11px", border:`0.5px solid ${T.border}`, borderRadius:T.radius, background:"transparent", color:"#F87171", fontSize:13, cursor:"pointer" }}><i className="ti ti-trash" style={{ fontSize:13 }} /></button>}
            <div style={{ flex:1 }} />
            <button onClick={closePanel} style={{ padding:"10px 16px", border:`0.5px solid ${T.border}`, borderRadius:T.radius, background:T.elevated, color:T.text, fontSize:13, cursor:"pointer", fontWeight:500 }}>Cancel</button>
            <button onClick={saveApp} disabled={!draft.company?.trim()} style={{ padding:"10px 22px", borderRadius:T.radius, border:"none", background:draft.company?.trim()?T.accent:T.hint, color:"#fff", fontSize:13, fontWeight:600, cursor:draft.company?.trim()?"pointer":"default" }}>
              {isNew?"Add Application":"Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
