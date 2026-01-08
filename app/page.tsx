import { GlitchText } from "@/components/cyberpunk/GlitchText";
import { NeonButton } from "@/components/cyberpunk/NeonButton";
import Link from "next/link";
import { ImpactBackground } from "@/components/3d/ImpactBackground";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      <ImpactBackground />

      <div className="z-10 text-center space-y-8 p-4">
        <div className="space-y-4">
          <p className="text-secondary font-mono tracking-[0.2em] text-sm md:text-base uppercase animate-pulse">
            System Online // Tracking Active
          </p>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-primary animate-pulse">
            <GlitchText text="ANALYTICS" /> <br />
            <span className="text-foreground">DEMO</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg md:text-xl font-light">
            Advanced tracking integration showcase: GTM, Server-side, Offline, and E-commerce analytics.
          </p>
        </div>



        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-4 z-20">
          <Link href="/forms">
            <NeonButton size="lg" className="px-8 h-12 text-lg">
              Forms
            </NeonButton>
          </Link>
          <Link href="/shop">
            <NeonButton glowColor="secondary" size="lg" className="px-8 h-12 text-lg">
              Shop
            </NeonButton>
          </Link>
          <Link href="/resources">
            <NeonButton glowColor="accent" size="lg" className="px-8 h-12 text-lg">
              Resources
            </NeonButton>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full text-center text-muted-foreground/30 text-xs font-mono">
        ID: 5622-680F-E22C // VIBE_CODING_INITIATED
      </div>
    </main>
  );
}
