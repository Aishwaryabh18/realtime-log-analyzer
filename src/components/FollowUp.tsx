"use client";

import { useState } from "react";

export default function FollowUp() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [summary, setSummary] = useState("");

  const ask = async () => {
    const res = await fetch("/api/ai/followup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary, question: q }),
    });

    const data = await res.json();
    setA(data.answer);
  };

  return (
    <div className="bg-gray-900 p-4 rounded">
      <textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ask about the logs..."
        className="w-full p-2 mb-2 bg-black border"
      />
      <button onClick={ask} className="px-4 py-1 bg-green-600 rounded">
        Ask AI
      </button>

      <pre className="mt-2 text-sm">{a}</pre>
    </div>
  );
}
