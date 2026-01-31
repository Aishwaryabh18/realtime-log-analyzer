import { LogEvent } from "./log";

export interface AISummaryRequest {
  logs: LogEvent[];
}

export interface AISummaryResponse {
  summary: string;
  generatedAt: number;
}
