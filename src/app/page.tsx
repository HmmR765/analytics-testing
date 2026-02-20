import fs from 'fs';
import path from 'path';
import ScrollScrubber from "@/components/ScrollScrubber"

export default async function Home() {
  // Read frames count dynamically
  let frameCount = 0;
  try {
    const framesDir = path.join(process.cwd(), 'public', 'frames');
    const files = fs.readdirSync(framesDir);
    frameCount = files.filter(f => f.startsWith('frame-')).length;
  } catch (err) {
    // defaults to 0 if not yet extracted
  }

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      {frameCount > 0 ? (
        <ScrollScrubber frameCount={frameCount} />
      ) : (
        <div className="h-screen flex items-center justify-center text-zinc-400 text-xl font-light">
          Loading Animation Frames... Extracting GIF...
        </div>
      )}

      <section
        className="min-h-screen flex flex-col items-center justify-center text-black relative py-20 bg-white overflow-hidden"
        style={{
          backgroundImage: "url('/final frame.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="z-10 w-full max-w-7xl px-6 md:px-24 flex justify-end">
          <div className="max-w-xl w-full space-y-16 text-right">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-bold tracking-[0.2em] font-dot text-black uppercase leading-tight">
                Nothing Headphone
              </h2>
              <p className="text-zinc-500 text-sm tracking-[0.5em] font-dot uppercase font-bold">Pure Engineering</p>
            </div>

            <div className="flex flex-col items-end space-y-12">


              <div className="flex flex-col gap-4 w-full max-w-sm font-mono pt-4">
                <button className="w-full px-8 py-5 bg-zinc-200/80 backdrop-blur-sm text-black rounded-lg font-bold hover:bg-zinc-300 transition-colors uppercase tracking-[0.3em] flex justify-between items-center text-[10px]">
                  <span>Color: White</span>
                  <span>⌄</span>
                </button>
                <button className="w-full px-8 py-5 bg-black text-white rounded-lg font-bold hover:bg-zinc-900 transition-colors uppercase tracking-[0.3em] text-[10px]">
                  Flipkart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
