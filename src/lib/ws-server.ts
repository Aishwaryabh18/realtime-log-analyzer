import { WebSocketServer, WebSocket } from "ws";
import { ingest } from "./analyzer";
import { LogEvent } from "../types/log";

const wss = new WebSocketServer({ port: 4000 });

console.log("WebSocket server running on ws://localhost:4000");

wss.on("connection", (socket: WebSocket) => {
  console.log("Log client connected");

  socket.on("close", () => {
    console.log("Log client disconnected");
  });
});

setInterval(() => {
  console.log("GENERATING LOG");

  const event: LogEvent = {
    timestamp: Date.now(),
    level: "ERROR" as const,
    service: "demo",
    message: "test log",
    source: "generator",
  };

  const stats = ingest(event);
  const payload = { event, stats };

  console.log("Broadcasting to", wss.clients.size, "clients");

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(payload));
    }
  });
}, 1000);
