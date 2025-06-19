"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LandingPageCTA() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="flex justify-center gap-4">
        <div className="bg-muted h-10 w-32 animate-pulse rounded-md" />
        <div className="bg-muted h-10 w-32 animate-pulse rounded-md" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex justify-center gap-4">
        <Button size="lg" asChild>
          <Link href="/generate">Create a Story</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/library">View Library</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4">
      <Button size="lg" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
      <Button variant="outline" size="lg" asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
