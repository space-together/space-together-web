"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { LearningMaterial } from "@/lib/schema/learning-material/learning-material-schema";
import type { AuthContext } from "@/lib/utils/auth-context";
import MaterialForm from "./material-form";

interface Props {
  auth: AuthContext;
  material?: LearningMaterial;
  subjectId?: string;
}

const MaterialDialog = ({ auth, material, subjectId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={material ? undefined : "create"}
          library="daisy"
          variant={material ? "outline" : "primary"}
          size="sm"
        >
          {material ? "Edit Material" : "Upload Material"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {material ? `Update ${material.title}` : "Upload Material"}
          </DialogTitle>
        </DialogHeader>

        <MaterialForm auth={auth} material={material} subjectId={subjectId} />
      </DialogContent>
    </Dialog>
  );
};

export default MaterialDialog;
