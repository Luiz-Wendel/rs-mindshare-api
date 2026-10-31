import { prismaClient } from "../../prisma/prisma";
import { RegisterInput } from "../dtos/input/auth.input";
import { UserModel } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

export class AuthService {
  async login(data: { email: string; password: string }) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return this.generateTokens(user);
  }

  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hash = await hashPassword(data.password);

    const newUser = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash
      }
    });

    return this.generateTokens(newUser);
  }

  generateTokens(user: UserModel) {
    const token = signJwt({ id: user.id, email: user.email }, '1h');
    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d');

    return { token, refreshToken, user };
  }
}