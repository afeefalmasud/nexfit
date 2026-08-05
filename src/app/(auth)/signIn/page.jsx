'use client'
import Link from 'next/link';
import { FaFire } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc';
import { FiUser, FiSliders, FiShield } from 'react-icons/fi';
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

const SignInForm = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    });
    if(data){
      redirect('/')
    }
    if (error) {
      toast.error("Invalid email or password", {
        position: "top-center",
        theme: "dark",
        autoClose: 1500,
        transition: Bounce,
      });
    } else {
      toast.success("Welcome back!", {
        position: "top-center",
        theme: "dark",
        autoClose: 1500,
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0706] text-white flex font-sans">

      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-12 overflow-hidden bg-[#120D0B] border-r border-white/5">
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url('/assets/signIn.jpg')` }} 
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#0A0706] via-[#0A0706]/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0A0706]/80" />

        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#f97316]/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <h2 className="text-4xl font-extrabold uppercase tracking-tight">
            EVERY REP <span className="text-[#f97316]">COUNTS</span>
          </h2>
          <p className="text-xs text-[#9CA3AF] tracking-wide">
            12,000 members. 180 weekly classes. One place to run all of it.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">

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
                WELCOME BACK
              </h1>
              <p className="text-xs text-[#9CA3AF]">
                Log in to book classes, track progress and join the conversation.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
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
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#140F0D] border border-white/10 text-sm text-white placeholder-[#9CA3AF]/40 focus:outline-none focus:border-[#f97316] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#f97316] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:bg-[#ea580c] active:scale-95 transition-all duration-150 cursor-pointer pt-3"
            >
              LOG IN
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

          <div className="rounded-2xl bg-[#140F0D] border border-white/5 p-5 space-y-4">
            <div className="space-y-1">
              <span className="text-[#f97316] text-[10px] font-extrabold tracking-[0.2em] uppercase">
                DEMO INTERFACES
              </span>
              <p className="text-[11px] text-[#9CA3AF]">
                This is a design preview — pick a role to explore its dashboard.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'MEMBER', Icon: FiUser },
                { label: 'TRAINER', Icon: FiSliders },
                { label: 'ADMIN', Icon: FiShield },
              ].map((role) => (
                <button
                  key={role.label}
                  type="button"
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1C1613] border border-white/5 hover:border-[#f97316]/40 hover:text-[#f97316] active:scale-95 transition-all duration-150 cursor-pointer text-[#9CA3AF]"
                >
                  <role.Icon className="w-4 h-4 mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-[#9CA3AF]">
            New to NexFit?{' '}
            <Link
              href="/signUp"
              className="text-[#f97316] hover:underline font-semibold"
            >
              Create an account
            </Link>
          </p>

        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#040C13] flex justify-center items-center">
          Loading...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}