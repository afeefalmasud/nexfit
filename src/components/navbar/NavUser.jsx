"use client";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";

const NavUser = () => {
  const { data, isPending } = useSession();
  const user = data?.user;

  if (isPending) {
    return (
      <span className="loading loading-ring loading-lg text-[#f97316]"></span>
    );
  }

  return (
    <div>
      {user ? (
        <div className="flex gap-4 items-center">
          <h2 className="text-[#EFF6FB] font-medium">
            Welcome, <span className="text-[#f97316]">{user?.name}</span>
          </h2>
          <Avatar>
            <Avatar.Image
              alt={user?.name || "User"}
              src={user?.image}
              referrerPolicy="no-referrer"
            />
            <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
          </Avatar>
          <button
            className="px-4 py-2 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-150 cursor-pointer"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
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
