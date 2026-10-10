"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email,setEmail] = useState(""); const [sent,setSent] = useState(false);
  const [error,setError] = useState<string|null>(null); const [busy,setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(null);
    try {
      const {error: resetError} = await createClient().auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/auth/callback?next=/reset-password/update`});
      if (resetError) setError("The reset request could not be sent. Check the configuration and try again."); else setSent(true);
    } catch { setError("Authentication is not configured for this deployment yet."); }
    finally { setBusy(false); }
  }
  return <div className="auth-shell"><section className="auth-card" aria-labelledby="reset-title">
    <div className="auth-eyebrow">Account recovery</div><h1 className="auth-title" id="reset-title">Reset your password.</h1>
    <p className="auth-copy">We’ll send a recovery link if this email address is registered.</p>
    {sent ? <p className="auth-success" role="status">Check your inbox for a password reset link.</p> : <form className="auth-form" onSubmit={submit}>
      <label className="auth-field">Email address<input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} /></label>
      {error && <p className="auth-alert" role="alert">{error}</p>}
      <button className="auth-submit" disabled={busy} type="submit">{busy ? "Sending…" : "Send reset link"}</button>
    </form>}
    <div className="auth-links"><Link href="/login">Back to login</Link></div>
  </section></div>;
}
