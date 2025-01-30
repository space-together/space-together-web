import { Button } from "@/components/ui/button";
import { FaRegBookmark } from "react-icons/fa6";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaSignsPost } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RxActivityLog } from "react-icons/rx";
import Link from "next/link";
import { Locale } from "@/i18n";

interface props {
  lang: Locale;
}

const ProfileNavBar = ({ lang }: props) => {
  return (
    <nav className=" happy-card">
      <div className=" space-x-2">
        <Link href={`/${lang}/profile`}>
          <Button size="sm" className=" text-info">
            <RxActivityLog /> All
          </Button>
        </Link>
        <Link href={`/${lang}/profile/posts`}>
          <Button size="sm">
            <FaSignsPost /> Posts
          </Button>
        </Link>
        <Link href={`/${lang}/profile/notes`}>
          <Button size="sm">
            <BsFileEarmarkPost /> Notes
          </Button>
        </Link>
        <Link href={`/${lang}/profile/reports`}>
          <Button size="sm">
            <HiOutlineDocumentReport /> Reports
          </Button>
        </Link>
        <Link href={`/${lang}/profile/saved`}>
          <Button size="sm">
            <FaRegBookmark /> Saved
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default ProfileNavBar;
