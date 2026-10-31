import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from "type-graphql";
import { CommentModel } from "../models/comment.model";
import { CommentService } from "../services/comment.service";
import { CreateCommentInput } from "../dtos/input/comment.input";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { IsAuthenticated } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => CommentModel)
@UseMiddleware(IsAuthenticated)
export class CommentResolver {
  private readonly commentService: CommentService = new CommentService();
  private readonly ideaService: IdeaService = new IdeaService();
  private readonly userService: UserService = new UserService();

  @Mutation(() => CommentModel)
  async createComment(
    @Arg("ideaId", () => String) ideaId: string,
    @Arg("data", () => CreateCommentInput) data: CreateCommentInput,
    @GqlUser() user: User
  ): Promise<CommentModel> {
    return this.commentService.createComment(ideaId, user.id, data);
  }

  @FieldResolver(() => IdeaModel)
  async idea(
    @Root() comment: CommentModel
  ): Promise<IdeaModel> {
    const idea = await this.ideaService.findIdea(comment.ideaId);

    if (!idea) {
      throw new Error("idea not found");
    }

    return idea;
  }

  @FieldResolver(() => UserModel)
  async author(@Root() comment: CommentModel): Promise<UserModel> {
    return this.userService.findUser(comment.authorId);
  }
}