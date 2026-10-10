"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email,setEmail] = useState(""); const [password,setPassword] = useState("");
  const [done,setDone] = useState(false); const [error,setError] = useState<string|null>(null); const [busy,setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(null);
    try {
      const {error: authError} = await createClient().auth.signUp({email,password,options:{emailRedirectTo:`${window.location.origin}/auth/callback`}});
      if (authError) setError("Sign-up failed. Check the address and ensure the password has at least 8 characters.");
      else setDone(true);
    } catch { setError("Authentication is not configured for this deployment yet."); }
    finally { setBusy(false); }
  }
  return <div className="auth-shell"><section className="auth-card" aria-labelledby="signup-title">
    <div className="auth-eyebrow">Beyond Autopilot</div><h1 className="auth-title" id="signup-title">Create your account.</h1>
    <p className="auth-copy">Accounts are only needed for private workspace features. The research itself stays public.</p>
    {done ? <div className="auth-success" role="status">If the address is valid, a confirmation link is on its way. Check your inbox before logging in.</div> : <form className="auth-form" onSubmit={submit}>
      <label className="auth-field">Email address<input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
      <label className="auth-field">Password<input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
      {error && <p className="auth-alert" role="alert">{error}</p>}
      <button className="auth-submit" disabled={busy} type="submit">{busy ? "Creating account…" : "Sign up"}</button>
    </form>}
    <div className="auth-links"><Link href="/login">Already have an account? Log in</Link></div>
  </section></div>;
}
