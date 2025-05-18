import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { UserRepository } from "@/server/repositories/userRepository";
import { prisma } from "../prisma/prismaClient";
import { UserService } from "@/server/services/userService";
import { comparePassword } from "@/utils/password";
import { User } from "../../../generated/prisma";
import { googleSignIn } from "@/server/actions/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials;
        const authRepository = new UserRepository(prisma);
        const userService = new UserService(authRepository);

        const user: User = await userService.findUserByEmail(String(email));

        if (!user || !user.password) {
          return null;
        }

        const isValidPassword = await comparePassword(String(password), user.password);

        if (!isValidPassword) {
          return null; // パスワードが一致しない
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      return googleSignIn({ account, profile });
    },
    // 他のコールバック (jwt, sessionなど) が必要であればここに追加
  },
});
