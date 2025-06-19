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
import { AuthAwareNavLinks } from "@/components/nav/auth-aware-nav-links";

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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72" ref={sheetContentRef}>
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-4">
          <Link
            href="/"
            className="hover:text-primary text-base font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <div className="mt-4">
            <AuthAwareNavLinks variant="mobile" />
          </div>
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
                    {session.user?.name || session.user?.email}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    aria-label="Sign out of your account"
                  >
                    Logout
                  </Button>
                </>
              ) : null}
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
