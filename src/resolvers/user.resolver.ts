import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

// models
import { UserModel } from "../models/user.model";

// services
import { UserService } from "../services/user.service";

// middlewares
import { IsAuthenticated } from "../middlewares/auth.middleware";

// dtos
import { CreateUserInput } from "../dtos/input/user.input";

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

  @Query(() => UserModel)
  async getUser(
    @Arg("id", () => String) id: string
  ): Promise<UserModel> {
    return this.userService.findUser(id);
  }
}
