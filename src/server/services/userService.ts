import { saltAndHashPassword } from "@/utils/password";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../../../generated/prisma";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByEmail(email: string) {
    try {
      const user: User = await this.userRepository.findUserByEmail(email);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("User not found");
      } else {
        throw error;
      }
    }
  }

  async findUserById(id: string) {
    try {
      const user: User = await this.userRepository.findUserById(id);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("User not found");
      } else {
        throw error;
      }
    }
  }

  async createUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await saltAndHashPassword(password);
    return this.userRepository.createUser(name, email, hashedPassword);
  }
}
