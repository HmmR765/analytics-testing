"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
    return (
        <div className={cn("relative inline-block group", className)}>
            <motion.span
                className="relative z-10 inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {text}
            </motion.span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none pointer-events-none"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none pointer-events-none"
                aria-hidden="true"
            >
                {text}
            </span>
        </div>
    );
}
