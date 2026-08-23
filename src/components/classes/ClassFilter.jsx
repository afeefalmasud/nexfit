'use client';

import { FiSearch } from 'react-icons/fi';

export default function ClassFilterSearch({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  totalClasses,
}) {
  const categories = [
    'ALL',
    'YOGA',
    'CARDIO',
    'STRENGTH',
    'HIIT',
    'PILATES',
    'BOXING',
  ];

  return (
    <div className="space-y-4 container mx-auto py-4">
      <div className="bg-[#120c09] border border-white/5 rounded-2xl p-2.5 md:p-3 flex flex-col lg:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search classes by name..."
            className="w-full bg-[#18100c] border border-white/5 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#f97316]/50 transition-colors"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-[10px] font-extrabold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#f97316] text-white shadow-md shadow-[#f97316]/20'
                    : 'bg-[#18100c] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-gray-400 font-medium">
        Showing <span className="text-white font-bold">{totalClasses}</span>{' '}
        {totalClasses === 1 ? 'class' : 'classes'}
      </div>
    </div>
  );
}