"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeonButtonProps extends React.ComponentProps<typeof Button> {
    glowColor?: "primary" | "secondary" | "accent";
}

export function NeonButton({ className, glowColor = "primary", children, ...props }: NeonButtonProps) {
    const glowClass = {
        primary: "shadow-[0_0_15px_rgba(var(--primary),0.5)] hover:shadow-[0_0_25px_rgba(var(--primary),0.8)] border-primary/50 text-primary-foreground bg-primary/80 hover:bg-primary",
        secondary: "shadow-[0_0_15px_rgba(var(--secondary),0.5)] hover:shadow-[0_0_25px_rgba(var(--secondary),0.8)] border-secondary/50 text-secondary-foreground bg-secondary/80 hover:bg-secondary",
        accent: "shadow-[0_0_15px_rgba(var(--accent),0.5)] hover:shadow-[0_0_25px_rgba(var(--accent),0.8)] border-accent/50 text-accent-foreground bg-accent/80 hover:bg-accent",
    };

    // Note: Since we are using OKLCH vars, the rgba trick above might not work directly without parsing.
    // Instead, we will use direct colors and rely on tailwind shadow utilities if defined, or custom styles.
    // For simplicity with OKLCH, we'll assume the variable can be used in `shadow-color` if supported, or use specific tailwind classes.
    // Actually, tailwind 4 with CSS vars: let's use the colors directly.

    const colorMap = {
        primary: "shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)] border-primary/50 text-white bg-black hover:bg-primary/20",
        secondary: "shadow-[0_0_20px_-5px_hsl(var(--secondary)/0.5)] border-secondary/50 text-white bg-black hover:bg-secondary/20",
        accent: "shadow-[0_0_20px_-5px_hsl(var(--accent)/0.5)] border-accent/50 text-white bg-black hover:bg-accent/20",
    };

    return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
                className={cn(
                    "relative border transition-all duration-300 font-mono tracking-wider uppercase",
                    colorMap[glowColor],
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        </motion.div>
    );
}
