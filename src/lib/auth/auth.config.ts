import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";

import { LoginModel } from "../../utils/schema/userSchema";
import { getUserByEmailAPI } from "../../utils/service/functions/fetchDataFn";
 
export default { providers: [
    GitHub({
        clientId : process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google,
    Credentials({
        credentials : {
            email : {label : "email", type : "email", placeholder : "Your Email"},
            password : {label : "password", type : "password" , placeholder : "Your Password"}
        },
        async authorize(credentials) {
            const validation = LoginModel.safeParse(credentials);

            if (validation.success) {
                const {email} = validation.data;
                const user = await getUserByEmailAPI(email);
                if("message" in user) return null;
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    // image: user.image ? user.image[0].src ? user.image[0].src : null : null,
                }
            }

            return null;
        }
    })
], 
} satisfies NextAuthConfig