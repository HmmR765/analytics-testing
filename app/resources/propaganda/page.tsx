"use client";

import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";
import { useRef, useState } from "react";

export default function PropagandaPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [started, setStarted] = useState(false);
    const [progress, setProgress] = useState<Set<number>>(new Set());

    const handlePlay = () => {
        if (!started) {
            trackEvent("video_start", {
                video_title: "Product_Demo_2025",
                video_provider: "html5",
                video_duration: videoRef.current?.duration
            });
            setStarted(true);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const percent = (videoRef.current.currentTime / videoRef.current.duration) * 100;

        const milestones = [10, 25, 50, 75];
        milestones.forEach(m => {
            if (percent >= m && !progress.has(m)) {
                progress.add(m);
                trackEvent("video_progress", {
                    video_title: "Product_Demo_2025",
                    video_provider: "html5",
                    video_percent: m
                });
            }
        });
    };

    const handleEnded = () => {
        trackEvent("video_complete", {
            video_title: "Product_Demo_2025",
            video_provider: "html5"
        });
        alert("[SYSTEM]: Video Complete. Thank you for watching.");
    };

    return (
        <div className="min-h-screen p-8 bg-black relative overflow-hidden flex flex-col items-center justify-center">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#f00_1px,transparent_1px),linear-gradient(to_bottom,#f00_1px,transparent_1px)] bg-[size:64px_64px] opacity-10 pointer-events-none" />

            <div className="mb-8 z-10 w-full max-w-4xl flex justify-between items-center">
                <h1 className="text-3xl font-display font-bold text-accent">
                    <GlitchText text="PRODUCT_DEMO" />
                </h1>
                <Link href="/resources"><NeonButton variant="outline" size="sm"> &lt; RETURN</NeonButton></Link>
            </div>

            <div className="w-full max-w-4xl aspect-video bg-black border-2 border-accent shadow-[0_0_30px_rgba(255,0,0,0.3)] relative group">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls
                    poster="https://media.istockphoto.com/id/1191386705/vector/glitch-distorted-geometric-shape-minimal-grunge-background.jpg?s=612x612&w=0&k=20&c=L_YQs_PquZcM0sZ1X-bO_iA3L_M_g_P_r_k_b_b_M_E="
                    onPlay={handlePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                >
                    {/* Using a stock creative commons video for demo */}
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute top-4 left-4 bg-accent text-black font-bold px-2 py-1 text-xs animate-pulse">
                    PREVIEW
                </div>
            </div>

            <p className="mt-8 text-muted-foreground font-mono text-center max-w-xl">
                Please watch the entire video to understand the product features.
            </p>
        </div>
    );
}
