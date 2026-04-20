"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function formatUserLabel(user) {
  if (!user?.email) {
    return "Account";
  }

  return user.email;
}

export default function AuthSessionLinks() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    let mounted = true;

    async function loadUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(currentUser);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleSignOut() {
    setIsSigningOut(true);

    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
    router.replace("/");
    router.refresh();
    setIsSigningOut(false);
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-semibold text-gray-700 transition hover:text-black"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="text-sm font-semibold text-gray-700 transition hover:text-black"
      >
        Dashboard
      </Link>
      <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700">
        <User size={16} />
        <span className="max-w-40 truncate">{formatUserLabel(user)}</span>
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="text-sm font-semibold text-gray-700 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSigningOut ? "Signing out..." : "Logout"}
      </button>
    </div>
  );
}
