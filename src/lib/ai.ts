import { LogEvent } from "../types/log";

export async function summarizeLogs(logs: LogEvent[]): Promise<string> {
  const content = logs.map((l) => `[${l.level}] ${l.message}`).join("\n");

  // placeholder (replace with OpenAI later)
  return `
Summary:
- Total logs: ${logs.length}
- Errors: ${logs.filter((l) => l.level === "ERROR").length}
- Fatal: ${logs.filter((l) => l.level === "FATAL").length}
`;
}
