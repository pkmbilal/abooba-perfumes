import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProfileTab from "@/components/dashboard/ProfileTab";
import AddressTab from "@/components/dashboard/AddressTab";
import FavoritesTab from "@/components/dashboard/FavoritesTab";
import {
  updateProfileAction,
  saveAddressAction,
  deleteAddressAction,
  removeFavoriteAction,
} from "@/app/dashboard/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard | Abooba Perfumes",
  description:
    "View your profile, saved addresses, and favorite fragrances from Abooba Perfumes.",
};

const DASHBOARD_TABS = {
  profile: "Profile",
  address: "Address",
  favorites: "Favorites",
};

function resolveActiveTab(tab) {
  if (!tab) {
    return "profile";
  }

  return Object.hasOwn(DASHBOARD_TABS, tab) ? tab : "profile";
}

function getProfileValue(profile, user, keys, fallback = "Not added yet") {
  for (const key of keys) {
    const value = profile?.[key] ?? user?.user_metadata?.[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

function buildProfileData(profile, user) {
  const fullName = getProfileValue(profile, user, [
    "full_name",
    "name",
    "fullName",
  ]);
  const phoneNumber = getProfileValue(profile, user, [
    "phone",
    "phone_number",
    "mobile",
  ]);
  const avatarUrl = getProfileValue(profile, user, ["avatar_url"], "");
  const dateOfBirth = getProfileValue(profile, user, ["date_of_birth"], "");
  const gender = getProfileValue(profile, user, ["gender"], "");

  return {
    fullName,
    email:
      user?.email ??
      getProfileValue(profile, user, ["email"], "Not added yet"),
    phoneNumber,
    avatarUrl: avatarUrl || "Not added yet",
    dateOfBirth: dateOfBirth || "Not added yet",
    gender: gender
      ? `${gender.charAt(0).toUpperCase()}${gender.slice(1)}`
      : "Not added yet",
    fullNameValue: fullName === "Not added yet" ? "" : fullName,
    phoneNumberValue: phoneNumber === "Not added yet" ? "" : phoneNumber,
    avatarUrlValue: avatarUrl,
    dateOfBirthValue: dateOfBirth,
    genderValue: gender,
  };
}

function normalizeAddresses(addresses) {
  if (!Array.isArray(addresses)) {
    return [];
  }

  return addresses.map((address) => ({
    id: address.id,
    label: address.label ?? "",
    recipientName: address.recipient_name ?? address.name ?? "",
    phone: address.phone ?? "",
    city: address.city ?? "",
    region: address.region ?? "",
    postalCode: address.postal_code ?? "",
    addressLine1: address.address_line_1 ?? "",
    addressLine2: address.address_line_2 ?? "",
    addressType: address.address_type ?? "shipping",
    isDefault: Boolean(address.is_default),
  }));
}

function normalizeFavorites(favorites) {
  if (!Array.isArray(favorites)) {
    return [];
  }

  return favorites
    .map((favorite) => {
      const product = Array.isArray(favorite.products)
        ? favorite.products[0]
        : favorite.products;

      if (!product) {
        return null;
      }

      return {
        id: favorite.product_id ?? product.id,
        product,
      };
    })
    .filter(Boolean);
}

async function getDashboardData(userId) {
  const supabase = await createSupabaseServerClient();

  const [{ data: profile, error: profileError }, { data: addresses, error: addressesError }, { data: favorites, error: favoritesError }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false }),
      supabase
        .from("favorites")
        .select(
          "product_id, created_at, products(id, name, slug, price, short_description, product_images(image_url, alt_text, is_primary, sort_order))",
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
    ]);

  return {
    profile,
    profileError,
    addresses: normalizeAddresses(addresses),
    addressesError,
    favorites: normalizeFavorites(favorites),
    favoritesError,
  };
}

function renderTabContent({
  activeTab,
  profileData,
  emailConfirmed,
  addresses,
  addressesError,
  favorites,
  favoritesError,
}) {
  if (activeTab === "address") {
    return (
      <AddressTab
        addresses={addresses}
        errorMessage={addressesError?.message}
        deleteAddressAction={deleteAddressAction}
        saveAddressAction={saveAddressAction}
      />
    );
  }

  if (activeTab === "favorites") {
    return (
      <FavoritesTab
        favorites={favorites}
        errorMessage={favoritesError?.message}
        removeFavoriteAction={removeFavoriteAction}
      />
    );
  }

  return (
      <ProfileTab
      profile={profileData}
      emailConfirmed={emailConfirmed}
      updateProfileAction={updateProfileAction}
    />
  );
}

export default async function DashboardPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const activeTab = resolveActiveTab(resolvedSearchParams?.tab);
  const { profile, profileError, addresses, addressesError, favorites, favoritesError } =
    await getDashboardData(user.id);
  const profileData = buildProfileData(profile, user);

  const shopperName =
    profileData.fullName !== "Not added yet"
      ? profileData.fullName
      : user.email?.split("@")[0] ?? "Perfume lover";

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-10rem)] bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.16),_transparent_30%),linear-gradient(180deg,_#f7f7f5_0%,_#ecfeff_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-stone-200/90 bg-white/80 p-5 shadow-[0_28px_100px_-52px_rgba(15,118,110,0.38)] backdrop-blur sm:p-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-teal-700">
                Account dashboard
              </p>
              <h1 className="mt-4 font-[family:var(--font-dashboard-heading)] text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                Welcome back, {shopperName}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
                Manage your profile details, saved delivery addresses, and
                favorite fragrances from one elegant space.
              </p>
            </div>

            {profileError?.message ? (
              <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                We could not load some profile details right now. Your account
                session is still active, and the dashboard will use Supabase auth
                details where possible.
              </div>
            ) : null}

            <div className="mt-8 grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
              <DashboardSidebar activeTab={activeTab} tabs={DASHBOARD_TABS} />
              <div className="min-w-0">
                {renderTabContent({
                  activeTab,
                  profileData,
                  emailConfirmed: Boolean(user.email_confirmed_at),
                  addresses,
                  addressesError,
                  favorites,
                  favoritesError,
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
