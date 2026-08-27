import Link from 'next/link';

const ForumCard = ({ posts = [], className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {posts.map((post) => {
        const authorName = post.authorName || post.author || post.trainerName || 'Anonymous';
        const role = post.role || post.badge || 'Trainer';
        const formattedDate = post.createdAt
          ? new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })
          : post.date || 'Mar 14, 2026';

        return (
          <div
            key={post._id}
            className="bg-[#120c09] border-2 border-white/5 hover:border-[#f97316]/60 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#f97316]/10 flex flex-col group cursor-pointer"
          >
            {/* Image Container with Role Badge */}
            <div className="relative h-48 w-full bg-[#1b120c] overflow-hidden p-3">
              <img
                src={post.coverImage || post.image || 'https://via.placeholder.com/400x250'}
                alt={post.title || 'Forum Post'}
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Role Badge */}
              <span className="absolute top-5 left-5 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
                {role}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-extrabold uppercase text-white tracking-wide leading-snug group-hover:text-[#f97316] transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-normal">
                  {post.description || post.content}
                </p>
              </div>

              {/* Author & Date Footer */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium">
                  <span className="text-gray-300">{authorName}</span>
                  <span>{formattedDate}</span>
                </div>

                {/* Read More Link */}
                <div className="flex justify-end pt-1">
                  <Link
                    href={`/community/${post._id}`}
                    className="text-[#f97316] hover:text-[#ff8a3d] text-[11px] font-bold tracking-wider transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ForumCard;