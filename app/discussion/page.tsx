import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import DiscussionForm from "@/components/DiscussionForm";
import DiscussionItem from "@/components/DiscussionItem";
import { MessageCircle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DiscussionPage() {
    const user = await currentUser();
    if (!user) redirect("/"); // Protected route

    const userId = user.id;
    const isAdmin = user.publicMetadata.role === "admin";

    const discussions = await db.discussion.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: true
        }
    });

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
                        <MessageCircle className="w-8 h-8 text-purple-500" />
                        Discussion Board
                    </h1>
                    <p className="text-zinc-400">
                        Ask for help, share resources, or just hang out with fellow scholars.
                    </p>
                </div>

                {/* Input Area */}
                <DiscussionForm />

                {/* Feed */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4 sticky top-20 bg-[#050505]/80 backdrop-blur-md py-4 z-10 border-b border-white/5">
                        Recent Activity
                    </h2>

                    {discussions.length > 0 ? (
                        discussions.map((discussion) => (
                            <DiscussionItem
                                key={discussion.id}
                                discussion={discussion}
                                currentUserId={userId}
                                isAdmin={isAdmin}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                            <p className="text-zinc-500">No discussions yet. Be the first to say hello! 👋</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
