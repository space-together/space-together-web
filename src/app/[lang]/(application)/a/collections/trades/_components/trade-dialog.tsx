"use client";

import TradeForm from "@/app/[lang]/(application)/a/collections/trades/_components/trade-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SectorModel } from "@/lib/schema/admin/sectorSchema";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";

interface Props {
  auth: AuthContext;
  trade?: TradeModule;
  sector?: SectorModel;
}

const TradeDialog = ({ auth, trade, sector }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role={trade ? "update" : "create"}
          library="daisy"
          variant={trade ? "outline" : "primary"}
          size="sm"
        >
          {trade ? "Update Trade" : "Create Trade"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {trade ? `Update ${trade.name}` : "Create Trade"}
          </DialogTitle>
        </DialogHeader>

        <TradeForm auth={auth} sector={sector} trade={trade} />
      </DialogContent>
    </Dialog>
  );
};

export default TradeDialog;
