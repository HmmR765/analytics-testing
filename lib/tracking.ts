export type TrackEventName =
    | "generate_lead"
    | "view_item"
    | "view_cart"
    | "add_to_cart"
    | "begin_checkout"
    | "purchase"
    | "phone_click"
    | "video_start"
    | "video_progress"
    | "video_complete"
    | "file_download"
    | "view_promotion"
    | "select_promotion"
    | "custom_event";

interface TrackingPayload {
    [key: string]: any;
}

export const trackEvent = (event: TrackEventName, payload: TrackingPayload = {}) => {
    if (typeof window !== "undefined") {
        // Initialize dataLayer if it doesn't exist
        window.dataLayer = window.dataLayer || [];

        // Push the event
        const eventData = {
            event,
            timestamp: new Date().toISOString(),
            ...payload
        };

        window.dataLayer.push(eventData);

        // Dispatch a custom event so our internal Debugger can hear it too
        // This is purely for the demo UI to show the user what happened
        const debugEvent = new CustomEvent("tracking-event", { detail: eventData });
        window.dispatchEvent(debugEvent);

        console.log(`[TRACKING]: ${event}`, payload);
    }
};

// Global declaration for TS
declare global {
    interface Window {
        dataLayer: any[];
    }
}
