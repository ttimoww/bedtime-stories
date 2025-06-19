import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LibraryPage() {
  return (
    <main className="container mx-auto space-y-6">
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
        <Card>
          <CardHeader>
            <CardTitle>The Magical Garden</CardTitle>
            <CardDescription>Created on March 15, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              A brave little rabbit discovers a magical garden filled with
              talking flowers...
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
