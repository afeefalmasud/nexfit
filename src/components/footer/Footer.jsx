import Link from 'next/link'
import { FaFire } from 'react-icons/fa'
import { FaXTwitter, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa6'
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="w-full bg-[#120D0B] text-[#9CA3AF] border-t border-white/5 font-sans">
      <div className="container mx-auto px-5 lg:px-0 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-[#f97316] flex items-center justify-center text-black shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:scale-105 transition-transform">
                <FaFire className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">
                NEX<span className="text-[#f97316]">FIT</span>
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm leading-relaxed text-[#9CA3AF]/80 max-w-sm">
              Strength, conditioning and community under one roof. Train with coaches who actually track your progress.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { Icon: FaXTwitter, href: "#" },
                { Icon: FaInstagram, href: "#" },
                { Icon: FaYoutube, href: "#" },
                { Icon: FaFacebookF, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-[#1C1613] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-90 transition-all duration-150 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold tracking-widest text-white uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "All Classes", href: "/classes" },
                { name: "Community Forum", href: "/community" },
                { name: "Membership", href: "/membership" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#f97316] active:text-[#ea580c] transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Account */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold tracking-widest text-white uppercase mb-5">
              Account
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Log in", href: "/signIn" },
                { name: "Create account", href: "/signUp" },
                { name: "Dashboard", href: "/dashboard" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#f97316] active:text-[#ea580c] transition-colors duration-150"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold tracking-widest text-white uppercase mb-5">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <span>128 Foundry Lane, Manchester M4 5JN</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-[#f97316] shrink-0" />
                <a href="tel:+441815550142" className="hover:text-[#f97316] transition-colors">
                  +44 181 555 0142
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-[#f97316] shrink-0" />
                <a href="mailto:hello@nexfit.io" className="hover:text-[#f97316] transition-colors">
                  hello@nexfit.io
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 text-center text-xs text-[#9CA3AF]/60">
        <p>© 2026 NexFit Performance Ltd. All rights reserved.</p>
      </div>
    </footer>
  )
}