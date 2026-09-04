'use client';

import { fetchWithAuth } from '@/lib/actions/api';
import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function AdminAppliedTrainers() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Modal states
  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState(null); // Toggle full text in table

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth('/api/admin/applied-trainers');
      if (!res.ok) throw new Error(`Server status ${res.status}`);
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`${baseURL}/api/admin/applied-trainers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      const data = await res.json();
      if (data.success) {
        fetchApplications();
      }
    } catch (err) {
      console.error('Error approving application:', err);
    }
  };

  const handleConfirmReject = async () => {
    if (!rejectionReason.trim() || !selectedApp) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${baseURL}/api/admin/applied-trainers/${selectedApp._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'rejected',
            rejectionReason: rejectionReason.trim(),
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setSelectedApp(null);
        setRejectionReason('');
        fetchApplications();
      }
    } catch (err) {
      console.error('Error rejecting application:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (activeFilter === 'all') return true;
    return (app.status || 'pending').toLowerCase() === activeFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto w-full text-white font-sans">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
            ADMIN PORTAL
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            APPLIED TRAINERS
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#120c09] border border-white/5 p-1 rounded-xl">
          {['all', 'pending', 'approved', 'rejected'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#f97316] text-black shadow-md'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <div className="text-center py-20 text-[#9CA3AF] text-xs font-semibold">
          Loading trainer applications...
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-12 text-center text-xs text-[#9CA3AF]">
          No {activeFilter !== 'all' ? activeFilter : ''} trainer applications found.
        </div>
      ) : (
        <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#18110d] text-[#9CA3AF] uppercase text-[10px] font-extrabold tracking-wider border-b border-white/5">
                <tr>
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Specialty & Exp</th>
                  <th className="p-4 max-w-xs">Motivation / Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredApplications.map((app) => {
                  const descriptionText =
                    app.motivation || app.coachingPhilosophy || app.bio || app.reason || 'No description provided.';
                  const isExpanded = expandedDesc === app._id;

                  return (
                    <tr key={app._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 align-top">
                        <div className="font-bold text-white text-sm">
                          {app.userName || app.fullName || 'Unknown User'}
                        </div>
                        <div className="text-[11px] text-[#9CA3AF]">{app.email || app.userEmail}</div>
                      </td>

                      <td className="p-4 align-top">
                        <div className="text-white font-medium">{app.specialty || 'General Fitness'}</div>
                        <div className="text-[10px] text-[#9CA3AF]">{app.experience || 0} Years Experience</div>
                      </td>

                      {/* Description / Motivation Column */}
                      <td className="p-4 align-top max-w-xs">
                        <div className="text-xs text-[#9CA3AF] leading-relaxed">
                          {isExpanded ? descriptionText : `${descriptionText.slice(0, 90)}${descriptionText.length > 90 ? '...' : ''}`}
                        </div>
                        {descriptionText.length > 90 && (
                          <button
                            onClick={() => setExpandedDesc(isExpanded ? null : app._id)}
                            className="text-[#f97316] text-[10px] font-bold mt-1 hover:underline cursor-pointer"
                          >
                            {isExpanded ? 'Show Less' : 'Read Full Description'}
                          </button>
                        )}
                      </td>

                      <td className="p-4 align-top">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                            app.status === 'approved'
                              ? 'bg-green-500/10 text-green-400 border-green-500/20'
                              : app.status === 'rejected'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }`}
                        >
                          {app.status || 'PENDING'}
                        </span>
                      </td>

                      <td className="p-4 align-top text-right space-x-2">
                        {app.status !== 'approved' && (
                          <button
                            onClick={() => handleApprove(app._id)}
                            className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg transition-all cursor-pointer"
                            title="Approve"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                        )}
                        {app.status !== 'rejected' && (
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setRejectionReason('');
                            }}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all cursor-pointer"
                            title="Reject"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rejection Modal with Description Preview */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#120c09] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-red-400">
              <FiAlertCircle className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-extrabold uppercase tracking-tight">
                Reject Trainer Application
              </h3>
            </div>

            {/* Applicant Bio Preview in Modal */}
            <div className="bg-[#0a0706] border border-white/5 rounded-xl p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-[#f97316] font-bold uppercase tracking-wider">
                <FiInfo className="w-3 h-3" />
                Applicant Reason for Joining
              </div>
              <p className="text-xs text-[#9CA3AF] italic leading-relaxed">
                "{selectedApp.motivation || selectedApp.coachingPhilosophy || selectedApp.bio || selectedApp.reason || 'No description provided.'}"
              </p>
            </div>

            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Provide a reason for rejecting{' '}
              <span className="text-white font-bold">
                {selectedApp.userName || selectedApp.fullName || selectedApp.email}
              </span>
              . This will be sent directly to their member dashboard.
            </p>

            <textarea
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Experience does not match required specialty qualifications..."
              className="w-full bg-[#0a0706] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors resize-none"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-xl text-white transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={!rejectionReason.trim() || isSubmitting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-xs font-bold rounded-xl text-white uppercase tracking-wider transition-all cursor-pointer"
              >
                {isSubmitting ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}