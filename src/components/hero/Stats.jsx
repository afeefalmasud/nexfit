const Stats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-white/5">
      <div className="space-y-1">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f97316]">
          12K+
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#9CA3AF]/70 font-semibold">
          ACTIVE MEMBERS
        </p>
      </div>

      <div className="space-y-1 md:pl-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f97316]">
          180
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#9CA3AF]/70 font-semibold">
          WEEKLY CLASSES
        </p>
      </div>

      <div className="space-y-1 md:pl-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f97316]">
          64
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#9CA3AF]/70 font-semibold">
          CERTIFIED TRAINERS
        </p>
      </div>

      <div className="space-y-1 md:pl-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f97316]">
          4.9
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#9CA3AF]/70 font-semibold">
          AVERAGE RATING
        </p>
      </div>
    </div>
  );
};

export default Stats;
