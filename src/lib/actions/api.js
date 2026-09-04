import { authClient } from "../auth-client";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const session = await authClient.getSession();
  const token = session?.data?.session?.token;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && typeof window !== "undefined") {
    console.error("401 Unauthorized hit at:", endpoint);
  }

  return response;
};