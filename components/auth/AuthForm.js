"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  buildAuthCallbackUrl,
  POST_AUTH_REDIRECT,
} from "@/lib/auth/redirects";
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(getErrorMessage(error));
      setIsPending(false);
      return;
    }

    setSuccessMessage(copy.successLabel);
    router.replace(POST_AUTH_REDIRECT);
    router.refresh();
  }

  return (
    <section className="w-full max-w-md rounded-[2rem] border border-stone-200 bg-white/90 p-8 shadow-[0_24px_80px_-40px_rgba(12,10,9,0.35)] backdrop-blur sm:p-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">
          {copy.eyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-950">
          {copy.title}
        </h1>
        <p className="text-sm leading-6 text-stone-600">{copy.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label
            htmlFor={`${mode}-email`}
            className="text-sm font-medium text-stone-700"
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
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`${mode}-password`}
            className="text-sm font-medium text-stone-700"
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
            className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
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
          className="inline-flex w-full items-center justify-center rounded-2xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? copy.loadingLabel : copy.buttonLabel}
        </button>
      </form>

      <p className="mt-6 text-sm text-stone-600">
        {copy.alternatePrompt}{" "}
        <Link
          href={copy.alternateHref}
          className="font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-950"
        >
          {copy.alternateLabel}
        </Link>
      </p>
    </section>
  );
}
