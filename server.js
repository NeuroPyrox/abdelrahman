"use strict";

const startServer = require("./startServer.js");
const services = require("./services.js");

startServer({
  "/": new services.StaticFile("/main/main.html"),
  "/admin/": new services.Redirect("/admin"),
  "/admin": new services.StaticFile("/admin/admin.html"),

  "/main/bundle.js": new services.StaticFile("/main/bundle.js"),
  "/admin/bundle.js": new services.StaticFile("/admin/bundle.js"),

  "/public-vapid-key": new services.StaticJson({
    key: process.env.PUBLIC_VAPID_KEY
  }),

  "/prices": new services.Table(prices, {
    get: [],
    put: [adminOnly]
  }),
  "/orders": new services.Table(orders, {
    post: [thenNotifyAdmin],
    get: [adminOnly]
  }),
  "/admin-push-subscriptions/:endpoint": new services.TableRow(
    adminPushSubscriptions,
    {
      head: [adminOnly],
      put: [adminOnly],
      delete: [adminOnly]
    }
  )
});
