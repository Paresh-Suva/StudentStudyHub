"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SecurityPage() {
    return (
        <div className="flex justify-center items-center min-h-[600px] w-full bg-black">
            <UserProfile
                path="/dashboard/security"
                routing="path"
                appearance={{
                    elements: {
                        rootBox: "w-full max-w-4xl",
                        card: "bg-[#1a1a1a] border border-white/10 shadow-none text-white",
                        navbar: "bg-[#1a1a1a] border-r border-white/5",
                        navbarButton: "text-zinc-400 hover:text-white hover:bg-white/5",
                        activeNavbarButton: "text-cyan-400 bg-cyan-500/10 border-l-4 border-cyan-500",
                        headerTitle: "text-white",
                        headerSubtitle: "text-zinc-400",
                        profileSectionTitleText: "text-cyan-400 font-bold",
                        badge: "bg-cyan-600 text-white",
                        formButtonPrimary: "bg-cyan-500 hover:bg-cyan-600 border-none",
                        formFieldInput: "bg-[#0a0a0a] border-white/10 text-white",
                        formFieldLabel: "text-zinc-300",
                        dividerRow: "hidden",
                        pageScrollBox: "bg-transparent",
                    }
                }}
            />
        </div>
    );
}
