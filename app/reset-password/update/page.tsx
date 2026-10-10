"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const [password,setPassword] = useState(""); const [error,setError] = useState<string|null>(null);
  const [done,setDone] = useState(false); const [busy,setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(null);
    try {
      const {error: updateError} = await createClient().auth.updateUser({password});
      if (updateError) setError("The recovery session may have expired. Request a new reset link."); else setDone(true);
    } catch { setError("Authentication is not configured for this deployment yet."); }
    finally { setBusy(false); }
  }
  return <div className="auth-shell"><section className="auth-card" aria-labelledby="update-title">
    <div className="auth-eyebrow">Account recovery</div><h1 className="auth-title" id="update-title">Choose a new password.</h1>
    {done ? <div className="auth-success" role="status">Password updated. <Link href="/login" className="auth-inline-link">Log in</Link>.</div> : <form className="auth-form" onSubmit={submit}>
      <label className="auth-field">New password<input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
      {error && <p className="auth-alert" role="alert">{error}</p>}
      <button className="auth-submit" disabled={busy} type="submit">{busy ? "Updating…" : "Update password"}</button>
    </form>}
  </section></div>;
}
