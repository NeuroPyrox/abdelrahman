
const assert = (condition, message="") => {
  if (!condition) {
    throw Error(message);
  }
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

module.exports = {
  assert: assert,
  countKeys: countKeys,
  countCombinedKeys: countCombinedKeys,
  combineEntries: combineEntries
}
