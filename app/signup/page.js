import { redirect } from "next/navigation";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import AuthForm from "@/components/auth/AuthForm";
import { poppins } from "@/components/home/home-fonts";
import { getPostAuthRedirectPath } from "@/lib/auth/user-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Sign Up | Abooba Perfumes",
  description: "Create your Abooba Perfumes account.",
};

export default async function SignupPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(getPostAuthRedirectPath(user));
  }

  return (
    <>
      <Header />
      <main
        className={`${poppins.className} flex min-h-[calc(100vh-10rem)] items-center justify-center bg-[radial-gradient(circle_at_18%_12%,rgba(12,109,96,0.24),transparent_32%),radial-gradient(circle_at_88%_4%,rgba(216,187,130,0.14),transparent_28%),linear-gradient(180deg,#07131d_0%,#06131d_64%,#081119_100%)] px-6 pb-16 pt-28 text-white sm:pt-32`}
      >
        <AuthForm mode="signup" />
      </main>
      <Footer />
    </>
  );
}
