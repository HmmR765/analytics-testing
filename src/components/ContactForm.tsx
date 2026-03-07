"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Something went wrong. Try again.");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("Something went wrong. Try again.");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Failed");
      }
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-sm bg-black/85 backdrop-blur-sm rounded-2xl p-8 space-y-8 text-white">
      <div className="space-y-1">
        <h3 className="text-xl font-bold tracking-[0.2em] font-dot uppercase">Get in Touch</h3>
        <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-dot">
          We&apos;d love to hear from you
        </p>
      </div>

      {status === "success" ? (
        <div className="space-y-3 py-6">
          <p className="text-xl font-dot tracking-widest uppercase">Done.</p>
          <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase font-dot">We&apos;ll be in touch.</p>
          <button
            onClick={() => setStatus("idle")}
            className="text-[10px] text-zinc-600 hover:text-zinc-400 uppercase tracking-widest underline underline-offset-4"
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
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-700 transition-colors font-mono"
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
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-700 transition-colors font-mono"
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
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-zinc-500 placeholder:text-zinc-700 transition-colors font-mono resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-red-500 text-[10px] tracking-widest uppercase font-dot">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-8 py-4 bg-white text-black font-bold text-[10px] tracking-[0.4em] uppercase rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 font-dot"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
