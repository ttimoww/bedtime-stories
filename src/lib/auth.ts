import { type Session } from "next-auth";

/**
 * Type guard to check if a user object is valid
 */
function isValidUser(user: Session["user"] | null | undefined): user is Session["user"] {
    return Boolean(
        user &&
        typeof user === "object" &&
        "email" in user &&
        typeof user.email === "string"
    );
}

/**
 * Check if a user has specific roles/permissions
 * Can be expanded based on your auth requirements
 */
function hasPermission(
    user: Session["user"] | null | undefined,
    permission: string
): boolean {
    if (!isValidUser(user)) return false;

    // Add your permission logic here
    // This is a placeholder implementation
    return Boolean(user.email);
}

/**
 * Get user display name with fallbacks
 */
function getUserDisplayName(user: Session["user"] | null | undefined): string {
    if (!isValidUser(user)) return "Guest";

    return user.name ?? user.email ?? "User";
}

export {
    isValidUser,
    hasPermission,
    getUserDisplayName,
}; 