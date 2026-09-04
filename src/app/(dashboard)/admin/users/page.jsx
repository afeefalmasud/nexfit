'use client';

import { fetchWithAuth } from '@/lib/actions/api';
import { useState, useEffect } from 'react';
import { FiSearch, FiSlash, FiUnlock } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function ManageUsersClient() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetchWithAuth('/api/admin/users');
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading users:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle Block/Unblock Action
  const handleToggleBlock = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    try {
      const res = await fetch(`${baseURL}/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Filtered list based on search
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-white font-sans">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          PLATFORM
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white">
          MANAGE USERS
        </h1>
        <p className="text-xs text-[#9CA3AF]/80">
          Block or unblock user accounts across the platform.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]/50 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#120c09] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316]/50 transition-colors"
        />
      </div>

      {/* Users Table Card */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-wider">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-[#9CA3AF]/60">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-[#9CA3AF]/60">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isBlocked = user.status?.toLowerCase() === 'blocked';

                  return (
                    <tr key={user._id || user.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6 font-bold text-white/90">
                        {user.name}
                      </td>
                      <td className="py-4 px-6 text-[#9CA3AF]">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block bg-[#1a1410] text-[#9CA3AF] border border-white/10 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                          {user.role || 'USER'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {isBlocked ? (
                          <span className="inline-block bg-red-950/40 text-red-500 border border-red-500/20 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                            BLOCKED
                          </span>
                        ) : (
                          <span className="inline-block bg-emerald-950/40 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                            ACTIVE
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end">
                          {/* Block/Unblock Button */}
                          {isBlocked ? (
                            <button
                              onClick={() => handleToggleBlock(user._id || user.id, user.status)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
                            >
                              <FiUnlock className="w-3.5 h-3.5" />
                              <span>Unblock</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleToggleBlock(user._id || user.id, user.status)}
                              className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <FiSlash className="w-3.5 h-3.5" />
                              <span>Block</span>
                            </button>
                          )}
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
    </div>
  );
}