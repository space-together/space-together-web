"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { MainClassModel } from "@/lib/schema/admin/main-classes-schema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import MainClassForm from "./main-class-form";

interface Props {
  auth: AuthContext;
  trade?: TradeModule;
  mainClass?: MainClassModel; // edit mode
}

const MainClassDialog = ({ auth, trade, mainClass }: Props) => {
  const isEdit = Boolean(mainClass);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={mainClass ? "update" : "create"}
          library="daisy"
          variant={mainClass ? "outline" : "primary"}
          size="sm"
        >
          {mainClass ? "Update Main Class" : "Create Main Class"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Update Main Class" : "Add New Main Class"}
          </DialogTitle>
        </DialogHeader>

        <MainClassForm auth={auth} trade={trade} mainClass={mainClass} />
      </DialogContent>
    </Dialog>
  );
};

export default MainClassDialog;
