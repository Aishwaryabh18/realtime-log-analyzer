import next from "next";
import http from "http";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  server.listen(3000, () => {
    console.log("Next.js running on http://localhost:3000");
  });
});
