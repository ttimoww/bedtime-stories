import { StoryPreview } from "@/components/story-preview";

// Example story data - will be replaced with real data from the database
const exampleStory = {
  id: "1",
  title: "The Magical Garden",
  content:
    "A brave little rabbit discovers a magical garden filled with talking flowers. As he explores the enchanted space, he learns valuable lessons about friendship and courage. The flowers teach him that true beauty comes from being kind to others, and that even the smallest creatures can make a big difference in the world.",
  createdAt: new Date("2024-03-15"),
};

export default function LibraryPage() {
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Example story card - will be dynamic in the future */}
        <StoryPreview story={exampleStory} />
      </div>
    </main>
  );
}
