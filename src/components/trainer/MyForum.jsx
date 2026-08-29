'use client';

import { getForumByTrainer } from '@/lib/api/getforum';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PostDelete } from './ForumPostDelete';

export default function ForumPostList(id) {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [forum, setForum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && user) {
      const fetchTrainerForums = async () => {
        setIsLoading(true);
        const trainerIdentifier = user.id || user.email;
        const data = await getForumByTrainer(trainerIdentifier);
        setForum(Array.isArray(data) ? data : []);
        setIsLoading(false);
      };

      fetchTrainerForums();
    } else if (!isPending && !user) {
      setIsLoading(false);
    }
  }, [user, isPending]);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Info */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          COMMUNITY
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
          MY FORUM POSTS
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Everything you've published to the NexFit community.
        </p>
      </div>

      {/* Loading Skeleton */}
      {(isLoading || isPending) && (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="bg-[#120c09] border border-white/5 rounded-2xl p-4 md:p-5 flex items-center gap-5 animate-pulse"
            >
              <div className="w-28 h-28 md:w-36 md:h-24 rounded-xl bg-white/5 shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-white/5 rounded-md w-3/4" />
                <div className="h-3 bg-white/5 rounded-md w-1/4" />
                <div className="flex items-center gap-4 pt-1">
                  <div className="h-7 w-16 bg-white/5 rounded-lg" />
                  <div className="h-4 w-14 bg-white/5 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isPending && forum.length === 0 && (
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-8 text-center">
          <p className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">
            No forum posts found.
          </p>
        </div>
      )}

      {/* Forum Posts List */}
      {!isLoading && !isPending && forum.length > 0 && (
        <div className="space-y-4">
          {forum.map((post) => {
            const formattedDate = post?.createdAt
              ? new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })
              : 'Recent';

            return (
              <div
                key={post._id}
                className="bg-[#120c09] border border-white/5 rounded-2xl p-4 md:p-5 flex items-center gap-5 hover:border-white/10 transition-colors"
              >
                {/* Image Container */}
                <div className="w-28 h-28 md:w-36 md:h-24 rounded-xl overflow-hidden bg-[#1b120c] shrink-0 border border-white/5">
                  <img
                    src={
                      post.coverImage ||
                      'https://via.placeholder.com/150?text=No+Image'
                    }
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                </div>

                {/* Post Details */}
                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className="text-base md:text-lg font-extrabold uppercase text-white tracking-tight leading-snug truncate">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#9CA3AF] font-medium">
                    {formattedDate}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-1">
                    {/* View Button */}
                    <Link
                      href={`/community/${post._id}`}// TODO: Add view post link
                      className="px-4 py-1.5 bg-[#f97316]/10 hover:bg-[#f97316]/20 border border-[#f97316]/30 rounded-lg text-[#f97316] text-xs font-black uppercase tracking-wider transition-colors inline-block"
                    >
                      VIEW
                    </Link>

                    {/* Delete Button */}
                    <PostDelete postId={post._id}></PostDelete>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}