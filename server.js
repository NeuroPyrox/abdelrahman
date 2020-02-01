"use strict";

const database = require("./database.js")
const startServer = require("./startServer.js");
const services = require("./services.js");
const mw = require("./middleware.js");

const prices = new database.Table(
  "Prices",
  "numMeals INT, price INT"
);
const adminPushSubscriptions = new database.Table(
  "AdminPushSubscriptions",
  "endpoint TEXT, p256dh TEXT, auth TEXT"
);
const orders = new database.Table(
  "Orders",
  `timestamp INT,
   butterChickenQuantity INT,
   butterChickenSpiceLevel TEXT,
   sweetNSourQuantity INT,
   delivery BOOL,
   contactInfo TEXT`
);

// Use helper functions to interface with Expressjs
// because otherwise, the middleware would make it unacceptably verbose
startServer({
  "/": services.staticFile("/main/main.html"),
  "/admin/": services.redirect("/admin"),
  "/admin": services.staticFile("/admin/admin.html"),

  "/main/bundle.js": services.staticFile("/main/bundle.js"),
  "/admin/bundle.js": services.staticFile("/admin/bundle.js"),

  "/public-vapid-key": services.staticJson({
    key: process.env.PUBLIC_VAPID_KEY
  }),

  "/admin-push-subscriptions/:endpoint": {},

  "/prices": services.table(prices).route({
    get: ["main"],
    put: [mw.adminOnly, "main"]
  }),
  "/orders": services.table(orders).route({
    post: ["main", mw.notifyAdmin],
    get: [mw.adminOnly, "main"]
  }),
  "/admin-push-subscriptions/:endpoint": services.tableRow(adminPushSubscriptions)
    .routeAll([mw.adminOnly, "main"])
});
