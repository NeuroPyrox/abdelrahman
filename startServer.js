"use strict";

// Implicitly depends on services.js and responses.js

const { hasKey } = require("./helper.js");
const bodyParser = require("body-parser");

const notImplementedHandler = (_, __) => {
  throw Error("Not implemented");
};

const createBodyHandler = (service, getResponse) => {
  return async (req, res, next) => {
    try {
      const resource = service.getResource(req.params);
      const response = await getResponse(resource, req.body);
      response.dump(res);
    } catch (err) {
      next(err);
    }
  };
};

const createJsonHandler = (service, getResponse) => {
  const handler = createBodyHandler(service, getResponse);

  // Apply the middleware manually so that if we ever want to customize it,
  // we'll only have to change the code here
  const jsonParser = bodyParser.json();
  return (req, res, next) => jsonParser(req, res, handler);
};

const createHandler = (service, getResponse) => {
  return createBodyHandler(service, async (resource, _) =>
    getResponse(resource)
  );
};

// I tried refactoring these functions by looping over ["head", "get", "put", "post", "delete"],
// but it ended up looking like black magic

const createHeadHandler = service => {
  if (!hasKey(service, "head")) {
    return notImplementedHandler;
  }
  return createHandler(service, async resource => resource.head());
};

const createGetHandler = service => {
  if (!hasKey(service, "get")) {
    return notImplementedHandler;
  }
  return createHandler(service, async resource => resource.get());
};

const createPutHandler = service => {
  if (!hasKey(service, "put")) {
    return notImplementedHandler;
  }
  return createJsonHandler(service, async (resource, json) =>
    resource.put(json)
  );
};

const createPostHandler = service => {
  if (!hasKey(service, "post")) {
    return notImplementedHandler;
  }
  return createJsonHandler(service, async (resource, json) =>
    resource.post(json)
  );
};

const createDeleteHandler = service => {
  if (!hasKey(service, "delete")) {
    return notImplementedHandler;
  }
  return createHandler(service, async resource => resource.delete());
};

const useService = (route, service) => {
  route
    .head(createHeadHandler(service))
    .get(createGetHandler(service))
    .put(createPutHandler(service))
    .post(createPostHandler(service))
    .delete(createDeleteHandler(service));
};

const useServices = (server, services) => {
  for (const [path, service] of Object.entries(services)) {
    useService(server.route(path), service);
  }
};

const createBareServer = () => {
  const server = require("express")();
  server.enable("strict routing");
  return server;
};

const startServer = services => {
  const server = createBareServer();
  useServices(server, services);
  server.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`);
  });
};

module.exports = startServer;
