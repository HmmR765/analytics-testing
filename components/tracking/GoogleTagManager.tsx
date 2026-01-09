"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GTM_ID = "GTM-TZRCGD48";

function GTMPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "page_view",
                page_path: pathname,
                page_search: searchParams.toString()
            });
        }
    }, [pathname, searchParams]);

    return null;
}

export function GoogleTagManager() {
    return (
        <>
            <Suspense fallback={null}>
                <GTMPageView />
            </Suspense>
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
