import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { CommentModel } from "./comment.model";
import { VoteModel } from "./vote.model";

@ObjectType()
export class IdeaModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String)
  authorId!: string

  @Field(() => UserModel, { nullable: true })
  author?: UserModel | null

  @Field(() => [CommentModel], { nullable: true })
  comments?: CommentModel[] | null

  @Field(() => [VoteModel], { nullable: true })
  votes?: VoteModel[] | null

  @Field(() => Number, { nullable: true })
  voteCount?: number | null

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
