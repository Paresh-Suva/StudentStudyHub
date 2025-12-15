"use client";

import { useEffect, useRef, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";

// Since we don't have the paid MorphSVGPlugin in npm, we'll try to use the CDN version
// or fallback to a simpler animation if it fails to load.
// We'll load the scripts via a useEffect hook for the plugin.

export default function LampLoginPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const lampRef = useRef<SVGSVGElement>(null);
    const hitRef = useRef<SVGCircleElement>(null);
    const dummyCordRef = useRef<SVGLineElement>(null);
    const cordProxyRef = useRef<HTMLDivElement>(null);

    // Track state
    const isOnRef = useRef(false);
    const [isOn, setIsOn] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        // Register Draggable
        if (typeof window !== "undefined") {
            gsap.registerPlugin(Draggable);
            console.log("GSAP Draggable registered");
        }

        const clickAudio = new Audio("https://assets.codepen.io/605876/click.mp3");
        const proxy = document.createElement("div");
        const cordDuration = 0.1;

        const resetCord = () => {
            gsap.set(proxy, { x: 124, y: 348 });
        };
        resetCord();

        const ctx = gsap.context(() => {
            // Scoped initial styles
            gsap.set(document.documentElement, { "--on": 0 });
            gsap.set([".cords", hitRef.current], { x: -10 });
            gsap.set(".lamp__eye", { rotate: 180, transformOrigin: "50% 50%", yPercent: 50 });
            gsap.set(".lamp__light", { opacity: 0 }); // Direct set for reliability
            gsap.set(".lamp__mouth", { opacity: 0 }); // Direct set for reliability

            // Show lamp
            gsap.set(lampRef.current, { display: "block" });
        }, containerRef);

        const toggleTimeline = gsap.timeline({
            paused: true,
            onStart: () => {
                const newState = !isOnRef.current;
                isOnRef.current = newState;
                setIsOn(newState);

                // CSS Variable updates
                gsap.set(document.documentElement, { "--on": newState ? 1 : 0 });
                const hue = gsap.utils.random(0, 359);
                gsap.set(document.documentElement, { "--shade-hue": hue });
                gsap.set(document.documentElement, { "--glow-color": `hsl(${hue}, 40%, 45%)` });
                gsap.set(document.documentElement, { "--glow-color-dark": `hsl(${hue}, 40%, 35%)` });

                // Direct Element Animation using the scoped context
                // This ensures we are targeting THIS specific lamp's elements
                ctx.add(() => {
                    gsap.to(".lamp__eye", { rotate: newState ? 0 : 180, duration: 0.2 });
                    gsap.to(".lamp__light", { opacity: newState ? 0.8 : 0, duration: 0.2 });
                    gsap.to(".lamp__mouth", { opacity: newState ? 1 : 0, duration: 0.2 });
                });

                clickAudio.play().catch((err: any) => console.log("Audio play failed", err));
                if (newState) {
                    formRef.current?.classList.add("active");
                } else {
                    formRef.current?.classList.remove("active");
                }
            }
        });

        toggleTimeline.to(proxy, { duration: 0.2 });

        let startX = 0;
        let startY = 0;

        const dragInstance = Draggable.create(proxy, {
            trigger: hitRef.current,
            type: "x,y",
            onPress: function (e: any) {
                // @ts-ignore
                const x = this.x;
                // @ts-ignore
                const y = this.y;
                startX = x;
                startY = y;
            },
            onDrag: function () {
                if (dummyCordRef.current) {
                    // @ts-ignore
                    const currentX = this.x;
                    // @ts-ignore
                    const currentY = this.y;

                    gsap.set(dummyCordRef.current, {
                        attr: {
                            x2: currentX,
                            y2: Math.max(300, currentY)
                        }
                    });
                }
            },
            onRelease: function (e: any) {
                // @ts-ignore
                const currentX = this.x;
                // @ts-ignore
                const currentY = this.y;

                const distX = Math.abs(currentX - startX);
                const distY = Math.abs(currentY - startY);
                const travelled = Math.sqrt(distX * distX + distY * distY);

                if (dummyCordRef.current) {
                    gsap.to(dummyCordRef.current, {
                        attr: { x2: 124, y2: 348 },
                        duration: cordDuration,
                        onComplete: () => {
                            if (travelled > 50) {
                                toggleTimeline.restart();
                            }
                            resetCord();
                        }
                    });
                }
            }
        });



        return () => {
            if (dragInstance && dragInstance[0]) dragInstance[0].kill();
            ctx.revert();
        };

    }, [isMounted]);

    if (!isMounted) return null;

    return (
        <div className="lamp-page min-h-screen grid place-items-center bg-[#121921] overflow-hidden font-sans">
            <style jsx global>{`
                :root {
                    --cord: hsl(210, 0%, calc((40 + (var(--on, 0) * 50)) * 1%));
                    --opening: hsl(50, calc((10 + (var(--on, 0) * 80)) * 1%), calc((20 + (var(--on, 0) * 70)) * 1%));
                    --feature: #0a0a0a;
                    --accent: 210;
                    --tongue: #e06952;
                    --base-top: hsl(var(--accent), 0%, calc((40 + (var(--on, 0) * 40)) * 1%));
                    --base-side: hsl(var(--accent), 0%, calc((20 + (var(--on, 0) * 40)) * 1%));
                    --post: hsl(var(--accent), 0%, calc((20 + (var(--on, 0) * 40)) * 1%));
                    --l-1: hsla(45, calc((0 + (var(--on, 0) * 20)) * 1%), calc((50 + (var(--on, 0) * 50)) * 1%), 0.85);
                    --l-2: hsla(45, calc((0 + (var(--on, 0) * 20)) * 1%), calc((50 + (var(--on, 0) * 50)) * 1%), 0.85);
                    --shade-hue: 320;
                    --t-1: hsl(var(--shade-hue), calc((0 + (var(--on, 0) * 20)) * 1%), calc((30 + (var(--on, 0) * 60)) * 1%));
                    --t-2: hsl(var(--shade-hue), calc((0 + (var(--on, 0) * 20)) * 1%), calc((20 + (var(--on, 0) * 35)) * 1%));
                    --t-3: hsl(var(--shade-hue), calc((0 + (var(--on, 0) * 20)) * 1%), calc((10 + (var(--on, 0) * 20)) * 1%));
                    --glow-color: hsl(320, 40%, 45%);
                    --glow-color-dark: hsl(320, 40%, 35%);
                }
                .lamp-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8vmin;
                    flex-wrap: wrap;
                    padding: 2rem;
                }
                .lamp {
                    display: none;
                    height: 40vmin;
                    overflow: visible !important;
                }
                .login-form {
                    background: rgba(18, 25, 33, 0.9);
                    padding: 2rem;
                    border-radius: 20px;
                    min-width: 350px;
                    opacity: 0;
                    transform: scale(0.8) translateY(20px);
                    pointer-events: none;
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 2px solid transparent;
                }
                .login-form.active {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                    pointer-events: all;
                    border-color: var(--glow-color);
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px var(--glow-color), inset 0 0 15px rgba(255, 255, 255, 0.05);
                }
            `}</style>

            <div className="lamp-container" ref={containerRef}>
                {/* SVG Lamp */}
                <svg ref={lampRef} className="lamp" viewBox="0 0 333 484" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="lamp-opening-shade" x1="35" y1="220" x2="295" y2="220" gradientUnits="userSpaceOnUse">
                            <stop />
                            <stop offset="1" stopColor="var(--shade)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lamp-base-shading" x1="85" y1="444" x2="245" y2="444" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--b-1)" />
                            <stop offset="0.8" stopColor="var(--b-2)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lamp-side-shading" x1="119" y1="430" x2="245" y2="430" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--b-3)" />
                            <stop offset="1" stopColor="var(--b-4)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lamp-post-shading" x1="150" y1="288" x2="180" y2="288" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--b-1)" />
                            <stop offset="1" stopColor="var(--b-2)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lamp-light" x1="165.5" y1="218.5" x2="165.5" y2="483.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--l-1)" stopOpacity=".2" />
                            <stop offset="1" stopColor="var(--l-2)" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lamp-top-shading" x1="56" y1="110" x2="295" y2="110" gradientUnits="userSpaceOnUse">
                            <stop stopColor="var(--t-1)" stopOpacity=".8" />
                            <stop offset="1" stopColor="var(--t-2)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <g className="lamp__shade shade">
                        <ellipse className="shade__opening" cx="165" cy="220" rx="130" ry="20" style={{ fill: "var(--opening)" }} />
                        <ellipse className="shade__opening-shade" cx="165" cy="220" rx="130" ry="20" fill="url(#lamp-opening-shade)" style={{ opacity: "calc(1 - var(--on, 0))" }} />
                    </g>

                    <g className="lamp__base base">
                        <path className="base__side" style={{ fill: "var(--base-side)" }} d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z" />
                        <path d="M165 464c44.183 0 80-8.954 80-20v-14h-22.869c-14.519-3.703-34.752-6-57.131-6-22.379 0-42.612 2.297-57.131 6H85v14c0 11.046 35.817 20 80 20z" fill="url(#lamp-side-shading)" />
                        <ellipse className="base__top" cx="165" cy="430" rx="80" ry="20" style={{ fill: "var(--base-top)" }} />
                        <ellipse cx="165" cy="430" rx="80" ry="20" fill="url(#lamp-base-shading)" />
                    </g>

                    <g className="lamp__post post">
                        <path className="post__body" style={{ fill: "var(--post)" }} d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z" />
                        <path d="M180 142h-30v286c0 3.866 6.716 7 15 7 8.284 0 15-3.134 15-7V142z" fill="url(#lamp-post-shading)" />
                    </g>

                    <g className="lamp__cords cords">
                        {/* We are skipping the complex morph paths for stability and using just the straight cord */}
                        <line ref={dummyCordRef} className="cord cord--dummy" x1="124" y2="348" x2="124" y1="190" strokeWidth="6" strokeLinecap="round" style={{ stroke: "var(--cord)" }} />
                    </g>

                    <path className="lamp__light" d="M290.5 193H39L0 463.5c0 11.046 75.478 20 165.5 20s167-11.954 167-23l-42-267.5z" fill="url(#lamp-light)" style={{ opacity: "var(--on, 0)" }} />

                    <g className="lamp__top top">
                        <path className="top__body" style={{ fill: "var(--t-3)" }} fillRule="evenodd" clipRule="evenodd" d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z" />
                        <path className="top__shading" fillRule="evenodd" clipRule="evenodd" d="M164.859 0c55.229 0 100 8.954 100 20l29.859 199.06C291.529 208.451 234.609 200 164.859 200S38.189 208.451 35 219.06L64.859 20c0-11.046 44.772-20 100-20z" fill="url(#lamp-top-shading)" />
                    </g>

                    <g className="lamp__face face">
                        <g className="lamp__mouth" style={{ opacity: "var(--on, 0)" }}>
                            <path d="M165 178c19.882 0 36-16.118 36-36h-72c0 19.882 16.118 36 36 36z" fill="#141414" />
                            <g clipPath="url(#lamp-mouth)">
                                <circle className="lamp__tongue" cx="179.4" cy="172.6" r="18" style={{ fill: "var(--tongue)" }} />
                            </g>
                        </g>
                        <g className="lamp__eyes">
                            <path className="lamp__eye lamp__stroke" d="M115 135c0-5.523-5.82-10-13-10s-13 4.477-13 10" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--feature)" }} />
                            <path className="lamp__eye lamp__stroke" d="M241 135c0-5.523-5.82-10-13-10s-13 4.477-13 10" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--feature)" }} />
                        </g>
                    </g>

                    <circle ref={hitRef} className="lamp__hit" cx="124" cy="347" r="66" fill="#C4C4C4" fillOpacity=".1" style={{ cursor: 'pointer', opacity: 0 }} />
                </svg>

                {/* Clerk Form */}
                <div ref={formRef} className="login-form">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center" style={{ textShadow: "0 0 8px var(--glow-color)" }}>Hello Friend</h2>
                    <SignIn
                        appearance={{
                            elements: {
                                card: "bg-transparent shadow-none w-full",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                formButtonPrimary: "bg-[var(--glow-color)] hover:bg-[var(--glow-color-dark)] text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_var(--glow-color)] transition-all",
                                footerActionLink: "text-zinc-400 hover:text-[var(--glow-color)]",
                                formFieldLabel: "text-zinc-400",
                                formFieldInput: "bg-white/5 border-white/10 text-white focus:border-[var(--glow-color)] focus:shadow-[0_0_10px_var(--glow-color)]"
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
