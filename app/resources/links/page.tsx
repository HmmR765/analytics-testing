"use client";

import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";

export default function LinksPage() {

    // Note: Next.js Link component is for internal navigation. 
    // For external, we use <a> tag, which we can attach onClick to for tracking.
    const handleOutboundClick = (url: string, name: string) => {
        trackEvent("custom_event", {
            category: "navigation",
            action: "outbound_click",
            label: name,
            url: url,
            outbound: true
        });
    };

    return (
        <div className="min-h-screen p-8 bg-black relative overflow-hidden flex flex-col items-center">
            <header className="mb-12 text-center z-10">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                    <GlitchText text="PARTNER_DIRECTORY" />
                </h1>
                <Link href="/resources"><NeonButton variant="outline" size="sm"> &lt; RETURN</NeonButton></Link>
            </header>

            <div className="max-w-xl w-full space-y-8 text-center">
                <p className="font-mono text-muted-foreground">Useful resources for analytics implementation.</p>

                <div className="grid gap-4">
                    <a
                        href="https://analytics.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleOutboundClick("https://analytics.google.com", "Google_Analytics")}
                        className="block p-6 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors rounded group"
                    >
                        <div className="text-xl font-bold text-white group-hover:text-primary transition-colors">GOOGLE ANALYTICS</div>
                        <div className="text-xs font-mono text-muted-foreground mt-2">Measurement Platform</div>
                    </a>

                    <a
                        href="https://tagmanager.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleOutboundClick("https://tagmanager.google.com", "GTM")}
                        className="block p-6 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors rounded group"
                    >
                        <div className="text-xl font-bold text-white group-hover:text-secondary transition-colors">GOOGLE TAG MANAGER</div>
                        <div className="text-xs font-mono text-muted-foreground mt-2">Tag Management System</div>
                    </a>

                    <a
                        href="https://developers.google.com/analytics"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleOutboundClick("https://developers.google.com/analytics", "GA4_Docs")}
                        className="block p-6 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors rounded group"
                    >
                        <div className="text-xl font-bold text-white group-hover:text-accent transition-colors">GA4 DOCUMENTATION</div>
                        <div className="text-xs font-mono text-muted-foreground mt-2">Technical Reference</div>
                    </a>
                </div>
            </div>
        </div>
    );
}
