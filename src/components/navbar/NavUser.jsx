"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiLayout, FiLogOut } from "react-icons/fi";

const NavUser = () => {
  const { data, isPending } = useSession();
  const user = data?.user;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) {
    return (
      <span className="loading loading-ring loading-lg text-[#f97316]"></span>
    );
  }

  return (
    <div>
      {user ? (
        <div className="flex gap-4 items-center">
          <h2 className="text-[#EFF6FB] font-medium hidden sm:block">
            Welcome, <span className="text-[#f97316]">{user?.name}</span>
          </h2>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none focus:ring-2 focus:ring-[#f97316] rounded-full transition-transform active:scale-95 cursor-pointer"
            >
              <Avatar className="w-10 h-10 ring-2 ring-transparent hover:ring-[#f97316] transition-all">
                <Avatar.Image
                  alt={user?.name || "User"}
                  src={user?.image}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
              </Avatar>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#140F0D] border border-white/10 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-white/5 space-y-0.5">
                  <p className="text-xs font-bold text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-[#9CA3AF] truncate">
                    {user?.email}
                  </p>
                </div>

                <div className="p-1 space-y-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-white hover:bg-[#f97316]/10 hover:text-[#f97316] transition-colors"
                  >
                    <FiLayout className="w-4 h-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link
            href="/signIn"
            className="text-[#EFF6FB]/80 hover:text-[#f97316] active:text-[#f97316]/70 active:scale-95 transition-all duration-150 text-[15px] font-medium inline-block"
          >
            Login
          </Link>

          <Link
            href="/signUp"
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-[#f97316] text-white font-semibold hover:bg-[#ea580c] active:bg-[#c2410c] active:scale-95 transition-all duration-150 cursor-pointer shadow-md active:shadow-none"
          >
            Join Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavUser;
