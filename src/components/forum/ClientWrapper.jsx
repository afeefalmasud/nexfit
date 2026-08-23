"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ForumCard from "./Card";

export default function ForumClientWrapper({ initialPosts = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const postList = Array.isArray(initialPosts)
    ? initialPosts
    : initialPosts?.posts || initialPosts?.data || [];

  const filteredPosts = postList.filter((post) => {
    const title = post.title || "";
    const description = post.description || post.content || "";
    const term = searchTerm.toLowerCase().trim();

    return (
      title.toLowerCase().includes(term) ||
      description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 bg-[#0a0604] border-t border-white/5">
      <div className="container mx-auto pt-10 pb-16 px-6">
        <div className="bg-[#120c09] mb-10 border border-white/5 rounded-2xl p-2.5 md:p-3 max-w-full">
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full bg-[#18100c] border border-white/5 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316]/50 transition-colors"
            />
          </div>
        </div>

        {/* Posts Cards Grid */}
        {filteredPosts.length > 0 ? (
          <ForumCard posts={filteredPosts} />
        ) : (
          <div className="bg-[#120c09] border border-white/5 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-2">
            <p className="text-sm text-gray-300 font-bold uppercase tracking-wider">
              No posts found
            </p>
            <p className="text-xs text-gray-500">
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
