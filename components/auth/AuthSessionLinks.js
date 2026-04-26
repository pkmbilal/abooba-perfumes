"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Shield, User } from "lucide-react";
import {
  ADMIN_DASHBOARD_PATH,
  DEFAULT_USER_DASHBOARD_PATH,
  isAdminUser,
} from "@/lib/auth/user-role";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatUserLabel(user) {
  const metadataName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.user_metadata?.display_name;

  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  if (user?.email) {
    return user.email.split("@")[0];
  }

  return "Account";
}

function getInitials(label) {
  const words = label
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean);

  return words.slice(0, 2).join("").toUpperCase() || "AP";
}

function getUserAvatarUrl(user) {
  const avatarUrl =
    user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture;

  return typeof avatarUrl === "string" ? avatarUrl : "";
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

  const userLabel = formatUserLabel(user);
  const userIsAdmin = isAdminUser(user);
  const avatarUrl = getUserAvatarUrl(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-3 text-sm font-medium text-stone-950 shadow-[0_12px_30px_-18px_rgba(28,25,23,0.55)] ring-1 ring-stone-200 transition hover:bg-stone-50 aria-expanded:bg-stone-50"
          />
        }
      >
        <span className="max-w-24 truncate">{userIsAdmin ? "Admin" : userLabel}</span>
        <Avatar size="sm">
          <AvatarImage src={avatarUrl} alt={userLabel} />
          <AvatarFallback>{getInitials(userLabel)}</AvatarFallback>
        </Avatar>
        <ChevronDown className="text-stone-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-white text-stone-950 shadow-[0_24px_60px_-32px_rgba(28,25,23,0.45)] ring-stone-200"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
          <DropdownMenuItem disabled>
            <User />
            <span className="truncate">{user.email ?? userLabel}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href={DEFAULT_USER_DASHBOARD_PATH} />}>
            <LayoutDashboard />
            User dashboard
          </DropdownMenuItem>
          {userIsAdmin ? (
            <DropdownMenuItem render={<Link href={ADMIN_DASHBOARD_PATH} />}>
              <Shield />
              Admin dashboard
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled={isSigningOut}
            onClick={handleSignOut}
            variant="destructive"
          >
            <LogOut />
            {isSigningOut ? "Signing out..." : "Logout"}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
