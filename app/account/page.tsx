// app/account/page.tsx

import CustomerPortalForm from "@/components/ui/AccountForms/CustomerPortalForm";
import EmailForm from "@/components/ui/AccountForms/EmailForm";
import NameForm from "@/components/ui/AccountForms/NameForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getUserDetails, getSubscription, getUser } from "@/utils/supabase/queries";

export default async function Account() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase),
  ]);

  // Check if user is authenticated
  if (!user) {
    return redirect("/signin");
  }

  return (
    <section className="mb-32 bg-black">
      {/* Account page content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4">
        <CustomerPortalForm subscription={subscription} />
        <NameForm userName={userDetails?.full_name ?? ""} />
        <EmailForm userEmail={user.email} />
      </div>
    </section>
  );
}