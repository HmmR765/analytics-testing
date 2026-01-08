"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function OfflineTracker() {
    useEffect(() => {
        // Simulate capturing GCLID/UTM from URL
        const params = new URLSearchParams(window.location.search);
        const gclid = params.get("gclid");

        if (gclid) {
            console.log("[OFFLINE TRACKING]: Captured GCLID", gclid);
            localStorage.setItem("gclid", gclid);
            // Track that we captured it
            trackEvent("custom_event", {
                category: "offline_tracking",
                action: "gclid_captured",
                label: gclid
            });
        }
    }, []);

    return null; // Invisible component
}
