"use client";

import { useLogStream } from "@/hooks/useLogStream";
import LogTable from "./LogTable";

export default function LiveLogs() {
  const logs = useLogStream();
  return <LogTable logs={logs} />;
}
