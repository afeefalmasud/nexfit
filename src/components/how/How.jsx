import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "CREATE YOUR PROFILE",
    description:
      "Tell us your goals, experience level and the times you can actually train.",
  },
  {
    number: "02",
    title: "PICK YOUR CLASSES",
    description:
      "Filter by category, difficulty and coach, then reserve your spot with one tap.",
  },
  {
    number: "03",
    title: "SHOW UP AND PROGRESS",
    description:
      "Your coach logs the session, your dashboard tracks the trend line.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-[#0A0706] text-white py-30 px-6 font-sans">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[#f97316] text-xs font-bold tracking-[0.2em] uppercase">
            HOW IT WORKS
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.05]">
            THREE STEPS TO YOUR FIRST SESSION
          </h2>

          <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-md">
            No contracts, no sales calls. Members join in minutes and trainers
            get a full management suite the moment their application is
            approved.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/signUp"
              className="px-6 py-3.5 rounded-xl bg-[#f97316] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:bg-[#ea580c] active:scale-95 transition-all duration-150 cursor-pointer"
            >
              CREATE ACCOUNT
            </Link>

            <Link
              href="/membership"
              className="px-6 py-3.5 rounded-xl bg-[#1C1613] border border-white/5 text-xs text-white font-semibold uppercase tracking-wider hover:bg-white/10 hover:border-white/10 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              See membership
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl bg-[#140F0D] border border-white/5 p-6 sm:p-7 flex items-start gap-6 transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[#f97316]/30 hover:bg-[#1A1310] hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              <span className="text-2xl font-black text-[#f97316] group-hover:scale-110 transition-transform duration-300 shrink-0">
                {step.number}
              </span>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold tracking-wider uppercase text-white group-hover:text-[#f97316] transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
