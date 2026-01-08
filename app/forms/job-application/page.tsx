"use client";

import { WizardComponent } from "@/components/forms/WizardComponent";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import Link from "next/link";
import { GlitchText } from "@/components/cyberpunk/GlitchText";

export default function JobApplicationPage() {
    return (
        <div className="min-h-screen p-8 bg-black flex flex-col items-center justify-center relative overflow-hidden">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#55ead4_1px,transparent_1px),linear-gradient(to_bottom,#55ead4_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

            <div className="z-10 w-full max-w-2xl">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-display font-bold text-ring">
                        <GlitchText text="CAREER_PORTAL" />
                    </h1>
                    <Link href="/forms">
                        <NeonButton variant="outline" size="sm"> &lt; RETURN</NeonButton>
                    </Link>
                </header>

                <WizardComponent />
            </div>
        </div>
    );
}
