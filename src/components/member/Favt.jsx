'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function FavoriteClasses() {
  const { data: session, isPending } = useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const userId = session?.user?.id || session?.user?._id;

    if (!userId) {
      if (!isPending) setLoading(false);
      return;
    }

    fetch(`${baseURL}/api/favorites/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load favorites:', err);
        setLoading(false);
      });
  }, [session, isPending]);

  // Handle dynamic removal (calls backend API to toggle/delete)
  const handleRemove = async (classId) => {
    const userId = session?.user?.id || session?.user?._id;
    if (!userId || !classId) return;

    // Optimistically update UI
    setFavorites((prev) => prev.filter((item) => (item.classId || item._id) !== classId));

    try {
      await fetch(`${baseURL}/api/favorites/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, classId }),
      });
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  if (loading || isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#f97316] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Info */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          MEMBER
        </span>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          FAVORITE CLASSES
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Sessions you've saved for later. Remove any you're no longer interested in.
        </p>
      </div>

      {/* Cards Grid */}
      {favorites.length === 0 ? (
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-12 text-center space-y-3">
          <p className="text-xs text-[#9CA3AF]">No saved favorite classes yet.</p>
          <Link
            href="/classes"
            className="inline-block px-4 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold uppercase rounded-lg transition-colors"
          >
            Explore Classes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {favorites.map((item) => {
            const targetClassId = item.classId || item._id;
            console.log(item.coverImage)
            return (
              <div
                key={item._id || targetClassId}
                className="bg-[#120c09] border border-white/5 rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-white/10"
              >
                {/* Thumbnail Image */}
                <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-[#1e1510]">
                  <Image
                    src={item.coverImage}
                    alt={item.className || 'Fitness Class'}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details & Actions */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase text-white truncate tracking-tight">
                      {item.className || item.title || 'Fitness Class'}
                    </h3>
                    <p className="text-[11px] text-[#9CA3AF] truncate mt-0.5">
                       ${item.price || '0'}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={`/classes/${targetClassId}`}
                      className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold uppercase transition-colors"
                    >
                      VIEW
                    </Link>

                    <button
                      onClick={() => handleRemove(targetClassId)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-500/80 hover:text-red-400 hover:bg-red-500/10 text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
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