import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 64,
        background: "linear-gradient(135deg, #faf9f7 0%, #ebe8e2 42%, #d7e8db 100%)",
        color: "#172c21",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
      <div style={{ marginTop: 16, fontSize: 26, opacity: 0.88, maxWidth: 900, color: "#424844" }}>
        {siteConfig.tagline}
      </div>
    </div>,
    { ...size },
  );
}
