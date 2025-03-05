import { APIV002 } from '@/env';
import { ClassRoom, Education } from './../../../prisma/prisma/generated/index.d';
// import { FetchError } from '@/types/fetchErr';
import { classRoomSchemaType } from '@/utils/schema/classRoomSchema';
import axios, { AxiosError } from 'axios';
import { educationSchema, educationSchemaType, educationSchemaTypeUpdate, educationSchemaUpdate } from '@/utils/schema/educationSchema';

// --------- Educations ---------------------

/**
 *  Create a class room
 * @param mainClass
 * @returns {object} { create, success } | { error }
 */
export async function createMainClassAPI(mainClass: classRoomSchemaType) {
  try {
    const response = await axios.post<ClassRoom>(`${APIV002}/class/main`, mainClass);
    return { create: response.data, success: "Main created successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "An unexpected error occurred" };
  }
}

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