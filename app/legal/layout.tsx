import LegalSidebar from "@/components/legal/LegalSidebar";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-zinc-300 selection:bg-cyan-500/30">
            {/* Background Texture */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 md:py-40">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <LegalSidebar />
                    </div>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
