import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Story {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface StoryPreviewProps {
  story: Story;
  className?: string;
}

function truncateText(text: string, maxLength = 150) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function StoryPreview({ story, className }: StoryPreviewProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
        <CardDescription>
          Created on {story.createdAt.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          {truncateText(story.content)}
        </p>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/stories/${story.id}`}>Read Story</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
