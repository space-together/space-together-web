import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Education, Sector } from "../../../../../prisma/prisma/generated";
import UpdateSectorForm from "@/components/form/update-sector-form";

interface props {
  sector?: Sector | null;
  educations?: Education[] | undefined
}

const SectorDialogDetails = ({ sector, educations }: props) => {
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
            {!!sector && <UpdateSectorForm sector={sector} educations={educations}/>}
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
