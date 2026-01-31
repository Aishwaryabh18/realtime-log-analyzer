// log-shipper/parser.ts
import { LogEvent, LogLevel } from "./types";

export function parseNginxLog(line: string): LogEvent | null {
  let level: LogLevel = "INFO";

  if (line.includes("error")) level = "ERROR";
  if (line.includes("warn")) level = "WARN";

  return {
    timestamp: Date.now(),
    level,
    service: "nginx",
    message: line,
    source: "nginx-container",
  };
}
