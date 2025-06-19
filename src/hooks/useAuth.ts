import { useSession } from "next-auth/react";
import { type Session } from "next-auth";

interface UseAuthReturn {
    session: Session | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isError: boolean;
    user: Session["user"] | null;
}

/**
 * Custom hook that wraps NextAuth's useSession with additional utilities
 * @returns {UseAuthReturn} Object containing auth state and helper functions
 */
function useAuth(): UseAuthReturn {
    const { data: session, status } = useSession();

    return {
        session,
        isLoading: status === "loading",
        isAuthenticated: status === "authenticated",
        isError: status === "unauthenticated",
        user: session?.user ?? null,
    };
}

export { useAuth };
export type { UseAuthReturn }; 