import ForumClientWrapper from "@/components/forum/ClientWrapper";
import { AllPosts } from "@/lib/api/getallforum";

export default async function ForumPage() {
  const posts = await AllPosts();

  return (
    <div className="min-h-screen bg-[#120D0B] text-white pt-40 md:pt-30">
      <div className="space-y-8">
        <div className="container mx-auto px-6">
          <div className="space-y-2">
            <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.25em] uppercase">
              KNOWLEDGE BASE
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              COMMUNITY FORUM
            </h1>
            <p className="text-xs md:text-sm text-gray-400 max-w-2xl leading-relaxed">
              Coaching notes, programming breakdowns, and platform
              announcements. Log in to read the full posts, vote, and join the
              discussion.
            </p>
          </div>
        </div>
        <ForumClientWrapper initialPosts={posts} />
      </div>
    </div>
  );
}
