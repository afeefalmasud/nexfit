'use client';

import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';
import { useSearchParams } from 'next/navigation';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function ClassDetailsClient({
  classId,
  className = 'Fitness Class',
  price = '24',
  schedule = 'Mon, Wed, Fri — 6:30 AM',
  duration = '45',
  level = 'Advanced',
  capacity = '14 places',
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const searchParams = useSearchParams();

  const [isFavorited, setIsFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Fetch initial booking status & handle post-checkout confirmation
  useEffect(() => {
    const checkAndConfirmBooking = async () => {
      const userId = user?.id || user?._id;
      if (!userId || !classId) return;

      const paymentSuccess =
        searchParams.get('payment') === 'success' || searchParams.get('session_id');

      if (paymentSuccess) {
        try {
          await fetch(`${baseURL}/api/bookings/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              classId,
              className,
              price,
            }),
          });
          setIsBooked(true);
          return;
        } catch (err) {
          console.error('Failed to confirm booking:', err);
        }
      }

      try {
        const res = await fetch(
          `${baseURL}/api/bookings/check?userId=${userId}&classId=${classId}`
        );
        const data = await res.json();
        setIsBooked(data.isBooked);
      } catch (err) {
        console.error('Error checking booking status:', err);
      }
    };

    checkAndConfirmBooking();
  }, [user, classId, searchParams, className, price]);

  // 2. Fetch initial favorite status
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const userId = user?.id || user?._id;
      if (!userId || !classId) return;

      try {
        const res = await fetch(
          `${baseURL}/api/favorites/check?userId=${userId}&classId=${classId}`
        );
        const data = await res.json();
        setIsFavorited(Boolean(data.isFavorited));
      } catch (err) {
        console.error('Error checking favorite status:', err);
      }
    };

    checkFavoriteStatus();
  }, [user, classId]);

  // 3. Toggle Favorite Handler
  const handleToggleFavorite = async () => {
    const userId = user?.id || user?._id;

    if (!userId) {
      alert('Please log in to save favorites.');
      return;
    }

    setFavLoading(true);

    try {
      const res = await fetch(`${baseURL}/api/favorites/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          classId,
          className,
          price,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsFavorited(data.isFavorited);
      } else {
        alert(data.error || 'Failed to update favorite');
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setFavLoading(false);
    }
  };

  const handleBookNow = async () => {
    setErrorMessage('');
    const userId = user?.id || user?._id;

    if (!userId) {
      alert('Please log in to book this class.');
      return;
    }

    if (user?.role === 'trainer') {
      setErrorMessage('Trainers are not allowed to buy courses.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId,
          className,
          price,
          userId,
          userEmail: user.email,
          userRole: user.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to start payment session');
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 sticky top-6">
      <div>
        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          Per session
        </span>
        <div className="text-4xl font-black text-[#f97316]">${price}</div>
      </div>

      {errorMessage && (
        <p className="text-xs text-red-500 font-bold tracking-wide uppercase">
          {errorMessage}
        </p>
      )}

      <div className="space-y-3">
        <button
          onClick={handleBookNow}
          disabled={loading || isBooked || user?.role === 'trainer'}
          className={`w-full py-3.5 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 ${
            isBooked
              ? 'bg-green-600/20 text-green-500 border border-green-500/30 cursor-not-allowed'
              : user?.role === 'trainer'
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.99] text-white shadow-lg shadow-[#f97316]/20'
          }`}
        >
          {loading
            ? 'PROCESSING...'
            : isBooked
            ? 'ALREADY BOOKED'
            : user?.role === 'trainer'
            ? 'TRAINERS CANNOT BOOK'
            : 'BOOK NOW'}
        </button>

        <button
          onClick={handleToggleFavorite}
          disabled={favLoading}
          className={`w-full py-3.5 bg-[#1b120c] hover:bg-[#281b13] border border-white/10 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            isFavorited ? 'text-[#f97316] border-[#f97316]/40' : 'text-gray-300'
          } ${favLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FiHeart className={isFavorited ? 'fill-[#f97316] text-[#f97316]' : ''} />
          <span>
            {favLoading
              ? 'SAVING...'
              : isFavorited
              ? 'ADDED TO FAVORITES'
              : 'ADD TO FAVORITES'}
          </span>
        </button>
      </div>
    </div>
  );
}