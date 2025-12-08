"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { EducationYear } from "@/lib/schema/admin/education-year-schema";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import EducationYearForm from "./education-year-form";

interface props {
  auth: AuthContext;
  year?: EducationYear;
  sector?: SectorModel;
}

const AcademicYearDialog = ({ auth, year, sector }: props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          library="daisy"
          variant="primary"
          size="sm"
          role={!year ? "create" : undefined}
        >
          {year ? "Edit" : "Add"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max- max-h-[95vh] overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            {year
              ? `Edit Education Year ${year.label}`
              : "Add New Education Year"}
          </DialogTitle>
        </DialogHeader>
        <EducationYearForm sector={sector} auth={auth} year={year} />
      </DialogContent>
    </Dialog>
  );
};

export default AcademicYearDialog;
