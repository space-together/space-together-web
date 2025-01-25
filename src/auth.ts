import NextAuth from "next-auth";
import authConfig from "./lib/auth/auth.config";
import { getUserByEmailAPI } from "./utils/service/functions/fetchDataFn";import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (!token) return token;

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.name && session.user) {
        session.user.name = token.name;
      }

      if (token.picture && session.user) {
        session.user.image = token.picture;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string;
      }

      return session;
    },
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
  adapter :  PrismaAdapter(db),
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});
