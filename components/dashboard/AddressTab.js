import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader";
import AddressFormModal from "@/components/dashboard/AddressFormModal";
import { MapPinned, Trash2 } from "lucide-react";

function EmptyState({ saveAddressAction }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50/80 px-6 py-12 text-center">
      <div>
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-teal-700 shadow-sm">
          <MapPinned size={22} />
        </div>
        <h3 className="mt-5 font-[family:var(--font-dashboard-heading)] text-xl font-semibold text-stone-950">
          Nothing here yet
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-stone-600">
          You do not have any saved addresses right now. Add one to make future
          delivery and checkout flows faster.
        </p>
        <div className="mt-6 flex justify-center">
          <AddressFormModal saveAddressAction={saveAddressAction} />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ children, variant = "secondary", type = "button" }) {
  const classes =
    variant === "danger"
      ? "border-rose-200 text-rose-700 hover:border-rose-300 hover:bg-rose-50"
      : "border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50";

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition ${classes}`}
    >
      {children}
    </button>
  );
}

export default function AddressTab({
  addresses,
  errorMessage,
  deleteAddressAction,
  saveAddressAction,
}) {
  const safeAddresses = Array.isArray(addresses) ? addresses : [];

  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_-50px_rgba(15,118,110,0.35)] sm:p-8">
      <DashboardSectionHeader
        eyebrow="Address"
        title="Saved delivery addresses"
        description="Review the addresses linked to your account and keep a default location ready for faster orders."
        action={<AddressFormModal saveAddressAction={saveAddressAction} />}
      />

      {errorMessage ? (
        <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          We could not load your saved addresses right now. Please try again in a
          moment.
        </div>
      ) : null}

      <div className="mt-6">
        {safeAddresses.length === 0 ? (
          <EmptyState saveAddressAction={saveAddressAction} />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {safeAddresses.map((address) => (
              <article
                key={address.id}
                className="rounded-[1.6rem] border border-stone-200 bg-stone-50/65 p-5 transition hover:border-teal-100 hover:shadow-[0_18px_45px_-32px_rgba(15,118,110,0.35)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">
                      {address.recipientName || "Not added yet"}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-stone-600">
                      <span>{address.phone || "Not added yet"}</span>
                      {address.label ? (
                        <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-stone-700">
                          {address.label}
                        </span>
                      ) : null}
                      {address.addressType ? (
                        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-sky-800">
                          {address.addressType}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {address.isDefault ? (
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                      Default
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 space-y-2 text-sm leading-7 text-stone-700">
                  <p>{address.addressLine1 || "Not added yet"}</p>
                  {address.addressLine2 ? <p>{address.addressLine2}</p> : null}
                  <p>
                    {[address.city, address.region, address.postalCode]
                      .filter(Boolean)
                      .join(", ") || "Not added yet"}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <AddressFormModal
                    address={address}
                    saveAddressAction={saveAddressAction}
                  />

                  <form action={deleteAddressAction}>
                    <input type="hidden" name="addressId" value={address.id} />
                    <ActionButton variant="danger" type="submit">
                      <span className="inline-flex items-center gap-2">
                        <Trash2 size={15} />
                        <span>Delete</span>
                      </span>
                    </ActionButton>
                  </form>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
