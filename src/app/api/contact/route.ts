import { NextResponse } from "next/server";

const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

type ContactPayload = {
  name?: string;
  phone?: string;
  message?: string;
};

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Server is missing CONTACT_WEBHOOK_URL." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = normalizeField(payload.name);
  const phone = normalizeField(payload.phone);
  const message = normalizeField(payload.message);

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "Name, phone, and message are required." },
      { status: 400 },
    );
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, message }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      const details = await webhookResponse.text().catch(() => "");
      console.error("Contact webhook failed", webhookResponse.status, details);

      return NextResponse.json(
        { error: "Webhook rejected the submission. Check the configured n8n URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact webhook request failed", error);

    return NextResponse.json(
      { error: "Could not reach the configured webhook." },
      { status: 502 },
    );
  }
}
