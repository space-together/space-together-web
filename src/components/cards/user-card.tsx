import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { Gender } from "@/lib/schema/common-details-schema";
import type { UserModel } from "@/lib/schema/user/user-schema";
import { cn } from "@/lib/utils";
import type { AuthContext } from "@/lib/utils/auth-context";
import { calculateAge } from "@/lib/utils/format-date";
import MyAvatar, { type MyAvatarProps } from "../common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "../common/myLink";

export interface UserSmCardProps {
  name: string;
  image?: string | null;
  link?: string;
  gender?: Gender | null;
  role?: string;
  date?: string;
  subjects?: string[];
  showMessage?: boolean;
  showModify?: boolean;
  className?: string;
  classname?: string;
  onlyImage?: boolean;
  onlyName?: boolean;
  avatarProps?: MyAvatarProps;
  nameClassname?: string;
  lang?: Locale;
}

export const UserSmCard = ({
  name,
  image,
  gender,
  link,
  role,
  date,
  subjects,
  showMessage,
  showModify,
  className,
  classname,
  onlyImage,
  onlyName,
  nameClassname,
  avatarProps = {
    size: "sm",
  },
}: UserSmCardProps) => {
  const Image = <MyAvatar {...avatarProps} src={image} alt={name} />;

  if (onlyName) {
    return (
      <div className={cn(className)}>
        <p title={name} className={cn(" gap-2 leading-4", nameClassname)}>
          {name}
        </p>
      </div>
    );
  }

  if (onlyImage) {
    return <div className={cn(className)}>{Image}</div>;
  }

  return (
    <div
      className={cn(
        showMessage && " flex flex-row justify-between items-center",
        className,
      )}
    >
      <div className={cn("flex gap-2 items-center", classname)}>
        {link ? <MyLink href={link}>{Image}</MyLink> : Image}
        <div className=" flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            {link ? (
              <MyLink href={link}>
                <p
                  title={name}
                  className={cn(" gap-2 leading-4", nameClassname)}
                >
                  <LoadingIndicatorText>{name}</LoadingIndicatorText>
                </p>
              </MyLink>
            ) : (
              <p title={name} className={cn(" gap-2 leading-4", nameClassname)}>
                {name}{" "}
              </p>
            )}

            {gender && (
              <span className=" text-sm text-base-content/50">{gender}</span>
            )}
            {date && (
              <span className=" text-sm text-base-content/50">{date}</span>
            )}
          </div>
          <div className="flex flex-row gap-2 items-center">
            {role && (
              <span className=" text-sm text-base-content/50">{role}</span>
            )}
            {subjects && (
              <div className=" text-sm flex flex-row  gap-2text-base-content/50">
                Subjects: {subjects.join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>
      {showMessage && (
        <div className=" flex flex-row gap-2 ">
          {showModify && (
            <MyLink
              href={""}
              loading
              button={{
                variant: "outline",
                library: "daisy",
                size: "sm",
              }}
            >
              Modify
            </MyLink>
          )}
          <MyLink
            href={""}
            loading
            button={{
              variant: "primary",
              library: "daisy",
              size: "sm",
              role: "message",
            }}
          >
            Message
          </MyLink>
        </div>
      )}
    </div>
  );
};

export interface UserCardProps {
  lang: Locale;
  auth: AuthContext;
  user: UserModel;
  isAdminView?: boolean;
}

export const UserCard = ({ auth, user, lang, isAdminView }: UserCardProps) => {
  const canModify = auth.user.role === "ADMIN";

  return (
    <Card className="p-0">
      {/* HEADER */}
      <CardHeader className="border-b-0">
        <div className="flex items-center gap-2">
          <MyAvatar src={user.image} alt={user.name} />

          <div className="flex flex-col">
            <MyLink href={`/${lang}/p/${user.username ?? user._id}`}>
              <LoadingIndicatorText
                className="h6 line-clamp-1"
                title={user.name}
              >
                {user.name}
              </LoadingIndicatorText>
            </MyLink>

            <LoadingIndicatorText
              className="sm line-clamp-1"
              title={user.email}
            >
              {user.email}
            </LoadingIndicatorText>
          </div>
        </div>

        {/* META */}
        <div className="mt-2 flex flex-wrap gap-2">
          {user.role && <span className="sm">Role: {user.role}</span>}

          {user.gender && <span className="sm">Gender: {user.gender}</span>}

          {user.age && (
            <span className="sm">Age: {calculateAge(user.age)}</span>
          )}

          {user.disable && (
            <span className="sm text-error font-medium">Disabled</span>
          )}
        </div>
      </CardHeader>

      {/* FOOTER */}
      <CardContent className="p-0 pb-4 flex flex-col justify-between">
        <CardFooter
          className={cn(
            "border-t border-base-content/50",
            "flex justify-end gap-2",
          )}
        >
          {canModify && (
            <Button
              library="daisy"
              variant="outline"
              size="sm"
              role="page"
              href={`/${lang}/admin/users/${user._id}/edit`}
            >
              Edit
            </Button>
          )}

          <Button
            library="daisy"
            variant="primary"
            size="sm"
            className={cn("")}
            role="page"
            href={`/${lang}/p/${user.username ?? user._id}`}
          >
            View profile
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
