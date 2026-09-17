// Vercel serverless function (classic /api convention — deployed independently
// of the Next.js app/router). Pings a Telegram chat once per visitor session
// with the page they landed on, an approximate location, and their device.
//
// Required environment variables (set in Vercel → Settings → Environment
// Variables, then redeploy):
//   TELEGRAM_BOT_TOKEN
//   TELEGRAM_CHAT_ID

const iso3166 = require("iso-3166-2");

const telegramUrl = (token) => `https://api.telegram.org/bot${token}/sendMessage`;

/** Vercel URL-encodes these (city names can contain special characters). */
function decodeHeader(value) {
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
function getLocation(req) {
  const city = decodeHeader(req.headers["x-vercel-ip-city"]);
  const country = decodeHeader(req.headers["x-vercel-ip-country"]);
  const regionCode = decodeHeader(req.headers["x-vercel-ip-country-region"]);

  // Vercel's region header is a raw ISO 3166-2 subdivision code (e.g. "37"),
  // not a name. Resolve it to something readable; if the code doesn't
  // resolve, drop the region rather than show the raw code.
  let region = null;
  if (country && regionCode) {
    try {
      const subdivision = iso3166.subdivision(`${country}-${regionCode}`);
      region = subdivision ? subdivision.name : null;
    } catch {
      region = null;
    }
  }

  const parts = [city, region, country].filter(Boolean);
  return parts.length ? parts.join(", ") : "Unknown location";
}

/** Lightweight, dependency-free User-Agent parsing — good enough for a ping, not a full UA database. */
function parseUserAgent(userAgent) {
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
function escapeMarkdown(text) {
  return String(text).replace(/([_*`[])/g, "\\$1");
}

async function sendTelegramMessage(text) {
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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = body ? JSON.parse(body) : {};
    } catch {
      res.status(400).json({ ok: false, error: "Invalid JSON body" });
      return;
    }
  }

  const page =
    body && typeof body.page === "string" && body.page.trim()
      ? body.page.trim()
      : "Unknown page";

  const userAgent = req.headers["user-agent"] || "";
  const { device, browser, os } = parseUserAgent(userAgent);
  const location = getLocation(req);

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
    res.status(502).json({ ok: false, error: "Failed to send notification" });
    return;
  }

  res.status(200).json({ ok: true });
};
