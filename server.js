"use strict";

const http = require("http");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Main");
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("Page not found");
    }
  })
  .listen(process.env.PORT);

console.log(`Your app is listening on port ${process.env.PORT}`);
