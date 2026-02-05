"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LogsChart() {
  const events = useSelector((s: RootState) => s.logs.events);

  const data = useMemo(() => {
    const buckets: Record<
      number,
      { time: string; total: number; error: number }
    > = {};

    for (const e of events) {
      const t = Math.floor(e.timestamp / 1000) * 1000;
      if (!buckets[t]) {
        buckets[t] = {
          time: new Date(t).toLocaleTimeString(),
          total: 0,
          error: 0,
        };
      }
      buckets[t].total++;
      if (e.level === "ERROR" || e.level === "FATAL") {
        buckets[t].error++;
      }
    }

    return Object.values(buckets).slice(-30);
  }, [events]);

  return (
    <div className="h-64 bg-gray-900 p-4 rounded">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#4ade80" />
          <Line type="monotone" dataKey="error" stroke="#f87171" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
