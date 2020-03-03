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
    <link
      href="https://fonts.googleapis.com/css?family=Merienda"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="pickup">Pickup</div>
    <div id="delivery">Delivery</div>
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
        pickup.style.backgroundColor = "white"
      })

      pickup.addEventListener("mousedown", e => {
        pickup.style.backgroundColor = "lightgray"
      })

      pickup.addEventListener("mouseup", e => {
        pickup.style.backgroundColor = "white"
      })

      const delivery = document.getElementById("delivery");
      delivery.style.width = "min-content";
      delivery.style.border = "5px solid white";
      delivery.style.borderRadius = "15px";
      delivery.style.padding = "3px";
      delivery.style.fontFamily = "Merienda";
      delivery.style.cursor = "pointer"

      delivery.addEventListener("mouseenter", e => {
        delivery.style.borderColor = "lightgray";
      })

      delivery.addEventListener("mouseleave", e => {
        delivery.style.borderColor = "white"
        delivery.style.backgroundColor = "white"
      })

      delivery.addEventListener("mousedown", e => {
        delivery.style.backgroundColor = "lightgray"
      })

      delivery.addEventListener("mouseup", e => {
        delivery.style.backgroundColor = "white"
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
