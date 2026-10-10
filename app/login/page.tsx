"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email,setEmail] = useState(""); const [password,setPassword] = useState("");
  const [error,setError] = useState<string|null>(null); const [busy,setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(null);
    try {
      const {error: authError} = await createClient().auth.signInWithPassword({email,password});
      if (authError) { setError(authError.message === "Email not confirmed" ? "Confirm your email before logging in." : "Email or password was not accepted."); return; }
      router.push("/dashboard"); router.refresh();
    } catch { setError("Authentication is not configured for this deployment yet."); }
    finally { setBusy(false); }
  }
  return <div className="auth-shell"><section className="auth-card" aria-labelledby="login-title">
    <div className="auth-eyebrow">Private research workspace</div><h1 className="auth-title" id="login-title">Welcome back.</h1>
    <p className="auth-copy">Public research remains open to everyone. Sign in to access your private workspace.</p>
    <form className="auth-form" onSubmit={submit}>
      <label className="auth-field">Email address<input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
      <label className="auth-field">Password<input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
      {error && <p className="auth-alert" role="alert">{error}</p>}
      <button className="auth-submit" disabled={busy} type="submit">{busy ? "Signing in…" : "Log in"}</button>
    </form>
    <div className="auth-links"><Link href="/signup">Create an account</Link><Link href="/reset-password">Forgot password?</Link></div>
  </section></div>;
}
