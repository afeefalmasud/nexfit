'use client'

import Link from 'next/link';

export default function BookedClasses() {
  const bookedClasses = [
    {
      id: '1',
      className: 'Ember HIIT 45',
      trainer: 'Marcus Reid',
      schedule: 'Mon, Wed, Fri — 6:30 AM',
      status: 'UPCOMING',
    },
    {
      id: '2',
      className: 'Iron Foundations',
      trainer: 'Dana Whitlock',
      schedule: 'Tue, Thu — 7:00 PM',
      status: 'UPCOMING',
    },
    {
      id: '3',
      className: 'Sunrise Vinyasa Flow',
      trainer: 'Priya Nandal',
      schedule: 'Daily — 6:00 AM',
      status: 'COMPLETED',
    },
    {
      id: '4',
      className: 'Nightshift Boxing',
      trainer: 'Andre Cole',
      schedule: 'Mon, Thu — 9:00 PM',
      status: 'COMPLETED',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Info */}
      <div className="space-y-1">
        <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
          MEMBER
        </span>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          BOOKED CLASSES
        </h1>
        <p className="text-xs text-[#9CA3AF]">
          Every class you've paid for, with schedule details and a link back to the session page.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-[#120c09] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-bold text-[#9CA3AF]/60 uppercase tracking-wider">
                <th className="py-4 px-6 font-semibold">Class</th>
                <th className="py-4 px-6 font-semibold">Trainer</th>
                <th className="py-4 px-6 font-semibold">Schedule</th>
                <th className="py-4 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-[#9CA3AF]">
              {bookedClasses.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  {/* Class Name (Links back to session page) */}
                  <td className="py-4 px-6 font-semibold text-white group-hover:text-[#f97316] transition-colors">
                    <Link href={`/classes/${item.id}`} className="block">
                      {item.className}
                    </Link>
                  </td>

                  {/* Trainer */}
                  <td className="py-4 px-6 text-[#9CA3AF]">
                    {item.trainer}
                  </td>

                  {/* Schedule */}
                  <td className="py-4 px-6 text-[#9CA3AF]">
                    {item.schedule}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${
                        item.status === 'UPCOMING'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-white/5 text-[#9CA3AF]/70 border-white/10'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}