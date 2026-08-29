'use client';

import { useSearchParams } from 'next/navigation';
import { FiSlash, FiHome } from 'react-icons/fi';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const isBlocked = searchParams.get('reason') === 'blocked';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0705]">
      <div className="bg-[#120c09] border border-red-500/10 rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
          <FiSlash className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-red-500 text-[10px] font-extrabold tracking-[0.2em] uppercase">
            ACCOUNT RESTRICTED
          </span>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white">
            {isBlocked ? 'ACCOUNT SUSPENDED' : 'ACCESS DENIED'}
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            {isBlocked
              ? 'Your account has been blocked by an administrator. Please contact support if you believe this is an error.'
              : 'You do not have permission to access this page.'}
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/5 gap-2"
        >
          <FiHome className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}