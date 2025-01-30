import { Button } from "@/components/ui/button";
import { FaRegBookmark } from "react-icons/fa6";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaSignsPost } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RxActivityLog } from "react-icons/rx";

const ProfileNavBar = () => {
  return (
    <nav className=" happy-card">
      <div className=" space-x-2">
        <Button  size="sm" className=" text-info">
          <RxActivityLog /> All
        </Button>
        <Button size="sm">
          <FaSignsPost /> Posts
        </Button>
        <Button size="sm">
          <BsFileEarmarkPost /> Notes
        </Button>
        <Button size="sm">
          <HiOutlineDocumentReport /> Reports
        </Button>
        <Button size="sm">
          <FaRegBookmark /> Saved
        </Button>
      </div>
    </nav>
  );
};

export default ProfileNavBar;
