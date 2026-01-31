// log-shipper/types.ts
export type LogLevel = "INFO" | "WARN" | "ERROR" | "FATAL";

export interface LogEvent {
  timestamp: number;
  level: LogLevel;
  service: string;
  message: string;
  source: string;
}
