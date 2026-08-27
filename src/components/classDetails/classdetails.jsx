'use client';

import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';

export default function ClassDetailsClient({
  classId,
  price = '24',
  schedule = 'Mon, Wed, Fri — 6:30 AM',
  duration = '45',
  level = 'Advanced',
  capacity = '14 places',
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBookNow = () => {
    setLoading(true);
    // Add your booking logic or API call here
    setTimeout(() => {
      alert('Booking initiated!');
      setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 sticky top-6">
      {/* Price Header */}
      <div>
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Per session
        </span>
        <div className="text-4xl font-black text-[#f97316]">${price}</div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleBookNow}
          disabled={loading}
          className="w-full py-3.5 bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#f97316]/20 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'PROCESSING...' : 'BOOK NOW'}
        </button>

        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`w-full py-3.5 bg-[#1b120c] hover:bg-[#281b13] border border-white/10 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            isFavorited ? 'text-[#f97316] border-[#f97316]/40' : 'text-gray-300'
          }`}
        >
          <FiHeart className={isFavorited ? 'fill-[#f97316]' : ''} />
          <span>{isFavorited ? 'FAVORITED' : 'ADD TO FAVORITES'}</span>
        </button>
      </div>

      {/* Class Meta Data Grid */}
      <div className="border-t border-white/5 pt-4 space-y-3 text-xs">
        <div className="flex justify-between items-center text-gray-400">
          <span>Schedule</span>
          <span className="text-white font-semibold">{schedule}</span>
        </div>
        <div className="flex justify-between items-center text-gray-400">
          <span>Duration</span>
          <span className="text-white font-semibold">{duration} min</span>
        </div>
        <div className="flex justify-between items-center text-gray-400">
          <span>Difficulty</span>
          <span className="text-white font-semibold capitalize">{level}</span>
        </div>
        <div className="flex justify-between items-center text-gray-400">
          <span>Capacity</span>
          <span className="text-white font-semibold">{capacity}</span>
        </div>
      </div>
    </div>
  );
}