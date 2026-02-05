import { openai } from "./aiClient";
import { LogEvent } from "../types/log";

export async function summarizeLogs(logs: LogEvent[]) {
  const content = logs
    .slice(-200)
    .map((l) => `[${l.level}] ${l.message}`)
    .join("\n");

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL!,
    messages: [
      {
        role: "system",
        content: "You are an expert log analysis assistant.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return response.choices[0].message.content;
}
