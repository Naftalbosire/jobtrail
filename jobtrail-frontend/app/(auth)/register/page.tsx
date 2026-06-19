"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { T, inputStyle } from "@/lib/tokens";

export default function RegisterPage() {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (e: React.FormEvent) => { e.preventDefault(); register(name, email, password); };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:T.bg }}>
      <div style={{ width:380, background:T.surface, border:`0.5px solid ${T.border}`, borderRadius:T.radiusLg, padding:"36px 32px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:28 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <i className="ti ti-route" style={{ color:"#fff", fontSize:15 }} />
          </div>
          <span style={{ fontWeight:700, fontSize:15, color:T.text }}>JobTrail</span>
        </div>
        <h1 style={{ fontSize:20, fontWeight:700, margin:"0 0 6px", color:T.text }}>Create account</h1>
        <p style={{ fontSize:13, color:T.muted, margin:"0 0 24px" }}>Start tracking your applications.</p>
        <form onSubmit={submit}>
          {[["Name","text",name,setName,"Alex Johnson"],["Email","email",email,setEmail,"you@example.com"],["Password","password",password,setPassword,"••••••••"]].map(([label,type,val,setter,ph])=>(
            <div key={label as string} style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:11, color:T.muted, marginBottom:5, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label as string}</label>
              <input type={type as string} value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} placeholder={ph as string} required style={inputStyle} />
            </div>
          ))}
          {error && <div style={{ marginBottom:14, padding:"9px 12px", background:"rgba(248,113,113,0.1)", border:"0.5px solid rgba(248,113,113,0.3)", borderRadius:T.radius, fontSize:13, color:"#F87171" }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width:"100%", padding:"10px 0", borderRadius:T.radius, border:"none", background:T.accent, color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", opacity:loading?0.7:1 }}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
        <p style={{ marginTop:18, fontSize:13, color:T.muted, textAlign:"center" }}>
          Have an account? <Link href="/login" style={{ color:T.accent, textDecoration:"none", fontWeight:500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
