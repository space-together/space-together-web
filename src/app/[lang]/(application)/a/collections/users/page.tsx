import DisplaySwitcher from "@/components/display/display-switcher";
import UserCardContent from "@/components/page/admin/users/user-card-contents";
import UserCollectionDetails from "@/components/page/admin/users/user-collection-details";
import UsersFilter from "@/components/page/admin/users/users-filter";
import UsersTableCollection from "@/components/page/admin/users/usersTableCollection";
import type { Locale } from "@/i18n";
import { LIMIT } from "@/lib/env";
import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";
import type { PaginatedUsers } from "@/lib/schema/relations-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import type { UserStats } from "@/lib/types/User-stats";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Users - collection",
  description: "All users in database",
};

const UserPageCollection = async (
  props: PageProps<"/[lang]/a/collections/users">,
) => {
  const auth = await authContext();
  const { lang } = await props.params;
  if (!auth) redirect("/auth/login");

  // Run requests in parallel
  const [usersRequest, statsRequest] = await Promise.all([
    apiRequest<void, PaginatedUsers>(
      "get",
      `/users?limit=${LIMIT}`,
      undefined,
      {
        token: auth.token,
        realtime: "user",
      },
    ),
    apiRequest<void, UserStats>("get", "/users/stats", undefined, {
      token: auth.token,
      realtime: "user",
    }),
  ]);

  return (
    <RealtimeProvider<UserModel>
      channels={[
        { name: "user", initialData: usersRequest?.data?.users ?? [] },
      ]}
      context="global"
      authToken={auth.token}
    >
      <div className="happy-page space-y-4">
        {statsRequest.data && (
          <UserCollectionDetails stats={statsRequest.data} />
        )}
        <UsersFilter auth={auth} users={usersRequest.data} />
        <DisplaySwitcher
          table={
            <UsersTableCollection
              auth={auth}
              users={usersRequest.data?.users ?? []}
              lang={lang as Locale}
            />
          }
          cards={
            <UserCardContent
              lang={lang as Locale}
              auth={auth}
              data={usersRequest.data?.users ?? []}
            />
          }
        />
      </div>
    </RealtimeProvider>
  );
};

export default UserPageCollection;
