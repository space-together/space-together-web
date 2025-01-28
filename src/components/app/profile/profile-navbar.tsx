import { Button } from "@/components/ui/button";
import { FaRegBookmark } from "react-icons/fa6";

const ProfileNavBar = () => {
  return (
    <nav className=" happy-card">
      <div className=" space-x-2">
        <Button className=" text-info">All</Button>
        <Button>Posts</Button>
        <Button>Notes</Button>
        <Button>Reports</Button>
        <Button>
          <FaRegBookmark /> Saved
        </Button>
      </div>
    </nav>
  );
};

export default ProfileNavBar;
