"use client";

import { LogEvent } from "../types/log";
import { levelColor } from "../lib/logColors";

export default function LogTable({ logs }: { logs: LogEvent[] }) {
  return (
    <div className="h-[500px] overflow-auto font-mono text-sm bg-black p-2 rounded">
      {logs.map((log, i) => (
        <div key={i} className={`flex gap-3 ${levelColor[log.level]}`}>
          <span className="w-40">
            {new Date(log.timestamp).toLocaleTimeString()}
          </span>
          <span className="w-16">{log.level}</span>
          <span className="flex-1 truncate">{log.message}</span>
        </div>
      ))}
    </div>
  );
}
