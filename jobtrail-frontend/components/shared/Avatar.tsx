"use client";
import { T } from "@/lib/tokens";
export function Avatar({ name, size=28 }: { name: string; size?: number }) {
  return (
    <div style={{ width:size, height:size, borderRadius:7, background:T.accentBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:Math.round(size*0.43), fontWeight:700, color:T.accent, flexShrink:0 }}>
      {name?.[0]?.toUpperCase()}
    </div>
  );
}
