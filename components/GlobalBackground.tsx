"use client";

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] min-h-screen w-full bg-[#050505]">
            {/* Dot Grid Pattern */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:30px_30px]"
            />

            {/* Radial Mask to fade edges */}
            <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
    );
}
