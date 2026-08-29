"use client";
import NavLink from "./NavLink";
import Link from "next/link";
import NavUser from "./NavUser";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaFire } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-md border-b border-white/5 z-50">
      <div className="container mx-auto px-5 py-4 flex gap-4 md:gap-0 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div
            className="
                      flex h-6 w-6
                      items-center justify-center
                      rounded-sm
                      bg-[#f97316]
                      text-black
                      "
          >
            <FaFire size={14} />
          </div>

          <h1
            className="
                      text-sm
                      font-bold
                      tracking-[2px]
                      text-white
                      "
          >
            NEX<span className="text-[#f97316]">FIT</span>
          </h1>
        </Link>

        <ul className="hidden lg:flex items-center gap-5 text-sm">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/classes">All Classes</NavLink>
          </li>
          <li>
            <NavLink href="/community">Community</NavLink>
          </li>
        </ul>

        <div className="hidden lg:flex ">
          <NavUser />
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <NavUser />

          <button
            onClick={() => setOpen(!open)}
            className="text-white text-3xl"
          >
            {open ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#111920] border-t border-white/10">
          <div className="flex flex-col px-5 py-5 space-y-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/classes">All Classes</NavLink>
            <NavLink href="/community">Community</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
