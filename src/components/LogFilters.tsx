"use client";

const LEVELS = ["INFO", "WARN", "ERROR", "FATAL"];

export default function LogFilters({
  active,
  toggle,
}: {
  active: Set<string>;
  toggle: (level: string) => void;
}) {
  return (
    <div className="flex gap-3 mb-3">
      {LEVELS.map((level) => (
        <button
          key={level}
          onClick={() => toggle(level)}
          className={`px-3 py-1 border rounded ${
            active.has(level) ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
