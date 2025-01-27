"use server";

import { db } from "@/lib/db";
import { sectorSchema, sectorSchemaType } from "@/utils/schema/sectorSchema";
import { getSectorByUsername } from "../data/sector-data";

export const createSectorAction = async (values: sectorSchemaType) => {
  const validation = sectorSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid valuers" };
  }
  const { name, username, description, education } = validation.data;
const getUsername = await getSectorByUsername(username);

if (!!getUsername) {
    return {
      error: `Sector username name is ready exit [${getUsername.username}], try other username`,
    };
  }
  const create = await db.sector.create({
    data: {
      name,
      username,
      description,
      educationId : education
    },
  });

  if (!create) {
    return { error: "Failed to create Education" };
  }

  return { success: "Education created", data: create };
};