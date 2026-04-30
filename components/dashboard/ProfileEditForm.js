"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { PencilLine, Upload, X } from "lucide-react";

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
      className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8bb82_0%,#b88942_100%)] px-5 py-3 text-sm font-semibold text-[#0f1720] shadow-[0_18px_40px_-22px_rgba(216,187,130,0.85)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
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
          className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          <PencilLine size={16} />
          <span>Edit Profile</span>
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
        className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_18%_12%,rgba(12,109,96,0.28),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(216,187,130,0.18),transparent_30%),linear-gradient(180deg,rgba(7,19,29,0.74)_0%,rgba(6,19,29,0.88)_100%)] backdrop-blur-2xl"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(216,187,130,0.08)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#07131d] text-white shadow-[0_36px_120px_-48px_rgba(0,0,0,0.95)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.12),_transparent_55%),linear-gradient(180deg,#0b1c29_0%,#07131d_100%)] px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8bb82]">
              Edit profile
            </p>
            <h3 className="mt-3 font-[family:var(--font-dashboard-heading)] text-2xl font-semibold tracking-tight text-white">
              Update your account details
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Keep your personal details current so future account, delivery,
              and wishlist experiences feel smoother.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsEditing(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-slate-300 transition hover:border-[#d8bb82]/35 hover:bg-white/12 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <form action={formAction} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="dashboard-full-name"
                  className="text-sm font-medium text-slate-200"
                >
                  Full name <span className="text-red-600">*</span>
                </label>
                <input
                  id="dashboard-full-name"
                  name="fullName"
                  type="text"
                  required
                  defaultValue={fullNameValue}
                  className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#d8bb82]/60 focus:ring-2 focus:ring-[#d8bb82]/20"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="dashboard-email"
                  className="text-sm font-medium text-slate-200"
                >
                  Email address
                </label>
                <input
                  id="dashboard-email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400 outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="dashboard-phone-number"
                  className="text-sm font-medium text-slate-200"
                >
                  Phone number
                </label>
                <input
                  id="dashboard-phone-number"
                  name="phoneNumber"
                  type="tel"
                  defaultValue={phoneValue}
                  className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#d8bb82]/60 focus:ring-2 focus:ring-[#d8bb82]/20"
                  placeholder="Add your phone number"
                />
              </div>

              <div className="flex flex-col gap-3 sm:col-span-2">
                <input
                  type="hidden"
                  name="currentAvatarUrl"
                  value={avatarUrlValue}
                />
                <label
                  htmlFor="dashboard-avatar-image"
                  className="text-sm font-medium text-slate-200"
                >
                  Profile image
                </label>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(216,187,130,0.2),_transparent_44%),linear-gradient(135deg,_#11313b_0%,_#07131d_65%,_#0f1720_100%)] text-sm font-semibold text-[#d8bb82]">
                      {avatarUrlValue ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={avatarUrlValue}
                          alt={`${profile.fullName || "User"} profile`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        "AP"
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="relative">
                        <Upload
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#d8bb82]"
                        />
                        <input
                          id="dashboard-avatar-image"
                          name="avatarImage"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="w-full cursor-pointer rounded-2xl border border-white/12 bg-white/8 px-4 py-3 pl-11 text-sm text-slate-300 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-[#d8bb82] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#0f1720] hover:border-[#d8bb82]/35 focus:border-[#d8bb82]/60 focus:ring-2 focus:ring-[#d8bb82]/20"
                        />
                      </div>
                      <p className="mt-3 text-xs leading-6 text-slate-400">
                        Choose a JPG, PNG, or WebP image up to 5 MB. It will be
                        stored in the user profile images bucket.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="dashboard-date-of-birth"
                  className="text-sm font-medium text-slate-200"
                >
                  Date of birth
                </label>
                <input
                  id="dashboard-date-of-birth"
                  name="dateOfBirth"
                  type="date"
                  defaultValue={dateOfBirthValue}
                  className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition focus:border-[#d8bb82]/60 focus:ring-2 focus:ring-[#d8bb82]/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="dashboard-gender"
                  className="text-sm font-medium text-slate-200"
                >
                  Gender
                </label>
                <select
                  id="dashboard-gender"
                  name="gender"
                  defaultValue={genderValue}
                  className="w-full rounded-2xl border border-white/12 bg-[#102331] px-4 py-3 text-sm text-white outline-none transition focus:border-[#d8bb82]/60 focus:ring-2 focus:ring-[#d8bb82]/20"
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

            <div className="flex flex-wrap gap-3 border-t border-white/10 pt-5">
              <SaveButton />
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#d8bb82]/35 hover:bg-white/10 hover:text-white"
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
