"use server";

import { db } from "@/lib/db";
import { sectorSchema, sectorSchemaType } from "@/utils/schema/sectorSchema";
import sectorService from "../data/sector-data";

export const createSectorAction = async (values: sectorSchemaType) => {
  const validation = sectorSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid valuers" };
  }
  const { name, username, description, education } = validation.data;
  const getUsername = await sectorService.getSectorByUsername(username);

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
      educationId: education,
    },
  });

  if (!create) {
    return { error: "Failed to create Education" };
  }

  return { success: "Education created", data: create };
};

export const updateSectorAction = async (
  id: string,
  values: sectorSchemaType
) => {
  const validation = sectorSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid values" };
  }
  const { name, username, description, education } = validation.data;
  const getUsername = await sectorService.getSectorByUsername(username);

  if (getUsername && getUsername.id !== id) {
    return {
      error: `Sector username is already taken by another sector [${getUsername.username}], try another username`,
    };
  }
  const update = await db.sector.update({
    where: { id },
    data: {
      name,
      username,
      description,
      educationId: education,
    },
  });

  if (!update) {
    return { error: "Failed to update Sector" };
  }

  return { success: "Sector updated", data: update };
};

export const deleteSectorAction = async (id: string) => {
  try {
    const deleteSector = await db.sector.delete({
      where: { id },
    });

    return { success: "Sector deleted", data: deleteSector };
  } catch {
    return { error: "Failed to delete Sector" };
  }
};
