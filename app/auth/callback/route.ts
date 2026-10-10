import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_REDIRECTS = new Set(["/dashboard","/reset-password/update"]);
export async function GET(request: Request) {
  const {searchParams,origin} = new URL(request.url);
  const code = searchParams.get("code"); const requested = searchParams.get("next") ?? "/dashboard";
  const next = ALLOWED_REDIRECTS.has(requested) ? requested : "/dashboard";
  if (code) {
    try {
      const supabase = await createClient();
      const {error} = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL(next,origin));
    } catch { /* Return to a safe route if deployment auth is not configured. */ }
  }
  return NextResponse.redirect(new URL("/login?error=auth",origin));
}
