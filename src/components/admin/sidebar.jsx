'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiGrid, 
  FiUsers, 
  FiUserCheck, 
  FiUserPlus, 
  FiBookOpen, 
  FiFileText, 
  FiPlusSquare, 
  FiDollarSign 
} from 'react-icons/fi';

const platformNav = [
  { name: 'Overview', href: '/admin', icon: FiGrid },
  { name: 'Manage Users', href: '/admin/users', icon: FiUsers },
  { name: 'Applied Trainers', href: '/admin/applied-trainers', icon: FiUserCheck },
  { name: 'Manage Trainers', href: '/admin/trainers', icon: FiUserPlus },
];

const contentNav = [
  { name: 'Manage Classes', href: '/admin/classes', icon: FiBookOpen },
  { name: 'Manage Posts', href: '/admin/posts', icon: FiFileText },
  { name: 'Add Forum Post', href: '/admin/add-post', icon: FiPlusSquare },
  { name: 'Transactions', href: '/admin/transactions', icon: FiDollarSign },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
      {/* Platform Group */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#9CA3AF]/40 uppercase block px-3">
          PLATFORM
        </span>
        {platformNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#f97316]/15 text-[#f97316] border border-[#f97316]/30'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Content Group */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#9CA3AF]/40 uppercase block px-3">
          CONTENT
        </span>
        {contentNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#f97316]/15 text-[#f97316] border border-[#f97316]/30'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}