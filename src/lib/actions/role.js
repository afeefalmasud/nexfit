import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const getFullSession = async () => {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });
  return session || null;
};

export const requireRole = async (role) => {
  const sessionData = await getFullSession();
  const sessionUser = sessionData?.user;
  const token = sessionData?.session?.token;
  const reqHeaders = await headers();

  if (!sessionUser) {
    redirect("/signIn");
  }

  let liveUser = null;
  try {
    const res = await fetch(`${baseURL}/api/users/me?email=${sessionUser.email}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // Pass BOTH cookie and Bearer token so Express catches either format
        Cookie: reqHeaders.get("cookie") || "",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (res.ok) {
      liveUser = await res.json();
    }
  } catch (error) {
    console.error("Failed to check user status:", error);
  }

  const status = liveUser?.status || sessionUser.status;
  if (status?.toLowerCase() === "blocked") {
    redirect("/unauthorized?reason=blocked");
  }

  const currentRole = liveUser?.role || sessionUser.role;
  if (role && currentRole?.toLowerCase() !== role.toLowerCase()) {
    redirect("/unauthorized");
  }

  return liveUser || sessionUser;
};