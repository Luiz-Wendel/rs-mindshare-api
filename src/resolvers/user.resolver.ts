import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";

// models
import { UserModel } from "../models/user.model";

// services
import { UserService } from "../services/user.service";

// middlewares
import { IsAuthenticated } from "../middlewares/auth.middleware";

@Resolver(() => UserModel)
@UseMiddleware(IsAuthenticated)
export class UserResolver {
  private userService: UserService = new UserService();

  @Query(() => UserModel)
  async getUser(
    @Arg("id", () => String) id: string
  ): Promise<UserModel> {
    return this.userService.findUser(id);
  }
}
