"use strict";

const resource = require("resource.js");

initializeServer({
  "/": staticFile("/main/main.html"),
  "/admin/": redirect("/admin"),
  "/admin": staticFile("/admin/admin.html"),

  "/main/bundle.js": staticFile("/main/bundle.js"),
  "/admin/bundle.js": staticFile("/admin/bundle.js"),

  "/public-vapid-key": staticJson({ key: process.env.PUBLIC_VAPID_KEY }),

  "/prices": collection(prices),

  "/prices": collection(prices, {
    GET: [],
    PUT: [adminOnly]
  }),
  "/orders": collection(orders, {
    POST: [thenNotifyAdmin],
    GET: [adminOnly]
  }),
  "/admin-push-subscriptions/:endpoint": collection(
    ({ endpoint }) => adminPushSubscriptions.at(endpoint),
    {
      HEAD: [adminOnly],
      PUT: [adminOnly],
      DELETE: [adminOnly]
    }
  )
});

function initializeServer(resourcePaths) {
  const express = require("express");
  const app = express();
  for (const [path, resource] of Object.entries(resourcePaths)) {
    //useResource(app, resource);
  }
  app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`);
  });
}


serveFile("/", "main/main.html");
redirect("/admin", "/admin/");
serveFile("/admin/", "admin/admin.html");

serveFile("/main/bundle.js", "/main/bundle.js");
serveFile("/admin/bundle.js", "/admin/bundle.js");


function serveFile(to, from) {
  router.get(to, function(req, res) {
    res.sendFile(from);
  });
}

function redirect(from, to) {
  router.get(from, function(req, res) {
    res.redirect(to);
  });
}

///////////
// Other //
///////////

app.get("/public-vapid-key", (req, res) => {
  res.send({ key: process.env.PUBLIC_VAPID_KEY });
});

app.use(require("body-parser").json());

// Admin Push Subscriptions

app.use("/admin-push-subscriptions");

app.post(
  "/admin-push-subscriptions/insert",
  makeMiddleware(adminPushSubscriptions.insert)
);

app.post(
  "/admin-push-subscriptions/has",
  makeMiddleware(adminPushSubscriptions.has)
);

app.post(
  "/admin-push-subscriptions/remove",
  makeMiddleware(adminPushSubscriptions.remove)
);

app.post("/prices/get-all", makeMiddleware(prices.getAll));

app.post("/prices/set-all", makeMiddleware(prices.setAll));

app.post("/orders/insert", makeMiddleware(orders.insert));

app.post("/orders/get-all", makeMiddleware(orders.getAll));

function makeMiddleware(action) {
  return async function(req, res, next) {
    try {
      const result = await action(req.body);
      res.send(result);
    } catch (err) {
      next(err);
    }
  };
}
