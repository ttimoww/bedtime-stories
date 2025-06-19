import { StoryGenerationForm } from "@/components/story-generation-form";

export default function GeneratePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold">Generate a Story</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create a personalized bedtime story.
          </p>
        </div>
        <StoryGenerationForm />
      </div>
    </div>
  );
}
