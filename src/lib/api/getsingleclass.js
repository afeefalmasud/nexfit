"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export const SingleClass = async (id) => {
  if (!id) return null;

  try {
    const res = await fetch(`${baseURL}/api/classes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch class");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching class:", error);
    return null;
  }
};