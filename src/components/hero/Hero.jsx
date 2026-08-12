"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "motion/react";
import Stats from "./Stats";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1], // Smooth cubic-bezier
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#0A0706] text-white flex flex-col justify-center overflow-hidden py-40 px-6">
      
      {/* Background Section with Motion Fade */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url('/assets/hero1.jpg')` }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0A0706]/95 via-[#0A0706]/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0A0706]/60 via-transparent to-[#0A0706]" />

        {/* Pulsing Ambient Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f97316] rounded-full blur-[120px] pointer-events-none" 
        />
      </motion.div>

      {/* Main Content Container with Staggered Animations */}
      <div className="relative z-10 container mx-auto w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
              <span className="text-[#f97316] text-[11px] font-bold tracking-[0.2em] uppercase">
                MANCHESTER - EST. 2019
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[1.05]"
          >
            FORGE A BODY <br />
            THAT <span className="text-[#f97316]">DOESN'T QUIT</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-[#9CA3AF] text-sm sm:text-base leading-relaxed max-w-xl"
          >
            NexFit is where members, trainers and coaches run their whole
            fitness operation — classes, bookings, progress and community in one
            place.
          </motion.p>

          {/* Buttons with Hover and Tap Animations */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/classes"
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] transition-all duration-150 cursor-pointer"
              >
                EXPLORE CLASSES
                <FiArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/signUp"
                className="block px-8 py-4 rounded-xl border border-[#f97316]/30 bg-black/40 backdrop-blur-md text-[#f97316] font-bold text-sm uppercase tracking-wider hover:bg-[#f97316]/10 hover:border-[#f97316]/60 transition-all duration-150 cursor-pointer"
              >
                START FREE TRIAL
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Card Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-16 sm:mt-24 w-full rounded-2xl bg-[#140F0D]/60 border border-white/5 backdrop-blur-xl p-6 sm:p-8"
        >
          <Stats />
        </motion.div>
      </div>

    </section>
  );
}