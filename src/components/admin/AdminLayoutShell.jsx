'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiMenu, FiX } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import SidebarNav from '@/components/admin/sidebar';
import LogoutButton from '@/components/admin/logout';

export default function AdminLayoutShell({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-[#0a0705] text-white font-sans relative">
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#120c09] border-b border-white/5 px-4 flex items-center justify-between z-40">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]">
            <FaFire className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-lg font-extrabold tracking-wider text-white">
            NEX<span className="text-[#f97316]">FIT</span>
          </span>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </header>

      {/* Backdrop Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`w-64 bg-[#120c09] border-r border-white/5 flex flex-col justify-between p-6 fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Brand (Visible on Desktop) */}
          <Link href="/" className="hidden lg:flex items-center gap-2.5 px-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 rounded-lg bg-[#f97316] flex items-center justify-center text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              <FaFire className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-lg font-extrabold tracking-wider text-white">
              NEX<span className="text-[#f97316]">FIT</span>
            </span>
          </Link>

          {/* User Status Badge */}
          <div className="bg-[#1b120c] border border-white/5 rounded-xl p-3 space-y-1 mt-12 lg:mt-0">
            <div className="text-xs font-bold text-white truncate">
              Admin Portal
            </div>
            <div className="inline-block bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded">
              ADMIN
            </div>
          </div>

          <div onClick={closeMobileMenu}>
            <SidebarNav />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-white/5">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-[#9CA3AF] hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to site</span>
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 pt-20 lg:pt-8 p-6 md:p-12 min-h-screen w-full">
        {children}
      </main>
    </div>
  );
}