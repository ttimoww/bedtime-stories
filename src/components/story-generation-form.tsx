"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StoryCategoryPicker } from "@/components/story-category-picker";
import { api } from "@/trpc/react";
import { StoryCategory } from "@/lib/ai/story-prompt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const storyFormSchema = z.object({
  childName: z
    .string()
    .min(2, {
      message: "Child's name must be at least 2 characters.",
    })
    .max(30, {
      message: "Child's name must not be longer than 30 characters.",
    }),
  age: z.coerce
    .number()
    .min(1, {
      message: "Age must be at least 1 year.",
    })
    .max(12, {
      message: "Age must not be more than 12 years.",
    })
    .int({
      message: "Age must be a whole number.",
    }),
  category: z.nativeEnum(StoryCategory, {
    required_error: "Please select a story category.",
  }),
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

const defaultValues: Partial<StoryFormValues> = {
  childName: "",
  age: undefined,
  category: undefined,
};

export function StoryGenerationForm() {
  const [generatedStory, setGeneratedStory] = useState<{
    title: string;
    content: string;
    moralLesson?: string;
    suggestedQuestions?: string[];
  } | null>(null);

  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues,
  });

  const generateStory = api.story.generate.useMutation({
    onSuccess: (story) => {
      setGeneratedStory(story);
    },
  });

  function handleSubmit(data: StoryFormValues) {
    setGeneratedStory(null);
    generateStory.mutate(data);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="childName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child's Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your child's name" {...field} />
                </FormControl>
                <FormDescription>
                  This will be used to personalize the story.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child's Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your child's age"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We'll adjust the story's complexity based on age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Story Category</FormLabel>
                <FormControl>
                  <StoryCategoryPicker control={form.control} name="category" />
                </FormControl>
                <FormDescription>
                  Choose the type of story you'd like to generate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {generateStory.error && (
            <div className="bg-destructive/15 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-destructive text-sm font-medium">
                    Error generating story
                  </h3>
                  <div className="text-destructive/90 mt-2 text-sm">
                    {generateStory.error.message}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={generateStory.isPending}
            className="w-full"
          >
            {generateStory.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating your story...
              </>
            ) : (
              "Generate Story"
            )}
          </Button>
        </form>
      </Form>

      {generatedStory && (
        <Card>
          <CardHeader>
            <CardTitle>{generatedStory.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-stone dark:prose-invert">
              {generatedStory.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {generatedStory.moralLesson && (
              <div>
                <h3 className="font-semibold">Moral of the Story</h3>
                <p className="text-muted-foreground">
                  {generatedStory.moralLesson}
                </p>
              </div>
            )}
            {generatedStory.suggestedQuestions && (
              <div>
                <h3 className="font-semibold">Discussion Questions</h3>
                <ul className="list-disc pl-4">
                  {generatedStory.suggestedQuestions.map((question, index) => (
                    <li key={index} className="text-muted-foreground">
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
