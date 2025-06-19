"use client";

import Link from "next/link";
import { MainNav } from "@/components/nav/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/nav/mobile-nav";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";

export function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  async function handleSignOut() {
    try {
      const promise = signOut({ callbackUrl: "/" });
      toast.promise(promise, {
        loading: "Signing out...",
        success: "Successfully signed out",
        error: "Failed to sign out",
      });
      await promise;
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  }

  return (
    <header
      className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
      role="banner"
    >
      <div className="container mx-auto flex h-14 items-center">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2"
          aria-label="Go to homepage"
        >
          <span className="font-bold">Bedtime Stories</span>
        </Link>
        <MobileNav />
        <MainNav className="hidden md:flex" />
        <div className="ml-auto flex items-center space-x-4">
          <div
            className="hidden md:flex md:items-center md:space-x-4"
            role="navigation"
            aria-label="User navigation"
          >
            {isLoading ? (
              <div
                className="bg-muted h-9 w-[146px] animate-pulse rounded-md"
                role="status"
                aria-label="Loading user session"
              />
            ) : session ? (
              <div className="flex items-center gap-4">
                <span
                  className="text-sm"
                  role="status"
                  aria-label="Logged in as"
                >
                  {session.user?.name ?? session.user?.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  aria-label="Sign out of your account"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  aria-label="Sign in to your account"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild aria-label="Create a new account">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
