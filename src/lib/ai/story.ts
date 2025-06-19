import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import {
    StorySchema,
    createStoryPrompt
} from './story-prompt';
import type {
    Story,
    StoryPromptInput
} from './story-prompt';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStory(input: StoryPromptInput): Promise<Story> {
    try {
        const { object: story } = await generateObject({
            model: openai('gpt-4-turbo-preview'),
            schema: StorySchema,
            prompt: createStoryPrompt(input)
        });

        return story;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to generate story: ${error.message}`);
        }
        throw error;
    }
} 