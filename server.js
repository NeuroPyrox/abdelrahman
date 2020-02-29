"use strict";

const http = require("http");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello World!");
}).listen(process.env.PORT);

console.log(`Your app is listening on port ${process.env.PORT}`);
