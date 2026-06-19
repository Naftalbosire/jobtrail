"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { T, inputStyle } from "@/lib/tokens";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (e: React.FormEvent) => { e.preventDefault(); login(email, password); };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:T.bg }}>
      <div style={{ width:380, background:T.surface, border:`0.5px solid ${T.border}`, borderRadius:T.radiusLg, padding:"36px 32px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:28 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:T.accent, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <i className="ti ti-route" style={{ color:"#fff", fontSize:15 }} />
          </div>
          <span style={{ fontWeight:700, fontSize:15, color:T.text }}>JobTrail</span>
        </div>
        <h1 style={{ fontSize:20, fontWeight:700, margin:"0 0 6px", color:T.text }}>Sign in</h1>
        <p style={{ fontSize:13, color:T.muted, margin:"0 0 24px" }}>Welcome back.</p>
        <form onSubmit={submit}>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:11, color:T.muted, marginBottom:5, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle} />
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:"block", fontSize:11, color:T.muted, marginBottom:5, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle} />
          </div>
          {error && <div style={{ marginBottom:14, padding:"9px 12px", background:"rgba(248,113,113,0.1)", border:"0.5px solid rgba(248,113,113,0.3)", borderRadius:T.radius, fontSize:13, color:"#F87171" }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width:"100%", padding:"10px 0", borderRadius:T.radius, border:"none", background:T.accent, color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", opacity:loading?0.7:1 }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p style={{ marginTop:18, fontSize:13, color:T.muted, textAlign:"center" }}>
          No account? <Link href="/register" style={{ color:T.accent, textDecoration:"none", fontWeight:500 }}>Create one</Link>
        </p>
      </div>
    </div>
  );
}
