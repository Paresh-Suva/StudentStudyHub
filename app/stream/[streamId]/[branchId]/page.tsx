"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

// Helper to get folders based on branch
const getFolders = (branchId: string) => {
  // Logic A: MBBS (Professional Year System - NMC)
  if (branchId === "mbbs") {
    return [
      { id: "prof-1", title: "Professional Year 1", subtitle: "Anatomy, Physiology, Biochemistry", code: "PROF-01" },
      { id: "prof-2", title: "Professional Year 2", subtitle: "Pathology, Microbiology, Pharmacology", code: "PROF-02" },
      { id: "prof-3-part-1", title: "Professional Year 3 (Part 1)", subtitle: "ENT, Ophthalmology, Community Medicine", code: "PROF-03-A" },
      { id: "prof-3-part-2", title: "Professional Year 3 (Part 2)", subtitle: "Medicine, Surgery, OBGY, Pediatrics", code: "PROF-03-B" },
    ];
  }

  // Logic B: B.Pharm (Semester System - PCI)
  if (branchId === "b-pharm") {
    return Array.from({ length: 8 }, (_, i) => ({
      id: `sem-${i + 1}`,
      title: `Semester ${i + 1}`,
      subtitle: `B.Pharm Phase ${Math.ceil((i + 1) / 2)}`, // Just an example subtitle or leave undefined
      code: `SEM-0${i + 1}`,
    }));
  }

  // Logic C: Engineering (Default Semester System)
  return Array.from({ length: 8 }, (_, i) => ({
    id: `sem-${i + 1}`,
    title: `Semester ${i + 1}`,
    subtitle: undefined,
    code: `SEM-0${i + 1}`,
  }));
};



export default function SemesterSelectionPage({ params }: { params: Promise<{ streamId: string; branchId: string }> }) {
  const { streamId, branchId } = use(params);

  const folders = getFolders(branchId);

  // Dynamic Header Logic
  const getHeaderTitle = () => {
    if (branchId === 'mbbs') return "Select Professional Year";
    if (branchId === 'b-pharm') return "Select Semester";
    return "Select Semester";
  }

  const getSubtitle = () => {
    if (branchId === 'mbbs') return "Access wise-access for your professional phase";
    if (branchId === 'b-pharm') return "PCI Curriculum Compliant";
    return "Which semester are you studying in?";
  }

  return (
    <div className="min-h-screen bg-transparent pt-40 p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
              <span>{streamId}</span>
              <span className="text-zinc-700">/</span>
              <span className="text-[var(--hover-color)]">{branchId}</span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl mb-4">
              {getHeaderTitle()}
            </h1>
            <p className="text-zinc-400 text-lg">
              {getSubtitle()}
            </p>
          </motion.div>
        </header>

        {/* Folder List (Grid Layout) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {folders.map((folder, index) => (
            <motion.div
              key={folder.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <Link href={`/stream/${streamId}/${branchId}/${folder.id}`} className="group block h-full">
                <div className={clsx(
                  "relative h-48 w-full flex flex-col items-center justify-center rounded-xl p-6 transition-all duration-300 overflow-hidden",
                  "bg-white/5 border border-white/10 backdrop-blur-sm",
                  "hover:-translate-y-2 hover:scale-[1.02]",
                  "hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/50"
                )}>

                  {/* Watermark Number */}
                  <span className="absolute -bottom-6 -right-4 text-8xl font-black text-white/5 select-none transition-colors group-hover:text-cyan-500/10">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <span className="block text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-2 group-hover:text-cyan-400 transition-colors">
                      {folder.subtitle || folder.code}
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {folder.title}
                    </h3>
                  </div>

                  {/* Hover Indicator (Optional) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
