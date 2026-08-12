'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';

export default function FavoriteClasses() {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      title: 'SUNRISE VINYASA FLOW',
      trainer: 'Priya Nandal',
      category: 'Yoga',
      price: '$18',
      image: '/images/yoga.jpg', // Replace with your image paths
    },
    {
      id: '2',
      title: 'NIGHTSHIFT BOXING',
      trainer: 'Andre Cole',
      category: 'Boxing',
      price: '$26',
      image: '/images/boxing.jpg',
    },
    {
      id: '3',
      title: 'ENGINE BUILDER CARDIO',
      trainer: 'Marcus Reid',
      category: 'Cardio',
      price: '$20',
      image: '/images/cardio.jpg',
    },
  ]);

  const handleRemove = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

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
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-12 text-center">
          <p className="text-xs text-[#9CA3AF]">No saved favorite classes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-[#120c09] border border-white/5 rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-white/10"
            >
              {/* Thumbnail Image */}
              <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-[#1e1510]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details & Actions */}
              <div className="flex-1 min-w-0 space-y-2">
                <div>
                  <h3 className="text-sm font-extrabold uppercase text-white truncate tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#9CA3AF] truncate mt-0.5">
                    {item.trainer} · {item.category} · {item.price}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href={`/classes/${item.id}`}
                    className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold uppercase transition-colors"
                  >
                    VIEW
                  </Link>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-500/80 hover:text-red-400 hover:bg-red-500/10 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}