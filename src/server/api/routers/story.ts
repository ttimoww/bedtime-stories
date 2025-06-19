import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateStory } from "@/lib/ai/story";
import { StoryCategory } from "@/lib/ai/story-prompt";

const storyInputSchema = z.object({
    childName: z.string().min(2).max(30),
    age: z.number().int().min(1).max(12),
    category: z.nativeEnum(StoryCategory),
});

export const storyRouter = createTRPCRouter({
    generate: protectedProcedure
        .input(storyInputSchema)
        .mutation(async function ({ input, ctx }) {
            try {
                const story = await generateStory({
                    childName: input.childName,
                    childAge: input.age,
                    category: input.category,
                });

                // Save the story to the database
                const savedStory = await ctx.db.story.create({
                    data: {
                        title: story.title,
                        content: story.content,
                        childName: input.childName,
                        authorId: ctx.session.user.id,
                        categories: {
                            create: [
                                {
                                    name: story.category,
                                    ageRange: story.ageGroup,
                                    theme: story.category,
                                    length: story.readingTimeMinutes <= 5 ? "Short" : "Medium",
                                },
                            ],
                        },
                    },
                });

                return {
                    ...story,
                    id: savedStory.id,
                };
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to generate story: ${error.message}`);
                }
                throw error;
            }
        }),
}); 