"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Rocket, ShieldCheck } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative z-50 bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* 1. Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Col 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Rocket className="w-6 h-6 text-cyan-500" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                                STUDENT STUDY HUB
                            </span>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                            The decentralized library for the 1% who defy the syllabus. Join the academic revolution.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon href="https://github.com" icon={Github} />
                            <SocialIcon href="https://twitter.com" icon={Twitter} />
                            <SocialIcon href="https://instagram.com" icon={Instagram} />
                        </div>
                    </div>

                    {/* Col 2: Platform */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Product</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/streams">Streams</FooterLink>
                            <FooterLink href="/community">Community</FooterLink>
                            <FooterLink href="/leaderboard">Leaderboard</FooterLink>
                            <FooterLink href="/contribute">Contribute</FooterLink>
                        </ul>
                    </div>

                    {/* Col 3: Support */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/support">Support Center</FooterLink>
                            <FooterLink href="/status">System Status</FooterLink>
                            <FooterLink href="/support">Report a Bug</FooterLink>
                            <FooterLink href="/support">Contact Us</FooterLink>
                        </ul>
                    </div>

                    {/* Col 4: Legal */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/legal/privacy">Privacy Policy</FooterLink>
                            <FooterLink href="/legal/terms">Terms of Service</FooterLink>
                            <FooterLink href="/legal/cookie">Cookie Policy</FooterLink>
                        </ul>
                    </div>

                </div>

                {/* 3. The Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-xs text-zinc-600">
                        &copy; 2025 Student Study Hub. Built for educational purposes only.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>All Systems Normal</span>
                    </div>

                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors duration-200"
            >
                {children}
            </Link>
        </li>
    );
}
