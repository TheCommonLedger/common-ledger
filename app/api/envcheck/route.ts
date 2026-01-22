import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    hasRepo: Boolean(process.env.GITHUB_REPO),
    repo: process.env.GITHUB_REPO ?? null,
    hasProbe: Boolean(process.env.PROBE),
    probe: process.env.PROBE ?? null,
    vercelCommit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    vercelEnv: process.env.VERCEL_ENV ?? null, // production / preview / development
    nodeEnv: process.env.NODE_ENV ?? null,
  });
}
