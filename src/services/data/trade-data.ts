import { db } from "@/lib/db";

export const getTradeById = async (id: string) => {
  try {
    const trade = await db.trade.findUnique({ where: { id } });
    return trade;
  } catch {
    return null;
  }
};

export const getTradeByUsername = async (username: string) => {
  try {
    const trade = await db.trade.findUnique({ where: { username } });
    return trade;
  } catch {
    return null;
  }
};

export const getAllTrades = async () => {
    try {
        const trades = await db.trade.findMany();
        return trades;
    } catch {
        return [];
    }
};

export const getTradesBySectorId = async (sector_id: string) => {
  try {
    const trades = await db.trade.findMany({ where: { sector_id } });
    return trades;
  } catch {
    return [];
  }
};