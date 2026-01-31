import { LogEvent, LogLevel } from "./log";

export interface StreamStats {
  total: number;
  byLevel: Record<LogLevel, number>;
}

export interface StreamPayload {
  type: "log";
  event: LogEvent;
  stats: StreamStats;
}
