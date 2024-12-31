import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";

import { LoginModel } from "./utils/schema/userSchema";
import { getUserByEmailAPI } from "./utils/service/functions/fetchDataFn";
 
export default { providers: [
    GitHub({
        clientId : process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google,
    Credentials({
        async authorize(credentials) {
            const validation = LoginModel.safeParse(credentials);

            if (validation.success) {
                const {em} = validation.data;
                const user = await getUserByEmailAPI(em);
                if("message" in user) return null;
                return user
            }

            return null;
        }
    })
], 
} satisfies NextAuthConfig