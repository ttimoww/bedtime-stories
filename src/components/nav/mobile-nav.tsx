"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/theme-toggle";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";

export default function MobileNav() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [isOpen, setIsOpen] = React.useState(false);

  async function handleSignOut() {
    try {
      const promise = signOut({ callbackUrl: "/" });
      toast.promise(promise, {
        loading: "Signing out...",
        success: "Successfully signed out",
        error: "Failed to sign out",
      });
      await promise;
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  }

  // Handle keyboard navigation
  React.useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Handle focus trap
  const sheetContentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isOpen && sheetContentRef.current) {
      const focusableElements = sheetContentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      function handleTabKey(e: KeyboardEvent) {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        }
      }

      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 md:hidden"
          aria-label="Open mobile menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="pr-0"
        ref={sheetContentRef}
        role="dialog"
        aria-label="Mobile navigation menu"
        id="mobile-menu"
      >
        <SheetHeader className="mb-4 border-b pb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav
          className="flex flex-col space-y-3"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <Link
            href="/"
            className="hover:text-primary text-sm font-medium transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Go to homepage"
          >
            Home
          </Link>
          <Link
            href="/stories"
            className="hover:text-primary text-sm font-medium transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="View stories"
          >
            Stories
          </Link>
          <Link
            href="/about"
            className="hover:text-primary text-sm font-medium transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Learn more about us"
          >
            About
          </Link>
          <div className="mt-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              {isLoading ? (
                <div
                  className="bg-muted h-9 w-full animate-pulse rounded-md"
                  role="status"
                  aria-label="Loading user session"
                />
              ) : session ? (
                <>
                  <div
                    className="mb-2 text-sm font-medium"
                    role="status"
                    aria-label="Logged in as"
                  >
                    {session.user?.name ?? session.user?.email}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    aria-label="Sign out of your account"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    asChild
                    aria-label="Sign in to your account"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild aria-label="Create a new account">
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </>
              )}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
