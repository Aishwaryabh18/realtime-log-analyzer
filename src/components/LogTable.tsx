"use client";

import { LogEvent } from "@/types/log";

export default function LogTable({ logs }: { logs: LogEvent[] }) {
  return (
    <div className="h-[600px] overflow-auto font-mono text-sm">
      {logs.map((log, i) => (
        <div key={i} className="flex gap-3">
          <span>{new Date(log.timestamp).toISOString()}</span>
          <span className="w-16">{log.level}</span>
          <span className="flex-1">{log.message}</span>
        </div>
      ))}
    </div>
  );
}
