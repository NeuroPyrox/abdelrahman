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
    } catch(err) {
      traced.message = err.message;
      throw traced;
    }
  }
}

const getRejection = async promise => {
  try {
    await promise;
  } catch (err) {
    return err;
  }
  return null;
};

const range = n => [...Array(n).keys()];

const isEmptyArray = array => Array.isArray(array) && array.length === 0;

const arraysAreEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, i) => b[i] === item);
}

module.exports = {
  assert: assert,
  assertThrows: assertThrows,
  hasKey: hasKey,
  countKeys: countKeys,
  countCombinedKeys: countCombinedKeys,
  combineEntries: combineEntries,
  wrapIfNotArray: wrapIfNotArray,
  mapValues: mapValues,
  mapValuesWithKeys: mapValuesWithKeys,
  asyncHandler: asyncHandler,
  asyncThrow: asyncThrow,
  getRejection: getRejection,
  range: range,
  isEmptyArray: isEmptyArray,
  arraysAreEqual: arraysAreEqual
};
