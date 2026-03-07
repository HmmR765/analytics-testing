"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://sandeepn8n-u51242.vm.elestio.app/webhook/outbound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-20">
      <div className="w-full max-w-md space-y-10">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[0.2em] font-dot uppercase">
            Get in Touch
          </h2>
          <p className="text-zinc-500 text-xs tracking-[0.4em] uppercase font-dot">
            We&apos;d love to hear from you
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center space-y-4 py-10">
            <p className="text-2xl font-dot tracking-widest uppercase">Done.</p>
            <p className="text-zinc-400 text-sm tracking-[0.3em] uppercase font-dot">
              We&apos;ll be in touch.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-xs text-zinc-600 hover:text-zinc-400 uppercase tracking-widest underline underline-offset-4"
            >
              Submit another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-2 font-dot">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-5 py-4 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-700 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-2 font-dot">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-5 py-4 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-700 transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.4em] uppercase text-zinc-500 mb-2 font-dot">
                How can we help you
              </label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us what you need..."
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-5 py-4 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-700 transition-colors font-mono resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-500 text-xs tracking-widest uppercase font-dot">
                Something went wrong. Try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-2 px-8 py-5 bg-white text-black font-bold text-[10px] tracking-[0.4em] uppercase rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 font-dot"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
