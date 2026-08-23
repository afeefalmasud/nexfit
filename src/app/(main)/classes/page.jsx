import ClassesClientWrapper from "@/components/classes/ClientWrapper";
import { AllClass } from "@/lib/api/getallclass";

export default async function AllClassesPage() {
  // Fetched entirely on the server
  const allclass = await AllClass();

  return (
    <div className="min-h-screen bg-[#120D0B] text-white pt-40 md:pt-30">
      <div className="space-y-8">
        <div className="container mx-auto px-6">
          <div className="space-y-2">
            <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.25em] uppercase">
              TIMETABLE
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              ALL CLASSES
            </h1>
            <p className="text-xs md:text-sm text-gray-400 max-w-2xl leading-relaxed">
              Every class below is reviewed and approved by the NexFit training
              team. Filter by discipline or search for a session by name.
            </p>
          </div>
        </div>
        <ClassesClientWrapper initialClasses={allclass} />
      </div>
    </div>
  );
}
