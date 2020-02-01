"use strict";

const { hasKey } = require("./helpers.js");

const useService = (route, methodHandlers) => {
  for (const method of ["head", "get", "put", "post", "delete"]) {
    if (hasKey(methodHandlers, method)) {
      route[method](methodHandlers[method]);
    }
  }
};

const useServices = (server, services) => {
  for (const [path, service] of Object.entries(services)) {
    useService(server.route(path), service.methodHandlers);
  }
};

const startServer = services => {
  const server = require("express")();
  server.enable("strict routing");
  useServices(server, services);
  server.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`);
  });
};

module.exports = startServer;
