// Pings a Telegram chat once per visitor session (see components/VisitorPing)
// with the page they landed on, an approximate location, and their device.
//
// Required environment variables (set in Vercel → Settings → Environment
// Variables, then redeploy):
//   TELEGRAM_BOT_TOKEN
//   TELEGRAM_CHAT_ID
//
// Only POST is exported, so Next.js answers every other method with 405.

import iso3166 from "iso-3166-2";

/** The ping body is `{ "page": "/#about" }`. Generous enough that an over-long
    page is truncated (below) rather than refused; anything bigger gets 413. */
const MAX_BODY_BYTES = 16 * 1024;
const MAX_PAGE_LENGTH = 200;

const telegramUrl = (token: string) =>
  `https://api.telegram.org/bot${token}/sendMessage`;

/** Vercel URL-encodes these (city names can contain special characters). */
function decodeHeader(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * City/region/country from Vercel's built-in IP geolocation headers — set on
 * every request in production, absent in local dev. No network call needed.
 */
function getLocation(headers: Headers): string {
  const city = decodeHeader(headers.get("x-vercel-ip-city"));
  const country = decodeHeader(headers.get("x-vercel-ip-country"));
  const regionCode = decodeHeader(headers.get("x-vercel-ip-country-region"));

  // Vercel's region header is a raw ISO 3166-2 subdivision code (e.g. "37"),
  // not a name. Resolve it to something readable; if the code doesn't
  // resolve, drop the region rather than show the raw code.
  let region: string | null = null;
  if (country && regionCode) {
    try {
      region = iso3166.subdivision(`${country}-${regionCode}`)?.name ?? null;
    } catch {
      region = null;
    }
  }

  const parts = [city, region, country].filter(Boolean);
  return parts.length ? parts.join(", ") : "Unknown location";
}

/** Lightweight, dependency-free User-Agent parsing — good enough for a ping, not a full UA database. */
function parseUserAgent(userAgent: string) {
  const ua = userAgent || "";

  const device = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) ? "Mobile" : "Desktop";

  let browser = "Unknown";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome\//i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua)) browser = "Safari";

  let os = "Unknown";
  if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  return { device, browser, os };
}

/** Escapes the characters that are reserved in Telegram's legacy Markdown parse mode. */
function escapeMarkdown(text: string) {
  return String(text).replace(/([_*`[])/g, "\\$1");
}

/**
 * The page is visitor-controlled: strip control characters (newlines
 * included, so it can't forge extra message lines) and cap its length.
 */
function cleanPage(value: unknown): string {
  if (typeof value !== "string") return "Unknown page";
  const stripped = value.replace(/[\p{Cc}\p{Zl}\p{Zp}]/gu, "").trim();
  return Array.from(stripped).slice(0, MAX_PAGE_LENGTH).join("") || "Unknown page";
}

/** Same-origin only: the browser's Origin must name the host it was sent to. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Reads the body as text, giving up (null) once it exceeds MAX_BODY_BYTES. */
async function readBody(request: Request): Promise<string | null> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
  }

  const response = await fetch(telegramUrl(token), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Telegram API responded with ${response.status}: ${detail}`);
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const raw = await readBody(request);
  if (raw === null) {
    return Response.json({ ok: false, error: "Payload too large" }, { status: 413 });
  }

  let body: unknown = {};
  if (raw) {
    try {
      body = JSON.parse(raw);
    } catch {
      return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }
  }

  const page = cleanPage(
    body && typeof body === "object" ? (body as { page?: unknown }).page : undefined,
  );

  const { device, browser, os } = parseUserAgent(request.headers.get("user-agent") || "");
  const location = getLocation(request.headers);

  const timestamp = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/Tallinn",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  const message = [
    "👀 *New Visitor*",
    "",
    `*Page:* ${escapeMarkdown(page)}`,
    `*Location:* ${escapeMarkdown(location)}`,
    `*Device:* ${escapeMarkdown(device)}`,
    `*Browser:* ${escapeMarkdown(browser)}`,
    `*OS:* ${escapeMarkdown(os)}`,
    `*Time:* ${escapeMarkdown(timestamp)} (Europe/Tallinn)`,
  ].join("\n");

  try {
    await sendTelegramMessage(message);
  } catch (error) {
    console.error("visit notification failed:", error);
    return Response.json({ ok: false, error: "Failed to send notification" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
