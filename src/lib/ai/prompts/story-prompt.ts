import { z } from 'zod';

export const StoryCategory = {
    Adventure: 'adventure',
    Fantasy: 'fantasy',
    Educational: 'educational',
    Bedtime: 'bedtime',
    Moral: 'moral',
} as const;

export type StoryCategory = typeof StoryCategory[keyof typeof StoryCategory];

export const StorySchema = z.object({
    title: z.string(),
    content: z.string(),
    moralLesson: z.string().optional(),
    suggestedQuestions: z.array(z.string()).optional(),
    ageGroup: z.string(),
    category: z.enum([
        StoryCategory.Adventure,
        StoryCategory.Fantasy,
        StoryCategory.Educational,
        StoryCategory.Bedtime,
        StoryCategory.Moral
    ]),
    readingTimeMinutes: z.number(),
});

export type Story = z.infer<typeof StorySchema>;

export interface StoryPromptInput {
    childName: string;
    childAge: number;
    category: StoryCategory;
}

function getAgeGroupPrompt(age: number): string {
    if (age <= 3) return 'very simple language suitable for toddlers';
    if (age <= 6) return 'simple language suitable for young children';
    if (age <= 9) return 'moderately complex language suitable for school-age children';
    return 'more advanced language suitable for pre-teens';
}

function getCategoryPrompt(category: StoryCategory): string {
    const prompts = {
        [StoryCategory.Adventure]: 'an exciting adventure story with action and discovery',
        [StoryCategory.Fantasy]: 'a magical fantasy story with imaginative elements',
        [StoryCategory.Educational]: 'an educational story that teaches about the world in a fun way',
        [StoryCategory.Bedtime]: 'a calming bedtime story that helps wind down for sleep',
        [StoryCategory.Moral]: 'a story with a clear moral lesson about good values',
    };
    return prompts[category];
}

export function createStoryPrompt(input: StoryPromptInput): string {
    const { childName, childAge, category } = input;
    const ageGroupPrompt = getAgeGroupPrompt(childAge);
    const categoryPrompt = getCategoryPrompt(category);

    return `You are a creative children's story writer. You excel at creating engaging, age-appropriate stories that capture children's imagination while maintaining appropriate language and themes for their age group.

Create a story for a child named ${childName} who is ${childAge} years old. 
The story should be ${categoryPrompt}, using ${ageGroupPrompt}.

Make sure the story:
1. Is engaging and age-appropriate
2. Uses the child's name naturally in the story
3. Has a clear beginning, middle, and end
4. Includes descriptive language and dialogue
5. Avoids any scary or inappropriate content
6. Maintains a consistent tone throughout`;
} 