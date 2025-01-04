import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserByEmailAPI } from "./utils/service/functions/fetchDataFn";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      if (!token.email) return token;
      const user = await getUserByEmailAPI(token.email);

      if ("message" in user) return token;

      token.name = user.name;
      token.email = user.email;
      token.sub = user.id;
      token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      token.role = user.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});
