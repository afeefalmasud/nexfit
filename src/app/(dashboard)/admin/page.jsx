'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiBox, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function AdminOverviewPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClasses: 0,
    bookedClasses: 0,
    totalForumPosts: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats & recent transactions in parallel
    Promise.all([
      fetch(`${baseURL}/api/admin/overview-stats`).then((res) => res.json()),
      fetch(`${baseURL}/api/admin/recent-transactions`).then((res) => res.json()),
    ])
      .then(([statsData, txData]) => {
        if (statsData) setStats(statsData);
        if (Array.isArray(txData)) setTransactions(txData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load admin overview data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-white font-sans">
      {/* Top Header */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          PLATFORM
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white">
          ADMIN OVERVIEW
        </h1>
        <p className="text-xs text-[#9CA3AF]/80">
          Membership growth, class inventory, community posts, and revenue across the whole platform.
        </p>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1d140e] border border-white/5 flex items-center justify-center text-[#f97316] shrink-0">
            <FiUsers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-widest block">
              TOTAL USERS
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              {loading ? '...' : stats.totalUsers?.toLocaleString() || 0}
            </div>
          </div>
        </div>

        {/* Total Classes */}
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1d140e] border border-white/5 flex items-center justify-center text-[#f97316] shrink-0">
            <FiBox className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-widest block">
              TOTAL CLASSES
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              {loading ? '...' : stats.totalClasses?.toLocaleString() || 0}
            </div>
          </div>
        </div>

        {/* Booked Classes */}
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1d140e] border border-white/5 flex items-center justify-center text-[#f97316] shrink-0">
            <FiCalendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-widest block">
              BOOKED CLASSES
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              {loading ? '...' : stats.bookedClasses?.toLocaleString() || 0}
            </div>
          </div>
        </div>

        {/* Total Forum Posts */}
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1d140e] border border-white/5 flex items-center justify-center text-[#f97316] shrink-0">
            <FiMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-widest block">
              FORUM POSTS
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              {loading ? '...' : (stats.totalForum ?? 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Box */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 max-w-xl space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-white">
          RECENT TRANSACTIONS
        </h2>

        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="py-4 text-center text-xs text-[#9CA3AF]/60">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="py-4 text-center text-xs text-[#9CA3AF]/60">No recent transactions found.</div>
          ) : (
            transactions.map((tx, idx) => (
              <div key={tx._id || idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white/90">{tx.userEmail || tx.email || 'user@nexfit.io'}</div>
                  <div className="text-[10px] text-[#9CA3AF]/50 mt-0.5">
                    {tx.formattedDate || new Date(tx.bookedAt || tx.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="font-black text-[#f97316] text-sm">
                  ${tx.price || tx.amount || '0'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* User Card at Bottom */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl p-8 flex items-center gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-black uppercase text-white tracking-wide">
            {user?.name || 'ADMIN USER'}
          </h3>
          <p className="text-xs text-[#9CA3AF]/70 font-medium">
            {user?.email || 'admin@nexfit.io'}
          </p>
          <div className="pt-2">
            <span className="inline-block bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20 px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
              ADMIN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}