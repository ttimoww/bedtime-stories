"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

const routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Generate",
    href: "/generate",
  },
  {
    label: "Library",
    href: "/library",
  },
];

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center", className)}>
      <nav className="hidden items-center space-x-6 md:flex">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "hover:text-primary text-sm font-medium transition-colors",
              pathname === route.href
                ? "text-black dark:text-white"
                : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
