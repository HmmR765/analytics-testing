"use client";

import { useState } from "react";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/tracking";
import { useRouter } from "next/navigation";

export function WizardComponent() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const handleNext = () => {
        trackEvent("custom_event", {
            category: "form_lifecycle",
            action: "step_complete",
            label: "clearance_wizard",
            step: step
        });
        setStep(step + 1);
    };

    const handleSubmit = () => {
        trackEvent("generate_lead", {
            form_name: "clearance_wizard",
            value: 150,
        });
        router.push("/thank-you?type=contract&id=WIZ-" + Math.random().toString().slice(2, 8));
    };

    return (
        <Card className="bg-black/40 border-secondary/30 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-secondary font-mono flex justify-between">
                    <span>APPLICATION_WIZARD</span>
                    <span>STEP [0{step}/03]</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input className="bg-black/50 border-secondary/50" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            <Input className="bg-black/50 border-secondary/50" type="date" />
                        </div>
                        <NeonButton onClick={handleNext} className="w-full" glowColor="secondary">PROCEED &gt;</NeonButton>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="space-y-2">
                            <Label>Current Employer</Label>
                            <Input className="bg-black/50 border-secondary/50" placeholder="Acme Corp" />
                        </div>
                        <div className="space-y-2">
                            <Label>Years of Experience</Label>
                            <Input className="bg-black/50 border-secondary/50" placeholder="e.g. 5" />
                        </div>
                        <NeonButton onClick={handleNext} className="w-full" glowColor="secondary">VERIFY &gt;</NeonButton>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="p-4 border border-secondary/20 bg-secondary/5 rounded-md text-sm font-mono text-muted-foreground">
                            <p>Terms: By submitting this application you agree to our data privacy policy.</p>
                        </div>
                        <NeonButton onClick={handleSubmit} className="w-full" glowColor="accent">SUBMIT APPLICATION</NeonButton>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
