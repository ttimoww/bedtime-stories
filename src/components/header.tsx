"use client";

import Link from "next/link";
import { MainNav } from "@/components/nav/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/nav/mobile-nav";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Bedtime Stories</span>
        </Link>
        <MobileNav />
        <MainNav className="hidden md:flex" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
