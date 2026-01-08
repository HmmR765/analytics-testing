"use client";

import { TypeformComponent } from "@/components/forms/TypeformComponent";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import Link from "next/link";
import { NeonButton } from "@/components/cyberpunk/NeonButton";

export default function InterrogationPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <header className="absolute top-8 left-8">
                <Link href="/forms">
                    <NeonButton variant="outline" size="sm"> &lt; RETURN</NeonButton>
                </Link>
            </header>

            <div className="z-10 w-full max-w-2xl text-center mb-12">
                <h1 className="text-4xl font-display font-bold mb-4"><GlitchText text="CUSTOMER_SURVEY" /></h1>
                <p className="text-muted-foreground font-mono">Your feedback helps us improve.</p>
            </div>

            <TypeformComponent />
        </div>
    )
}
