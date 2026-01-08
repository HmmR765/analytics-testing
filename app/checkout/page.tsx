"use client";

import { useCart } from "@/components/shop/CartContext";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/tracking";
import { Wallet, MapPin } from "lucide-react";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();

    const handlePurchase = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate API call
        setTimeout(() => {
            // We do NOT fire Purchase here. We fire it on the Thank You page to ensure 100% accuracy on page load.
            // We clear the cart here though.
            clearCart();
            const orderId = "ORD-" + Math.floor(Math.random() * 1000000);
            router.push(`/thank-you?type=purchase&id=${orderId}`);
        }, 1000);
    };

    return (
        <div className="min-h-screen p-8 bg-background relative overflow-hidden flex flex-col items-center justify-center">
            <div className="w-full max-w-lg space-y-8">
                <h1 className="text-4xl font-display font-bold text-center text-primary">SECURE_GATEWAY</h1>

                <Card className="bg-card/40 backdrop-blur-md border-secondary/20">
                    <CardHeader>
                        <CardTitle className="font-mono text-secondary">Billing Parameters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePurchase} className="space-y-6">
                            <div className="space-y-2">
                                <Label>Wallet Address (Crypto)</Label>
                                <div className="relative">
                                    <Wallet className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input placeholder="0x..." className="pl-10 font-mono bg-black/50 border-secondary/30" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Drop Location (Encrypted)</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                    <Input type="text" placeholder="Coordinates / PGP Key" className="pl-10 font-mono bg-black/50 border-secondary/30" required />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <div className="flex justify-between font-mono text-sm mb-4">
                                    <span>Total Transfer</span>
                                    <span className="text-primary font-bold">€${total.toFixed(2)}</span>
                                </div>
                                <NeonButton type="submit" className="w-full" glowColor="primary">
                                    INITIATE TRANSFER
                                </NeonButton>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
