"use client";

import { useUser } from "@clerk/nextjs";
import { Camera, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { syncUser } from "@/actions/user";

interface AvatarUploaderProps {
    size?: string;
    currentUserImage?: string;
}

export default function AvatarUploader({ size = "w-32 h-32", currentUserImage }: AvatarUploaderProps) {
    const { user } = useUser();
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error("Image size should be less than 5MB");
            return;
        }

        setUploading(true);
        try {
            if (user) {
                await user.setProfileImage({ file });
                await syncUser(); // Sync with DB
                toast.success("Avatar updated successfully!");
            }
        } catch (error) {
            console.error("Avatar upload failed:", error);
            toast.error("Failed to update profile picture");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className={`relative group cursor-pointer rounded-full p-1 bg-gradient-to-br from-cyan-400 to-blue-600 ${size}`}
            onClick={() => !uploading && fileRef.current?.click()}
        >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-black border-2 border-transparent">
                <img
                    src={user?.imageUrl || currentUserImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />

                {/* Hover / Loading Overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                    {uploading ? (
                        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    ) : (
                        <Camera className="w-8 h-8 text-white drop-shadow-md" />
                    )}
                </div>
            </div>

            <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
            />
        </div>
    );
}
