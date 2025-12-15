import { db } from "@/lib/db";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export const dynamic = 'force-dynamic'; // Ensure real-time data

export default async function AdminAnalyticsPage() {
    // 1. Fetch Real Data
    const [
        totalUsers,
        totalFiles,
        filesByStream,
        recentUploads
    ] = await Promise.all([
        db.user.count(),
        db.contribution.count(),
        db.contribution.groupBy({
            by: ['stream'],
            _count: {
                _all: true
            }
        }),
        db.contribution.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true, email: true } }
            }
        })
    ]);

    return (
        <div className="p-6 space-y-8 bg-black min-h-screen text-white/90">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white mb-1">
                        System Overwatch
                    </h1>
                    <p className="text-zinc-500 font-mono text-sm">Real-time metrics and telemetry.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold font-mono animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    ONLINE :: CONNECTED
                </div>
            </div>

            <AnalyticsDashboard
                metrics={{ totalUsers, totalFiles }}
                streams={filesByStream}
                recentUploads={recentUploads}
            />
        </div>
    );
}
