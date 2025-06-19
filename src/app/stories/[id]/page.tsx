import { StoryDisplay } from "@/components/story-display";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Example story data - will be replaced with real data from the database
const exampleStory = {
  title: "The Magical Garden",
  content:
    "A brave little rabbit discovers a magical garden filled with talking flowers. As he explores the enchanted space, he learns valuable lessons about friendship and courage. The flowers teach him that true beauty comes from being kind to others, and that even the smallest creatures can make a big difference in the world.",
  moralLesson:
    "Being kind and brave can lead to wonderful discoveries and friendships.",
  suggestedQuestions: [
    "What made the garden magical?",
    "How did the rabbit show courage?",
    "What did the flowers teach the rabbit about kindness?",
  ],
};

export default function StoryPage({ params }: { params: { id: string } }) {
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
            {exampleStory.title}
          </h1>
          <p className="text-muted-foreground">A personalized bedtime story</p>
        </div>
      </div>

      <StoryDisplay story={exampleStory} />
    </main>
  );
}
