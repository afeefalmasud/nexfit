'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

const LatestForum = ({ initialPosts = [] }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    if (initialPosts.length > 0) return;

    const fetchLatestPosts = async () => {
      try {
        const res = await fetch(`${baseURL}/api/forum/latest`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to load forum posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, [initialPosts]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Mar 14, 2026';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <section className="bg-[#120D0B] py-16 px-4 md:px-8 text-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[#f97316] text-xs font-bold tracking-[0.2em] uppercase">
              FROM THE COMMUNITY
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase">
              LATEST FORUM POSTS
            </h2>
          </div>

          <Link
            href="/forum"
            className="flex items-center gap-1.5 text-xs font-bold text-[#f97316] hover:text-[#fb923c] transition-colors group"
          >
            <span>All posts</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-[#120c09] h-96 rounded-2xl border border-white/5" />
            ))}
          </div>
        ) : (
          /* 4 Card Responsive Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.slice(0, 4).map((item) => (
              <div
                key={item._id}
                className="bg-[#1C1512]  border-2 border-white/5 hover:border-[#f97316]/40 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-[#f97316]/10 flex flex-col group cursor-pointer"
              >
                {/* Image Container with Role Badge */}
                <div className="relative h-48 w-full bg-[#1b120c] overflow-hidden p-2.5">
                  <img
                    src={item.coverImage || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600'}
                    alt={item.title || 'Forum post cover'}
                    className="w-full h-full object-cover rounded-xl"
                  />

                  {/* Author Role Badge (Trainer / Admin / Member) */}
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md">
                    {item.role || 'Member'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Title */}
                    <h3 className="text-sm font-extrabold uppercase text-white tracking-wide line-clamp-2 leading-snug group-hover:text-[#f97316] transition-colors duration-300">
                      {item.title || 'COMMUNITY POST'}
                    </h3>

                    {/* Excerpt / Description */}
                    <p className="text-xs text-gray-400 mt-2 font-normal line-clamp-3 leading-relaxed">
                      {item.description || item.content || 'Read standard guidelines and discussions from community members.'}
                    </p>
                  </div>

                  {/* Card Footer: Author Name, Date, and Read More Link */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-300 truncate max-w-[100px]">
                        {item.authorName || 'Community Member'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-500">
                        {formatDate(item.createdAt)}
                      </span>

                      {/* Read More Link (No like or comment icons) */}
                      <Link
                        href={`/community/${item._id}`}
                        className="text-[#f97316] hover:text-[#fb923c] font-bold text-xs transition-colors"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestForum;