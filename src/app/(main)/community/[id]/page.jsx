// app/forum/[id]/page.jsx

import ForumDetailsClient from "@/components/forumdetails/forumdetails";
import { notFound } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

async function getPostData(id) {
  try {
    const res = await fetch(`${baseURL}/api/forum/${id}`, {
      cache: "no-store",
    });
    
    // Debug step: Log status if fetch fails
    if (!res.ok) {
      console.log(`Fetch failed with status: ${res.status}`);
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error("Error fetching post details:", error);
    return null;
  }
}

export default async function PostDetailPage({ params }) {
  // Await params properly for Next.js 15+
  const resolvedParams = await params;
  const postId = resolvedParams?.id;

  if (!postId) {
    notFound();
  }

  const initialPostData = await getPostData(postId);

  // TEMPORARY FIX: Comment out notFound() to debug if data is returning null
  if (!initialPostData) {
    console.log("No post data returned for ID:", postId);
    notFound(); 
  }

  return (
    <ForumDetailsClient postId={postId} initialPostData={initialPostData} />
  );
}