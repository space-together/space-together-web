"use client";

import SectorForm from "@/app/[lang]/(application)/a/collections/sectors/_components/sector-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  sector?: SectorModel;
}

const SectorDialog = ({ auth, sector }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={sector ? "update" : "create"}
          library="daisy"
          variant={sector ? "outline" : "primary"}
          size="sm"
        >
          {sector ? "Update Sector" : "Create Sector"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {sector ? `Update ${sector.name}` : "Create Sector"}
          </DialogTitle>
        </DialogHeader>

        <SectorForm auth={auth} sector={sector} />
      </DialogContent>
    </Dialog>
  );
};

export default SectorDialog;
