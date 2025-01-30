import UserCardSmall from "@/components/cards/user-card-small";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n";
import Link from "next/link";
import React from "react";

interface props {
  lang: Locale;
  onThePage?: boolean;
}

const SchoolStudents = ({ lang, onThePage }: props) => {
  return (
    <div className=" happy-card space-y-2">
      <div className="">
        <h3 className=" font-semibold capitalize">school staff </h3>
      </div>
      <div className=" space-y-2 ml-2">
        <UserCardSmall lang={lang} userRole="STUDENT" />
        <UserCardSmall lang={lang} userRole="STUDENT" />
        <UserCardSmall lang={lang} userRole="STUDENT" />
        <UserCardSmall lang={lang} userRole="STUDENT" />
        <UserCardSmall lang={lang} userRole="STUDENT" />
      </div>
      {!onThePage && (
        <Link href={`/${lang}/school/peoples`} className=" w-full">
          <Button variant="ghost" size="sm">
            See More
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SchoolStudents;
