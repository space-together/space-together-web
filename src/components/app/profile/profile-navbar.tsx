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
        <Button className=" text-info">
          <RxActivityLog /> All
        </Button>
        <Button>
          <FaSignsPost /> Posts
        </Button>
        <Button>
          <BsFileEarmarkPost /> Notes
        </Button>
        <Button>
          <HiOutlineDocumentReport /> Reports
        </Button>
        <Button>
          <FaRegBookmark /> Saved
        </Button>
      </div>
    </nav>
  );
};

export default ProfileNavBar;
