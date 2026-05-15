import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const runtime = "edge";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.9, maxWidth: 900 }}>{siteConfig.tagline}</div>
      </div>
    ),
    { ...size },
  );
}
