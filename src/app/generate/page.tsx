import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function GeneratePage() {
  return (
    <main className="container mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate a Bedtime Story</CardTitle>
          <CardDescription>
            Describe what kind of story you would like to generate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Example: A magical adventure about a brave little rabbit who discovers a secret garden..."
            className="min-h-[100px]"
          />
          <Button className="w-full">Generate Story</Button>
        </CardContent>
      </Card>
    </main>
  );
}
