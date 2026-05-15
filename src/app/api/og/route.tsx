import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 80) || "Poland Nomad";
  const description = searchParams.get("description")?.slice(0, 180) || "Guides for digital nomads in Poland.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background: "#0b1220",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>{title}</div>
        <div style={{ fontSize: 24, opacity: 0.85, lineHeight: 1.4 }}>{description}</div>
        <div style={{ fontSize: 18, opacity: 0.6 }}>polandnomad.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
