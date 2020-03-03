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
    </style>
  </head>
  <body>
    <div id="pickup">Pickup</div>
    <script>
      const pickup = document.getElementById("pickup");
      pickup.style.width = "min-content";
      pickup.style.border = "5px solid white";
      pickup.style.borderRadius = "15px";
      pickup.style.padding = "3px";
      pickup.style.fontFamily = "Merienda";
      pickup.style.cursor = "pointer"

      pickup.addEventListener("mouseenter", e => {
        pickup.style.borderColor = "lightgray";
      })

      pickup.addEventListener("mouseleave", e => {
        pickup.style.borderColor = "white"
      })
    </script>
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
