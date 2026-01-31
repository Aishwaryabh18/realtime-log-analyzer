import { LogEvent, LogLevel } from "../types/log";

type WindowStats = {
  total: number;
  byLevel: Record<LogLevel, number>;
};

const WINDOW_MS = 10_000; // 10s
let window: LogEvent[] = [];

export function ingest(event: LogEvent): WindowStats {
  const now = Date.now();

  window.push(event);

  // evict old
  while (window.length && window[0].timestamp < now - WINDOW_MS) {
    window.shift();
  }

  const stats: WindowStats = {
    total: window.length,
    byLevel: {
      INFO: 0,
      WARN: 0,
      ERROR: 0,
      FATAL: 0,
    },
  };

  for (const e of window) {
    stats.byLevel[e.level]++;
  }

  return stats;
}
