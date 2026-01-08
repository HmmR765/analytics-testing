"use client";

import { trackEvent } from "@/lib/tracking";

export function PhoneLink() {
    return (
        <div className="fixed bottom-4 left-4 z-50">
            <a
                href="tel:+15550199"
                onClick={() => trackEvent("phone_click", { number: "+15550199" })}
                className="flex items-center gap-2 text-primary font-mono text-xs border border-primary/50 bg-black/80 px-4 py-2 hover:bg-primary/20 transition-colors backdrop-blur-md"
            >
                <span>[COMM_LINK_ACTIVE]</span>
                <span>+1 555 0199</span>
            </a>
        </div>
    );
}
