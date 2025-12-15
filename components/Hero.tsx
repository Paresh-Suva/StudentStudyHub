"use client";

import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import HeroTitle from "./HeroTitle";

export default function Hero() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-black px-4 text-center">

      {/* Background Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/20 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl flex flex-col items-center"
      >
        <span className="mb-4 inline-block rounded-full border border-green-500/30 bg-green-900/10 px-4 py-1.5 text-sm font-medium text-green-400 backdrop-blur-md">
          🚀 The Future of Study Material
        </span>

        {/* SVG Hero Title */}
        <HeroTitle />

        <div className="mb-8 min-h-[4rem] text-3xl font-bold text-zinc-400 sm:text-4xl md:text-5xl mt-2">
          <span className="text-green-500">
            <Typewriter
              words={["Master Your Concepts.", "Build Your Future.", "Shape The World.", "Ace Your Exams."]}
            />
          </span>
        </div>

        <p className="mb-10 text-lg text-zinc-400 sm:text-xl max-w-2xl mx-auto">
          The ultimate resource for Engineering and Medical students who want to go beyond the syllabus.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105 hover:bg-zinc-200">
            Start Learning
          </button>
          <button className="rounded-full border border-zinc-700 bg-black/50 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
            Join Community
          </button>
        </div>
      </motion.div>
    </div>
  );
}
