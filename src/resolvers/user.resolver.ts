import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

// models
import { UserModel } from "../models/user.model";

// services
import { UserService } from "../services/user.service";

// middlewares
import { IsAuthenticated } from "../middlewares/auth.middleware";

// dtos
import { CreateUserInput, UpdateUserInput } from "../dtos/input/user.input";
import { GraphqlContext } from "../graphql/context";

@Resolver(() => UserModel)
@UseMiddleware(IsAuthenticated)
export class UserResolver {
  private userService: UserService = new UserService();

  @Mutation(() => UserModel)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput
  ): Promise<UserModel> {
    return this.userService.createUser(data);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput
  ): Promise<UserModel> {
    return this.userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("id", () => String) id: string,
    @Ctx() ctx: GraphqlContext
  ): Promise<boolean> {
    if (ctx.user === id) {
      throw new Error("You cannot delete yourself");
    }

    return this.userService.deleteUser(id);
  }

  @Query(() => UserModel)
  async getUser(
    @Arg("id", () => String) id: string
  ): Promise<UserModel> {
    return this.userService.findUser(id);
  }

  @Query(() => [UserModel])
  async listUsers(): Promise<UserModel[]> {
    return this.userService.listUsers();
  }
}
