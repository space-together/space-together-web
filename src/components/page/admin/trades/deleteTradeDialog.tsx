"use client";

import DeleteDialog from "@/components/common/dialog/delete-dialog";
import MyImage from "@/components/common/myImage";
import { Button } from "@/components/ui/button";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface Props {
  trade: TradeModule;
  auth: AuthContext;
}

export default function DeleteTradeDialog({ trade, auth }: Props) {
  return (
    <DeleteDialog
      itemName={trade.name}
      trigger={
        <Button variant={"ghost"} library="daisy" size={"sm"} type="button">
          <MyImage src="/icons/delete.png" role="ICON" />
          Delete
        </Button>
      }
      onDelete={async () => {
        const request = await apiRequest(
          "delete",
          `/trades/${trade.id || trade._id}`,
          undefined,
          { token: auth.token },
        );

        return {
          success: request.statusCode === 200,
          message: request.message || "Delete Trade successful",
          redirectTo: "/a/collections/trades",
        };
      }}
    />
  );
}
