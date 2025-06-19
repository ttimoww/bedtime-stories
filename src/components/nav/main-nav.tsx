"use client";

import { cn } from "@/lib/utils";
import { AuthAwareNavLinks } from "@/components/nav/auth-aware-nav-links";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <nav className="hidden items-center space-x-6 md:flex">
        <AuthAwareNavLinks />
      </nav>
    </div>
  );
}
