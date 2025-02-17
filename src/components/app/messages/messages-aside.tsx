 import MessagesAsideNavbar from "./message-aside-navbar";
import MessageAsideBody from "./message-aside-body";
import { Locale } from "@/i18n";
// import AsideSearch from "@/components/cards/aside-search";

interface props {
  lang: Locale;
}

const MessagesAside = ({ lang }: props) => {
  return (
    <aside className=" fixed w-80 h-screen bg-base-100 flex">
      <div className="w-full border-r border-r-base-300">
        {/* <AsideSearch /> */}
        <MessagesAsideNavbar lang={lang} />
        <div className=" max-h-[75vh] overflow-y-auto">
          <MessageAsideBody lang={lang} />
        </div>
        <div />
      </div>
    </aside>
  );
};

export default MessagesAside;
