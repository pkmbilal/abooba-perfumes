import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPostAuthRedirectPath } from "@/lib/auth/user-role";

export default async function AuthRedirectPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  redirect(getPostAuthRedirectPath(user));
}
