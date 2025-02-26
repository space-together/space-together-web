import { APIV002 } from '@/env';
import { ClassRoom, Education } from './../../../prisma/prisma/generated/index.d';
// import { fetchApi } from "../class/fetching-api-v0.0.2";
import { FetchError } from '@/types/fetchErr';
import { classRoomSchemaType } from '@/utils/schema/classRoomSchema';
import axios from 'axios';
import {  educationSchema, educationSchemaType } from '@/utils/schema/educationSchema';

// const apiClient = new fetchApi();

/**
 *  Create a class room
 * @param ClassRoom
 * @returns ClassRoomModelGet | FetchError
 */
export async function createMainClassAPI(
  mainClass: classRoomSchemaType) {
  const create: ClassRoom | FetchError = await axios.post(`${APIV002}/class/main`, mainClass);
  if ("message" in create) return { error: create.message };
  return { create, success: "Main created successful" }
}
/**
 *  Create Education
 * @param Education
 * @returns ClassRoomModelGet | FetchError
 */
export async function createEducationAPI(
  values: educationSchemaType) {
  const validation = educationSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid valuers" };
  }
  const { name, username, description, logo } = validation.data;
  const education = { name, username, description, symbol: logo };
 try {
  const create: Education | FetchError = await axios.post(`${APIV002}/education`, education);
  if ("message" in create) return { error: create.message };
  return { create, success: "Main created successful" }
 } catch (error) {
  console.log("some thing went wong to create new education system", error);
  return {error : "Some thing went wrong to create new education system"  }
 }
}