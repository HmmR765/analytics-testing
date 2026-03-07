import fs from 'fs';
import path from 'path';
import ScrollScrubber from "@/components/ScrollScrubber"
import ContactForm from "@/components/ContactForm"

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
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
