import { StoryDisplay } from "@/components/story-display";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { api } from "@/trpc/react";
import { redirect, useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";
import type { AppRouter } from "@/server/api/root";

export default function StoryPage({ params }: { params: { id: string } }) {
  const {
    data: story,
    isLoading,
    error,
  } = api.story.getById.useQuery(
    { id: params.id },
    {
      retry: false,
    },
  );

  if (
    error &&
    (error as TRPCClientError<AppRouter>).data?.code === "NOT_FOUND"
  ) {
    redirect("/library");
  }

  return (
    <main className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/library">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back to library</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {story?.title ?? "Loading..."}
          </h1>
          <p className="text-muted-foreground">A personalized bedtime story</p>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        </div>
      )}

      {error &&
        (error as TRPCClientError<AppRouter>).data?.code !== "NOT_FOUND" && (
          <div className="bg-destructive/15 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-destructive text-sm font-medium">
                  Error loading story
                </h3>
                <div className="text-destructive/90 mt-2 text-sm">
                  {error.message}
                </div>
              </div>
            </div>
          </div>
        )}

      {story && (
        <StoryDisplay
          story={{
            title: story.title,
            content: story.content,
            // We don't have these fields in the database yet, but they're optional
            moralLesson: undefined,
            suggestedQuestions: undefined,
          }}
        />
      )}
    </main>
  );
}
