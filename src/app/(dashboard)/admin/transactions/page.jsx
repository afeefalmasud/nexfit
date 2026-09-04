'use client';

import { fetchWithAuth } from '@/lib/actions/api';
import { useState, useEffect } from 'react';
import { FiDollarSign, FiTrendingUp, FiCreditCard } from 'react-icons/fi';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTransactions: 0,
    averageValue: 0,
  });

  useEffect(() => {
    fetchWithAuth('/api/admin/transactions')
      .then((res) => res.json())
      .then((data) => {
        const txList = Array.isArray(data.transactions) ? data.transactions : Array.isArray(data) ? data : [];
        setTransactions(txList);

        // Calculate summary metrics
        const totalRev = txList.reduce((acc, curr) => acc + (Number(curr.price || curr.amount) || 0), 0);
        const count = txList.length;
        const avg = count > 0 ? totalRev / count : 0;

        setStats({
          totalRevenue: totalRev,
          totalTransactions: count,
          averageValue: avg,
        });

        // Generate dynamic chart data or use provided backend chart series
        if (data.chartSeries) {
          setChartData(data.chartSeries);
        } else {
          // Process transactions into monthly groupings dynamically
          const monthlyMap = {};
          txList.forEach((tx) => {
            const date = new Date(tx.createdAt || tx.bookedAt || Date.now());
            const monthName = date.toLocaleString('default', { month: 'short' });
            const amount = Number(tx.price || tx.amount) || 0;
            monthlyMap[monthName] = (monthlyMap[monthName] || 0) + amount;
          });

          const formattedChart = Object.keys(monthlyMap).map((month) => ({
            month,
            revenue: monthlyMap[month],
          }));

          setChartData(formattedChart.length > 0 ? formattedChart : [
            { month: 'Jan', revenue: 400 },
            { month: 'Feb', revenue: 700 },
            { month: 'Mar', revenue: 1200 },
            { month: 'Apr', revenue: 900 },
            { month: 'May', revenue: 1500 },
          ]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load transaction data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-white font-sans w-full">
      {/* Top Header */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          FINANCIALS
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white">
          TRANSACTIONS & REVENUE
        </h1>
        <p className="text-xs text-[#9CA3AF]/80">
          Track revenue growth, monthly booking earnings, and recent user payment logs.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Revenue */}
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1d140e] border border-white/5 flex items-center justify-center text-[#f97316] shrink-0">
            <FiDollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-widest block">
              TOTAL REVENUE
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              ${loading ? '...' : stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1d140e] border border-white/5 flex items-center justify-center text-[#f97316] shrink-0">
            <FiCreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-widest block">
              PAYMENT LOGS
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              {loading ? '...' : stats.totalTransactions.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Avg Transaction Value */}
        <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1d140e] border border-white/5 flex items-center justify-center text-[#f97316] shrink-0">
            <FiTrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#9CA3AF]/60 uppercase tracking-widest block">
              AVG ORDER VALUE
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              ${loading ? '...' : stats.averageValue.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Graph */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-white">
            REVENUE OVERTIME TREND
          </h2>
          <span className="text-[10px] font-bold text-[#f97316] bg-[#f97316]/10 px-2.5 py-1 rounded-lg border border-[#f97316]/20">
            LIVE ANALYTICS
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} tickLine={false} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF', fontSize: 11 }} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#18100c', borderColor: '#ffffff15', borderRadius: '12px' }}
                itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Data Table */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-white">
            ALL TRANSACTION RECORDS
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#17100b] text-[#9CA3AF]/60 font-extrabold uppercase text-[10px] tracking-widest border-b border-white/5">
              <tr>
                <th className="px-6 py-4">USER / EMAIL</th>
                <th className="px-6 py-4">DATE</th>
                <th className="px-6 py-4 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/90">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#9CA3AF]/60">
                    Loading records...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#9CA3AF]/60">
                    No payment logs found.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => (
                  <tr key={tx._id || idx} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 font-semibold">
                      {tx.userEmail || tx.email || 'user@nexfit.io'}
                    </td>
                    
                    <td className="px-6 py-4 text-[#9CA3AF]/80">
                      {new Date(tx.createdAt || tx.bookedAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right font-black text-[#f97316]">
                      ${Number(tx.price || tx.amount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}