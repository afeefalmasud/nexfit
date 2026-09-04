import Link from "next/link";
import "./globals.css";
import { IoArrowBack, IoSearchOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0806] px-6 text-white">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#120c09] border border-white/10">
          <IoSearchOutline className="text-5xl text-[#f97316]" />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-black text-white tracking-wider">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold uppercase tracking-wide text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-xs text-gray-400 leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved.
          Let's get you back to training.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 text-xs font-bold uppercase tracking-wider">
          <Link
            href="/"
            className="rounded-xl bg-[#f97316] hover:bg-[#ea580c] px-7 py-3 text-white transition-all duration-200"
          >
            Go Home
          </Link>

          <Link
            href="/classes"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-7 py-3 text-white transition hover:bg-white/5"
          >
            <IoArrowBack />
            Explore Classes
          </Link>
        </div>
      </div>
    </div>
  );
}