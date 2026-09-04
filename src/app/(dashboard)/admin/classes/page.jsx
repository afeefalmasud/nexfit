'use client';

import { fetchWithAuth } from '@/lib/actions/api';
import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function ManageClassesClient() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await fetchWithAuth('/api/admin/classes');
      const data = await res.json();
      if (Array.isArray(data)) setClasses(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Approve Class
  const handleApprove = async (classId) => {
    try {
      const res = await fetch(`${baseURL}/api/admin/classes/${classId}/approve`, {
        method: 'PATCH',
      });
      if (res.ok) fetchClasses();
    } catch (err) {
      console.error('Failed to approve class:', err);
    }
  };

  // Open Reject Modal
  const openRejectModal = (item) => {
    setSelectedClass(item);
    setIsModalOpen(true);
  };

  // Confirm Rejection (Executes Delete)
  const confirmReject = async () => {
    if (!selectedClass) return;

    try {
      const res = await fetch(`${baseURL}/api/admin/classes/${selectedClass._id}/reject`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setIsModalOpen(false);
        setSelectedClass(null);
        fetchClasses();
      }
    } catch (err) {
      console.error('Failed to reject class:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-white font-sans relative">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          CONTENT
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white">
          MANAGE CLASSES
        </h1>
        <p className="text-xs text-[#9CA3AF]/80">
          Approve submissions, reject those that don't meet standards, or delete them entirely.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-wider">
                <th className="py-4 px-6">Class</th>
                <th className="py-4 px-6">Trainer</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-[#9CA3AF]/60">
                    Loading classes...
                  </td>
                </tr>
              ) : classes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-[#9CA3AF]/60">
                    No classes found.
                  </td>
                </tr>
              ) : (
                classes.map((item) => {
                  const status = item.status?.toLowerCase() || 'pending';

                  return (
                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-bold text-white/90">
                        {item.className || item.name}
                      </td>
                      <td className="py-4 px-6 text-[#9CA3AF]">
                        {item.trainerName || item.trainer || 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-[#9CA3AF]">{item.category}</td>
                      <td className="py-4 px-6 font-semibold text-white/90">
                        ${item.price}
                      </td>
                      <td className="py-4 px-6">
                        {status === 'approved' ? (
                          <span className="inline-block bg-emerald-950/40 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                            APPROVED
                          </span>
                        ) : (
                          <span className="inline-block bg-amber-950/40 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                            PENDING
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {status !== 'approved' && (
                            <button
                              onClick={() => handleApprove(item._id)}
                              className="flex items-center gap-1 text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
                            >
                              <FiCheck className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                          )}

                          <button
                            onClick={() => openRejectModal(item)}
                            className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          >
                            <FiX className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#120c09] border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <div className="p-2 rounded-full bg-red-500/10 border border-red-500/20">
                <FiAlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold uppercase text-white">Reject Class?</h3>
            </div>

            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Are you sure you want to reject <span className="text-white font-bold">"{selectedClass?.className || selectedClass?.name}"</span>? This will permanently delete the submission.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-white/70 hover:text-white transition-colors rounded-lg bg-white/5 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-colors rounded-lg shadow-lg"
              >
                Reject & Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}