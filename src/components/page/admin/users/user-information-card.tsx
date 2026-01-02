"use client";

import MyAvatar from "@/components/common/image/my-avatar";
import { OpenImages } from "@/components/common/image/open-images";
import UserDisableDialog from "@/components/page/admin/documentId/users/user-disable-dialog";
import DeleteUserDialog from "@/components/page/admin/users/deleteUserDialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRealtimeData } from "@/lib/providers/RealtimeProvider";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { calculateAge, formatReadableDate } from "@/lib/utils/format-date";
import { useEffect, useState } from "react";

interface PropsUser {
  auth: AuthContext;
  initialUser: UserModel;
}

const UserInformation = ({ auth, initialUser }: PropsUser) => {
  const { data } = useRealtimeData<UserModel>("user");
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (!data?.length) return;
    const updated = data.find((u) => u._id === initialUser._id);
    if (updated) setUser(updated);
  }, [data, initialUser._id]);

  const birthDate =
    user.age && new Date(user.age.year, user.age.month - 1, user.age.day);

  return (
    <section className="flex flex-col gap-4 lg:flex-row">
      {/* Avatar */}
      {user.image && (
        <OpenImages
          images={[user.image]}
          component={
            <MyAvatar
              type="squircle"
              src={user.image}
              size="2xl"
              classname="object-cover"
            />
          }
        />
      )}

      {/* Content */}
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {user.name && <h4 className="h4">{user.name}</h4>}
            {user.username && (
              <p className="text-xl font-normal opacity-80">@{user.username}</p>
            )}

            <div className="ml-4 flex gap-3">
              <Button
                library="daisy"
                variant="ghost"
                size="sm"
                role="update"
                href={`/a/collections/users/${user.username}/edit`}
              >
                Edit
              </Button>

              <UserDisableDialog isIcon user={user} auth={auth} />
              <DeleteUserDialog isIcon user={user} auth={auth} />
            </div>
          </div>

          {user.bio && <p className="text-sm">{user.bio}</p>}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
          {user.email && (
            <div className="flex gap-2">
              <span>Email:</span>
              <p className="font-medium">{user.email}</p>
            </div>
          )}

          {user.phone && (
            <div className="flex gap-2">
              <span>Phone:</span>
              <p className="font-medium">{user.phone}</p>
            </div>
          )}

          {user.role && (
            <div className="flex gap-2">
              <span>Role:</span>
              <p className="capitalize font-medium">{user.role}</p>
            </div>
          )}

          {user.gender && (
            <div className="flex gap-2">
              <span>Gender:</span>
              <p className="font-medium">{user.gender}</p>
            </div>
          )}

          {birthDate && (
            <div className="flex gap-2 items-center">
              <span>Age:</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="cursor-pointer font-medium">
                      {calculateAge(user.age)} years
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    Born on{" "}
                    {birthDate.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          {user.address && (
            <div className="flex gap-2 col-span-full">
              <span>Address:</span>
              <p className="font-medium">
                {[
                  user.address.village,
                  user.address.cell,
                  user.address.sector,
                  user.address.district,
                  user.address.province,
                  user.address.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}

          {typeof user.disable === "boolean" && (
            <div className="flex gap-2 items-center">
              <span>Status:</span>
              <p className="font-medium">
                {user.disable ? "DISABLED" : "ACTIVE"}
              </p>
              <span
                className={cn(
                  "size-3 rounded-full",
                  user.disable ? "bg-error" : "bg-success",
                )}
              />
            </div>
          )}

          {user.created_at && (
            <div className="flex gap-2">
              <span>Created:</span>
              <p className="font-medium">
                {formatReadableDate(user.created_at)}
              </p>
            </div>
          )}

          {user.updated_at && (
            <div className="flex gap-2">
              <span>Updated:</span>
              <p className="font-medium">
                {formatReadableDate(user.updated_at)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserInformation;
