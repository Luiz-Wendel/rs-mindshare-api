import { prismaClient } from "../../prisma/prisma";

export class VoteService {
  async toggleVote(ideaId: string, userId: string) {
    const idea = await prismaClient.idea.findUnique({
      where: { id: ideaId },
      select: { id: true },
    });

    if (!idea) {
      throw new Error("Idea not found");
    }

    const existingVote = await prismaClient.vote.findUnique({
      where: {
        userId_ideaId: {
          ideaId,
          userId,
        },
      },
    });

    if (existingVote) {
      await prismaClient.vote.delete({
        where: { 
          userId_ideaId: {
            ideaId,
            userId,
          },
         },
      });

      return false;
    } else {
      await prismaClient.vote.create({
        data: {
          ideaId,
          userId,
        },
      });
      return true;
    }
  }

  async listByIdea(ideaId: string) {
    return prismaClient.vote.findMany({
      where: { ideaId },
    });
  }

  async countVotes(ideaId: string) {
    return prismaClient.vote.count({
      where: { ideaId },
    });
  }
}
