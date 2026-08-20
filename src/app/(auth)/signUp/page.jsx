"use client";
import Link from "next/link";
import { FaFire } from "react-icons/fa";
import { FiCheck, FiUser, FiSliders } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Suspense, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignUpForm = () => {
  const [role, setRole] = useState("member"); // 'member' or 'trainer'
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: userData.image,
      role: role, // Directly pass selected React state
    });

    if (error) {
      toast.error(error.message || "Sign up failed", {
        position: "top-center",
        theme: "dark",
        autoClose: 1500,
        transition: Bounce,
      });
      return;
    }

    if (data) {
      toast.success("Account created successfully", {
        position: "top-center",
        theme: "dark",
        autoClose: 1500,
        transition: Bounce,
      });

      // Use router.push inside client component handlers
      setTimeout(() => {
        router.push("/signIn");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0706] text-white flex font-sans">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-7">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-[#f97316] flex items-center justify-center text-black shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:scale-105 transition-transform">
                <FaFire className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">
                NEX<span className="text-[#f97316]">FIT</span>
              </span>
            </Link>

            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold uppercase tracking-tight">
                CREATE YOUR ACCOUNT
              </h1>
              <p className="text-xs text-[#9CA3AF]">
                Select your account role below to customize your dashboard experience.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Hidden Input as Fallback */}
            <input type="hidden" name="role" value={role} />

            {/* Role Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("member")}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                    role === "member"
                      ? "bg-[#f97316]/10 border-[#f97316] text-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                      : "bg-[#140F0D] border-white/10 text-[#9CA3AF] hover:border-white/20"
                  }`}
                >
                  <FiUser className="w-4 h-4" />
                  MEMBER
                </button>

                <button
                  type="button"
                  onClick={() => setRole("trainer")}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
                    role === "trainer"
                      ? "bg-[#f97316]/10 border-[#f97316] text-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                      : "bg-[#140F0D] border-white/10 text-[#9CA3AF] hover:border-white/20"
                  }`}
                >
                  <FiSliders className="w-4 h-4" />
                  TRAINER
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Full name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Jordan Ellis"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#140F0D] border border-white/10 text-sm text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#140F0D] border border-white/10 text-sm text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Profile image URL
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-[#140F0D] border border-white/10 text-sm text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9CA3AF]">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#140F0D] border border-white/10 text-sm text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
              />
              <p className="text-[10px] text-[#9CA3AF]/70 pt-0.5">
                Minimum 6 characters, with one uppercase and one lowercase letter.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#f97316] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:bg-[#ea580c] active:scale-95 transition-all duration-150 cursor-pointer pt-3 mt-2"
            >
              CREATE {role.toUpperCase()} ACCOUNT
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-white/10" />
            <span className="absolute bg-[#0A0706] px-3 text-[10px] font-bold text-[#9CA3AF]/60 uppercase tracking-widest">
              OR CONTINUE WITH
            </span>
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-xl bg-[#140F0D] border border-white/10 text-xs font-semibold text-white flex items-center justify-center gap-3 hover:bg-white/5 active:scale-95 transition-all duration-150 cursor-pointer"
          >
            <FcGoogle className="w-4 h-4" />
            Continue with Google
          </button>

          <p className="text-center text-xs text-[#9CA3AF]">
            Already a member?{" "}
            <Link
              href="/signIn"
              className="text-[#f97316] hover:underline font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-12 overflow-hidden bg-[#120D0B] border-l border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url('/assets/signUp.jpg')` }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#0A0706] via-[#0A0706]/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-l from-transparent to-[#0A0706]/80" />

        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-[#f97316]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-sm">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight">
            START <span className="text-[#f97316]">TODAY</span>
          </h2>

          <ul className="space-y-2.5 text-xs text-[#D1D5DB]">
            <li className="flex items-center gap-2.5">
              <FiCheck className="w-4 h-4 text-[#f97316] shrink-0 stroke-3" />
              <span>First week of classes free</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FiCheck className="w-4 h-4 text-[#f97316] shrink-0 stroke-3" />
              <span>Cancel or reschedule up to 12h before</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FiCheck className="w-4 h-4 text-[#f97316] shrink-0 stroke-3" />
              <span>Full access to the community forum</span>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#040C13] flex justify-center items-center">
          Loading...
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}