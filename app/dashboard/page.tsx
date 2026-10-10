import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/auth/SignOutButton";

export const metadata = { title: "Private workspace" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="page-shell shell narrow-page">
        <div className="page-hero">
          <div className="eyebrow"><span className="eyebrow-line" /> PRIVATE WORKSPACE</div>
          <h1>Workspace setup<br /><em>is required.</em></h1>
          <p className="page-lede">Sign-in is temporarily unavailable because this deployment has not been connected to Supabase.</p>
        </div>
        <section className="workspace-card" role="status">
          <h2>Connect Supabase to continue</h2>
          <p className="auth-copy">Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in the deployment environment, then redeploy to enable the private workspace.</p>
          <Link className="inline-link" href="/cases">Return to public case studies ↗</Link>
        </section>
      </div>
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect("/login");

  return <div className="page-shell shell narrow-page">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> PRIVATE WORKSPACE</div><h1>Your research.<br /><em>Your working notes.</em></h1><p className="page-lede">Signed in as {data.user.email ?? "authenticated user"}.</p></div>
    <section className="workspace-card"><h2>Workspace foundation</h2><p className="auth-copy">Private notes, bookmarks, and saved simulations have per-user RLS tables in the migration. Their CRUD screens are the next implementation slice; this page currently provides a protected session workspace.</p><Link className="inline-link" href="/cases">Return to public case studies ↗</Link><div style={{ marginTop: "1.25rem" }}><SignOutButton /></div></section>
  </div>;
}

