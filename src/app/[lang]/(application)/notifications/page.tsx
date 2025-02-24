import { auth } from "@/auth";
import NotificationCard from "@/components/cards/notification-card";
import NotificationCardError from "@/components/cards/notification-card-error";
import { Locale } from "@/i18n";
import { getClassById } from "@/services/data/class-data";
import { getSendUserRequestByUserId } from "@/services/data/send-user-request-data";
import { getUserById } from "@/services/data/user";
import { redirect } from "next/navigation";
import { Class } from "../../../../../prisma/prisma/generated";
import NotFoundItemsPage from "@/components/page/not-found-items-page";

interface props {
  params: Promise<{ lang: Locale }>;
}

const NotificationsPage = async (props: props) => {
  const params = await props.params;
  const { lang } = params;
  const user = (await auth())?.user;
  if (!user?.id) {
    return redirect(`/${lang}/auth/login`);
  }
  const getRequestNotifications = await getSendUserRequestByUserId(user.id);
  return (
    <div className=" happy-page">
      <h2 className=" happy-title-head">Notifications</h2>
      <div className=" space-y-2">
        {!getRequestNotifications || getRequestNotifications.length === 0 ? (
          <NotFoundItemsPage description={"No notifications available"} />
        ) : (
          getRequestNotifications.map(async (item) => {
            const getSender = await getUserById(item.senderId);
            if (!getSender) return <NotificationCardError key={item.id} />;
            let getClass: Class | null = null;
            if (!!item.class_id) {
              getClass = await getClassById(item.class_id);
            }
            return (
              <NotificationCard
                sender={getSender}
                key={item.id}
                user={{
                  ...user,
                  name: user.name ?? "",
                  email: user.email ?? undefined,
                  image: user.image ?? undefined,
                }}
                getClass={getClass}
                notification={item}
                lang={lang}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
