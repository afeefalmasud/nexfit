'use client';

import { useState, useEffect } from 'react';
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
  FiTrendingUp,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { authClient, useSession } from "@/lib/auth-client";
import AddClass from '@/components/trainer/AddClass';
import AddForumPost from '@/components/trainer/AddPost';
import MyClasses from '@/components/trainer/MyClass';
import ForumPostList from '@/components/trainer/MyForum';
import { redirect } from 'next/navigation';
import { fetchWithAuth } from '@/lib/actions/api';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export default function TrainerDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dynamic stats state
  const [stats, setStats] = useState({
    classesCreated: 0,
    studentsEnrolled: 0,
    forumPosts: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const { data } = useSession();
  const user = data?.user;

  // Fetch stats from backend
  useEffect(() => {
    if (!user?.email) return;

    const fetchTrainerStats = async () => {
      setLoadingStats(true);
      try {
        const res = await fetchWithAuth(`/api/trainer/stats?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch trainer stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchTrainerStats();
  }, [user?.email]);

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
    redirect('/');
  };

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0706] text-white flex font-sans relative">
      
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0e0907] border-b border-white/5 px-4 flex items-center justify-between z-40">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]">
            <FaFireIcon className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-lg font-extrabold tracking-wider text-white">
            NEX<span className="text-[#f97316]">FIT</span>
          </span>
        </Link>

        {/* Hamburger Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </header>

      {/* Backdrop Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Drawer / Sidebar */}
      <aside
        className={`w-64 border-r border-white/5 bg-[#0e0907] flex flex-col justify-between shrink-0 h-screen fixed lg:sticky top-0 p-5 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          
          {/* Brand Logo (Visible on Desktop) */}
          <Link href="/" className="hidden lg:flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              <FaFireIcon className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-extrabold tracking-wider text-white">
              NEX<span className="text-[#f97316]">FIT</span>
            </span>
          </Link>

          {/* User Profile Card */}
          <div className="bg-[#150e0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-center mt-12 lg:mt-0">
            <h3 className="font-bold text-sm text-white truncate">
              {user?.name || "Trainer"}
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
                      onClick={() => handleTabClick(item.id)}
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
                      onClick={() => handleTabClick(item.id)}
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
            onClick={() => setIsMobileMenuOpen(false)}
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
        
        {/* Top Header Bar (Desktop Only) */}
        <header className="hidden lg:flex h-16 border-b border-white/5 bg-[#0e0907]/60 backdrop-blur-md px-8 items-center justify-between sticky top-0 z-40">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#9CA3AF]/70">
              TRAINER DASHBOARD
            </p>
            <p className="text-xs text-white font-medium">
              Welcome back, <span className="text-white font-bold">{user?.name || "Trainer"}</span>
            </p>
          </div>
        </header>

        {/* Tab Content Views */}
        <main className="flex-1 p-6 md:p-8 pt-20 lg:pt-8 overflow-y-auto w-full">
          
          {/* OVERVIEW VIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div className="space-y-1">
                <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  COACHING
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  TRAINER OVERVIEW
                </h1>
                <p className="text-xs text-[#9CA3AF]">
                  Your classes, enrolment numbers and community activity at a glance.
                </p>
              </div>

              <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 space-y-2">
                <h3 className="text-xl font-extrabold uppercase tracking-tight text-white">
                  {user?.name || "TRAINER"}
                </h3>
                <p className="text-xs text-[#9CA3AF]">
                  {user?.email || "trainer@nexfit.io"}
                </p>
                <div>
                  <span className="inline-block px-3 py-1 rounded-md bg-[#f97316]/10 text-[#f97316] text-[10px] font-extrabold uppercase tracking-wider border border-[#f97316]/20">
                    TRAINER
                  </span>
                </div>
              </div>

              {/* Dynamic Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      CLASSES CREATED
                    </span>
                    <p className="text-3xl font-extrabold">
                      {loadingStats ? "..." : stats.classesCreated}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FiLayers className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-[#120c09] border border-white/5 rounded-2xl p-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                      FORUM POSTS
                    </span>
                    <p className="text-3xl font-extrabold">
                      {loadingStats ? "..." : stats.forumPosts}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20">
                    <FiTrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'my-classes' && <MyClasses />}

          {activeTab === 'add-class' && <AddClass />}

          {activeTab === 'add-forum-post' && <AddForumPost />}

          {activeTab === 'my-forum-posts' && <ForumPostList />}

        </main>
      </div>
    </div>
  );
}