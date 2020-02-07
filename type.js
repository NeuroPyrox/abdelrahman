"use strict";

class Type {
  constructor(test, expected = "") {
    this.test = test;
    this.expected = expected;
  }

  validate(value) {
    if (!this.test(value)) {
      throw Error(`${value} is not ${this.expected}`);
    }
  }

  invalidate(value) {
    if (this.test(value)) {
      throw Error();
    }
  }
}

const is = constant => new Type(value => value === constant, constant);

const type = name => new Type(value => typeof value === name, `a ${name}`);

const and = (...subTypes) =>
  new Type(value => subTypes.every(subType => subType.test(value)));

const regex = pattern => and(type("string"), new Type(value => pattern.test(value)));

// I would've used array.includes, but the internet didn't tell me if it uses strict equality
const choice = (...options) =>
  new Type(value => !options.every(option => option !== value));

const tuple = (...fieldTypes) =>
  new Type(
    value =>
      value.length === fieldTypes.length &&
      value.every((field, i) => fieldTypes[i].test(field))
  );

const array = memberType =>
  new Type(value => value.every(member => memberType.test(member)));

const map = (keyType, valueType) =>
  new Type(value =>
    array(tuple(keyType, valueType)).test(Object.entries(value))
  );

const object = fieldTypes =>
  and(
    type("object"),
    new Type(value =>
      tuple(
        ...Object.entries(fieldTypes).map(([key, fieldType]) =>
          tuple(is(key), fieldType)
        )
      ).test(Object.entries(value))
    )
  );

module.exports = {
  is: is,
  type: type,
  regex: regex,
  choice: choice,
  and: and,
  tuple: tuple,
  array: array,
  map: map,
  object: object
};
