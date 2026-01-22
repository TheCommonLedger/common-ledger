import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = (searchParams.get("title") ?? "The Common Ledger").slice(0, 90);
  const subtitle = (searchParams.get("subtitle") ?? "Truth-first reporting.").slice(0, 140);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #0b0b0b, #1a1a1a)",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9 }}>The Common Ledger</div>

        <div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          <div style={{ marginTop: 18, fontSize: 32, opacity: 0.85, lineHeight: 1.25 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ fontSize: 22, opacity: 0.7 }}>thecommonledger.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
