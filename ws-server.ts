import { WebSocketServer, WebSocket } from "ws";
import { ingest } from "./src/lib/analyzer";
import { LogEvent } from "./src/types/log";

const wss = new WebSocketServer({ port: 4000 });

const BUFFER_SIZE = 3000;
const buffer: { event: LogEvent; stats: any }[] = [];

console.log("WebSocket server running on ws://localhost:4000");

wss.on("connection", (socket: WebSocket) => {
  console.log("Log client connected");

  // 👉 replay old logs to newly connected UI
  for (const item of buffer) {
    socket.send(JSON.stringify(item));
  }

  socket.on("message", (data) => {
    const event: LogEvent = JSON.parse(data.toString());
    const stats = ingest(event);

    const payload = { event, stats };

    // store in buffer
    buffer.push(payload);
    if (buffer.length > BUFFER_SIZE) buffer.shift();

    // broadcast live
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
