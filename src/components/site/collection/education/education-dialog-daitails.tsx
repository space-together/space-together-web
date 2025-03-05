import UpdateEducationForm from "@/components/form/update-education-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Education } from "../../../../../prisma/prisma/generated";
import { formatDistanceToNowStrict } from "date-fns";

interface props {
  education?: Education | null;
}

const EducationDialogDetails = ({ education }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"info"} className=" w-full">
          View education
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            {education?.name ? education.name : "Education name"}
          </DialogTitle>
          <DialogDescription>
            {education?.description
              ? education.description
              : "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full flex space-x-4">
          <div className=" w-1/2">
            <h3 className=" text-base font-semibold">update education</h3>
            {!!education && <UpdateEducationForm education={education} />}
          </div>
          <div>
            <h3 className="text-base font-semibold">Education Details</h3>
            <div>
              {!!education?.created_at && (
                <p>
                  <span className=" text-myGray">Create at: </span>
                  {formatDistanceToNowStrict(new Date(education.created_at))}{" "}
                  ago
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EducationDialogDetails;
