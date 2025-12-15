"use client";

import { useClerk } from "@clerk/nextjs";
import { Camera } from "lucide-react";

interface EditableAvatarProps {
    imageUrl: string;
    size?: string;
}

export default function EditableAvatar({ imageUrl, size = "w-32 h-32" }: EditableAvatarProps) {
    const { openUserProfile } = useClerk();

    return (
        <div
            className={`relative group cursor-pointer rounded-full overflow-hidden ${size} border-4 border-white/10 hover:border-cyan-400 transition-colors`}
            onClick={() => openUserProfile()}
        >
            {/* The Image */}
            <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white drop-shadow-md" />
            </div>
        </div>
    );
}
