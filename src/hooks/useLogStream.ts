"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logReceived } from "../store/logsSlice";

export function useLogStream() {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");

    ws.onopen = () => {
      console.log("UI connected to WS 4000");
    };

    ws.onmessage = (msg) => {
      console.log("UI RECEIVED:", msg.data);
      const payload = JSON.parse(msg.data);
      dispatch(logReceived(payload));
    };

    ws.onerror = console.error;

    return () => ws.close();
  }, [dispatch]);
}
