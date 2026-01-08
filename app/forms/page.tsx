import { WizardComponent } from "@/components/forms/WizardComponent";
import { ContractForm } from "@/components/forms/ContractForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import Link from "next/link";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import { Briefcase, MessageSquare, Rocket } from "lucide-react";

export default function FormsPage() {
    return (
        <div className="min-h-screen p-8 bg-background relative overflow-hidden">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

            <header className="mb-12 flex justify-between items-center z-10 relative">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-display font-bold">
                        <GlitchText text="CUSTOMER SERVICE" />
                    </h1>
                    <p className="text-muted-foreground font-mono">Get in touch with our team.</p>
                </div>
                <Link href="/">
                    <NeonButton variant="outline" size="sm" glowColor="accent"> &lt; HOME</NeonButton>
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <Link href="/forms/consultation">
                    <Card className="bg-card/40 backdrop-blur-md border-primary/20 hover:bg-card/60 hover:border-primary/50 transition-all cursor-pointer h-full group">
                        <CardHeader>
                            <CardTitle className="text-primary font-mono tracking-widest group-hover:underline">CONSULTATION</CardTitle>
                            <CardDescription>Request a B2B consultation.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center gap-4 py-8">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary transition-transform group-hover:scale-110 duration-300">
                                <Briefcase className="w-8 h-8" />
                            </div>
                            <NeonButton className="w-full" glowColor="primary">START REQUEST</NeonButton>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/forms/survey">
                    <Card className="bg-card/40 backdrop-blur-md border-secondary/20 hover:bg-card/60 hover:border-secondary/50 transition-all cursor-pointer h-full group">
                        <CardHeader>
                            <CardTitle className="text-secondary font-mono tracking-widest group-hover:underline">FEEDBACK SURVEY</CardTitle>
                            <CardDescription>Take our customer satisfaction survey.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center gap-4 py-8">
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary transition-transform group-hover:scale-110 duration-300">
                                <MessageSquare className="w-8 h-8" />
                            </div>
                            <NeonButton className="w-full" glowColor="secondary">START SURVEY</NeonButton>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/forms/job-application">
                    <Card className="bg-card/40 backdrop-blur-md border-accent/20 hover:bg-card/60 hover:border-accent/50 transition-all cursor-pointer h-full group">
                        <CardHeader>
                            <CardTitle className="text-ring font-mono tracking-widest group-hover:underline">JOB APPLICATION</CardTitle>
                            <CardDescription>Multi-step hiring wizard.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center gap-4 py-8">
                            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent transition-transform group-hover:scale-110 duration-300">
                                <Rocket className="w-8 h-8" />
                            </div>
                            <NeonButton className="w-full" glowColor="accent">OPEN WIZARD</NeonButton>
                        </CardContent>
                    </Card>
                </Link>
            </div>

        </div>
    );
}
