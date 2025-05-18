// src/server/actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma/prismaClient";
import { z } from "zod";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { SignUpResponse } from "@/types/auth/types";
import { Account, Profile } from "next-auth";

const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export async function credentialSignUp(values: unknown): Promise<SignUpResponse> {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map((error) => error.message).join(", "),
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      return {
        error: "User already exists with this email address.",
      };
    }

    // ユーザーを作成
    await userService.createUser({
      name,
      email,
      password,
    });

    return { success: "User created successfully." };
  } catch (error) {
    console.error("Error during sign up:", error);
    return { error: "An unexpected error occurred during sign up." };
  }
}

export async function googleSignIn({
  account,
  profile,
}: {
  account: Account | undefined | null;
  profile: Profile | undefined;
}): Promise<boolean> {
  if (account?.provider === "google") {
    if (!profile?.email) {
      console.error("Google profile is missing email.");
      return false; // メールがない場合はサインインを中止
    }

    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);

    try {
      const existingUser = await userService.findUserByEmail(profile.email);
      if (!existingUser) {
        // ユーザーが存在しない場合、新規作成
        await userService.createUser({
          email: profile.email,
          name: profile.name || profile.email, // Googleプロファイルの名前を使用、なければメールアドレス
          password: "", // OAuth認証ユーザーのためパスワードは空
        });
        console.log(`New user created via Google: ${profile.email}`);
      } else {
        // ユーザーが既に存在する場合の処理 (例: 最終ログイン日時更新など)
        console.log(`Existing user signed in via Google: ${profile.email}`);
      }
    } catch (error) {
      console.error("Error during Google sign-in DB operation:", error);
      return false; // エラー発生時はサインインを中止
    }
  }
  return true; // サインイン処理を続行
}
