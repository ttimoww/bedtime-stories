"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          <h1 className="text-3xl font-bold tracking-tight">Error</h1>
          <p className="text-muted-foreground">A personalized bedtime story</p>
        </div>
      </div>

      <div className="bg-destructive/15 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-destructive text-sm font-medium">
              Error loading story
            </h3>
            <div className="text-destructive/90 mt-2 text-sm">
              {error.message}
            </div>
            <div className="mt-4">
              <Button onClick={() => reset()}>Try again</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
