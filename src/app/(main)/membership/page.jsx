import Link from "next/link";
import { FiCheck } from "react-icons/fi";

const plans = [
  {
    name: "DROP-IN",
    price: "£0",
    period: "pay per class",
    popular: false,
    features: [
      "Book any approved class",
      "Forum read access",
      "Progress history",
      "No commitment",
    ],
  },
  {
    tag: "MOST POPULAR",
    name: "UNLIMITED",
    price: "£79",
    period: "per month",
    popular: true,
    features: [
      "Unlimited class bookings",
      "Priority waitlist access",
      "Full forum participation",
      "Monthly body composition scan",
      "Two guest passes each month",
    ],
  },
  {
    name: "PERFORMANCE",
    price: "£149",
    period: "per month",
    popular: false,
    features: [
      "Everything in Unlimited",
      "Two 1:1 coaching sessions",
      "Personalised programming",
      "Nutrition check-ins",
    ],
  },
];

const faqs = [
  {
    question: "CAN I CANCEL ANY TIME?",
    answer:
      "Yes. Memberships are rolling monthly and you can cancel from your dashboard with no fees.",
  },
  {
    question: "HOW DO I BECOME A TRAINER?",
    answer:
      "Apply from your dashboard. Our admin team reviews credentials and experience within 48 hours.",
  },
  {
    question: "WHAT HAPPENS IF I MISS A CLASS?",
    answer:
      "Cancel up to 12 hours before and the booking is refunded to your account automatically.",
  },
];

export default function MembershipPage() {
  return (
    <section className="w-full text-white font-sans">
      <div className="w-full bg-[#120D0B] pt-40 md:pt-30 pb-16 px-6 border-b border-white/5">
        <div className="container mx-auto space-y-3">
          <span className="text-[#f97316] text-xs font-bold tracking-[0.2em] uppercase">
            MEMBERSHIP
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase">
            TRAIN ON YOUR TERMS
          </h2>
          <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-2xl">
            No lock-in contracts, no joining fee. Switch or cancel from your
            dashboard whenever you like.
          </p>
        </div>
      </div>

      <div className="w-full bg-[#0A0706] py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl bg-[#140F0D] p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  plan.popular
                    ? "border-2 border-[#f97316] shadow-[0_0_40px_rgba(249,115,22,0.25)] hover:shadow-[0_0_50px_rgba(249,115,22,0.35)]"
                    : "border border-white/5 hover:border-white/20"
                }`}
              >
                <div className="space-y-4">
                  {plan.popular && (
                    <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
                      {plan.tag}
                    </span>
                  )}

                  <h3 className="text-xl font-black tracking-wider uppercase">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#f97316]">
                      {plan.price}
                    </span>
                    <span className="text-xs text-[#9CA3AF] lowercase">
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3.5 pt-6 border-t border-white/5 text-xs sm:text-sm text-[#9CA3AF]">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <FiCheck className="w-4 h-4 text-[#f97316] shrink-0 stroke-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href="/signUp"
                    className={`w-full block text-center py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-150 active:scale-95 ${
                      plan.popular
                        ? "bg-[#f97316] text-black shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:bg-[#ea580c]"
                        : "bg-[#221A16] text-[#f97316] border border-[#f97316]/30 hover:bg-[#f97316]/10 hover:border-[#f97316]/60"
                    }`}
                  >
                    GET STARTED
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8 pt-4">
            <h3 className="text-2xl font-extrabold tracking-tight uppercase">
              FREQUENTLY ASKED
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#140F0D] border border-white/5 p-7 space-y-3 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 cursor-pointer"
                >
                  <h4 className="text-sm font-bold tracking-wider uppercase text-white">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
