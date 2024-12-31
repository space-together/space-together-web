import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getUserByEmailAPI } from "./utils/service/functions/fetchDataFn";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks : {
    async jwt ({token}) {
        if(!token.email) return token;
        const user = await getUserByEmailAPI(token.email);
  
        if("message" in user) return token;
  
        token.name = user.nm;
        token.email = user.em;
        if (user.im) {
            token.picture = user.im[1].src;
        }
        token.sub = user.id;
        token.role = user.rl;
        return token
      }
  },
    session : {strategy : "jwt"},
    ...authConfig,
    secret : process.env.AUTH_SECRET
})