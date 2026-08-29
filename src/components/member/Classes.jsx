'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client'; // Replace with your auth session hook (e.g., Better Auth / NextAuth)

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function BookedClasses() {
  const { data: session, isPending } = useSession();
  const [bookedClasses, setBookedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = session?.user?.id || session?.user?._id;

    if (!userId) {
      if (!isPending) setLoading(false);
      return;
    }

    // Fetch user's bookings from Express backend
    fetch(`${baseURL}/api/bookings/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBookedClasses(data);
        } else if (data.bookings) {
          setBookedClasses(data.bookings);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load booked classes:', err);
        setLoading(false);
      });
  }, [session, isPending]);

  if (loading || isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#f97316] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Info */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          MEMBER
        </span>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          BOOKED CLASSES
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Every class you've paid for, with schedule details and a link back to the session page.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {bookedClasses.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <p className="text-sm text-[#9CA3AF]">You haven't booked any classes yet.</p>
              <Link
                href="/classes"
                className="inline-block px-4 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold uppercase rounded-lg transition-colors"
              >
                Browse Classes
              </Link>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[11px] font-bold text-[#9CA3AF]/60 uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Class Name</th>
                  <th className="py-4 px-6 font-semibold">Schedule</th>
                  <th className="py-4 px-6 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-[#9CA3AF]">
                {bookedClasses.map((item) => (
                  <tr
                    key={item._id || item.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Class Name */}
                    <td className="py-4 px-6 font-semibold text-white">
                      {item.className || item.title || 'Fitness Session'}
                    </td>

                    {/* Schedule */}
                    <td className="py-4 px-6 text-[#9CA3AF]">
                      {item.schedule || item.classSchedule || 'Flexible'}
                    </td>

                    {/* Action Button (Required by Spec) */}
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/classes/${item.classId || item.id}`}
                        className="inline-block px-3 py-1.5 bg-white/5 hover:bg-[#f97316] text-[#9CA3AF] hover:text-white text-[11px] font-bold rounded-lg transition-colors border border-white/10"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}