"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <div>
      <Link
        href={href}
        className={
          isActive
            ? " text-[#f97316] font-bold"
            : "font-medium text-gray-400 hover:text-white"
        }
      >
        {children}
      </Link>
    </div>
  );
}
