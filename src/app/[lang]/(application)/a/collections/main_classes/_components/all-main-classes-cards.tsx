"use client";
import MainClassCard from "@/app/[lang]/(application)/a/collections/main_classes/_components/main-class-card";
import type { Locale } from "@/i18n";
import { useRealtimeList } from "@/lib/hooks/use-realtime-list";
import { MainClassModelWithOthers } from "@/lib/schema/admin/main-classes-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface props {
  lang: Locale;
  auth: AuthContext;
  classes: MainClassModelWithOthers[];
  realtimeEnabled?: boolean;
}

const AllMainClassesCards = ({ lang, classes, realtimeEnabled = true }: props) => {
  const displayMainClasses = useRealtimeList<MainClassModelWithOthers>(
    "main_class",
    classes,
    realtimeEnabled,
  );

  return (
    <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
      {displayMainClasses.map((cls) => {
        return (
          <MainClassCard
            key={cls._id || cls.username}
            mainClass={cls}
            lang={lang}
          />
        );
      })}
    </div>
  );
};

export default AllMainClassesCards;
