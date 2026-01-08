"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function TrackingDebugger() {
    const [logs, setLogs] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handler = (e: Event) => {
            const customEvent = e as CustomEvent;
            setLogs((prev) => [customEvent.detail, ...prev].slice(0, 20)); // Keep last 20
        };

        window.addEventListener("tracking-event", handler);
        return () => window.removeEventListener("tracking-event", handler);
    }, []);

    if (!isOpen) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <Button size="sm" onClick={() => setIsOpen(true)} className="bg-primary/80 text-primary-foreground font-mono text-xs border border-primary animate-pulse">
                    [TRACKING_LOGS]
                </Button>
            </div>
        )
    }

    return (
        <Card className="fixed bottom-4 right-4 z-50 w-80 md:w-96 max-h-[400px] flex flex-col bg-black/90 border-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.2)] backdrop-blur-xl">
            <CardHeader className="py-2 px-4 border-b border-primary/20 flex flex-row items-center justify-between">
                <CardTitle className="text-secondary text-xs font-mono uppercase tracking-[0.2em]">
                    SYSTEM_LOGS
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
                    <X className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-2 space-y-2 font-mono text-xs">
                {logs.length === 0 ? (
                    <div className="text-muted-foreground text-center py-8 italic">Waiting for events...</div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className="mb-2 p-2 rounded bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                                <span>{log.timestamp.split('T')[1].split('.')[0]}</span>
                                <span className="text-secondary font-bold">{log.event}</span>
                            </div>
                            <pre className="text-[10px] text-primary/80 overflow-x-auto whitespace-pre-wrap">
                                {JSON.stringify(log, (key, value) => {
                                    if (key === 'event' || key === 'timestamp') return undefined; // Hide generic keys in body
                                    return value;
                                }, 2).replace(/^{|}$/g, '').trim()}
                            </pre>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
