import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const storyRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      childName: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.story.create({
          data: {
            title: input.title,
            content: input.content,
            childName: input.childName,
            author: { connect: { id: ctx.session.user.id } },
          },
        });
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to create story");
      }
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.story.findFirst({
        orderBy: { createdAt: "desc" },
        where: { authorId: ctx.session.user.id },
      });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Failed to fetch latest story");
    }
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
