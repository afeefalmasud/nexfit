import Link from "next/link";
import { FiUsers } from "react-icons/fi";
import { LuTrophy } from "react-icons/lu";

export default function CtaBanner() {
  return (
    <section className="w-full bg-[#0A0706] text-white py-30 px-6 font-sans">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-[#140F0D] border border-white/5 p-10 sm:p-16 text-center space-y-6 shadow-2xl">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#f97316]/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#f97316]/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex justify-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#f97316]">
              <LuTrophy className="w-8 h-8 stroke-[1.8]" />
            </div>
          </div>

          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase">
            READY TO OUT-TRAIN YESTERDAY?
          </h2>

          <p className="relative z-10 text-[#9CA3AF] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Level up your fitness alongside expert NexFit coaches. Start your first week completely free.
          </p>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/signUp"
              className="px-7 py-3.5 rounded-xl bg-[#f97316] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:bg-[#ea580c] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] active:scale-95 transition-all duration-150 cursor-pointer"
            >
              JOIN NEXFIT
            </Link>

            <Link
              href="/classes"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#221A16] border border-white/5 text-xs text-white font-semibold tracking-wider hover:bg-white/10 hover:border-white/10 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              <FiUsers className="w-4 h-4 text-[#9CA3AF]" />
              Browse classes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
