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
      const stylizeButton = id => {
        button = document.getElementById(id)

        button.style.width = "min-content";
        button.style.border = "5px solid white";
        button.style.borderRadius = "15px";
        button.style.padding = "3px";
        button.style.fontFamily = "Merienda";
        button.style.cursor = "pointer"

        button.addEventListener("mouseenter", e => {
          button.style.borderColor = "lightgray";
        })

        button.addEventListener("mouseleave", e => {
          button.style.borderColor = "white"
          button.style.backgroundColor = "white"
        })

        button.addEventListener("mousedown", e => {
          button.style.backgroundColor = "lightgray"
        })

        button.addEventListener("mouseup", e => {
          button.style.backgroundColor = "white"
        })
      }

      stylizeButton("pickup")
      stylizeButton("delivery")
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
