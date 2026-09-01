'use client';

import { useState, useEffect } from 'react';
import { FiUserMinus, FiUserPlus } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function ManageTrainersClient() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    try {
      const res = await fetch(`${baseURL}/api/admin/trainers`);
      const data = await res.json();
      if (Array.isArray(data)) setTrainers(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching trainers:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Toggle Role Action (Promote / Demote)
  const handleToggleRole = async (trainerId, currentRole) => {
    const nextRole = currentRole === 'trainer' ? 'member' : 'trainer';
    try {
      const res = await fetch(`${baseURL}/api/admin/trainers/${trainerId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: nextRole }),
      });
      if (res.ok) {
        fetchTrainers();
      }
    } catch (err) {
      console.error('Failed to update trainer role:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-white font-sans">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          PLATFORM
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white">
          MANAGE TRAINERS
        </h1>
        <p className="text-xs text-[#9CA3AF]/80">
          Manage coaches on the platform. Demoting or promoting members toggles their trainer privileges.
        </p>
      </div>

      {/* Trainers Table Card */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-wider">
                <th className="py-4 px-6">Trainer</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Classes</th>
                <th className="py-4 px-6">Students</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-[#9CA3AF]/60">
                    Loading coaches...
                  </td>
                </tr>
              ) : trainers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-[#9CA3AF]/60">
                    No coaches found.
                  </td>
                </tr>
              ) : (
                trainers.map((trainer) => {
                  const isTrainer = trainer.role === 'trainer';

                  return (
                    <tr key={trainer._id || trainer.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Name + Avatar */}
                      <td className="py-4 px-6 font-bold text-white/90">
                        <div className="flex items-center gap-3">
                          <img
                            src={trainer.image || trainer.photo || 'https://via.placeholder.com/40'}
                            alt={trainer.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                          />
                          <span>{trainer.name}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6 text-[#9CA3AF]">
                        {trainer.email}
                      </td>


                      {/* Total Classes Created */}
                      <td className="py-4 px-6 text-white/90 font-bold">
                        {trainer.classesCount || 0}
                      </td>

                      {/* Total Students */}
                      <td className="py-4 px-6 text-white/90 font-bold">
                        {trainer.studentsCount || 0}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 text-right">
                        {isTrainer ? (
                          <button
                            onClick={() => handleToggleRole(trainer._id || trainer.id, trainer.role)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <FiUserMinus className="w-3.5 h-3.5" />
                            <span>Demote</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleRole(trainer._id || trainer.id, trainer.role)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
                          >
                            <FiUserPlus className="w-3.5 h-3.5" />
                            <span>Promote</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}