import { Field, InputType } from "type-graphql";

@InputType()
export class CreateIdeaInput {
  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string | null
}

@InputType()
export class UpdateIdeaInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  description?: string | null
}
