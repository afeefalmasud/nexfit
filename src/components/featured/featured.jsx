'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiClock, FiBarChart2, FiUsers, FiArrowRight } from 'react-icons/fi';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

const FeaturedClasses = () => {
  const [featuredClasses, setFeaturedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${baseURL}/api/classes/featured`);
        if (res.ok) {
          const data = await res.json();
          setFeaturedClasses(data);
        }
      } catch (error) {
        console.error('Failed to load featured classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);
console.log(featuredClasses)
  if (loading) {
    return (
      <div className="bg-[#0c0806] py-16 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
        Loading Featured Classes...
      </div>
    );
  }

  return (
    <section className="bg-[#0c0806] py-30 px-4 md:px-8 text-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[#f97316] text-xs font-bold tracking-[0.2em] uppercase">
              MOST BOOKED
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase">
              FEATURED CLASSES
            </h2>
          </div>

          <Link
            href="/classes"
            className="flex items-center gap-1.5 text-xs font-bold text-[#f97316] hover:text-[#fb923c] transition-colors group"
          >
            <span>View all</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredClasses.slice(0, 4).map((item) => (
            <div
              key={item._id}
              className="bg-[#120c09] border-2 border-white/5 hover:border-[#f97316]/50 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-[#f97316]/10 flex flex-col group cursor-pointer"
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full bg-[#1b120c] overflow-hidden p-2.5">
                <img
                  src={item.coverImage || item.image || 'https://via.placeholder.com/400x250'}
                  alt={item.className || item.title || 'Class Image'}
                  className="w-full h-full object-cover rounded-xl"
                />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-[#f97316] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
                  {item.category || 'FITNESS'}
                </span>

                {/* Price Tag */}
                <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  ${item.price || '0'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Class Name */}
                  <h3 className="text-sm font-extrabold uppercase text-white tracking-wide truncate group-hover:text-[#f97316] transition-colors duration-300">
                    {item.className || item.title || 'UNNAMED CLASS'}
                  </h3>

                  {/* Trainer Name */}
                  <p className="text-xs text-gray-400 mt-1 font-medium truncate">
                    {item.trainerName || 'Master Trainer'}
                  </p>
                </div>

                {/* Details Footer */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-white/5 mb-6">
                  <div className="flex items-center gap-1">
                    <FiClock className="text-[#f97316]" />
                    <span>{item.duration || '45'} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiBarChart2 className="text-[#f97316]" />
                    <span className="capitalize">{item.level || 'All Levels'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiUsers className="text-[#f97316]" />
                    <span>{item.bookedCount || 0} booked</span>
                  </div>
                </div>
                <Link
                    href={`/classes/${item._id}`}
                    className="w-full text-center py-2.5 bg-[#20130c] group-hover:bg-[#f97316] border border-[#f97316]/30 group-hover:border-[#f97316] rounded-xl text-[#f97316] group-hover:text-white text-xs font-black uppercase tracking-wider transition-all duration-300"
                    >
                    VIEW DETAILS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;