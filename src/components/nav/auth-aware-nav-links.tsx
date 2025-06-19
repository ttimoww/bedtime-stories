"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const authenticatedRoutes = [
  {
    label: "Create Story",
    href: "/generate",
  },
  {
    label: "Library",
    href: "/library",
  },
];

const unauthenticatedRoutes = [
  {
    label: "Sign Up",
    href: "/signup",
  },
  {
    label: "Login",
    href: "/login",
  },
];

interface AuthAwareNavLinksProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export function AuthAwareNavLinks({
  className,
  variant = "desktop",
}: AuthAwareNavLinksProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div
        className={cn("flex items-center space-x-6", className)}
        role="navigation"
      >
        <div className="bg-muted h-4 w-20 animate-pulse rounded" />
        <div className="bg-muted h-4 w-20 animate-pulse rounded" />
      </div>
    );
  }

  const routes = session ? authenticatedRoutes : unauthenticatedRoutes;

  if (variant === "mobile") {
    return (
      <div
        className={cn("flex flex-col space-y-4", className)}
        role="navigation"
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "hover:text-primary text-base font-medium transition-colors",
              pathname === route.href
                ? "text-black dark:text-white"
                : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center space-x-6", className)}
      role="navigation"
    >
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
    </div>
  );
}
