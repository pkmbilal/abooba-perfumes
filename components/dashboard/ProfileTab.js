import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader";
import ProfileEditForm from "@/components/dashboard/ProfileEditForm";
import { Cake, Image as ImageIcon, Mail, Phone, UserRound, VenusAndMars } from "lucide-react";

function ProfileField({ icon: Icon, label, value }) {
  return (
    <article className="rounded-[1.5rem] border border-stone-200 bg-stone-50/70 p-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-teal-700 shadow-sm">
          <Icon size={18} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">
            {label}
          </p>
          <p className="mt-2 text-base font-medium text-stone-950">{value}</p>
        </div>
      </div>
    </article>
  );
}

export default function ProfileTab({
  profile,
  emailConfirmed,
  updateProfileAction,
}) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_-50px_rgba(15,118,110,0.35)] sm:p-8">
      <DashboardSectionHeader
        eyebrow="Profile"
        title="Your account details"
        description="Review your account details and keep your profile information ready for future orders and account features."
        action={
          <ProfileEditForm
            profile={profile}
            updateProfileAction={updateProfileAction}
          />
        }
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ProfileField
          icon={UserRound}
          label="Full name"
          value={profile.fullName}
        />
        <ProfileField icon={Mail} label="Email" value={profile.email} />
        <ProfileField
          icon={Phone}
          label="Phone number"
          value={profile.phoneNumber}
        />
        <ProfileField
          icon={ImageIcon}
          label="Avatar URL"
          value={profile.avatarUrl}
        />
        <ProfileField
          icon={Cake}
          label="Date of birth"
          value={profile.dateOfBirth}
        />
        <ProfileField
          icon={VenusAndMars}
          label="Gender"
          value={profile.gender}
        />
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-[linear-gradient(135deg,_rgba(240,253,250,0.9),_rgba(248,250,252,0.95))] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">
          Account status
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            Authenticated
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
            {emailConfirmed ? "Email confirmed" : "Email confirmation pending"}
          </span>
        </div>
      </div>
    </section>
  );
}
