import { getUserFromSession } from "./session";
import { redirect } from "next/navigation";
import { getUserByIdApi } from "@/services/data/api-fetch-data";
import { cache } from "react";
import { User } from "../../../../prisma/prisma/generated";

type FullUser = User

function _getCurrentUser(options: {
    withFullUser: true
    redirectIfNotFound: true
  }): Promise<FullUser>
  function _getCurrentUser(options: {
    withFullUser: true
    redirectIfNotFound?: false
  }): Promise<FullUser | null>
  function _getCurrentUser(options: {
    withFullUser?: false
    redirectIfNotFound: true
  }): Promise<User>

//   function _getCurrentUser(options?: {
//     withFullUser?: false
//     redirectIfNotFound?: false
//   }): Promise<User | null>

async function _getCurrentUser({ withFullUser = false, redirectIfNotFound = false }) {
    const session = await getUserFromSession();

    if (session == null) {
        if (redirectIfNotFound) return redirect('/auth/login')
        return null
    }

    if (withFullUser) {
        const fullUser = await getUserByIdApi(session.user_id);
        if (!!fullUser.data) return fullUser.data;
        return null;
    }
    return session
}

export const getCurrentUser = cache(_getCurrentUser);