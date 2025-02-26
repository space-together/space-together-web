import { APIV002 } from '@/env';
import { ClassRoom } from './../../../prisma/prisma/generated/index.d';
// import { fetchApi } from "../class/fetching-api-v0.0.2";
import { FetchError } from '@/types/fetchErr';
import { classRoomSchemaType } from '@/utils/schema/classRoomSchema';
import axios from 'axios';

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
  return { create, success: "Main class has been created" }
}