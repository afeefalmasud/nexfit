import { TbActivity, TbShieldCheck, TbClock } from 'react-icons/tb';
import { LuDumbbell } from "react-icons/lu";


const features = [
  {
    icon: LuDumbbell,
    title: 'COACH-LED PROGRAMMING',
    description:
      'Every class is built by a certified coach and reviewed by our head of training before it goes live.',
  },
  {
    icon: TbActivity,
    title: 'PROGRESS YOU CAN SEE',
    description:
      'Session history, attendance streaks and personal bests tracked automatically in your dashboard.',
  },
  {
    icon: TbShieldCheck,
    title: 'VETTED TRAINERS ONLY',
    description:
      'Trainer applications are manually reviewed. Credentials, insurance and experience are verified.',
  },
  {
    icon: TbClock,
    title: 'BOOK IN TEN SECONDS',
    description:
      'Reserve a spot, pay securely and get your reminder — no phone calls, no waiting lists.',
  },
];

export default function WhyNexFit() {
  return (
    <section className="w-full bg-[#120D0B] text-white py-30 px-6 font-sans">
      <div className="container mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-[#f97316] text-xs font-bold tracking-[0.2em] uppercase">
            WHY NEXFIT
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase">
            BUILT FOR PEOPLE WHO TRAIN
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl bg-[#1C1512] border border-white/5 p-7 flex flex-col justify-between space-y-6 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-[#f97316]/40 hover:bg-[#221B17] hover:shadow-[0_10px_30px_rgba(249,115,22,0.1)] cursor-pointer"
            >
             
              <div className="w-11 h-11 rounded-xl bg-[#261C17] border border-[#f97316]/20 flex items-center justify-center text-[#f97316] group-hover:scale-110 group-hover:bg-[#f97316] group-hover:text-black transition-all duration-300">
                <feature.icon className="w-5 h-5 stroke-2" />
              </div>

             
              <div className="space-y-3">
                <h3 className="text-base font-bold tracking-wider uppercase text-white group-hover:text-[#f97316] transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}