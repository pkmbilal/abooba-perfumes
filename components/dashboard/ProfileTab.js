import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader";
import ProfileEditForm from "@/components/dashboard/ProfileEditForm";
import { Cake, Image as ImageIcon, Mail, Phone, UserRound, VenusAndMars } from "lucide-react";

function ProfileField({ icon: Icon, label, value }) {
  return (
    <article className="theme-chip rounded-[1.5rem] border p-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#d8bb82] text-[#0f1720] shadow-sm">
          <Icon size={18} />
        </span>
        <div>
          <p className="theme-muted text-xs font-semibold uppercase tracking-[0.26em]">
            {label}
          </p>
          <p className="theme-heading mt-2 text-base font-medium">{value}</p>
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
    <section className="theme-panel rounded-[1.75rem] border p-6 sm:p-8">
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
          label="Profile image"
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

      <div className="theme-chip mt-6 rounded-[1.5rem] border p-5">
        <p className="theme-muted text-xs font-semibold uppercase tracking-[0.26em]">
          Account status
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">
            Authenticated
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
            {emailConfirmed ? "Email confirmed" : "Email confirmation pending"}
          </span>
        </div>
      </div>
    </section>
  );
}
