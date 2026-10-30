import { Arg, Mutation, Resolver } from "type-graphql";

// dtos
import { RegisterInput } from "../dtos/input/auth.input";
import { RegisterOutput } from "../dtos/output/auth.output";

// services
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
  private authService: AuthService = new AuthService();

  @Mutation(() => RegisterOutput)
  async register(
    @Arg('data', () => RegisterInput) data: RegisterInput
  ): Promise<RegisterOutput> {
    return this.authService.register(data);
  }
}
