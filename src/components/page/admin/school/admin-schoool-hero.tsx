import AddressCard from "@/components/cards/address-card";
import MyAvatar from "@/components/common/image/my-avatar";
import MyLink, { LoadingIndicatorText } from "@/components/common/myLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n";
import type { School } from "@/lib/schema/school/school-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import Link from "next/link";
import { BsGlobe, BsHouse, BsPeople } from "react-icons/bs";
import { FaBookmark, FaPeopleGroup, FaSchool } from "react-icons/fa6";

interface AdminSchoolHeroProps {
  school: School;
  lang: Locale;
  auth: AuthContext;
}

const AdminSchoolHero = ({ school, lang, auth }: AdminSchoolHeroProps) => {
  return (
    <section className="flex flex-col items-start gap-4">
      <div className=" flex flex-row items-start gap-2">
        <MyAvatar
          className=" rounded-none"
          classname=" rounded-none"
          type="square"
          size="2xl"
          src={school?.logo}
          alt={school.name}
        />
        <div className=" flex flex-col">
          <h4 className="h4">{school.name}</h4>
          <MyLink href={`/${lang}/a/collections/schools/${school.username}`}>
            <LoadingIndicatorText title={school.username} element={"span"}>
              @ {school.username}
            </LoadingIndicatorText>
          </MyLink>
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
            {school.school_members && (
              <li
                title="School students"
                className=" flex  items-center  gap-1"
              >
                <span>{school.school_members}</span> <BsPeople />
              </li>
            )}
            {school.affiliation && (
              <li
                title="Affiliation types "
                className=" flex  items-center  gap-1"
              >
                <span>{school.affiliation}</span> <BsHouse />
              </li>
            )}
            {school.classrooms && (
              <li title="School classes" className=" flex  items-center  gap-1">
                <span>{school.classrooms}</span> <FaBookmark />
              </li>
            )}
            {school.student_capacity && (
              <li
                title="Students capacity"
                className=" flex  items-center  gap-1"
              >
                <span>{school.student_capacity}</span> <FaPeopleGroup />
              </li>
            )}
          </ul>
          <div className=" flex flex-row gap-2 mt-2">
            <MyLink
              href={`/${lang}/school/${school.username}`}
              button={{
                variant: "outline",
                library: "daisy",
                role: "update",
              }}
            >
              Update
            </MyLink>
            <MyLink
              href={`/${lang}/school/${school.username}`}
              button={{
                variant: "primary",
                library: "daisy",
                role: "page",
              }}
            >
              About
            </MyLink>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-4 w-full">
        <p className="">{school.description}</p>
        <div className=" flex flex-row gap-4 w-full">
          <div className=" flex flex-col w-1/2 gap-2 ">
            <Card>
              <CardHeader>
                <CardTitle>Other information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  <li>hee</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className=" w-1/2">
            {school.address && <AddressCard address={school.address} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSchoolHero;
