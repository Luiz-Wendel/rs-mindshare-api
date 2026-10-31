import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { VoteModel } from "../models/vote.model";
import { VoteService } from "../services/vote.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { IsAuthenticated } from "../middlewares/auth.middleware";
import { IdeaModel } from "../models/idea.model";
import { UserModel } from "../models/user.model";
import { IdeaService } from "../services/idea.service";
import { UserService } from "../services/user.service";

@Resolver(() => VoteModel)
@UseMiddleware(IsAuthenticated)
export class VoteResolver {
  private voteService = new VoteService();
  private ideaService = new IdeaService();
  private userService = new UserService();

  @Mutation(() => Boolean)
  async toggleVote(
    @Arg("ideaId", () => String) ideaId: string,
    @GqlUser() user: User
  ): Promise<boolean> {
    return this.voteService.toggleVote(ideaId, user.id);
  }

  @FieldResolver(() => IdeaModel)
  async idea(@Root() vote: VoteModel): Promise<IdeaModel> {
    return this.ideaService.findIdea(vote.ideaId);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() vote: VoteModel): Promise<UserModel> {
    return this.userService.findUser(vote.userId);
  }
}
