import { ImageResponse } from "next/og";

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
          background: "linear-gradient(160deg, #faf9f7 0%, #f0ece6 45%, #e2efe4 100%)",
          color: "#172c21",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }}>{title}</div>
        <div style={{ fontSize: 22, lineHeight: 1.45, color: "#424844" }}>{description}</div>
        <div style={{ fontSize: 16, color: "#737873" }}>polandnomad.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
