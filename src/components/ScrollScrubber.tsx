"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollScrubber({ frameCount }: { frameCount: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    useEffect(() => {
        // Preload all images
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(4, "0");
            img.src = `/frames/frame-${frameNum}.jpg`;
            img.onload = () => {
                loadedCount++;
                // First frame draw immediately
                if (i === 1 && canvasRef.current) {
                    const ctx = canvasRef.current.getContext("2d");
                    if (ctx) {
                        canvasRef.current.width = window.innerWidth;
                        canvasRef.current.height = window.innerHeight;
                        drawScaledImage(ctx, img, canvasRef.current);
                    }
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [frameCount]);

    useEffect(() => {
        if (images.length === 0 || !canvasRef.current || !containerRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        // The state we will animate
        const playhead = { frame: 0 };

        // GSAP ScrollTrigger
        const st = gsap.to(playhead, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=4000", // 4000px of scrolling
                scrub: 0.5,
                pin: true,
            },
            onUpdate: () => {
                const frameIndex = Math.round(playhead.frame);
                if (images[frameIndex]) {
                    drawScaledImage(ctx, images[frameIndex], canvasRef.current!);
                }
            },
        });

        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                const currentFrame = Math.round(playhead.frame);
                if (images[currentFrame]) {
                    drawScaledImage(ctx, images[currentFrame], canvasRef.current);
                }
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            st.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [images, frameCount]);

    function drawScaledImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let renderWidth, renderHeight, xOrigin, yOrigin;

        // Cover behavior
        if (imgRatio < canvasRatio) {
            renderWidth = canvas.width;
            renderHeight = renderWidth / imgRatio;
            xOrigin = 0;
            yOrigin = (canvas.height - renderHeight) / 2;
        } else {
            renderHeight = canvas.height;
            renderWidth = renderHeight * imgRatio;
            yOrigin = 0;
            xOrigin = (canvas.width - renderWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Light aesthetics background matching Nothing design
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, xOrigin, yOrigin, renderWidth, renderHeight);
    }

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 pointer-events-none">
                <p className="text-zinc-500 text-sm tracking-[0.2em] font-bold uppercase">Keep scrolling</p>
            </div>
        </div>
    );
}
