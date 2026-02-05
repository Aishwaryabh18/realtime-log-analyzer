"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function MetricsCards() {
  const stats = useSelector((s: RootState) => s.logs.stats);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.entries(stats.byLevel).map(
        ([level, count]: [string, unknown]) => (
          <div key={level} className="bg-gray-900 p-4 rounded text-center">
            <div className="text-sm text-gray-400">{level}</div>
            <div className="text-2xl font-bold">{String(count)}</div>
          </div>
        ),
      )}
    </div>
  );
}
