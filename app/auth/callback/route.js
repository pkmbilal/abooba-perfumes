import { NextResponse } from "next/server";
import { getPostAuthRedirectPath } from "@/lib/auth/user-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";

  if (!next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (next === "/auth/redirect") {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        next = getPostAuthRedirectPath(user);
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isDevelopment = process.env.NODE_ENV === "development";

      if (isDevelopment) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
