import { UserModel, UserRoleModel } from "@/utils/models/userModel";
import { ApiClient } from "../fetchingAPIClient";
import { FetchError } from "@/utils/types/fetchTypes";
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
): Promise<UserModel | FetchError> {
  const endpoint = "users";
  return apiClient.postData(endpoint, user, "users");
}
