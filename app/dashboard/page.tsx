import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/auth/SignOutButton";

export const metadata = { title: "Private workspace" };
export default async function DashboardPage() {
  const supabase = await createClient();
  const {data,error} = await supabase.auth.getUser();
  if (error || !data.user) redirect("/login");
  return <div className="page-shell shell narrow-page">
    <div className="page-hero"><div className="eyebrow"><span className="eyebrow-line" /> PRIVATE WORKSPACE</div><h1>Your research.<br /><em>Your working notes.</em></h1><p className="page-lede">Signed in as {data.user.email ?? "authenticated user"}.</p></div>
    <section className="workspace-card"><h2>Workspace foundation</h2><p className="auth-copy">Private notes, bookmarks, and saved simulations have per-user RLS tables in the migration. Their CRUD screens are the next implementation slice; this page currently provides a protected session workspace.</p><Link className="inline-link" href="/cases">Return to public case studies ↗</Link><div style={{marginTop:"1.25rem"}}><SignOutButton /></div></section>
  </div>;
}
