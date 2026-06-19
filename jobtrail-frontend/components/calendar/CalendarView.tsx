"use client";
import { useState } from "react";
import { Application } from "@/types";
import { T } from "@/lib/tokens";

const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_D=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAYS_M=["S","M","T","W","T","F","S"];

export function CalendarView({ apps, onOpenEdit }:{ apps:Application[]; onOpenEdit:(a:Application)=>void }) {
  const today=new Date();
  const [month,setMonth]=useState(today.getMonth());
  const [year,setYear]=useState(today.getFullYear());
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const prev=()=>{ if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const next=()=>{ if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); };
  const eventsOn=(d:number)=>{ const ds=`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; return apps.filter(a=>a.followUp===ds||a.dateApplied===ds); };

  return (
    <>
      <style>{`
        .cal-day-label-d { display:block; } .cal-day-label-m { display:none; }
        .cal-cell { min-height:88px; }
        @media(max-width:768px){
          .cal-day-label-d { display:none; } .cal-day-label-m { display:block; }
          .cal-cell { min-height:56px; }
        }
      `}</style>
      <div style={{ flex:1, overflow:"auto", padding:"20px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
          <h1 style={{ fontSize:18, fontWeight:700, margin:0, color:T.text }}>Calendar</h1>
          <div style={{ flex:1 }} />
          <button onClick={prev} style={{ padding:"5px 10px", border:`0.5px solid ${T.border}`, borderRadius:T.radius, background:T.card, color:T.text, cursor:"pointer" }}><i className="ti ti-chevron-left" /></button>
          <span style={{ fontSize:13, fontWeight:600, minWidth:120, textAlign:"center", color:T.text }}>{MONTHS[month]} {year}</span>
          <button onClick={next} style={{ padding:"5px 10px", border:`0.5px solid ${T.border}`, borderRadius:T.radius, background:T.card, color:T.text, cursor:"pointer" }}><i className="ti ti-chevron-right" /></button>
        </div>
        <div style={{ background:T.card, border:`0.5px solid ${T.border}`, borderRadius:T.radiusLg, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:`0.5px solid ${T.border}` }}>
            {DAYS_D.map((d,i)=>(
              <div key={d} style={{ padding:"8px 0", textAlign:"center", fontSize:11, fontWeight:600, color:T.hint, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                <span className="cal-day-label-d">{d}</span>
                <span className="cal-day-label-m">{DAYS_M[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
            {Array.from({length:firstDay}).map((_,i)=><div key={`e${i}`} className="cal-cell" style={{ borderRight:`0.5px solid ${T.border}`, borderBottom:`0.5px solid ${T.border}`, background:T.surface }} />)}
            {Array.from({length:daysInMonth}).map((_,i)=>{
              const d=i+1;
              const isToday=d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();
              const events=eventsOn(d);
              return (
                <div key={d} className="cal-cell" style={{ borderRight:`0.5px solid ${T.border}`, borderBottom:`0.5px solid ${T.border}`, padding:"5px 4px" }}>
                  <div style={{ display:"inline-flex", width:20, height:20, borderRadius:"50%", alignItems:"center", justifyContent:"center", background:isToday?T.accent:"transparent", color:isToday?"#fff":T.text, fontSize:11, fontWeight:isToday?700:400, marginBottom:2 }}>{d}</div>
                  {events.map(ev=>(
                    <div key={ev.id} onClick={()=>onOpenEdit(ev)} style={{ fontSize:9, background:T.accentBg, color:T.accent, borderRadius:3, padding:"1px 4px", marginBottom:1, cursor:"pointer", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", fontWeight:500 }}>{ev.company}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
