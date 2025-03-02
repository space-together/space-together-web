import NextAuth from "next-auth";
import authConfig from "./lib/auth/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserByEmail } from "./services/data/user";
import { UserRole } from "../prisma/prisma/generated";

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

      if (token.image && session.user) {
        session.user.image = token.picture;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.username && session.user) {
        session.user.username = token.username as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.email) return token;
      const user = await getUserByEmail(token.email);

      if (!user) return token;
      token.name = user.name;
      token.email = user.email;
      token.username = user.username;
      token.sub = user.id;
      token.picture = user.image;
      // token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
      token.role = user.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});
