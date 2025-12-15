"use client";

import { motion } from "framer-motion";
import {
    Cpu,
    Stethoscope,
    Briefcase,
    Calculator,
    FlaskConical,
    Palette
} from "lucide-react";
import { clsx } from "clsx";

interface FeatureCardProps {
    title: string;
    subtitle: string;
    icon: React.ElementType;
    className?: string;
    delay: number;
}

function FeatureCard({ title, subtitle, icon: Icon, className, delay }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className={clsx(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-6 transition-all duration-300 hover:border-green-400 hover:shadow-[0_0_20px_-5px_rgba(74,222,128,0.3)] hover:scale-[1.02]",
                className
            )}
        >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 transition-colors group-hover:bg-green-400/20">
                <Icon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-green-400" />
            </div>

            <div>
                <h3 className="mb-1 text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-zinc-400">{subtitle}</p>
            </div>

            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-green-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
    );
}

export default function FeaturesGrid() {
    const features = [
        {
            title: "Engineering",
            subtitle: "Computer, Mechanical, Civil & more. Notes, PYQs, and Projects.",
            icon: Cpu,
            className: "md:col-span-2 md:row-span-1",
            delay: 0.1,
        },
        {
            title: "Medical",
            subtitle: "MBBS, BDS, Nursing resources.",
            icon: Stethoscope,
            delay: 0.2,
        },
        {
            title: "Management",
            subtitle: "MBA, BBA case studies & notes.",
            icon: Briefcase,
            delay: 0.3,
        },
        {
            title: "Commerce",
            subtitle: "B.Com accounts & stats.",
            icon: Calculator,
            delay: 0.4,
        },
        {
            title: "Science",
            subtitle: "B.Sc Physics, Chemistry, Math.",
            icon: FlaskConical,
            delay: 0.5,
        },
        {
            title: "Arts",
            subtitle: "Literature, Psychology & History.",
            icon: Palette,
            delay: 0.6,
        },
    ];

    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-white md:text-4xl">Select Your Stream</h2>
                <p className="mt-4 text-zinc-400">Everything you need, organized by department.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        subtitle={feature.subtitle}
                        icon={feature.icon}
                        className={feature.className}
                        delay={feature.delay}
                    />
                ))}
            </div>
        </section>
    );
}
