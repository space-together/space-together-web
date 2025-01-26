import  bcrypt  from "bcryptjs";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { LoginModel } from "../../utils/schema/userSchema";
import { getUserByEmail } from "@/utils/service/data/user-data";

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google,
    Credentials({
      credentials: {
        email: { label: "email", type: "email", placeholder: "Your Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials) {
        const validation = LoginModel.safeParse(credentials);
        if (validation.success) {
          const { email, password } = validation.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) return user;
          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
