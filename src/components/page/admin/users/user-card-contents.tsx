"use client";
import { UserCard } from "@/components/cards/user-card";
import type { Locale } from "@/i18n";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { useEffect, useState } from "react";

interface UserCardContentProps {
  lang: Locale;
  auth: AuthContext;
  data: UserModel[];
  className?: string;
}

const UserCardContent = ({
  lang,
  auth,
  data,
  className,
}: UserCardContentProps) => {
  const { data: currentUser } = useRealtimeData<UserModel>("user");
  const [displayUsers, setDisplayUsers] = useState<UserModel[]>(data);

  useEffect(() => {
    if (currentUser && currentUser.length > 0) {
      setDisplayUsers(currentUser);
    }
  }, [currentUser]);

  return (
    <main className={cn(" grid grid-cols-1 gap-4 lg:grid-cols-2", className)}>
      {displayUsers.map((user) => {
        return (
          <UserCard
            key={user._id || user.username}
            lang={lang}
            auth={auth}
            user={user}
          />
        );
      })}
    </main>
  );
};

export default UserCardContent;
