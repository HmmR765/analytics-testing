"use client";

import Script from "next/script";

const GTM_ID = "GTM-TZRCGD48";

export function GoogleTagManager() {
    return (
        <>
            {/* 1. Initialize dataLayer as early as possible */}
            <Script
                id="gtm-init"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            'gtm.start': new Date().getTime(),
                            event: 'gtm.js'
                        });
                    `,
                }}
            />
            {/* 2. Load the GTM script */}
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
            />
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                />
            </noscript>
        </>
    );
}
