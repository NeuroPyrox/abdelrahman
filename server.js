"use strict";

const adminOnly = credentials => {
  // TODO
};

const thenNotifyAdmin = data => {
  // TODO
};

const applyMiddleware = (bareHandler, middlewareArray) => {
  return middlewareArray.reduce(
    (handler, middleware) => middleware(handler),
    bareHandler
  );
};

const services = require("./services.js")

const assertIsHttpMethod = method => {
  return ["head", "get", "put", "post", "delete"].contains(method);
};

const useService = (server, path, service) => {
  for (const [method, handler] of service) {
    assertIsHttpMethod(method);
    server[method](path, handler);
  }
};

const useServices = (server, services) => {
  for (const [path, service] of Object.entries(services)) {
    useService(server, path, service);
  }
};

const createBareServer = () => {
  const server = require("express")();
  server.enable("strict routing");
  server.use(require("body-parser").json());
  return server;
}

const startServer = services => {
  const server = createBareServer();
  useServices(server, services);
  server.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`);
  });
};

startServer({
  "/": services.staticFile("/main/main.html"),
  "/admin/": services.redirect("/admin"),
  "/admin": services.staticFile("/admin/admin.html"),

  "/main/bundle.js": services.staticFile("/main/bundle.js"),
  "/admin/bundle.js": services.staticFile("/admin/bundle.js"),

  "/public-vapid-key": services.staticJson({ key: process.env.PUBLIC_VAPID_KEY }),

  "/prices": services.table(prices, {
    get: [],
    put: [adminOnly]
  }),
  "/orders": services.table(orders, {
    post: [thenNotifyAdmin],
    get: [adminOnly]
  }),
  "/admin-push-subscriptions/:endpoint": services.tableRow(adminPushSubscriptions, {
    head: [adminOnly, testForExistance],
    put: [adminOnly],
    delete: [adminOnly]
  })
});
