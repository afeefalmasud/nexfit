'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FaFire as FaFireIcon } from 'react-icons/fa';
import { 
  FiGrid, 
  FiLayers, 
  FiPlusCircle, 
  FiMessageSquare, 
  FiFileText, 
  FiArrowLeft, 
  FiLogOut, 
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';
import { authClient, useSession } from "@/lib/auth-client";
import AddClass from '@/components/trainer/AddClass';
import AddForumPost from '@/components/trainer/AddPost';
import MyClasses from '@/components/trainer/MyClass';
import ForumPostList from '@/components/trainer/MyForum';

export default function TrainerDashboardPage() {
  // Default tab is 'overview' on reload
  const [activeTab, setActiveTab] = useState('overview');

  const { data } = useSession();
  const user = data?.user;

  const coachingNav = [
    { id: 'overview', label: 'Overview', icon: FiGrid },
    { id: 'my-classes', label: 'My Classes', icon: FiLayers },
    { id: 'add-class', label: 'Add Class', icon: FiPlusCircle },
  ];

  const communityNav = [
    { id: 'add-forum-post', label: 'Add Forum Post', icon: FiMessageSquare },
    { id: 'my-forum-posts', label: 'My Forum Posts', icon: FiFileText },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="min-h-screen bg-[#0A0706] text-white flex font-sans">
      
      {/* Persistent Left Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0e0907] flex flex-col justify-between shrink-0 h-screen sticky top-0 p-5">
        <div className="space-y-6">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              <FaFireIcon className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-extrabold tracking-wider text-white">
              NEX<span className="text-[#f97316]">FIT</span>
            </span>
          </Link>

          {/* User Profile Card */}
          <div className="bg-[#150e0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
            <h3 className="font-bold text-sm text-white truncate">
              {user?.name || "Dana Whitlock"}
            </h3>
            <div className="inline-flex items-center gap-1.5 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-[#f97316]/15 text-[#f97316] text-[10px] font-extrabold uppercase tracking-wider border border-[#f97316]/20">
                TRAINER
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-5">
            {/* COACHING SECTION */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[#9CA3AF]/60 uppercase tracking-widest px-2 pb-1">
                COACHING
              </p>
              <nav className="space-y-1">
                {coachingNav.map((item) => {
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

            {/* COMMUNITY SECTION */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[#9CA3AF]/60 uppercase tracking-widest px-2 pb-1">
                COMMUNITY
              </p>
              <nav className="space-y-1">
                {communityNav.map((item) => {
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

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/5 bg-[#0e0907]/60 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#9CA3AF]/70">
              TRAINER DASHBOARD
            </p>
            <p className="text-xs text-white font-medium">
              Welcome back, <span className="text-white font-bold">{user?.name || "Dana Whitlock"}</span>
            </p>
          </div>
        </header>

        {/* Tab Content Views */}
        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* OVERVIEW VIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div className="space-y-1">
                <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  COACHING
                </span>
                <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
                  TRAINER OVERVIEW
                </h1>
                <p className="text-xs text-[#9CA3AF]">
                  Your classes, enrolment numbers and community activity at a glance.
                </p>
              </div>
              <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 space-y-2">
                <h3 className="text-xl font-extrabold uppercase tracking-tight text-white">
                  {user?.name || "DANA WHITLOCK"}
                </h3>
                <p className="text-xs text-[#9CA3AF]">
                  {user?.email || "dana@nexfit.io"}
                </p>
                <div>
                  <span className="inline-block px-3 py-1 rounded-md bg-[#f97316]/10 text-[#f97316] text-[10px] font-extrabold uppercase tracking-wider border border-[#f97316]/20">
                    TRAINER
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      CLASSES CREATED
                    </span>
                    <p className="text-3xl font-extrabold">6</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FiLayers className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      STUDENTS ENROLLED
                    </span>
                    <p className="text-3xl font-extrabold">512</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FiUsers className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      FORUM POSTS
                    </span>
                    <p className="text-3xl font-extrabold">9</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FiTrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'my-classes' && <MyClasses></MyClasses>}

          {activeTab === 'add-class' && <AddClass />}

          {activeTab === 'add-forum-post' && <AddForumPost />}

          {activeTab === 'my-forum-posts' && <ForumPostList></ForumPostList>}

        </main>
      </div>
    </div>
  );
}