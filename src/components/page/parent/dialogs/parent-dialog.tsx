"use client";

import ParentForm from "@/components/page/parent/form/parent-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { Parent } from "@/lib/schema/parent/parent-schema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  isSchool?: boolean;
  parent?: Parent;
}

const ParentDialog = ({ auth, isSchool, parent }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={parent ? undefined : "create"}
          library="daisy"
          variant={parent ? "outline" : "primary"}
          size="sm"
        >
          {parent ? "Update Parent" : "Create Parent"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {parent ? `Update ${parent.name}` : "Create Parent"}
          </DialogTitle>
        </DialogHeader>

        <ParentForm auth={auth} isSchool={isSchool} parent={parent} />
      </DialogContent>
    </Dialog>
  );
};

export default ParentDialog;
