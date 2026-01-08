"use client";

import { GlitchText } from "@/components/cyberpunk/GlitchText";
import Link from "next/link";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArchivesPage() {
    return (
        <div className="min-h-screen p-8 bg-black relative overflow-hidden flex flex-col items-center">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#c5003c_1px,transparent_1px),linear-gradient(to_bottom,#c5003c_1px,transparent_1px)] bg-[size:48px_48px] opacity-10 pointer-events-none" />

            <header className="mb-12 text-center z-10">
                <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
                    <GlitchText text="RESOURCES" />
                </h1>
                <p className="text-muted-foreground font-mono">Tracking Demo Library</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full z-10">

                <Link href="/resources/manifesto">
                    <Card className="bg-card/20 backdrop-blur-md border-primary/30 hover:bg-card/40 transition-all cursor-pointer h-full">
                        <CardHeader>
                            <CardTitle className="text-primary font-mono tracking-widest">LONG ARTICLE [SCROLL]</CardTitle>
                            <CardDescription>Test scroll depth triggers (25/50/75/90%).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80">
                                A long-form blog post about industry trends. Scroll to trigger tracking events.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/resources/leaks">
                    <Card className="bg-card/20 backdrop-blur-md border-secondary/30 hover:bg-card/40 transition-all cursor-pointer h-full">
                        <CardHeader>
                            <CardTitle className="text-secondary font-mono tracking-widest">WHITEPAPERS [DOWNLOAD]</CardTitle>
                            <CardDescription>Test file download events.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80">
                                Download generic PDFs and guides to test file tracking.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/resources/propaganda">
                    <Card className="bg-card/20 backdrop-blur-md border-accent/30 hover:bg-card/40 transition-all cursor-pointer h-full">
                        <CardHeader>
                            <CardTitle className="text-accent font-mono tracking-widest">PRODUCT VIDEO [VIDEO]</CardTitle>
                            <CardDescription>Test video engagement (Start/Progress/Complete).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80">
                                Watch our company introduction video.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/resources/links">
                    <Card className="bg-card/20 backdrop-blur-md border-white/30 hover:bg-card/40 transition-all cursor-pointer h-full">
                        <CardHeader>
                            <CardTitle className="text-white font-mono tracking-widest">PARTNER LINKS [OUTBOUND]</CardTitle>
                            <CardDescription>Test outbound link clicking.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80">
                                Directory of external tools and resources.
                            </p>
                        </CardContent>
                    </Card>
                </Link>

            </div>

            <div className="mt-12">
                <Link href="/">
                    <NeonButton variant="outline">RETURN_TO_ROOT</NeonButton>
                </Link>
            </div>
        </div>
    );
}
