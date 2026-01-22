import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SchoolStaff } from "@/lib/schema/school-staff/school-staff-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import SchoolStaffForm from "./school-staff-form";

interface Props {
  auth: AuthContext;
  isSchool?: boolean;
  staff?: SchoolStaff;
}

const SchoolStaffDialog = ({ auth, isSchool, staff }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={staff ? undefined : "create"}
          library="daisy"
          variant={staff ? "outline" : "primary"}
          size="sm"
        >
          {staff ? "Update staff" : "Create staff"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {staff ? `Update ${staff.name}` : "Create staff"}
          </DialogTitle>
        </DialogHeader>

        <SchoolStaffForm auth={auth} isSchool={isSchool} staff={staff} />
      </DialogContent>
    </Dialog>
  );
};

export default SchoolStaffDialog;
