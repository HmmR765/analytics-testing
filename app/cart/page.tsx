"use client";

import { useCart } from "@/components/shop/CartContext";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/tracking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { useEffect } from "react";

export default function CartPage() {
    const { items, total } = useCart();
    const router = useRouter();

    useEffect(() => {
        // Track view_cart
        if (items.length > 0) {
            trackEvent("view_cart", {
                currency: "EUR",
                value: total,
                items: items.map(i => ({
                    item_id: i.id,
                    item_name: i.name,
                    price: i.price,
                    quantity: i.quantity
                }))
            });
        }
    }, [items, total]);

    const handleCheckout = () => {
        // Fire begin_checkout
        trackEvent("begin_checkout", {
            currency: "EUR",
            value: total,
            items: items.map(i => ({
                item_id: i.id,
                item_name: i.name,
                price: i.price,
                quantity: i.quantity
            }))
        });
        router.push("/checkout");
    }

    return (
        <div className="min-h-screen p-8 bg-background relative overflow-hidden flex flex-col items-center">
            <header className="w-full max-w-4xl mb-8 flex justify-between items-center">
                <h1 className="text-4xl font-display font-bold"><GlitchText text="CARGO_MANIFEST" /></h1>
                <Link href="/shop"><NeonButton variant="outline">&lt; CONTINUE_BROWSING</NeonButton></Link>
            </header>

            <Card className="w-full max-w-4xl bg-card/40 backdrop-blur-md border-primary/20">
                <CardHeader>
                    <CardTitle className="font-mono uppercase tracking-widest text-primary">Pending Acquisitions</CardTitle>
                </CardHeader>
                <CardContent>
                    {items.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground font-mono">
                            [CONTAINER_EMPTY]
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <div>
                                        <div className="text-lg font-bold">{item.name}</div>
                                        <div className="text-sm text-muted-foreground font-mono">{item.id}</div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="font-mono text-sm">x{item.quantity}</div>
                                        <div className="font-bold text-primary">€${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-8 text-xl font-bold">
                                <span>TOTAL_ESTIMATE</span>
                                <span className="text-secondary tracking-widest">€${total.toFixed(2)}</span>
                            </div>
                            <div className="pt-8 flex justify-end">
                                <NeonButton size="lg" glowColor="secondary" onClick={handleCheckout}>
                                    PROCEED_TO_ENCRYPTION
                                </NeonButton>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
