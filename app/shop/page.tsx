"use client";

import { trackEvent } from "@/lib/tracking";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Laptop, Headphones, Watch } from "lucide-react";

const PRODUCTS = [
    {
        id: "prod_001",
        name: "Pro Gaming Laptop",
        price: 1299.00,
        desc: "High-performance laptop with latest GPU and 32GB RAM.",
        tag: "BESTSELLER"
    },
    {
        id: "prod_002",
        name: "Wireless Noise Canceling Headphones",
        price: 249.50,
        desc: "Industry leading noise cancellation with 30h battery life.",
        tag: "SALE"
    },
    {
        id: "prod_003",
        name: "Smart Fitness Watch",
        price: 199.00,
        desc: "Track your health metrics, sleep, and workouts.",
        tag: "NEW"
    }
];

import { useState } from "react";
import { useCart } from "@/components/shop/CartContext";
import { useRouter } from "next/navigation";
import { UpsellModal } from "@/components/shop/UpsellModal";

export default function ShopPage() {
    const { addItem } = useCart();
    const router = useRouter();
    const [upsellOpen, setUpsellOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<typeof PRODUCTS[0] | null>(null);

    function addToCart(product: typeof PRODUCTS[0]) {
        addItem({ ...product, quantity: 1 });
        console.log("Adding to cart:", product.name);
        trackEvent("add_to_cart", {
            currency: "USD",
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                price: product.price,
                quantity: 1
            }]
        });

        // Trigger Upsell
        setCurrentProduct(product);
        setUpsellOpen(true);
        trackEvent("view_promotion", {
            creative_name: "warranty_upsell",
            creative_slot: "modal",
            items: [{ item_id: "UPSELL_001", item_name: "2-Year Extended Warranty" }]
        });
    }

    function buyNow(product: typeof PRODUCTS[0]) {
        // Express Checkout Flow
        addItem({ ...product, quantity: 1 });
        trackEvent("add_to_cart", {
            currency: "USD",
            value: product.price,
            items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }]
        });
        trackEvent("begin_checkout", {
            currency: "USD",
            value: product.price,
            items: [{ item_id: product.id, item_name: product.name, price: product.price, quantity: 1 }]
        });
        router.push("/checkout");
    }

    function initiateCheckout() {
        router.push("/cart");
    }

    function handleAddUpsell() {
        if (!currentProduct) return;
        const upsellItem = { id: "UPSELL_001", name: "2-Year Extended Warranty", price: 49.00, desc: "Coverage", tag: "SERVICE" };
        addItem({ ...upsellItem, quantity: 1 });
        trackEvent("select_promotion", {
            creative_name: "warranty_upsell",
            creative_slot: "modal",
            items: [{ item_id: "UPSELL_001", item_name: "2-Year Extended Warranty" }]
        });
        trackEvent("add_to_cart", {
            currency: "USD",
            value: 49.00,
            items: [{ item_id: "UPSELL_001", item_name: "2-Year Extended Warranty", price: 49.00, quantity: 1 }]
        });
        setUpsellOpen(false);
    }

    return (
        <div className="min-h-screen p-8 bg-background relative overflow-hidden">
            {/* Background Grid */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#c5003c_1px,transparent_1px),linear-gradient(to_bottom,#c5003c_1px,transparent_1px)] bg-[size:24px_24px] opacity-5 pointer-events-none -z-10" />

            <header className="mb-12 flex justify-between items-center z-10 relative">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-display font-bold">
                        <GlitchText text="TECH_STORE" />
                    </h1>
                    <p className="text-muted-foreground font-mono">Premium devices for modern life.</p>
                </div>
                <div className="flex gap-4">
                    <NeonButton onClick={initiateCheckout} glowColor="secondary" className="hidden md:flex">
                        CHECKOUT
                    </NeonButton>
                    <Link href="/">
                        <NeonButton variant="outline" size="sm" glowColor="accent"> &lt; HOME</NeonButton>
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map((product) => (
                    <Card key={product.id} className="bg-card/40 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-colors group">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-foreground font-mono tracking-wide text-xl group-hover:text-primary transition-colors">
                                    {product.name}
                                </CardTitle>
                                <Badge variant="outline" className="border-secondary text-secondary">{product.tag}</Badge>
                            </div>
                            <CardDescription className="font-mono text-xs">{product.id.toUpperCase()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-black/50 rounded-md mb-4 flex items-center justify-center border border-white/10 group-hover:border-primary/40 transition-colors">
                                {product.id === "prod_001" && <Laptop className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />}
                                {product.id === "prod_002" && <Headphones className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />}
                                {product.id === "prod_003" && <Watch className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />}
                            </div>
                            <p className="text-muted-foreground text-sm mb-4">{product.desc}</p>
                            <div className="text-2xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <NeonButton className="w-full" onClick={() => addToCart(product)}>Add to Cart</NeonButton>
                            <NeonButton className="w-full" variant="outline" glowColor="accent" onClick={() => buyNow(product)}>
                                BUY NOW
                            </NeonButton>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <UpsellModal
                isOpen={upsellOpen}
                onClose={() => setUpsellOpen(false)}
                onAddUpsell={handleAddUpsell}
                mainProductName={currentProduct?.name || "Item"}
            />
        </div>
    );
}
