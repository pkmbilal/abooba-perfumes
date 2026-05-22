import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPostAuthRedirectPath } from "@/lib/auth/user-role";

export default async function AuthRedirectPage() {
  let user = null;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    user = authUser;
  } catch {
    user = null;
  }

  if (!user) {
    redirect("/login");
  }

  redirect(getPostAuthRedirectPath(user));
}
