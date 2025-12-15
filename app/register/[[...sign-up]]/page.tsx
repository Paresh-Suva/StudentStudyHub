"use client";

import { SignUp } from "@clerk/nextjs";
import NextImage from "next/image";
import { ShieldCheck } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black selection:bg-cyan-500/30">

            {/* 1. Background Pattern */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-0" />

            {/* 2. The Atmosphere (The Glow) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none z-0" />

            {/* 3. The Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-md px-4">

                {/* Header */}
                <div className="mb-8 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/10 shadow-2xl backdrop-blur-md ring-1 ring-white/5">
                        <div className="relative w-12 h-12">
                            <NextImage src="/logo.png" alt="SSH Logo" fill className="object-contain" />
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">
                            STUDENT STUDY HUB
                        </h1>
                        <p className="sr-only">Create your account</p>
                    </div>
                </div>

                {/* Form */}
                <div className="w-full animate-in fade-in zoom-in-95 duration-500 delay-150">
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl w-full",
                                headerTitle: "text-white",
                                headerSubtitle: "text-zinc-400",
                                formButtonPrimary: "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all",
                                socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
                                socialButtonsBlockButtonText: "text-white font-medium",
                                formFieldLabel: "text-zinc-400",
                                formFieldInput: "bg-white/5 border-white/10 text-white focus:border-cyan-500/50 transition-all",
                                footerActionLink: "text-cyan-400 hover:text-cyan-300"
                            }
                        }}
                        redirectUrl="/contribute"
                    />
                </div>

            </div>
        </div>
    );
}
