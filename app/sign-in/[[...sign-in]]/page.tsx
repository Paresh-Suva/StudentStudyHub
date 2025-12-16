"use client";

import { useState, useEffect } from "react";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="min-h-screen bg-[#050505]" />;
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden font-sans pt-24 px-4 pb-12">
            {/* Vibrant Background Effects */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/20 blur-[120px]" />
            </div>

            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />

            <div className="relative z-10 w-full max-w-[480px] mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-500 mb-2 tracking-tight drop-shadow-sm">
                        Welcome Learner
                    </h1>
                    <p className="text-zinc-400 text-sm font-medium">Enter the hub of knowledge.</p>
                </div>

                <div className="w-full">
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: "w-full flex justify-center mx-auto",
                                card: "bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-10px_rgba(6,182,212,0.2)] w-full !max-w-full p-8 rounded-3xl mx-auto ring-1 ring-white/5",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                formButtonPrimary: "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 w-full border border-white/10",
                                footerActionLink: "text-zinc-400 hover:text-cyan-400 transition-colors",
                                formFieldLabel: "text-zinc-400",
                                formFieldInput: "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all !max-w-full box-border",
                                socialButtonsBlockButton: "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all text-sm h-11 !max-w-full box-border w-full hover:border-white/20",
                                dividerLine: "bg-white/10",
                                dividerText: "text-zinc-600",
                                formFieldRow: "w-full"
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
