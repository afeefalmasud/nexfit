'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Saving your booking...');

  const sessionId = searchParams.get('session_id');
  const userId = searchParams.get('userId');
  const classId = searchParams.get('classId');
  const className = searchParams.get('className');
  const price = searchParams.get('price');

  useEffect(() => {
    if (userId && classId) {
      // Direct call to save booking into MongoDB
      fetch(`${baseURL}/api/bookings/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, classId, className, price }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus('Booking confirmed & saved successfully!');
          } else {
            setStatus('Booking complete, but database update failed.');
          }
        })
        .catch((err) => {
          console.error('Failed to update DB:', err);
          setStatus('Payment complete. Syncing database...');
        });
    }
  }, [userId, classId, className, price]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="bg-[#120c09] border border-white/10 rounded-3xl p-8 md:p-12 max-w-md w-full text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 bg-[#f97316]/10 border border-[#f97316]/30 rounded-full flex items-center justify-center mx-auto text-[#f97316]">
          <FiCheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
            PAYMENT SUCCESSFUL
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-white tracking-tight">
            BOOKING CONFIRMED!
          </h1>
          <p className="text-xs text-[#9CA3AF]">{status}</p>
        </div>

        {sessionId && (
          <div className="bg-[#1b120c] p-3 rounded-xl border border-white/5">
            <p className="text-[10px] text-gray-500 font-mono break-all">
              Session ID: {sessionId}
            </p>
          </div>
        )}

        <div className="pt-2 space-y-3">
          <Link
            href="/member"
            className="w-full py-3.5 bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.99] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all inline-block shadow-lg shadow-[#f97316]/20"
          >
            GO TO DASHBOARD
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center text-white py-20">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}