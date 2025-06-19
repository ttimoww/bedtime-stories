import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Loading() {
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
          <h1 className="text-3xl font-bold tracking-tight">Loading...</h1>
          <p className="text-muted-foreground">A personalized bedtime story</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-8">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    </main>
  );
}
