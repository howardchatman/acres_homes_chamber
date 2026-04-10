import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardRedirectPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Check user role from profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  const role = profile?.role ?? "member";

  if (role === "admin") redirect("/dashboard/admin");
  if (role === "vendor") redirect("/dashboard/vendor");
  redirect("/dashboard/member");
}
