// src/server/actions/auth.ts
"use server";

import { prisma } from "@/lib/prisma/prismaClient";
import { z } from "zod";
import { UserService } from "../services/userService";
import { UserRepository } from "../repositories/userRepository";
import { SignUpResponse } from "@/types/auth/types";

const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export async function signUp(values: unknown): Promise<SignUpResponse> {
  const userRepository = new UserRepository(prisma);
  const userService = new UserService(userRepository);
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
    await userService.createUser(name, email, password);

    return { success: "User created successfully." };
  } catch (error) {
    console.error("Error during sign up:", error);
    return { error: "An unexpected error occurred during sign up." };
  }
}
