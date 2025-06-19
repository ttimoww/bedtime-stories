import { StoryDisplay } from "@/components/story-display";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await api.story.getById({ id });

  if (!story) {
    notFound();
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
          <h1 className="text-3xl font-bold tracking-tight">{story.title}</h1>
          <p className="text-muted-foreground">A personalized bedtime story</p>
        </div>
      </div>

      <StoryDisplay
        story={{
          title: story.title,
          content: story.content,
          // We don't have these fields in the database yet, but they're optional
          moralLesson: undefined,
          suggestedQuestions: undefined,
        }}
      />
    </main>
  );
}
