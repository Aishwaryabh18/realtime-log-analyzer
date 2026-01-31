import { NextRequest, NextResponse } from "next/server";
import { summarizeLogs } from "../../../../lib/ai";

export async function POST(req: NextRequest) {
  const { logs } = await req.json();
  const summary = await summarizeLogs(logs);

  return NextResponse.json({
    summary,
    generatedAt: Date.now(),
  });
}
