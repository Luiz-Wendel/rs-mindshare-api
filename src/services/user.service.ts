import { prismaClient } from "../../prisma/prisma";
import { CreateUserInput } from "../dtos/input/user.input";

export class UserService {
  async createUser(data: CreateUserInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    return prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
