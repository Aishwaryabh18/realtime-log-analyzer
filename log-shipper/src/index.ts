// log-shipper/index.ts
import WebSocket from "ws";
import Tail from "tail";
import { parseNginxLog } from "./parser";

const WS_URL = "ws://localhost:3000";
const LOG_FILE = "/var/log/nginx/access.log";

const ws = new WebSocket(WS_URL);

ws.on("open", () => {
  console.log("Connected to WS server");

  const tail = new Tail.Tail(LOG_FILE);

  tail.on("line", (line) => {
    const event = parseNginxLog(line);
    if (event) {
      ws.send(JSON.stringify(event));
    }
  });
});
ws.on("error", (err) => {
  console.error("WebSocket error:", err);
});
