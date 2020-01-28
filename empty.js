//webpack && node server.js

const express = require("express")
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});

const watchJson = {
  "install": {
    "include": [
      "^package\\.json$",
      "^\\.env$"
    ]
  },
  "restart": {
    "exclude": [
      "^public/",
      "^dist/"
    ],
    "include": [
      "\\.js$",
      "\\.jsx$",
      "\\.json"
    ]
  },
  "throttle": 1000
}

