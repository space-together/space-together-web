import { APIV002 } from '@/env';
import { ClassRoom, Education } from './../../../prisma/prisma/generated/index.d';
// import { FetchError } from '@/types/fetchErr';
import { classRoomSchemaType } from '@/utils/schema/classRoomSchema';
import axios, { AxiosError } from 'axios';
import { educationSchema, educationSchemaType } from '@/utils/schema/educationSchema';

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
  const education = { name, username, description, symbol: logo };

  try {
    const response = await axios.post<Education>(`${APIV002}/education`, education);
    return { create: response.data, success: "Education created successfully" };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return { error: error.response?.data?.message || "Something went wrong while creating education" };
    }
    return { error: "An unexpected error occurred" };
  }
}
