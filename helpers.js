const assert = (condition, message = "") => {
  if (!condition) {
    throw Error(message);
  }
};

const hasKey = (object, key) => {
  return object[key] !== undefined
}

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
    } catch(err) {
      next(err)
      return
    }
    next();
  }
}

module.exports = {
  assert: assert,
  hasKey: hasKey,
  countKeys: countKeys,
  countCombinedKeys: countCombinedKeys,
  combineEntries: combineEntries,
  wrapIfNotArray: wrapIfNotArray,
  mapValues: mapValues,
  mapValuesWithKeys,
  asyncHandler: asyncHandler
};
