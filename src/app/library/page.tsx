"use client";

import { StoryPreview } from "@/components/story-preview";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";

export default function LibraryPage() {
  const { data: stories, isLoading, error } = api.story.getAll.useQuery();

  return (
    <main className="container mx-auto space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Your Story Library
        </h1>
        <p className="text-muted-foreground">
          Browse and read your saved bedtime stories
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-destructive/15 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-destructive text-sm font-medium">
                Error loading stories
              </h3>
              <div className="text-destructive/90 mt-2 text-sm">
                {error.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {stories && stories.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            You haven't created any stories yet. Head over to the story
            generator to create your first story!
          </p>
        </div>
      )}

      {stories && stories.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryPreview
              key={story.id}
              story={{
                id: story.id,
                title: story.title,
                content: story.content,
                createdAt: story.createdAt,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
