"use strict";

const adminOnly = credentials => {
  // TODO
}

const thenNotifyAdmin = data => {
  // TODO
}

const applyMiddleware = (bareHandler, middlewareArray) => {
  return middlewareArray.reduce(
    (handler, middleware) => middleware(handler),
    bareHandler
  );
};


const createDatabaseHandler = (database, method) => {
  return {
    get: async () => {
      return database.getAll();
    },
    put: async rows => {
      await database.setAll(rows);
    },
    post: async row => {
      await database.insert(row);
    }
  }[method]
}

const collection = (database, methods) => {
  const handlers = {};
  for (const [method, middlewareArray] of Object.entries(methods)) {
    const bareHandler = createDatabaseHandler[method];
    handlers[method] = applyMiddleware(bareHandler, middlewareArray);
  }
  return handlers
};

const convertHandlerToExpress = handler => {
  // TODO
}

const assertIsHttpMethod = method => {
  return ["head", "get", "put", "post", "delete"].contains(method);
};

const useResource = (app, path, resource) => {
  for (const [method, handler] of resource) {
    assertIsHttpMethod(method);
    app[method](path, convertHandlerToExpress(handler));
  }
};

const startServer = resourcePaths => {
  const express = require("express");
  const app = express();
  app.enable("strict routing");
  for (const [path, resource] of Object.entries(resourcePaths)) {
    useResource(app, path, resource);
  }
  app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`);
  });
};

startServer({
  "/": new StaticFile("/main/main.html"),
  "/admin/": new Redirect("/admin"),
  "/admin": new StaticFile("/admin/admin.html"),

  "/main/bundle.js": new StaticFile("/main/bundle.js"),
  "/admin/bundle.js": new StaticFile("/admin/bundle.js"),

  "/public-vapid-key": new StaticJson({ key: process.env.PUBLIC_VAPID_KEY }),

  "/prices": collection(prices, {
    get: [],
    put: [adminOnly]
  }),
  "/orders": collection(orders, {
    post: [thenNotifyAdmin],
    get: [adminOnly]
  }),
  "/admin-push-subscriptions/:endpoint": new Item(
    ({ endpoint }) => adminPushSubscriptions.at(endpoint),
    {
      head: [adminOnly],
      put: [adminOnly],
      delete: [adminOnly]
    }
  )
});
