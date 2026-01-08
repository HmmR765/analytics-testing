"use client";

import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import Link from "next/link";
import { trackEvent } from "@/lib/tracking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react"; // Assuming we can use Lucide if installed via shadcn, otherwise will use text

// Mock downloads
const FILES = [
    { name: "2025_Marketing_Strategy.pdf", size: "128 MB", level: "CONFIDENTIAL" },
    { name: "Q4_Financial_Report.xlsx", size: "45 KB", level: "INTERNAL" },
    { name: "Product_Roadmap_v2.zip", size: "2.4 GB", level: "RESTRICTED" },
];

export default function LeaksPage() {

    const handleDownload = (fileName: string) => {
        // Simulate download
        trackEvent("file_download", {
            file_name: fileName,
            file_extension: fileName.split('.').pop(),
            link_text: "DOWNLOAD_FILE",
        });
        alert(`[SYSTEM]: Downloading ${fileName}...`);
    };

    return (
        <div className="min-h-screen p-8 bg-black relative overflow-hidden flex flex-col items-center">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#55ead4_1px,transparent_1px),linear-gradient(to_bottom,#55ead4_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none" />

            <header className="mb-12 text-center z-10">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-secondary">
                    <GlitchText text="DOCUMENT_CENTER" />
                </h1>
                <Link href="/resources"><NeonButton variant="outline" size="sm"> &lt; RETURN</NeonButton></Link>
            </header>

            <div className="max-w-2xl w-full space-y-4">
                {FILES.map((file, i) => (
                    <Card key={i} className="bg-card/10 backdrop-blur border-secondary/20 hover:border-secondary/60 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="font-mono text-sm tracking-widest text-secondary">{file.level}</CardTitle>
                            <span className="font-mono text-xs text-muted-foreground">{file.size}</span>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-secondary/20 rounded flex items-center justify-center text-secondary font-bold">
                                    DOC
                                </div>
                                <span className="font-bold text-lg">{file.name}</span>
                            </div>
                            <NeonButton onClick={() => handleDownload(file.name)} glowColor="secondary" size="sm">
                                DOWNLOAD
                            </NeonButton>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
