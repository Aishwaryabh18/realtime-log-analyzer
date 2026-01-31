"use client";

import { useState } from "react";
import { LogEvent } from "../types/log";

export default function AISummary({ logs }: { logs: LogEvent[] }) {
  const [summary, setSummary] = useState<string>("");

  const runSummary = async () => {
    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logs }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <div>
      <button onClick={runSummary}>Generate AI Summary</button>
      <pre>{summary}</pre>
    </div>
  );
}
