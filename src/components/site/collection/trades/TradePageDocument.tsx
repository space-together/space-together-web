import CollectionPageStatic, {
} from "@/utils/static/page/collectionPageStatic";
import CreateTradeDialog from "./createTradeDialog";
import AllTradeTable from "./AllTradeTable";
import { getAllSectors } from "@/services/data/sector-data";
import { getAllTrades } from "@/services/data/trade-data";
// import AllEducationComponent from "./allEducationComponent"

interface props {
  collection: string;
}
const TradePageDocument = async ({ collection }: props) => {
  const getSectors = await getAllSectors();

  const getTrades = await getAllTrades();

  return (
    <CollectionPageStatic collection={collection}>
      <div className=" flex justify-between items-center">
        <h2 className=" happy-title-base">Trades for sectors</h2>
        <CreateTradeDialog sectors={getSectors} />
      </div>
      <AllTradeTable collectionName={collection} trades={getTrades} sectors={getSectors}/>
    </CollectionPageStatic>
  );
};

export default TradePageDocument;
