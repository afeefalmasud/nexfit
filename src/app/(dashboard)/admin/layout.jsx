import Link from 'next/link';
import { requireRole } from '@/lib/actions/role';
import { FiArrowLeft } from 'react-icons/fi';
import SidebarNav from '@/components/admin/sidebar';
import LogoutButton from '@/components/admin/logout';

export default async function AdminLayout({ children }) {
  // Server-side guard
  await requireRole('admin');

  return (
    <div className="flex min-h-screen bg-[#0a0705] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#120c09] border-r border-white/5 flex flex-col justify-between p-6 shrink-0 fixed inset-y-0 left-0 z-50">
        <div className="space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#f97316] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[#f97316]/20">
              N
            </div>
            <span className="text-lg font-black tracking-widest text-white uppercase">
              NEX<span className="text-[#f97316]">FIT</span>
            </span>
          </div>

          {/* User Status Badge */}
          <div className="bg-[#1b120c] border border-white/5 rounded-xl p-3 space-y-1">
            <div className="text-xs font-bold text-white truncate">
              Admin Portal
            </div>
            <div className="inline-block bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded">
              ADMIN
            </div>
          </div>

          <SidebarNav />
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-[#9CA3AF] hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to site</span>
          </Link>
            <LogoutButton></LogoutButton>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pl-64 p-8 md:p-12 min-h-screen">
        {children}
      </main>
    </div>
  );
}