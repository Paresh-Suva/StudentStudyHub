"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Activity,
  Database,
  Server,
  HardDrive,
} from "lucide-react";
import { clsx } from "clsx";
import TracingBeamGrid from "@/components/TracingBeamGrid";

export default function StatusPage() {
  return (
    <div className="relative min-h-screen bg-black text-green-500 font-mono overflow-hidden flex flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <TracingBeamGrid />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />

      <main className="relative z-20 w-full max-w-2xl px-6">
        {/* 1. The Big Green Dot */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="relative">
            {/* Pulse Ring 1 */}
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-green-500/30"
            />
            {/* Pulse Ring 2 */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
              }}
              className="absolute inset-0 rounded-full bg-green-500/40"
            />
            {/* The Core Dot */}
            <div className="relative z-10 w-8 h-8 rounded-full bg-green-500 shadow-[0_0_20px_#22c55e]" />
          </div>

          <h1 className="mt-8 text-3xl md:text-4xl font-bold tracking-tight text-white glow-text">
            ALL SYSTEMS OPERATIONAL
          </h1>

          <div className="mt-2 flex items-center gap-2 text-green-400/60 text-sm">
            <Activity className="w-4 h-4" />
            <span>Latency: 24ms</span>
          </div>
        </div>

        {/* 2. Component Status List */}
        <div className="space-y-4">
          <StatusRow name="Website Access" />
          <StatusRow name="Database (Postgres)" />
          <StatusRow name="File Storage (UploadThing)" />
          <StatusRow name="Authentication (Clerk)" />
        </div>

        {/* 3. Footer Timestamp */}
        <div className="mt-16 text-center border-t border-green-500/20 pt-6">
          <p className="text-xs text-green-500/50">
            REFRESHED: {new Date().toLocaleTimeString()}
          </p>
          <p className="text-[10px] text-green-500/30 mt-1 uppercase tracking-widest">
            System ID: SSH-MAIN-01
          </p>
        </div>
      </main>
    </div>
  );
}

// --- Sub-Component ---

function StatusRow({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-4 rounded-lg border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-colors group"
    >
      <span className="font-bold text-green-400 group-hover:text-green-300 transition-colors">
        {name}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-green-500 uppercase tracking-wider">
          Operational
        </span>
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      </div>
    </motion.div>
  );
}
