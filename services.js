"use strict"

const applyFunctions =(value, functions)=> {
  for (const modify of functions) {
    value = modify(value)
  }
  return value
}

const applyMiddleware = (getResource, middleware) => {
  return location => {
    const original = getResource(location);
    const modified = {};
    // TODO move this for loop outside this function so we don't recalculating it.
    for(const [method, modifiers] in middleware) {
      modified[method] = applyFunctions(original[method], modifiers)
    }
    return modified;
  }
};

exports.table = (table, middleware) =>
  applyMiddleware(
    _ => ({
      get: async _ => {
        return table.getAll();
      },
      put: async body => {
        await table.setAll(body);
      },
      post: async body => {
        await table.insert(body);
      }
    }),
    middleware
  );

exports.tableRow = (table, middleware) =>
  applyMiddleware(
    location => ({
      head: async _ => {},
      put: async body => {
        const row = combineEntries(location, body);
        await table.insert(row);
      },
      delete: async _ => {
        await table.remove(location);
      }
    }),
    middleware
  );
