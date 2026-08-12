'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FaFire } from 'react-icons/fa';
import { 
  FiGrid, 
  FiCalendar, 
  FiHeart, 
  FiUserPlus, 
  FiArrowLeft, 
  FiLogOut, 
  FiTrendingUp
} from 'react-icons/fi';
import { authClient, useSession } from "@/lib/auth-client";
import { FaFireFlameCurved } from 'react-icons/fa6';
import ApplyTrainer from '@/components/member/Apply';
import BookedClasses from '@/components/member/Classes';
import FavoriteClasses from '@/components/member/Favt';

export default function MemberDashboardPage() {
  // Default to 'overview' on page reload
  const [activeTab, setActiveTab] = useState('overview');

  const { data } = useSession();
  const user = data?.user;

  const navItems = [
    { id: 'overview', label: "Overview", icon: FiGrid },
    { id: 'booked', label: "Booked Classes", icon: FiCalendar },
    { id: 'favorites', label: "Favorite Classes", icon: FiHeart },
    { id: 'apply-trainer', label: "Apply as Trainer", icon: FiUserPlus },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="min-h-screen bg-[#0A0706] text-white flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0e0907] flex flex-col justify-between shrink-0 h-screen sticky top-0 p-5">
        <div className="space-y-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              <FaFire className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-extrabold tracking-wider text-white">
              NEX<span className="text-[#f97316]">FIT</span>
            </span>
          </Link>

          {/* User Badge */}
          <div className="bg-[#150e0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
            <h3 className="font-bold text-sm text-white truncate">
              {user?.name || "Jordan Ellis"}
            </h3>
            <div className="inline-flex items-center gap-1.5 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-[#f97316]/15 text-[#f97316] text-[10px] font-extrabold uppercase tracking-wider border border-[#f97316]/20">
                MEMBER
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-[#9CA3AF]/60 uppercase tracking-widest px-2 pb-2">
              MY TRAINING
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                        : "text-[#9CA3AF] hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-1 pt-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to site
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer text-left"
          >
            <FiLogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-[#0e0907]/60 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#9CA3AF]/70">
              MEMBER DASHBOARD
            </p>
            <p className="text-xs text-white font-medium">
              Welcome back, <span className="text-white font-bold">{user?.name || "Jordan Ellis"}</span>
            </p>
          </div>
        </header>

        {/* Dynamic Views */}
        <main className="flex-1 p-8 overflow-y-auto space-y-8">
          
          {/* OVERVIEW VIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="space-y-1">
                <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  YOUR PROGRESS
                </span>
                <h1 className="text-3xl font-extrabold uppercase tracking-tight">
                  MEMBER OVERVIEW
                </h1>
                <p className="text-xs text-[#9CA3AF]">
                  Everything you've booked, saved and achieved with NexFit so far.
                </p>
              </div>

            {/* Profile & Trainer Application Banner Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 flex flex-col justify-center space-y-2">
                  <h3 className="text-xl font-extrabold uppercase tracking-tight">
                    {user?.name || "JORDAN ELLIS"}
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">
                    {user?.email || "jordan@nexfit.io"}
                  </p>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md bg-[#f97316]/10 text-[#f97316] text-[10px] font-extrabold uppercase tracking-wider border border-[#f97316]/20">
                      MEMBER
                    </span>
                  </div>
                </div>

                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 space-y-3">
                  <h3 className="text-sm font-extrabold uppercase tracking-tight">
                    TRAINER APPLICATION
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/20">
                      PENDING
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      Submitted 3 days ago
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Our admin team is reviewing your experience and specialty. You'll be notified here as soon as a decision is made — usually within 48 hours.
                  </p>
                </div>
              </div>
              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      BOOKED CLASSES
                    </span>
                    <p className="text-3xl font-extrabold">4</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-1">2 upcoming</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FiCalendar className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      FAVORITES
                    </span>
                    <p className="text-3xl font-extrabold">3</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-1">saved for later</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FiHeart className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      SESSIONS THIS MONTH
                    </span>
                    <p className="text-3xl font-extrabold">11</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-1">personal best</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FaFireFlameCurved className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      STREAK
                    </span>
                    <p className="text-3xl font-extrabold">6 WKS</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-1">keep it going</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FiTrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </div>

              

            </div>
          )}

          {/* BOOKED CLASSES VIEW */}
         {activeTab === 'booked' && <BookedClasses />}

          {/* FAVORITE CLASSES VIEW */}
          {activeTab === 'favorites' && <FavoriteClasses />}

          {/* APPLY AS TRAINER VIEW */}
          {activeTab === 'apply-trainer' && <ApplyTrainer user={user} />}

        </main>
      </div>
    </div>
  );
}