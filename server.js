const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const host = "127.0.0.1";
const port = Number(process.env.PORT) || 8000;
const indexPath = path.join(__dirname, "index.html");

const server = http.createServer((request, response) => {
  if (request.method !== "GET" || request.url !== "/") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  fs.readFile(indexPath, (error, html) => {
    if (error) {
      console.error("Could not read index.html:", error);
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Could not load the game.");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(html);
  });
});

server.listen(port, host, () => {
  console.log(`Game server running at http://${host}:${port}`);
});
