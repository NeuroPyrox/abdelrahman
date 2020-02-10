"use strict";

const { assert, countKeys } = require("./helpers.js");

const isRegex = pattern => {
  return Object.prototype.toString.call(pattern) === "[object RegExp]";
};

class Type {
  constructor(validate) {
    this.validate = validate;
  }
}

const choice = (...options) => {
  return new Type(value => {
    assert(options.includes(value));
  });
};

const type = name => {
  choice(
    "undefined",
    "object",
    "boolean",
    "number",
    "bigint",
    "string",
    "symbol",
    "function"
  ).validate(name);
  return new Type(value => {
    assert(typeof value === name);
  });
};

const int = new Type(value => {
  assert(Number.isInteger(value));
});

const regex = pattern => {
  assert(isRegex(pattern));
  return new Type(value => {
    type("string").validate(value);
    assert(pattern.test(value));
  });
};

const array = elementType => {
  assert(elementType instanceof Type);
  return new Type(value => {
    assert(Array.isArray(value));
    for (const element of value) {
      elementType.validate(element);
    }
  })
}

const object = valueTypes => {
  type("object").validate(valueTypes);
  for (const valueType of Object.values(valueTypes)) {
    assert(valueType instanceof Type);
  }
  const numKeys = Object.keys(valueTypes).length;
  return new Type(objectValue => {
    const countedKeys = countKeys(objectValue)
    assert(countedKeys === numKeys, `Expected ${numKeys} keys but got ${countedKeys}`);
    for (const [key, value] of Object.entries(objectValue)) {
      valueTypes[key].validate(value);
    }
  })
}

const map = (keyType, valueType) => {
  assert(keyType instanceof Type);
  assert(valueType instanceof Type);
  return new Type(mapValue => {
    type("object").validate(mapValue);
    for (const [key, value] of Object.entries(mapValue)) {
      keyType.validate(key);
      valueType.validate(value);
    }
  });
};

module.exports = {
  choice,
  type,
  int,
  regex,
  array,
  object,
  map
};
