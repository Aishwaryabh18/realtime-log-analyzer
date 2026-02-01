"use client";

import { useState } from "react";
import { useLogStream } from "../hooks/useLogStream";
import LogTable from "./LogTable";
import LogFilters from "./LogFilters";

export default function LiveLogs() {
  const { events, stats } = useLogStream();
  const [active, setActive] = useState(
    new Set(["INFO", "WARN", "ERROR", "FATAL"]),
  );

  const toggle = (level: string) => {
    const next = new Set(active);
    next.has(level) ? next.delete(level) : next.add(level);
    setActive(next);
  };

  const filtered = events.filter((e) => active.has(e.level));

  return (
    <div>
      <LogFilters active={active} toggle={toggle} />

      {stats && (
        <div className="flex gap-4 mb-2">
          <span>INFO {stats.byLevel.INFO}</span>
          <span>WARN {stats.byLevel.WARN}</span>
          <span>ERROR {stats.byLevel.ERROR}</span>
          <span>FATAL {stats.byLevel.FATAL}</span>
        </div>
      )}

      <LogTable logs={filtered} />
    </div>
  );
}
