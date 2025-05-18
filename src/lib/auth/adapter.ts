import { UserRepository } from "@/server/repositories/userRepository";
import { AdapterUser } from "next-auth/adapters";
import { prisma } from "../prisma/prismaClient";
import { UserService } from "@/server/services/userService";

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export const MyAdapter = {
  async createUser(user: AdapterUser) {
    const { name, email } = user;
    if (!name || !email) {
      throw new Error("Name, email are required");
    }
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists with this email address.");
    }
    const newUser = await userService.createUser({
      name,
      email,
      password: "",
    });
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  },
  async getUserByEmail(email: string) {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};
