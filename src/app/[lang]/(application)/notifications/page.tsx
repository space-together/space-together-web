import { auth } from "@/auth";
import NotificationCard from "@/components/cards/notification-card";
import { Locale } from "@/i18n";
import { getSendUserRequestByUserId } from "@/services/data/send-user-request-data";
import { getUserById } from "@/services/data/user";
import { redirect } from "next/navigation";

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
      {getRequestNotifications &&
        getRequestNotifications.map(async (item) => {
          const getSender = await getUserById(item.senderId);
          if (!getSender) return <div key={item.id}>Ihagane</div>
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
              lang={lang}
            />
          );
        })}
    </div>
  );
};

export default NotificationsPage;
