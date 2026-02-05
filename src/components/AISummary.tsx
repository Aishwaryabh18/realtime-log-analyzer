"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function AISummary() {
  const events = useSelector((s: RootState) => s.logs.events);

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSummary = async () => {
    if (!events || events.length === 0) {
      setError("No logs available yet. Wait for logs to stream.");
      return;
    }

    setError("");
    setLoading(true);

    console.log("Sending logs to AI:", events.length);

    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        logs: events.slice(-200),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "AI request failed");
      setLoading(false);
      return;
    }

    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 p-4 rounded">
      <button
        onClick={generateSummary}
        className="mb-2 px-4 py-1 bg-blue-600 rounded"
      >
        {loading ? "Analyzing…" : "Generate AI Summary"}
      </button>

      {error && <div className="text-red-400 text-sm mb-2">{error}</div>}

      <pre className="text-sm whitespace-pre-wrap">{summary}</pre>
    </div>
  );
}
