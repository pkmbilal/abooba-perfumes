"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { X } from "lucide-react";

const INITIAL_STATE = {
  status: "idle",
  message: "",
};

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

export default function ProfileEditForm({ profile, updateProfileAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction] = useActionState(
    updateProfileAction,
    INITIAL_STATE,
  );
  const previousStatusRef = useRef(state.status);

  const fullNameValue = state.fieldValues?.fullName ?? profile.fullNameValue;
  const phoneValue =
    state.fieldValues?.phoneNumber ?? profile.phoneNumberValue;
  const avatarUrlValue =
    state.fieldValues?.avatarUrl ?? profile.avatarUrlValue;
  const dateOfBirthValue =
    state.fieldValues?.dateOfBirth ?? profile.dateOfBirthValue;
  const genderValue = state.fieldValues?.gender ?? profile.genderValue;
  const showEditor = isEditing;

  useEffect(() => {
    const previousStatus = previousStatusRef.current;

    if (
      isEditing &&
      previousStatus !== "success" &&
      state.status === "success"
    ) {
      startTransition(() => {
        setIsEditing(false);
      });
    }

    previousStatusRef.current = state.status;
  }, [isEditing, state.status]);

  useEffect(() => {
    if (!showEditor) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsEditing(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showEditor]);

  if (!showEditor) {
    return (
      <div className="space-y-3">
        {state.status === "success" ? (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {state.message}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-50"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close profile editor"
        onClick={() => setIsEditing(false)}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.42),rgba(236,253,245,0.3))] backdrop-blur-xl"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[10%] h-48 w-48 rounded-full bg-teal-200/25 blur-3xl" />
        <div className="absolute bottom-[14%] right-[10%] h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.3),transparent_40%,rgba(255,255,255,0.12)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_36px_120px_-48px_rgba(15,118,110,0.3)]">
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_55%),linear-gradient(180deg,_#fcfffe_0%,_#f8fafc_100%)] px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
              Edit profile
            </p>
            <h3 className="mt-3 font-[family:var(--font-dashboard-heading)] text-2xl font-semibold tracking-tight text-stone-950">
              Update your account details
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
              Keep your personal details current so future account, delivery,
              and wishlist experiences feel smoother.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsEditing(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition hover:border-stone-300 hover:bg-stone-50 hover:text-stone-950"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <form action={formAction} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="dashboard-full-name"
                  className="text-sm font-medium text-stone-700"
                >
                  Full name <span className="text-red-600">*</span>
                </label>
                <input
                  id="dashboard-full-name"
                  name="fullName"
                  type="text"
                  required
                  defaultValue={fullNameValue}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dashboard-email"
                  className="text-sm font-medium text-stone-700"
                >
                  Email address
                </label>
                <input
                  id="dashboard-email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 text-sm text-stone-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dashboard-phone-number"
                  className="text-sm font-medium text-stone-700"
                >
                  Phone number
                </label>
                <input
                  id="dashboard-phone-number"
                  name="phoneNumber"
                  type="tel"
                  defaultValue={phoneValue}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  placeholder="Add your phone number"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="dashboard-avatar-url"
                  className="text-sm font-medium text-stone-700"
                >
                  Avatar URL
                </label>
                <input
                  id="dashboard-avatar-url"
                  name="avatarUrl"
                  type="url"
                  defaultValue={avatarUrlValue}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dashboard-date-of-birth"
                  className="text-sm font-medium text-stone-700"
                >
                  Date of birth
                </label>
                <input
                  id="dashboard-date-of-birth"
                  name="dateOfBirth"
                  type="date"
                  defaultValue={dateOfBirthValue}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dashboard-gender"
                  className="text-sm font-medium text-stone-700"
                >
                  Gender
                </label>
                <select
                  id="dashboard-gender"
                  name="gender"
                  defaultValue={genderValue}
                  className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {state.status === "error" ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {state.message || "We could not update your profile right now."}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-5">
              <SaveButton />
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
