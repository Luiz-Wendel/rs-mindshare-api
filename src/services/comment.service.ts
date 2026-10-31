import { prismaClient } from "../../prisma/prisma";
import { CreateCommentInput } from "../dtos/input/comment.input";

export class CommentService {
  async createComment(ideaId: string, authorId: string, data: CreateCommentInput) {
    const existingIdea = await prismaClient.idea.findUnique({
      where: { id: ideaId },
    });

    if (!existingIdea) {
      throw new Error("Idea not found");
    }

    return prismaClient.comment.create({
      data: {
        ideaId,
        authorId,
        content: data.content,
      },
    });
  }
}
