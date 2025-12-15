import AdminSidebar from "@/components/admin/AdminSidebar";
import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    // 1. Get the current user
    const user = await currentUser();

    // 2. Not logged in? -> Sign In
    if (!user) {
        redirect("/sign-in");
    }

    // 3. Not an Admin? -> Kick to Home
    // Note: Ensure your Clerk Dashboard has 'role' in publicMetadata for the admin user.
    if (user.publicMetadata.role !== "admin") {
        redirect("/");
    }

    // 4. Authorized -> Render Admin content
    // 4. Authorized -> Render Admin content
    // Fetch pending count with error handling to prevent layout crash on DB issues
    let pendingCount = 0;
    try {
        pendingCount = await db.contribution.count({
            where: {
                status: "PENDING"
            }
        });
    } catch (error) {
        console.error("Admin Layout DB Error:", error);
        // Fail silently or set to -1 to indicate error in UI if supported
    }

    return (
        <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans pt-16">

            {/* --- SIDEBAR (CONTROL RAIL) --- */}
            <AdminSidebar pendingCount={pendingCount} />

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto bg-black relative">
                {/* Subtle Grid Background for Admin Area */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05] pointer-events-none" />

                <div className="relative z-10 p-8 md:p-12">
                    {children}
                </div>
                <div className="bg-black border-t border-white/5 p-8">
                    <p className="text-center text-xs text-zinc-600 font-mono">
                        &copy; 2025 STUDENT STUDY HUB :: ADMIN TERMINAL
                    </p>
                </div>
            </main>

        </div>
    );
}
