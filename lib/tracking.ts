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
    | "form_success"
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

interface FormSuccessPayload {
    form_id: string;
    form_name?: string;
    name?: string;
    email?: string;
    phone?: string;
    description?: string;
    amount?: string | number;
}

export const pushFormSuccessToDataLayer = (payload: FormSuccessPayload) => {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];
    const eventData = {
        event: 'form_success',
        form_success: {
            form_id: payload.form_id,
            form_name: payload.form_name,
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            description: payload.description,
            amount: payload.amount,
        },
        page_path: window.location.pathname,
        method: 'ajax',
        error: false,
        timestamp: new Date().toISOString(),
    };

    window.dataLayer.push(eventData);

    // Also dispatch for the debugger
    const debugEvent = new CustomEvent("tracking-event", { detail: eventData });
    window.dispatchEvent(debugEvent);

    console.log(`[TRACKING]: form_success`, eventData);
};

// Global declaration for TS
declare global {
    interface Window {
        dataLayer: any[];
    }
}
