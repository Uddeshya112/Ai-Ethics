"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  return <button className="auth-submit" type="button" onClick={async () => {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  }}>Sign out</button>;
}
