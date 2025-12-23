"use client";
import type { Locale } from "@/i18n";
import type { School } from "@/lib/schema/school/school-schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BsBook, BsGlobe, BsPeople } from "react-icons/bs";
import { FaBookmark, FaSchool } from "react-icons/fa6";
import MyAvatar from "../common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "../common/myLink";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface props {
  lang: Locale;
  school: School;
}

const SchoolCard = ({ lang, school }: props) => {
  return (
    <Card className={cn(" relative")}>
      <CardHeader className="relative">
        <div className=" flex items-center gap-2 ">
          <MyLink href={`/${lang}/a/collections/schools/${school.username}`}>
            <MyAvatar
              type="square"
              className=" rounded-none"
              classname=" rounded-none"
              src={school.logo}
              alt={school.name}
            />
          </MyLink>
          <div className=" flex flex-col">
            <MyLink href={`/${lang}/a/collections/schools/${school.username}`}>
              <LoadingIndicatorText
                element={"h3"}
                className={"h6 line-clamp-1"}
                title={school.name}
              >
                {school.name}
              </LoadingIndicatorText>
            </MyLink>
            <MyLink href={`/${lang}/a/collections/schools/${school.username}`}>
              <LoadingIndicatorText title={school.username} element={"span"}>
                @ {school.username}
              </LoadingIndicatorText>
            </MyLink>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" ">
        <p className=" line-clamp-2">{school.description}</p>
        <ul className=" flex flex-wrap gap-4">
          <li title="School type">
            {school.website && (
              <Link
                className=" flex flex-wrap gap-1 items-center"
                href={school.website}
                target="_blank"
              >
                <BsGlobe /> <span> Website</span>
              </Link>
            )}
          </li>
          <li
            title="School type"
            className=" flex flex-wrap gap-1 items-center"
          >
            <FaSchool /> <span> {school.school_type}</span>
          </li>
          <li title="School students" className=" flex  items-center  gap-1">
            <span>{school.school_members}</span> <BsPeople />
          </li>
          <li title="School educations" className=" flex  items-center  gap-1">
            <span>{school.education_level?.length}</span> <BsBook />
          </li>
          <li title="School classes" className=" flex  items-center  gap-1">
            <span>{school.classrooms}</span> <FaBookmark />
          </li>
        </ul>
        <CardFooter className=" flex flex-row gap-2">
          <MyLink
            href={`/${lang}/a/collections/schools/${school.username}`}
            button={{
              variant: "primary",
              library: "daisy",
            }}
          >
            View school
          </MyLink>
          <MyLink
            href={`/${lang}/school/${school.username}`}
            button={{
              variant: "outline",
              library: "daisy",
              role: "page",
            }}
          >
            About
          </MyLink>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default SchoolCard;
