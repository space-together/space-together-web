import { APIV002 } from '@/env';
import { ClassRoom, Education, Sector } from './../../../prisma/prisma/generated/index.d';
// import { FetchError } from '@/types/fetchErr';
import { classRoomSchema, classRoomSchemaType } from '@/utils/schema/classRoomSchema';
import axios, { AxiosError } from 'axios';
import { educationSchema, educationSchemaType, educationSchemaTypeUpdate, educationSchemaUpdate } from '@/utils/schema/educationSchema';
import { sectorSchema, sectorSchemaType } from '@/utils/schema/sectorSchema';

// --------- main class ---------------------

/**
 *  Create a class room
 * @param mainClass
 * @returns {object} { create, success } | { error }
*/
export async function createMainClassAPI(mainClass: classRoomSchemaType) {
  try {
    const response = await axios.post<ClassRoom>(`${APIV002}/classes/room`, mainClass);
    return { create: response.data, success: "Main created successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "An unexpected error occurred" };
  }
}


/**
 *  Get all Main class
 * @returns {object} { data, success } | { error }
 */
export async function getAllMainClassAPI() {
  try {
    const response = await axios.get<ClassRoom[]>(`${APIV002}/classes/room`);
    return { data: response.data, success: "Main class fetched successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while fetching Main class" };
    }
    return { error: "An unexpected error occurred" };
  }
}
/**
 *  Get Main class by Id
 * @returns {object} { data, success } | { error }
 */
export async function getMainClassByIdAPI(id : string) {
  try {
    const response = await axios.get<ClassRoom>(`${APIV002}/classes/room/${id}`);
    return { data: response.data, success: "Main class fetched successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while fetching Main class" };
    }
    return { error: "An unexpected error occurred" };
  }
}

/**
 *  update Main class
 * @param values
 * @returns {object} { update, success } | { error }
 */
export async function updateMainClassAPI(values: classRoomSchemaType, id : string) {
  const validation = classRoomSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name, username, description, symbol, sector, trade ,class_room_type} = validation.data;
  const education = { name,sector_id : sector,trade_id: trade, class_room_type ,username, description, symbol: !!symbol ? symbol : null };

  try {
    const response = await axios.put<Education>(`${APIV002}/classes/room/${id}`, education);
    return { create: response.data, success: "Main class update successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while update Main class" };
    }
    return { error: "An unexpected error occurred" };
  }
}

/**
 *  Delete Main class
 * @param id
 * @returns {object} { success } | { error }
 */
export async function deleteMainClassAPI(id: string) {
  try {
    await axios.delete(`${APIV002}/classes/room/${id}`);
    return { success: "Main class deleted successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while deleting Main class" };
    }
    return { error: "An unexpected error occurred" };
  }
}

// --------- Educations ---------------------

/**
 *  Get all Education
 * @returns {object} { data, success } | { error }
 */
export async function getAllEducationAPI() {
  try {
    const response = await axios.get<Education[]>(`${APIV002}/education`);
    return { data: response.data, success: "Education fetched successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while fetching education" };
    }
    return { error: "An unexpected error occurred" };
  }
}

/**
 *  Create Education
 * @param values
 * @returns {object} { create, success } | { error }
 */
export async function createEducationAPI(values: educationSchemaType) {
  const validation = educationSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name, username, description, logo } = validation.data;

  try {
    const education = { name, username, description, symbol: !!logo ? logo : null };
    const response = await axios.post<Education>(`${APIV002}/education`, education);
    return { create: response.data, success: "Education created successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while creating education" };
    }
    return { error: "An unexpected error occurred" };
  }
}

/**
 *  update Education
 * @param values
 * @returns {object} { update, success } | { error }
 */
export async function updateEducationAPI(values: educationSchemaTypeUpdate, id : string) {
  const validation = educationSchemaUpdate.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name, username, description, logo } = validation.data;
  const education = { name, username, description, symbol: !!logo ? logo : null };

  try {
    const response = await axios.put<Education>(`${APIV002}/education/${id}`, education);
    return { create: response.data, success: "Education update successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while update education" };
    }
    return { error: "An unexpected error occurred" };
  }
}

/**
 *  Delete Education
 * @param id
 * @returns {object} { success } | { error }
 */
export async function deleteEducationAPI(id: string) {
  try {
    await axios.delete(`${APIV002}/education/${id}`);
    return { success: "Education deleted successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while deleting education" };
    }
    return { error: "An unexpected error occurred" };
  }
}

// --------- Sector ---------------------

/**
 *  Get all Sector
 * @returns {object} { data, success } | { error }
 */
export async function getAllSectorAPI() {
  try {
    const response = await axios.get<Sector[]>(`${APIV002}/school/sector`);
    return { data: response.data, success: "sector fetched successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while fetching sector" };
    }
    return { error: "An unexpected error occurred" };
  }
}

/**
 *  Create Sector
 * @param values
 * @returns {object} { create, success } | { error }
 */
export async function createSectorAPI(values: sectorSchemaType) {
  const validation = sectorSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name, username, description, logo , education} = validation.data;

  try {
    const sector = { name, username, description, symbol: !!logo ? logo : null, education };
    const response = await axios.post<Sector>(`${APIV002}/school/sector`, sector);
    return { create: response.data, success: "Sector created successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while creating sector" };
    }
    return { error: "An unexpected error occurred" };
  }
}

/**
 *  update sector
 * @param values
 * @returns {object} { update, success } | { error }
 */
export async function updateSectorAPI(values: sectorSchemaType, id : string) {
  const validation = sectorSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid values" };
  }

  const { name, username, description, logo , education} = validation.data;
  const sector = { name, username, description, symbol: !!logo ? logo : null , education};

  try {
    const response = await axios.put<Sector>(`${APIV002}/school/sector/${id}`, sector);
    return { create: response.data, success: "Sector update successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while update Sector" };
    }
    return { error: "An unexpected error occurred" };
  }
}

/**
 *  Delete Sector
 * @param id
 * @returns {object} { success } | { error }
 */
export async function deleteSectorAPI(id: string) {
  try {
    await axios.delete(`${APIV002}/school/sector/${id}`);
    return { success: "Sector deleted successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while deleting Sector" };
    }
    return { error: "An unexpected error occurred" };
  }
}