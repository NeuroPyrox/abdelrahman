"use strict";

const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  })
  .listen(process.env.PORT);

console.log(`Your app is listening on port ${process.env.PORT}`);
