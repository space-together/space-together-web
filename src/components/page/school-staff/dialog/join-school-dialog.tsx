import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputJoinSchoolFormForm from "../../../table/school/join-school-form";

const JoinSchoolDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button library="daisy" variant={"outline"}>
          <MyImage src="/icons/school.png" role="ICON" />
          Join your school
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join School</DialogTitle>
          <DialogDescription>Enter school username and code</DialogDescription>
        </DialogHeader>
        <InputJoinSchoolFormForm />
      </DialogContent>
    </Dialog>
  );
};

export default JoinSchoolDialog;
