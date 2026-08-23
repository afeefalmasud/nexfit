import Link from 'next/link';
import { FiClock, FiBarChart2, FiUsers } from 'react-icons/fi';

const Card = ({ allclass = [], className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {allclass.map((item) => (
        <div
          key={item._id}
          className="bg-[#120c09] border-2 border-white/5 hover:border-[#f97316]/60 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#f97316]/10 flex flex-col group cursor-pointer"
        >
          {/* Image & Badges */}
          <div className="relative h-52 w-full bg-[#1b120c] overflow-hidden p-3">
            <img
              src={item.coverImage || item.image || 'https://via.placeholder.com/400x250'}
              alt={item.className || item.title || 'Class Image'}
              className="w-full h-full object-cover rounded-xl"
            />

            {/* Category Badge */}
            <span className="absolute top-5 left-5 bg-[#f97316] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg">
              {item.category || 'GENERAL'}
            </span>

            {/* Price Tag */}
            <span className="absolute top-5 right-5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
              ${item.price || '0'}
            </span>
          </div>

          {/* Card Body */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              {/* 1st: Class Name */}
              <h3 className="text-base font-extrabold uppercase text-white tracking-wide truncate group-hover:text-[#f97316] transition-colors duration-300">
                {item.className || item.title || 'UNNAMED CLASS'}
              </h3>
              
              {/* 2nd: Trainer Name */}
              <p className="text-xs text-gray-400 mt-1.5 font-medium truncate">
                {item.trainerName || item.trainerEmail || item.instructor || 'Master Trainer'}
              </p>
            </div>

            {/* Class Details Stats */}
            <div className="flex items-center gap-4 text-[11px] text-gray-400 pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <FiClock className="text-[#f97316]" />
                <span>{item.duration || '45'} min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiBarChart2 className="text-[#f97316]" />
                <span className="capitalize">{item.level || 'All Levels'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiUsers className="text-[#f97316]" />
                <span>{item.bookedCount || '0'} booked</span>
              </div>
            </div>

            {/* View Details Button */}
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
  );
};

export default Card;