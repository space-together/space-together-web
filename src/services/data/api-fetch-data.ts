import { ClassRoom } from './../../../prisma/prisma/generated/index.d';
import { fetchApi } from "../class/fetching-api-v0.0.2";
import { FetchError } from '@/types/fetchErr';
import { classRoomSchemaType } from '@/utils/schema/classRoomSchema';

const apiClient = new fetchApi();

/**
 *  Create a class room
 * @param ClassRoom
 * @returns ClassRoomModelGet | FetchError
 */
export async function createMainClassAPI(
    mainClass: classRoomSchemaType){
      const create : ClassRoom | FetchError = await  apiClient.postData("", mainClass, "main Class");

      if ("message" in create) return {error : create.message};
      
    return {create , success : "Main class has been created"}
  }