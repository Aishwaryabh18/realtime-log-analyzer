import { WebSocketServer, WebSocket } from "ws";
import { ingest } from "./analyzer";
import { LogEvent } from "../types/log";

const wss = new WebSocketServer({ port: 4000 });

console.log("WebSocket server running on ws://localhost:4000");

wss.on("connection", (socket: WebSocket) => {
  console.log("Log client connected");

  socket.on("message", (data) => {
    const event: LogEvent = JSON.parse(data.toString());
    const stats = ingest(event);

    const payload = { event, stats };

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload));
      }
    });
  });

  socket.on("close", () => {
    console.log("Log client disconnected");
  });
});
