export class StoryGenerationError extends Error {
    constructor(message: string, public readonly code: string) {
        super(message);
        this.name = 'StoryGenerationError';
    }
}

export const API_ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    OPENAI_ERROR: 'OPENAI_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
    RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type APIErrorCode = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];

export function getErrorMessage(error: unknown): { message: string; code: APIErrorCode } {
    if (error instanceof StoryGenerationError) {
        return { message: error.message, code: error.code as APIErrorCode };
    }

    if (error instanceof Error) {
        if (error.message.includes('OpenAI')) {
            return {
                message: 'An error occurred while generating the story. Please try again.',
                code: API_ERROR_CODES.OPENAI_ERROR
            };
        }
        if (error.message.includes('rate limit')) {
            return {
                message: 'Too many requests. Please wait a moment before trying again.',
                code: API_ERROR_CODES.RATE_LIMIT_ERROR
            };
        }
        if (error.message.includes('network')) {
            return {
                message: 'Network error. Please check your connection and try again.',
                code: API_ERROR_CODES.NETWORK_ERROR
            };
        }
        if (error.message.includes('database')) {
            return {
                message: 'Error saving the story. Please try again.',
                code: API_ERROR_CODES.DATABASE_ERROR
            };
        }
    }

    return {
        message: 'An unexpected error occurred. Please try again.',
        code: API_ERROR_CODES.UNKNOWN_ERROR
    };
} 