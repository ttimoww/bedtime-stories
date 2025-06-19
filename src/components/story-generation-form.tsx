"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  category: z.string({
    required_error: "Please select a story category.",
  }),
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

const defaultValues: Partial<StoryFormValues> = {
  childName: "",
  age: undefined,
  category: "",
};

export function StoryGenerationForm() {
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues,
  });

  function handleSubmit(data: StoryFormValues) {
    // TODO: Handle form submission
    console.log(data);
  }

  return (
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
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  placeholder="Enter your child's age"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                We'll adjust the story's complexity based on age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StoryCategoryPicker control={form.control} name="category" />
        <Button type="submit" className="w-full">
          Generate Story
        </Button>
      </form>
    </Form>
  );
}
