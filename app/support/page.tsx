"use client";

import { motion } from "framer-motion";
import { Mail, Bug, ShieldAlert, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { clsx } from "clsx";
import TracingBeamGrid from "@/components/TracingBeamGrid";

export default function SupportPage() {
    return (
        <div className="relative min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="absolute inset-0 z-0">
                <TracingBeamGrid />
            </div>

            <main className="relative z-10 max-w-5xl mx-auto space-y-24">
                {/* 1. Hero Section */}
                <section className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                    >
                        How can we help?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 font-medium"
                    >
                        The academic revolution never sleeps, but sometimes we do.
                    </motion.p>
                </section>

                {/* 2. The Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ContactCard
                        icon={Mail}
                        title="General Inquiries"
                        desc="Partnerships, feedback, or just saying hello."
                        actionLabel="Email Us"
                        href="mailto:studentstudyhub123@gmail.com?subject=General Inquiry: Student Study Hub"
                        delay={0.3}
                    />
                    <ContactCard
                        icon={Bug}
                        title="Report a Bug"
                        desc="Found a glitch in the matrix? Let us know."
                        actionLabel="Report Issue"
                        href="mailto:studentstudyhub123@gmail.com?subject=Bug Report: Student Study Hub"
                        variant="alert"
                        delay={0.4}
                    />
                    <ContactCard
                        icon={ShieldAlert}
                        title="Copyright Claims"
                        desc="DMCA takedowns and content disputes."
                        actionLabel="Legal Center"
                        href="/legal/terms"
                        delay={0.5}
                    />
                </div>

                {/* 3. FAQ Section */}
                <section className="max-w-3xl mx-auto w-full">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-2xl font-bold mb-8 text-center text-zinc-200"
                    >
                        Common Questions
                    </motion.h2>
                    <div className="space-y-4">
                        <FAQItem
                            question="How do I upload notes?"
                            answer="Navigate to the 'Contribute' page via the top navigation bar. Fill out the smart form with your stream details, attach your PDF, and hit submit. You'll earn Reputation Points once approved."
                        />
                        <FAQItem
                            question="Is this platform free?"
                            answer="Yes. Student Study Hub is 100% free and open-source. We believe knowledge should be accessible to everyone, regardless of financial status."
                        />
                        <FAQItem
                            question="How do I delete my account?"
                            answer="Currently, account deletion must be processed manually. Please email studentstudyhub123@gmail.com with your request and we will scrub your data from the mainframe."
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}

// --- Sub-Components ---

function ContactCard({ icon: Icon, title, desc, actionLabel, href, variant = "default", delay }: any) {
    const isAlert = variant === "alert";
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={clsx(
                "group relative p-8 rounded-2xl border bg-black/40 backdrop-blur-sm transition-all hover:-translate-y-1",
                isAlert
                    ? "border-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                    : "border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            )}
        >
            <div className={clsx(
                "mb-6 w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                isAlert ? "bg-red-500/10 text-red-500" : "bg-white/5 text-white group-hover:bg-cyan-500/20 group-hover:text-cyan-400"
            )}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-zinc-400 text-sm mb-6 min-h-[40px]">{desc}</p>
            <Link
                href={href}
                className={clsx(
                    "inline-flex items-center text-xs font-bold uppercase tracking-wider transition-colors",
                    isAlert ? "text-red-400 hover:text-red-300" : "text-white hover:text-cyan-400"
                )}
            >
                {actionLabel} &rarr;
            </Link>
        </motion.div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border border-white/5 bg-white/5 rounded-xl overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-bold text-zinc-200">{question}</span>
                <ChevronDown className={clsx("w-5 h-5 text-zinc-500 transition-transform", isOpen && "rotate-180")} />
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                className="overflow-hidden"
            >
                <div className="p-6 pt-0 text-zinc-400 text-sm leading-relaxed">
                    {answer}
                </div>
            </motion.div>
        </motion.div>
    );
}
