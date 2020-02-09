"use strict";

require("./test.js");

const {asyncHandler} = require("./helpers.js")
const database = require("./database.js")
const startServer = require("./startServer.js");
const services = require("./services.js");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json()

const menu = new database.Table("Menu", {
  dishName: "TEXT",
  imageUrl: "TEXT",
  spicy: "BOOL"
});
const prices = new database.Table("Prices", { numMeals: "INT", price: "INT" });
const adminPushSubscriptions = new database.Table("AdminPushSubscriptions", {
  endpoint: "TEXT",
  p256dh: "TEXT",
  auth: "TEXT"
});
const orders = new database.Table("Orders", {
  timestamp: "INT",
  butterChickenQuantity: "INT",
  butterChickenSpiceLevel: "TEXT",
  sweetNSourQuantity: "INT",
  delivery: "BOOL",
  contactInfo: "TEXT"
});

// TODO this is the sloppiest authentication I can possibly think of. Revise it.
const adminOnly = (req, res, next) => {
  if (req.get("Authorization") !== "insecurePassword") {
    res.sendStatus(403)
  } else {
    next()
  }
}

const notifyAdmin = asyncHandler(async (req, res) => {
  const rows = await adminPushSubscriptions();
  const promises = rows
        .map(push.unflattenSubscription)
        .map(subscription => push.send(subscription, JSON.stringify(req.body)))
  await Promise.all(promises)
});

// Use helper functions to interface with Expressjs
// because otherwise, the middleware would make it unacceptably verbose
startServer({
  "/": services.staticFile("/main/main.html"),
  "/admin/": services.redirect("/admin"),
  "/admin": services.staticFile("/admin/admin.html"),

  "/main/bundle.js": services.staticFile("/main/bundle.js"),
  "/main/style.css": services.staticFile("/main/style.css"),
  "/admin/bundle.js": services.staticFile("/admin/bundle.js"),
  "/admin/style.css": services.staticFile("/admin/style.css"),

  "/public-vapid-key": services.staticJson({
    key: process.env.PUBLIC_VAPID_KEY
  }),

  "/menu": services.table(menu).route({
    get: ["main"],
    put: [adminOnly, jsonParser, "main"]
  }),
  "/prices": services.table(prices).route({
    get: ["main"],
    put: [adminOnly, jsonParser, "main"]
  }),
  "/orders": services.table(orders).route({
    post: [jsonParser, "main", notifyAdmin],
    get: [adminOnly, "main"]
  }),
  "/admin-push-subscriptions/:endpoint": services.tableRow(adminPushSubscriptions)
    .routeAll([adminOnly, jsonParser, "main"])
});
