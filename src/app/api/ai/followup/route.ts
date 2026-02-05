import { NextRequest, NextResponse } from "next/server";
import { openai } from "../../../../lib/aiClient";

export async function POST(req: NextRequest) {
  const { summary, question } = await req.json();

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL!,
    messages: [
      {
        role: "system",
        content: "You are an expert log analysis assistant.",
      },
      {
        role: "assistant",
        content: summary,
      },
      {
        role: "user",
        content: question,
      },
    ],
    temperature: 0.3,
  });

  return NextResponse.json({
    answer: response.choices[0].message.content,
  });
}
