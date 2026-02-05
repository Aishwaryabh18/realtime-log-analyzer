import { NextRequest, NextResponse } from "next/server";
import { summarizeLogs } from "../../../../lib/aiSummarizer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const logs = body.logs;

    if (!logs || logs.length === 0) {
      return NextResponse.json({ error: "No logs provided" }, { status: 400 });
    }

    const summary = await summarizeLogs(logs);

    return NextResponse.json({
      summary,
      generatedAt: Date.now(),
    });
  } catch (err: any) {
    console.error("AI SUMMARY ERROR 👉", err);

    return NextResponse.json(
      {
        error: "AI summary failed",
        details: err?.message || err,
      },
      { status: 500 },
    );
  }
}
