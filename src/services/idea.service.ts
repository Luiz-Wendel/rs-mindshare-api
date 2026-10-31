import { prismaClient } from "../../prisma/prisma";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";

export class IdeaService {
  async createIdea(data: CreateIdeaInput, authorId: string) {
    return prismaClient.idea.create({
      data: {
        title: data.title,
        description: data.description,
        authorId: authorId,
      },
    });
  }

  async updateIdea(id: string, data: UpdateIdeaInput) {
    const existingIdea = await prismaClient.idea.findUnique({
      where: { id },
    });

    if (!existingIdea) {
      throw new Error("Idea not found");
    }

    return prismaClient.idea.update({
      where: { id },
      data: {
        title: data.title ?? existingIdea.title,
        description: data.description ?? existingIdea.description,
      },
    });
  }

  async listIdeas() {
    return prismaClient.idea.findMany();
  }

  async deleteIdea(id: string) {
    const existingIdea = await prismaClient.idea.findUnique({
      where: { id },
    });

    if (!existingIdea) {
      throw new Error("Idea not found");
    }

    return prismaClient.idea.delete({
      where: { id },
    });
  }
}
