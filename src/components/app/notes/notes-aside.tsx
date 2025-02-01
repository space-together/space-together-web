import React from "react";
import { Locale } from "@/i18n";
import AsideSearch from "@/components/cards/aside-search";

interface props {
  lang: Locale;
}

const NotesAside = ({  }: props) => {
  return (
    <aside className=" fixed w-80 h-screen bg-base-100 flex">
      <div className="w-full border-r border-r-border">
        <AsideSearch />
        notes aside
      </div>
    </aside>
  );
};

export default NotesAside;
