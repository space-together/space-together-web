import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BsPlus } from "react-icons/bs";
import { Education } from "../../../../../prisma/prisma/generated";
import CreateSectorForm from "@/components/form/create-sector-form";

interface props {
  educations: Education[] | undefined;
}

const CreateSectorDialog = ({ educations }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm">
          <BsPlus /> Add new sector
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add New Sector</DialogTitle>
        </DialogHeader>
        <CreateSectorForm educations={educations} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSectorDialog;
