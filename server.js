"use strict";

const sendResult = (res, result) => {
  
}

const convertHandlerToExpress = handler => {
  return async (req, res, next) => {
    try {
      const result = await handler(req.params, req.body);
      sendResult(res, result);
    } catch(err) {
      next(err)
    }
  }
};

const assertIsHttpMethod = method => {
  return ["head", "get", "put", "post", "delete"].contains(method);
};

const useService = (server, path, service) => {
  for (const [method, handler] of service) {
    assertIsHttpMethod(method);
    server[method](path, convertHandlerToExpress(handler));
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

const createHandler = (getResource) => {
  const handle = async (req, res, next) => {
    try {
      const resource = await getResource(req.params)
    } catch(err) {
      next(err)
    }
  }
}

const services = require("./services.js")

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
    head: [adminOnly],
    put: [adminOnly],
    delete: [adminOnly]
  })
});
