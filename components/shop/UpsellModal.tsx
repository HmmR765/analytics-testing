"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import { trackEvent } from "@/lib/tracking";
import { ShieldCheck } from "lucide-react";

interface UpsellModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddUpsell: () => void;
    mainProductName: string;
}

export function UpsellModal({ isOpen, onClose, onAddUpsell, mainProductName }: UpsellModalProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-card border-accent/50 text-foreground backdrop-blur-xl sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-accent font-mono uppercase tracking-widest text-xl">Add Peace of Mind</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        We noticed you are purchasing high-value electronics. Most customers also add the <span className="text-white font-bold">2-Year Extended Warranty</span>.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="flex items-center gap-4 bg-accent/10 p-4 rounded border border-accent/20">
                        <div className="w-12 h-12 bg-accent/20 rounded-md flex items-center justify-center text-accent">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">2-Year Extended Warranty</p>
                            <p className="text-accent font-mono">$49.00</p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex flex-col gap-3 sm:gap-3 !items-stretch">
                    <div className="w-full">
                        <NeonButton onClick={onAddUpsell} glowColor="accent" className="w-full">
                            ADD WARRANTY (+$49.00)
                        </NeonButton>
                    </div>
                    <button onClick={onClose} className="text-xs text-muted-foreground hover:text-white underline py-2 self-center">
                        No thanks, I'll take the risk
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
