import { getUserFromSession, getUserSession } from "./session";
import { redirect } from "next/navigation";
import { getUserByIdApi } from "@/services/data/api-fetch-data";
import { cache } from "react";
import { User } from "../../../../prisma/prisma/generated";
import { authUser } from "@/types/userModel";

type FullUser = User;

function _getCurrentUser(options: { withFullUser: true; redirectIfNotFound: true }): Promise<FullUser>;
function _getCurrentUser(options: { withFullUser: true; redirectIfNotFound?: false }): Promise<FullUser | null>;
function _getCurrentUser(options: { authUser: true; redirectIfNotFound: true }): Promise<authUser>;
function _getCurrentUser(options: { authUser: true; redirectIfNotFound?: false }): Promise<authUser | null>;
// function _getCurrentUser(options?: { withFullUser?: false; authUser?: false; redirectIfNotFound?: false }): Promise<User | null>;

async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
  authUser = false,
}: { withFullUser?: boolean; authUser?: boolean; redirectIfNotFound?: boolean }) {
  const session = await getUserFromSession();
const user_session =await getUserSession();
  if (!session || !user_session) {
    if (redirectIfNotFound) return redirect('/auth/login');
    return null;
  }

  if (withFullUser || authUser) {
    const fullUser = await getUserByIdApi(session.user_id);
    if (!fullUser.data) return null;
    
    const data = fullUser.data;
    
    if (withFullUser) {
      return data; // Full User object
    }
    
    if (authUser) {
      const user: authUser = {
        name: data.name ?? "",
        email: data.email ?? "",
        id: data.id,
        role: data.role,
        username: data.username ?? undefined,
        token : session.token,
        user_session 
      };
      return user; // AuthUser object
    }
  }

  return session; // If no options, return session
}

export const getCurrentUser = cache(_getCurrentUser);

// to decode session token 
