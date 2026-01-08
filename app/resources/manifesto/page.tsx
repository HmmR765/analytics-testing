"use client";

import { useEffect, useRef } from "react";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

export default function ManifestoPage() {
    const trackedRef = useRef<Set<number>>(new Set());

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            const milestones = [25, 50, 75, 90];

            milestones.forEach(m => {
                if (scrollPercent >= m && !trackedRef.current.has(m)) {
                    trackedRef.current.add(m);
                    trackEvent("custom_event", {
                        category: "engagement",
                        action: "scroll_depth",
                        label: `depth_${m}%`,
                        value: m
                    });
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-foreground font-mono p-8 max-w-3xl mx-auto border-x border-primary/20 relative">
            <div className="fixed top-4 right-4 z-50">
                <Link href="/resources"><NeonButton variant="outline" size="sm">CLOSE_ARTICLE</NeonButton></Link>
            </div>

            <header className="mb-16 border-b border-primary pb-8">
                <h1 className="text-4xl font-display font-bold text-primary mb-4"><GlitchText text="INDUSTRY_TRENDS_REPORT" /></h1>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Article: The Future of Digital Tracking</p>
            </header>

            <div className="space-y-12 text-lg leading-relaxed text-justify opacity-80">
                {/* Generating long content for scroll */}
                <p>
                    <strong>1. The Evolution of Data.</strong> <br /><br />
                    In the modern digital landscape, data is the new oil. Understanding user behavior is paramount for business success. We strive not just for data collection, but for actionable insights.
                </p>

                <div className="h-48 border-l-2 border-primary/50 ml-4 pl-8 py-4 italic text-primary">
                    "Measurement is the first step that leads to control and eventually to improvement. If you can't measure it, you can't understand it." - Management Guru
                </div>

                <p>
                    <strong>2. The Disconnect.</strong><br /><br />
                    Many organizations suffer from siloed data. Sales logic is separated from marketing logic. To fix this, we need a unified tracking plan. This document serves as a test for your scroll tracking implementation.
                </p>

                <div className="p-8 bg-primary/10 border border-primary/30 rounded">
                    <h3 className="text-xl font-bold mb-4">KEY INSIGHT</h3>
                    <p className="text-sm">Reading this section confirms that the user has engaged with the content beyond the fold.</p>
                </div>

                {[...Array(5)].map((_, i) => (
                    <p key={i}>
                        [SECTION {i + 3}] <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        <br /><br />
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                ))}

                <p>
                    <strong>8. Conclusion.</strong><br /><br />
                    You have reached the end of the report. This signifies a high level of user interest and should be tracked as a primary conversion metric for content sites.
                </p>

                <div className="text-center py-20">
                    <h2 className="text-3xl font-display font-bold text-primary mb-4">THANKS_FOR_READING</h2>
                    <p>You have reached the bottom of the page.</p>
                    <p className="text-xs text-muted-foreground mt-2">Scroll Depth: 100%</p>
                </div>
            </div>
        </div>
    );
}
