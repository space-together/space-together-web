import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { TradeModule } from "@/lib/schema/admin/tradeSchema";
import type { AuthContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";

interface TradesListItemsByTradesProps {
  auth: AuthContext;
  trades_ids: string[];
}

const TradesListItemsByTrades = async ({
  auth,
  trades_ids,
}: TradesListItemsByTradesProps) => {
  const [tradesRes] = await Promise.all([
    apiRequest<{ ids?: string[] }, TradeModule[]>(
      "post",
      `/trades/trades/by_ids`,
      { ids: trades_ids },
      { token: auth.token },
    ),
  ]);
  return (
    <div className=" flex flex-col gap-2">
      {tradesRes.data?.map((trade) => (
        <Item
          key={trade._id || trade.name}
          variant="outline"
          className=" flex flex-row "
        >
          <ItemContent className="flex flex-row gap-2">
            <div>
              <ItemTitle>{trade.name}</ItemTitle>
              <ItemDescription>{trade.description}</ItemDescription>
            </div>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Remove
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
};

export default TradesListItemsByTrades;
