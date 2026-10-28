import { ImageResponse } from "next/og";
import { KsMark } from "@/lib/ksMark";

// Copy is reused from the site (Hero name and role); colours are the site tokens.
export const alt = "Kabiru Shaibu — Frontend-focused Full-Stack Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 96px",
          background: "linear-gradient(135deg, #0c1220 0%, #030712 70%)",
          color: "#e5e7eb",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 240,
            height: 240,
            flexShrink: 0,
            borderRadius: 48,
            background: "#030712",
            border: "2px solid rgba(184, 134, 11, 0.45)",
            boxShadow: "0 0 60px rgba(184, 134, 11, 0.25)",
          }}
        >
          <KsMark size={200} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, color: "#b8860b", lineHeight: 1.05 }}>
            Kabiru Shaibu
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 38,
              lineHeight: 1.3,
              color: "#e5e7eb",
              maxWidth: 640,
            }}
          >
            Frontend-focused Full-Stack Product Engineer
          </div>
        </div>
      </div>
    ),
    size,
  );
}
