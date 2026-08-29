import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.user || null;
}

export const requireRole = async (role) => {
    const sessionUser = await getUserSession();
    
    if (!sessionUser) {
        redirect('/signIn');
    }

    // Fetch live user status directly from database
    let liveUser = null;
    try {
        const res = await fetch(`${baseURL}/api/users/me?email=${sessionUser.email}`, {
            cache: 'no-store' // Ensure fresh data on every request
        });
        if (res.ok) {
            liveUser = await res.json();
        }
    } catch (error) {
        console.error("Failed to check user status:", error);
    }

    // 1. Check if user is blocked
    const status = liveUser?.status || sessionUser.status;
    if (status?.toLowerCase() === 'blocked') {
        redirect('/unauthorized?reason=blocked');
    }

    // 2. Check role permission
    const currentRole = liveUser?.role || sessionUser.role;
    if (role && currentRole?.toLowerCase() !== role.toLowerCase()) {
        redirect('/unauthorized');
    }

    return liveUser || sessionUser;
}