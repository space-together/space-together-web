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

    return { success: "Education created", data: create };
  } catch (error) {
    return {
      error: `Some this went wong to create class error is  [${error}]`,
    };
  }
};
