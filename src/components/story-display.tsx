import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Story {
  title: string;
  content: string;
  moralLesson?: string;
  suggestedQuestions?: string[];
}

interface StoryDisplayProps {
  story: Story;
  className?: string;
}

export function StoryDisplay({ story, className }: StoryDisplayProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose prose-stone dark:prose-invert">
          {story.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {story.moralLesson && (
          <div>
            <h3 className="font-semibold">Moral of the Story</h3>
            <p className="text-muted-foreground">{story.moralLesson}</p>
          </div>
        )}
        {story.suggestedQuestions && (
          <div>
            <h3 className="font-semibold">Discussion Questions</h3>
            <ul className="list-disc pl-4">
              {story.suggestedQuestions.map((question, index) => (
                <li key={index} className="text-muted-foreground">
                  {question}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
