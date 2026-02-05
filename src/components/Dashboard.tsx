"use client";

import MetricsCards from "./MetricsCards";
import LogsChart from "./LogsChart";
import LiveLogs from "./LiveLogs";
import AISummary from "./AISummary";
import FollowUp from "./FollowUp";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <MetricsCards />

      <div className="grid grid-cols-2 gap-4">
        <LogsChart />
        <AISummary />
      </div>

      <LiveLogs />

      <FollowUp />
    </div>
  );
}
