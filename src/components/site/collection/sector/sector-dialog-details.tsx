import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sector } from "../../../../../prisma/prisma/generated";

interface props {
  sector?: Sector | null;
}

const SectorDialogDetails = ({ sector }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"info"} className=" w-full">
          View Sector
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            {sector?.name ? sector.name : "Education name"}
          </DialogTitle>
          <DialogDescription>
            {sector?.description
              ? sector.description
              : "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full flex space-x-4">
          <div className=" w-1/2">
            <h3 className=" text-base font-semibold">update sector</h3>
          </div>
          <div>
            <h3 className="text-base font-semibold">Sector Details</h3>
            <div>
              sector details information
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SectorDialogDetails;
