"use client";

import { ContractForm } from "@/components/forms/ContractForm";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import Link from "next/link";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ConsultationPage() {
    return (
        <div className="min-h-screen p-8 bg-black flex flex-col items-center justify-center relative overflow-hidden">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#c5003c_1px,transparent_1px),linear-gradient(to_bottom,#c5003c_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

            <div className="z-10 w-full max-w-2xl">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-3xl font-display font-bold text-primary">
                        <GlitchText text="CONSULTATION_REQUEST" />
                    </h1>
                    <Link href="/forms">
                        <NeonButton variant="outline" size="sm"> &lt; RETURN</NeonButton>
                    </Link>
                </header>

                <Card className="bg-card/40 backdrop-blur-md border-primary/30">
                    <CardHeader>
                        <CardTitle className="text-primary font-mono tracking-widest">PROJECT_DETAILS</CardTitle>
                        <CardDescription>Secure line established. Submit your request.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContractForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
