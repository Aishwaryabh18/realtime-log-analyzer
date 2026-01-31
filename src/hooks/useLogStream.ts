"use client";

import { useEffect, useRef, useState } from "react";
import { LogEvent } from "../types/log";
import { StreamPayload, StreamStats } from "../types/stream";

const MAX_EVENTS = 5000;

export function useLogStream() {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const [stats, setStats] = useState<StreamStats | null>(null);

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
    ws.onmessage = (event) => {
      const payload: StreamPayload = JSON.parse(event.data);

      setStats(payload.stats);
      setEvents((prev) => {
        const next = [...prev, payload.event];
        if (next.length > MAX_EVENTS) next.shift();
        return next;
      });
    };

    ws.onerror = console.error;
    ws.onclose = () => console.log("WS closed");

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close(1000, "Client cleanup");
      }
    };
  }, []);

  return { events, stats };
}
