"use client";

import { Shield, Scale, FileText, AlertTriangle, Mail } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-4">
                        Legal & Compliance
                    </h1>
                    <p className="text-zinc-400">
                        Governance protocols for Student Study Hub. Last updated: December 2025.
                    </p>
                </div>

                <div className="space-y-12">

                    {/* 1. Intellectual Property & Copyright */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Scale className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-wider">Intellectual Property & Copyright</h2>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                            <p className="text-zinc-300 leading-relaxed">
                                Student Study Hub is a community-driven educational platform. We respect the intellectual property rights of others. Content available on this platform is for educational purposes only.
                            </p>
                        </div>
                    </section>

                    {/* 2. DMCA Takedown Policy */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-rose-500 mb-2">
                            <Shield className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-wider">DMCA Takedown Policy</h2>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-6">
                            <p className="text-zinc-300 leading-relaxed">
                                If you believe your copyrighted material has been uploaded without permission, please contact us immediately. We operate on a strict <strong className="text-white">'Notice and Takedown'</strong> basis.
                            </p>

                            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                <h3 className="flex items-center gap-2 font-bold text-rose-400 mb-3">
                                    <AlertTriangle className="w-4 h-4" />
                                    Reporting Procedure
                                </h3>
                                <p className="text-sm text-zinc-400 mb-4">
                                    To request removal, email <a href="mailto:support@studentstudyhub.com" className="text-white hover:text-cyan-400 underline">support@studentstudyhub.com</a> with:
                                </p>
                                <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1 ml-2">
                                    <li>The Link (URL) to the file.</li>
                                    <li>Proof of ownership.</li>
                                    <li>A statement requesting removal.</li>
                                </ul>
                            </div>

                            <p className="text-sm text-zinc-500 italic border-l-2 border-zinc-700 pl-4">
                                We guarantee to remove infringing content within 48 hours of a valid request.
                            </p>
                        </div>
                    </section>

                    {/* 3. Attribution */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                            <FileText className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-wider">Attribution</h2>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10">
                            <p className="text-zinc-300 leading-relaxed">
                                All university notes and third-party materials belong to their respective authors/institutions. We do not claim ownership of these files. They are archived here for accessibility and preservation.
                            </p>
                        </div>
                    </section>

                    {/* Footer Note */}
                    <div className="pt-8 border-t border-white/5 text-center">
                        <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
                            &larr; Return to Home
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
