"use server";

import { db } from "@/lib/db";
import { tradeSchema, tradeSchemaType } from "@/utils/schema/tradeSchema";

export const createTradeAction = async (values: tradeSchemaType) => {
  const validation = tradeSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid valuers" };
  }
  const { name, username, description , sector, class_rooms } = validation.data;
  try {


    const create = await db.trade.create({
      data: {
        name,
        username,
        description,
        sectorId: sector,
        limitClasses: class_rooms
      },
    });

    if (!create) {
      return { error: "Failed to create Education" };
    }

    return { success: "Trade created", data: create };
  } catch (error) {
    return {
      error: `Some this went wong to create Trade error is  [${error}]`,
    };
  }
};

export const updateTradeAction = async (id: string, values: tradeSchemaType) => {
  const validation = tradeSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }
  const { name, username, description, sector, class_rooms } = validation.data;
  try {
    const update = await db.trade.update({
      where: { id },
      data: {
        name,
        username,
        description,
        sectorId: sector,
        limitClasses: class_rooms,
      },
    });

    if (!update) {
      return { error: "Failed to update Trade" };
    }

    return { success: "Trade updated", data: update };
  } catch (error) {
    return {
      error: `Something went wrong while updating Trade. Error: [${error}]`,
    };
  }
};

export const deleteTradeAction = async (id: string) => {
  try {
    const deleteTrade = await db.trade.delete({
      where: { id },
    });

    if (!deleteTrade) {
      return { error: "Failed to delete Trade" };
    }

    return { success: "Trade deleted", data: deleteTrade };
  } catch (error) {
    return {
      error: `Something went wrong while deleting Trade. Error: [${error}]`,
    };
  }
};
