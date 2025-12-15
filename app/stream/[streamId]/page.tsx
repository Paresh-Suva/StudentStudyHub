"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BranchCard from "@/components/BranchCard";
import { ACADEMIC_DATA } from "@/lib/academic-data";

export default function BranchSelectionPage({ params }: { params: Promise<{ streamId: string }> }) {
    const { streamId } = use(params);
    const normalizedStreamId = streamId.toLowerCase() as keyof typeof ACADEMIC_DATA;

    // Get Data safely
    const streamData = ACADEMIC_DATA[normalizedStreamId];

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
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-white md:text-6xl mb-4">
                            {streamData?.title || "Unknown Stream"}
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            {streamData?.description || "Select existing contributions."}
                        </p>
                    </motion.div>
                </header>

                {/* Branch Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {streamData?.branches ? (
                        streamData.branches.map((branch, index) => (
                            <motion.div
                                key={branch.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full"
                            >
                                <BranchCard
                                    title={branch.name}
                                    description={branch.description}
                                    iconName={branch.icon}
                                    colorGradient={branch.color}
                                    href={`/stream/${streamId}/${branch.id}`}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <h3 className="text-2xl font-bold text-zinc-600">Stream Not Found</h3>
                            <p className="text-zinc-500">We could not find data for {streamId}.</p>
                            <Link href="/" className="mt-4 inline-block text-green-500 hover:underline">Go Back Home</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
