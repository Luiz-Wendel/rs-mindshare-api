import { Arg, Mutation, Resolver } from "type-graphql";

// dtos
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { LoginOutput, RegisterOutput } from "../dtos/output/auth.output";

// services
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
  private authService: AuthService = new AuthService();

  @Mutation(() => LoginOutput)
  async login(
    @Arg('data', () => LoginInput) data: LoginInput
  ): Promise<LoginOutput> {
    return this.authService.login(data);
  }

  @Mutation(() => RegisterOutput)
  async register(
    @Arg('data', () => RegisterInput) data: RegisterInput
  ): Promise<RegisterOutput> {
    return this.authService.register(data);
  }
}
