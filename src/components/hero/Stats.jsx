'use client';

import { useEffect, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const Stats = () => {
  const [stats, setStats] = useState({
    members: 0,
    classes: 0,
    trainers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${baseURL}/api/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats({
            members: data.membersCount || 0,
            classes: data.classesCount || 0,
            trainers: data.trainersCount || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format large numbers (e.g. 12000 -> 12K+)
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K+`;
    }
    return `${num}+`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-white/5">
      {/* Active Members */}
      <div className="space-y-1">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f97316]">
          {loading ? "..." : formatNumber(stats.members)}
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#9CA3AF]/70 font-semibold">
          ACTIVE MEMBERS
        </p>
      </div>

      {/* Weekly Classes */}
      <div className="space-y-1 md:pl-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f97316]">
          {loading ? "..." : `${stats.classes}+`}
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#9CA3AF]/70 font-semibold">
          WEEKLY CLASSES
        </p>
      </div>

      {/* Certified Trainers */}
      <div className="space-y-1 md:pl-8">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f97316]">
          {loading ? "..." : stats.trainers}
        </h3>
        <p className="text-xs uppercase tracking-wider text-[#9CA3AF]/70 font-semibold">
          CERTIFIED TRAINERS
        </p>
      </div>

      {/* Static Rating */}
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