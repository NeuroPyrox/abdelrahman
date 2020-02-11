"use strict";

// TODO make this file feel less monolithic
// TODO figure out which of these functions I can throw away

const assert = (condition, message = "") => {
  if (!condition) {
    throw Error(message);
  }
};

const assertThrows = testFunction => {
  try {
    testFunction();
  } catch (err) {
    return;
  }
  throw Error("Didn't throw");
};

// TODO move to asyncHelpers.js
const assertRejects = async promise => {
  const withStackTrace = Error("Didn't reject");
  try {
    await promise;
  } catch (err) {
    return;
  }
  throw withStackTrace;
};

const hasKey = (object, key) => {
  return object[key] !== undefined;
};

const countKeys = object => {
  return Object.keys(object).length;
};

const countCombinedKeys = objects => {
  const sum = 0;
  for (const object of objects) {
    sum += countKeys(object);
  }
  return sum;
};

const combineEntries = objects => {
  const combined = {};
  for (const object in objects) {
    for (const [key, value] of Object.entries(object)) {
      combined[key] = value;
    }
  }
  assert(
    countKeys(combined) === countCombinedKeys(objects),
    Error("Key overlap")
  );
};

const wrapIfNotArray = object => {
  if (Array.isArray(object)) {
    return object;
  } else {
    return [object];
  }
};

const mapValues = (object, valueMapper) => {
  const mapped = {};
  for (const [key, value] of Object.entries(object)) {
    mapped[key] = valueMapper(value);
  }
  return mapped;
};

const mapValuesWithKeys = (object, valueMapperWithKeys) => {
  const mapped = {};
  for (const [key, value] of Object.entries(object)) {
    mapped[key] = valueMapperWithKeys(key, value);
  }
  return mapped;
};

const asyncHandler = unwrapped => {
  return async (req, res, next) => {
    try {
      await unwrapped(req, res);
    } catch (err) {
      next(err);
    }
  };
};

const asyncThrow = unwrapped => {
  return async (...args) => {
    const traced = new Error();
    try {
      const result = await unwrapped(...args);
      return result;
    } catch (err) {
      traced.message = err.message;
      throw traced;
    }
  };
};

const getRejection = async promise => {
  try {
    await promise;
  } catch (err) {
    return err;
  }
  return null;
};

const catchError = func => {
  try {
    func();
  } catch (err) {
    return err;
  }
  return null;
};

const range = n => [...Array(n).keys()];

const waitForever = async () => new Promise(_ => {});

const outerResolve = () => {
  let outer;
  const promise = new Promise(resolve => {
    outer = resolve;
  });
  return [promise, outer];
};

// TODO move to async helpers
const timeout = (promise, milliseconds) => {
  return Promise.race([
    promise,
    new Promise((resolve, reject) => {
      setTimeout(reject, milliseconds);
    })
  ]);
};

const deepEqual = (a, b) => {
  switch (typeof a) {
    case "number":
      return a === b;
    case "string":
      return a === b;
    case "boolean":
      return a === b;
    case "object":
      if (countKeys(a) !== countKeys(b)) {
        return false;
      }
      for(const key of Object.keys(a)) {
        if (!deepEqual(a[key], b[key])) {
          return false;
        }
      }
      return true;
    default:
      throw Error("unsupported type")
  }
}

module.exports = {
  assert,
  assertThrows,
  assertRejects,
  hasKey,
  countKeys,
  countCombinedKeys,
  combineEntries,
  wrapIfNotArray,
  mapValues,
  mapValuesWithKeys,
  asyncHandler,
  asyncThrow,
  getRejection,
  catchError,
  range,
  waitForever,
  outerResolve,
  timeout,
  deepEqual
};
