'use client'

import { useState, useEffect } from 'react';
import { getClassesByTrainer } from '@/lib/api/getclass';
import { useSession } from '@/lib/auth-client';

export default function MyClasses() {
 const { data: session, isPending } = useSession();
  const user = session?.user;

  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  if (!isPending && user) {
    const fetchTrainerClasses = async () => {
      setIsLoading(true);
      const trainerIdentifier = user.id || user.email;
      const data = await getClassesByTrainer(trainerIdentifier);
      setClasses(data);
      setIsLoading(false);
    };

    fetchTrainerClasses();
  } else if (!isPending && !user) {
    setIsLoading(false);
  }
}, [user, isPending]);
  // Helper for rendering status badges
  const getStatusBadge = (status) => {
    const normalizedStatus = status?.toLowerCase() || 'pending';

    switch (normalizedStatus) {
      case 'approved':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Approved
          </span>
        );
      case 'declined':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
            Declined
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Info */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          COACHING
        </span>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          MY CLASSES
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Manage your submitted classes and track their approval status.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-xs text-[#9CA3AF]">
            Loading your classes...
          </div>
        ) : classes.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#9CA3AF]">
            No classes found. Add your first class from the dashboard!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-[#1b120c]/40 text-[10px] font-extrabold text-[#9CA3AF] uppercase tracking-wider">
                  <th className="py-4 px-6">Class Info</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Difficulty</th>
                  <th className="py-4 px-6">Schedule</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-white">
                {classes.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Class Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {item.coverImage ? (
                          <img
                            src={item.coverImage}
                            alt={item.className}
                            className="w-10 h-10 rounded-lg object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-[#9CA3AF]">
                            N/A
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white uppercase tracking-tight">
                            {item.className}
                          </div>
                          <div className="text-[10px] text-[#9CA3AF]">
                            {item.duration || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 text-[#9CA3AF]">
                      {item.category}
                    </td>

                    {/* Difficulty */}
                    <td className="py-4 px-6 text-[#9CA3AF]">
                      {item.difficulty}
                    </td>

                    {/* Schedule */}
                    <td className="py-4 px-6 text-[#9CA3AF]">
                      {item.schedule}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 font-bold text-[#f97316]">
                      ${item.price}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      {getStatusBadge(item.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}