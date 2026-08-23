"use server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const AllClass = async () => {
  try {
    const res = await fetch(`${baseURL}/api/classes`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch classes");
    }
    return await res.json();

  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
};
