import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import FileViewWorkspace from "@/components/FileViewWorkspace";

interface PageProps {
    params: Promise<{
        fileId: string;
    }>
}

export default async function FileViewPage({ params }: PageProps) {
    const { userId } = await auth();
    const { fileId } = await params;

    const file = await db.contribution.findUnique({
        where: { id: fileId },
        include: {
            user: true, // Author
            likes: true
        }
    });

    if (!file) return notFound();

    // Determine like status
    const isLiked = file.likes.some(like => like.userId === userId);

    // Determine bookmark status
    let isBookmarked = false;
    if (userId) {
        const bookmark = await db.bookmark.findUnique({
            where: {
                userId_contributionId: {
                    userId,
                    contributionId: fileId
                }
            }
        });
        isBookmarked = !!bookmark;
    }

    // Fetch related files (Same Subject, Same Stream) to keep user engaged
    const relatedFiles = await db.contribution.findMany({
        where: {
            subject: file.subject,
            stream: file.stream,
            status: "APPROVED",
            id: { not: file.id } // Exclude current
        },
        take: 5,
        orderBy: { createdAt: 'desc' }
    });

    // SECURITY: Conditionally obscure the file URL if not logged in
    const secureFile = userId ? file : { ...file, fileUrl: null };

    return (
        <FileViewWorkspace
            file={secureFile}
            isLiked={isLiked}
            isBookmarked={isBookmarked}
            relatedFiles={relatedFiles}
            userId={userId}
        />
    );
}
