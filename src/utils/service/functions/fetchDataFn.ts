import { UserModel, UserRoleModel } from "@/utils/models/userModel";
import { ApiClient } from "../fetchingAPIClient";
import { FetchError, tokenModel } from "@/utils/types/fetchTypes";
import { registerSchemaType } from "@/utils/schema/userSchema";

const apiClient = new ApiClient();

export async function fetchAllUserRoles(): Promise<
  UserRoleModel[] | FetchError
> {
  const endpoint = "users/role";
  return apiClient.allData<UserRoleModel[]>(endpoint, "user roles");
}

export async function createUserAPI(
  user: registerSchemaType
): Promise<tokenModel | FetchError> {
  const endpoint = "auth/user/register";
  return apiClient.postData(endpoint, user, "users");
}

export async function getUserByEmailAPI(
  email: string
): Promise<UserModel | FetchError> {
  const endpoint = `users/email/${email}`;
  return apiClient.allData(endpoint, "users");
}
