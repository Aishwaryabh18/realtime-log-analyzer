import { WebSocketServer, WebSocket } from "ws";
import { LogEvent } from "@/types/log";

let wss: WebSocketServer | null = null;

export function initWSServer(server: any) {
  if (wss) return wss;

  wss = new WebSocketServer({ server });

  wss.on("connection", (socket: WebSocket) => {
    console.log("WS client connected");

    socket.on("message", (data) => {
      try {
        const event: LogEvent = JSON.parse(data.toString());

        // broadcast to all clients
        wss?.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(event));
          }
        });
      } catch (err) {
        console.error("Invalid log event", err);
      }
    });

    socket.on("close", () => {
      console.log("WS client disconnected");
    });
  });

  return wss;
}
