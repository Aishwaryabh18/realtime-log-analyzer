"use client";

import { useEffect, useRef, useState } from "react";
import { LogEvent } from "@/types/log";

const MAX_EVENTS = 5000;

export function useLogStream() {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data: LogEvent = JSON.parse(event.data);

      setEvents((prev) => {
        const next = [...prev, data];
        if (next.length > MAX_EVENTS) {
          next.shift();
        }
        return next;
      });
    };

    ws.onerror = console.error;
    ws.onclose = () => console.log("WS closed");

    return () => ws.close();
  }, []);

  return events;
}
