"use client";

import { useLogStream } from "../hooks/useLogStream";
import LogTable from "./LogTable";
import AISummary from "./AISummary";

export default function LiveLogs() {
  const { events, stats } = useLogStream();

  return (
    <div>
      {stats && (
        <div style={{ display: "flex", gap: 16 }}>
          <span>INFO {stats.byLevel.INFO}</span>
          <span>WARN {stats.byLevel.WARN}</span>
          <span>ERROR {stats.byLevel.ERROR}</span>
          <span>FATAL {stats.byLevel.FATAL}</span>
        </div>
      )}

      <LogTable logs={events} />
      <AISummary logs={events.slice(-200)} />
    </div>
  );
}
