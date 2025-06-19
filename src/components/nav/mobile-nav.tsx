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

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  // Handle keyboard navigation
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open main menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72"
        role="dialog"
        aria-label="Main navigation"
        onKeyDown={handleKeyDown}
      >
        <SheetHeader className="mb-4 border-b pb-4">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav
          id="mobile-menu"
          className="flex flex-col space-y-3"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <Link
            href="/"
            className="hover:text-primary text-sm font-medium transition-colors"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/stories"
            className="hover:text-primary text-sm font-medium transition-colors"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Stories
          </Link>
          <Link
            href="/about"
            className="hover:text-primary text-sm font-medium transition-colors"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <div className="mt-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <Button variant="outline" asChild onClick={() => setOpen(false)}>
                <Link href="/login" role="menuitem">
                  Login
                </Link>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/signup" role="menuitem">
                  Sign up
                </Link>
              </Button>
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

export default MobileNav;
