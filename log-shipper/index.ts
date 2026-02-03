import WebSocket from "ws";
import fs from "fs";
import readline from "readline";
import path from "path";

const WS_URL = "ws://localhost:4000";
const LOG_FILE = path.resolve(process.cwd(), "../jenkins.log");

const LINES_PER_SECOND = 500;

const ws = new WebSocket(WS_URL);

ws.on("open", async () => {
  console.log("Log shipper connected to WS");
  console.log("Reading log file from:", LOG_FILE);

  const stream = fs.createReadStream(LOG_FILE);
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });
  let buffer: string[] = [];

  for await (const line of rl) {
    buffer.push(line);

    if (buffer.length >= LINES_PER_SECOND) {
      flush(buffer);
      buffer = [];
      await sleep(1000);
    }
  }

  if (buffer.length) {
    flush(buffer);
  }

  console.log("Finished streaming log file");
});

function flush(lines: string[]) {
  for (const line of lines) {
    const level = extractLevel(line);

    const event = {
      timestamp: Date.now(),
      level,
      service: "jenkins",
      message: line,
      source: "jenkins.log",
    };
    console.log("Sending line:", line.slice(0, 80));

    ws.send(JSON.stringify(event));
  }
}

function extractLevel(line: string) {
  if (line.includes("ERROR")) return "ERROR";
  if (line.includes("WARNING") || line.includes("WARN")) return "WARN";
  if (line.includes("SEVERE") || line.includes("FATAL")) return "FATAL";
  return "INFO";
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
