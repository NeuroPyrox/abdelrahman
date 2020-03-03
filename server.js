"use strict";

const http = require("http");

const mainPage = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Abdelrahman's Food</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <style>
      @import "https://fonts.googleapis.com/css?family=Merienda";

      .pickup {
        border: 5px solid gray;
        border-radius: 15px;
        padding: 3px;
        font-family: "Merienda";
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="pickup">Pickup</div>
  </body>
</html>
`;

http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(mainPage);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("Page not found");
    }
  })
  .listen(process.env.PORT);

console.log(`Your app is listening on port ${process.env.PORT}`);
