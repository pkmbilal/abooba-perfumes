"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  buildAuthCallbackUrl,
  POST_AUTH_REDIRECT,
} from "@/lib/auth/redirects";
import { montserrat } from "@/components/home/home-fonts";
import { getPostAuthRedirectPath } from "@/lib/auth/user-role";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const AUTH_COPY = {
  login: {
    eyebrow: "Welcome back",
    title: "Sign in to your account",
    description:
      "Access your saved session and continue exploring premium fragrances.",
    buttonLabel: "Sign in",
    alternatePrompt: "New to Abooba Perfumes?",
    alternateHref: "/signup",
    alternateLabel: "Create an account",
    loadingLabel: "Signing in...",
    successLabel: "Signed in successfully. Redirecting to your dashboard...",
  },
  signup: {
    eyebrow: "Create your account",
    title: "Join Abooba Perfumes",
    description:
      "Save your session now so future account features and checkout flows are ready for you.",
    buttonLabel: "Create account",
    alternatePrompt: "Already have an account?",
    alternateHref: "/login",
    alternateLabel: "Sign in here",
    loadingLabel: "Creating account...",
    successLabel:
      "Account created. Check your email to confirm your address if verification is enabled.",
  },
};

function getErrorMessage(error) {
  if (!error?.message) {
    return "Something went wrong. Please try again.";
  }

  if (error.message.toLowerCase().includes("email not confirmed")) {
    return "Your email address has not been confirmed yet. Please check your inbox.";
  }

  return error.message;
}

export default function AuthForm({ mode, errorCode = "" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const copy = AUTH_COPY[mode];
  const callbackErrorMessage =
    errorCode === "auth_callback_failed"
      ? "We could not complete email confirmation. Please try signing in again."
      : "";

  async function handleSubmit(event) {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage("");
    setSuccessMessage("");

    const supabase = createSupabaseBrowserClient();

    if (mode === "signup") {
      const redirectTo =
        typeof window === "undefined"
          ? undefined
          : buildAuthCallbackUrl(window.location.origin);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: redirectTo
          ? {
              emailRedirectTo: redirectTo,
            }
          : undefined,
      });

      if (error) {
        setErrorMessage(getErrorMessage(error));
        setIsPending(false);
        return;
      }

      setSuccessMessage(copy.successLabel);
      setPassword("");
      setIsPending(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(getErrorMessage(error));
      setIsPending(false);
      return;
    }

    setSuccessMessage(copy.successLabel);
    router.replace(getPostAuthRedirectPath(data.user) || POST_AUTH_REDIRECT);
    router.refresh();
  }

  return (
    <section className="theme-panel w-full max-w-md rounded-[2rem] border p-8 backdrop-blur sm:p-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8bb82]">
          {copy.eyebrow}
        </p>
        <h1
          className={`${montserrat.className} theme-heading text-3xl font-semibold tracking-tight`}
        >
          {copy.title}
        </h1>
        <p className="theme-muted text-sm leading-6">{copy.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${mode}-email`}
            className="theme-text text-sm font-medium"
          >
            Email address
          </label>
          <input
            id={`${mode}-email`}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="theme-input w-full rounded-2xl border px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-[#d8bb82]/60 focus:ring-2 focus:ring-[#d8bb82]/20"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor={`${mode}-password`}
            className="theme-text text-sm font-medium"
          >
            Password
          </label>
          <input
            id={`${mode}-password`}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={6}
            className="theme-input w-full rounded-2xl border px-4 py-3 text-sm outline-none transition placeholder:text-slate-500 focus:border-[#d8bb82]/60 focus:ring-2 focus:ring-[#d8bb82]/20"
            placeholder="Minimum 6 characters"
          />
        </div>

        {errorMessage || callbackErrorMessage ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage || callbackErrorMessage}
          </p>
        ) : null}

        {successMessage ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-5 py-3 text-sm font-semibold text-[#0f1720] shadow-[0_18px_40px_-22px_rgba(216,187,130,0.85)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? copy.loadingLabel : copy.buttonLabel}
        </button>
      </form>

      <p className="theme-muted mt-6 text-sm">
        {copy.alternatePrompt}{" "}
        <Link
          href={copy.alternateHref}
          className="font-semibold text-[#e3c995] underline decoration-[#d8bb82]/30 underline-offset-4 transition hover:decoration-[#d8bb82]"
        >
          {copy.alternateLabel}
        </Link>
      </p>
    </section>
  );
}
