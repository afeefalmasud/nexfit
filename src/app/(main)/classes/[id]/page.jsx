import { notFound } from "next/navigation";
import Link from "next/link";
import { FiClock, FiBarChart2, FiUsers, FiCalendar } from "react-icons/fi";
import ClassDetailsClient from "@/components/classDetails/classdetails";
import { SingleClass } from "@/lib/api/getsingleclass";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

async function getRelatedClasses(currentId, currentCategory) {
  try {
    const res = await fetch(`${baseURL}/api/classes`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.classes || [];

    const otherClasses = list.filter((cls) => cls._id !== currentId);

    const sameCategory = otherClasses.filter(
      (cls) => cls.category?.toUpperCase() === currentCategory?.toUpperCase(),
    );
    const pool = sameCategory.length > 0 ? sameCategory : otherClasses;

    const shuffled = pool.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 3);
  } catch (error) {
    return [];
  }
}

export default async function ClassDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  const singleClass = await SingleClass(id);
  console.log("Fetched Class Data:", singleClass);

  if (!singleClass) {
    notFound();
  }

  const relatedClasses = await getRelatedClasses(id, singleClass?.category);

  const {
    _id,
    className,
    title,
    category = "GENERAL",
    coverImage,
    image,
    duration = "45",
    level = "Advanced",
    bookedCount = "0",
    schedule = "Mon, Wed, Fri — 6:30 AM",
    price = "24",
    description,
    trainerName,
    name,
    fullName,
    trainerEmail,
    instructor,
  } = singleClass;

  const displayTitle = className || title || "UNTITLED CLASS";
  
  // Prioritize full names over emails
  const displayTrainer =
    trainerName ||
    name ||
    fullName ||
    instructor ||
    (trainerEmail ? trainerEmail.split("@")[0] : "Master Trainer");

  return (
    <div className="min-h-screen bg-[#0a0604] text-white">
      <div className="relative w-full h-95 md:h-112.5 overflow-hidden">
        <img
          src={coverImage || image || "https://via.placeholder.com/1200x600"}
          alt={displayTitle}
          className="w-full h-full object-cover object-center opacity-40 filter brightness-90"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0604] via-[#0a0604]/60 to-transparent" />

        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 md:px-8 space-y-4">
          <span className="bg-[#f97316] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg inline-block">
            {category}
          </span>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            {displayTitle}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-300 font-medium">
            <div className="flex items-center gap-2">
              <FiClock className="text-[#f97316]" />
              <span>{duration} min</span>
            </div>
            <div className="flex items-center gap-2">
              <FiBarChart2 className="text-[#f97316]" />
              <span className="capitalize">{level}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUsers className="text-[#f97316]" />
              <span>{bookedCount} booked</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-[#f97316]" />
              <span>{schedule}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Box */}
            <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">
                ABOUT THIS CLASS
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-normal">
                {description ||
                  "Forty-five uncompromising minutes of interval work built around sled pushes, rope waves and assault-bike sprints. Expect a high calorie burn and an elevated heart rate."}
              </p>
            </div>

            {/* Coach Card */}
            <div className="bg-[#120c09] border border-white/5 rounded-2xl p-6 space-y-1">
              <span className="text-[10px] font-extrabold text-[#f97316] uppercase tracking-widest">
                YOUR COACH
              </span>
              <h3 className="text-lg font-black uppercase text-white tracking-wide">
                {displayTrainer}
              </h3>
            </div>
          </div>

          {/* Right Side Sidebar */}
          <div className="lg:col-span-1">
            <ClassDetailsClient
              classId={_id}
              price={price}
              schedule={schedule}
              duration={duration}
              level={level}
            />
          </div>
        </div>

        {/* Related Classes Grid */}
        <div className="space-y-6 pt-6 border-t border-white/5">
          <h2 className="text-sm font-black uppercase tracking-widest text-white">
            YOU MIGHT ALSO LIKE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedClasses.map((item) => (
              <Link
                key={item._id}
                href={`/classes/${item._id}`}
                className="bg-[#120c09] border border-white/5 hover:border-[#f97316]/50 rounded-2xl p-3 flex items-center gap-4 transition-all hover:-translate-y-1 group"
              >
                <img
                  src={
                    item.coverImage ||
                    item.image ||
                    "https://via.placeholder.com/150"
                  }
                  alt={item.className || item.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="space-y-1 truncate">
                  <h4 className="text-xs font-extrabold uppercase text-white truncate group-hover:text-[#f97316] transition-colors">
                    {item.className || item.title || "CLASS"}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium">
                    {item.trainerName ||
                      item.name ||
                      item.fullName ||
                      item.instructor ||
                      (item.trainerEmail
                        ? item.trainerEmail.split("@")[0]
                        : "Trainer")}{" "}
                    • ${item.price || "0"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}