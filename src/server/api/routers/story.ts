import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateStory } from "@/lib/ai/story";
import { StoryGenerationError, API_ERROR_CODES } from "@/lib/api-error";
import { StoryCategory } from "@/lib/ai/story-prompt";

const storyInputSchema = z.object({
    childName: z.string().min(1, "Child's name is required"),
    age: z.number().min(1, "Age must be at least 1").max(12, "Age must be 12 or less"),
    category: z.nativeEnum(StoryCategory),
});

export const storyRouter = createTRPCRouter({
    generate: protectedProcedure
        .input(storyInputSchema)
        .mutation(async ({ input, ctx }) => {
            try {
                const story = await generateStory({
                    childName: input.childName,
                    childAge: input.age,
                    category: input.category,
                });

                // Save story to database
                const savedStory = await ctx.db.story.create({
                    data: {
                        title: story.title,
                        content: story.content,
                        childName: input.childName,
                        author: {
                            connect: {
                                id: ctx.session.user.id,
                            },
                        },
                        categories: {
                            create: [
                                {
                                    name: story.category,
                                    ageRange: `${input.age}-${input.age + 2} years`,
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
                    if (error.message.includes('OpenAI')) {
                        throw new StoryGenerationError(
                            'Failed to generate story. Please try again.',
                            API_ERROR_CODES.OPENAI_ERROR
                        );
                    }
                    if (error.message.includes('database')) {
                        throw new StoryGenerationError(
                            'Failed to save story. Please try again.',
                            API_ERROR_CODES.DATABASE_ERROR
                        );
                    }
                }
                throw new StoryGenerationError(
                    'An unexpected error occurred.',
                    API_ERROR_CODES.UNKNOWN_ERROR
                );
            }
        }),
}); 