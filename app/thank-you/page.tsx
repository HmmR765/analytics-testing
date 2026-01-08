"use client";

import { useEffect, useState, Suspense } from "react";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";
import { useSearchParams } from "next/navigation";

function ThankYouContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "generic";
    const id = searchParams.get("id") || "UNKNOWN";
    const [tracked, setTracked] = useState(false);

    useEffect(() => {
        if (tracked) return;

        if (type === "contract") {
            trackEvent("generate_lead", {
                transaction_id: id,
                currency: "USD",
                value: 1000,
                lead_type: "mercenary_contract"
            });
        } else if (type === "purchase") {
            trackEvent("purchase", {
                transaction_id: id,
                currency: "EUR",
                value: 420.69,
                items: [
                    { item_id: "prod_mock", item_name: "Mystery Box", price: 420.69, quantity: 1 }
                ]
            });
        }
        setTracked(true);
    }, [type, id, tracked]);

    return (
        <div className="max-w-xl space-y-6 z-10">
            <p className="text-xl text-muted-foreground font-mono">
                Transaction ID: <span className="text-secondary">{id}</span>
            </p>
            <p className="text-lg text-foreground">
                {type === 'contract' ?
                    "Your request has been encrypted and sent to the network. An operator will contact you securely." :
                    "Funds transferred. Drone dispatch imminent. Delete your logs."
                }
            </p>

            <div className="pt-8">
                <Link href="/">
                    <NeonButton size="lg">RETURN_TO_SHADOWS</NeonButton>
                </Link>
            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-center p-8">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5003c_1px,transparent_1px),linear-gradient(to_bottom,#c5003c_1px,transparent_1px)] bg-[size:48px_48px] opacity-10 pointer-events-none" />

            <h1 className="text-6xl md:text-8xl font-display font-bold text-primary mb-8 animate-pulse">
                <GlitchText text="TRANSMISSION_COMPLETE" />
            </h1>

            <Suspense fallback={<div className="text-muted-foreground font-mono">DECRYPTING_SIGNAL...</div>}>
                <ThankYouContent />
            </Suspense>
        </div>
    );
}
