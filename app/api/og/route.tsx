import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "The Common Ledger";
  const subtitle =
    searchParams.get("subtitle") ?? "Truth-first reporting. Rhetoric stripped away.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0b0b0f",
          color: "#ffffff",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>
          {title}
        </div>

        <div style={{ marginTop: 24, fontSize: 30, color: "#c9c9d1", lineHeight: 1.3 }}>
          {subtitle}
        </div>

        <div style={{ marginTop: 48, fontSize: 18, letterSpacing: 2, color: "#9a9aa6" }}>
          THE COMMON LEDGER
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}