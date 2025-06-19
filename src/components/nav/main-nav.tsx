"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Generate Story",
    href: "/generate",
  },
  {
    label: "Library",
    href: "/library",
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6">
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
  );
}
