"use client";
import { statusById } from "@/lib/utils";
import { StatusId } from "@/types";

export function StatusPill({ status, small=false }: { status: StatusId; small?: boolean }) {
  const s = statusById(status);
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:s.bg, color:s.color, borderRadius:20, padding:small?"2px 8px":"3px 10px", fontSize:small?10.5:11.5, fontFamily:"'JetBrains Mono',monospace", fontWeight:500, whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:s.color, flexShrink:0 }} />
      {s.label}
    </span>
  );
}
