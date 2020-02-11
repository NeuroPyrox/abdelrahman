"use strict";

// TODO make this file's name consistent with the rest of the tests

const { assert, deepEqual } = require("./helpers.js");

assert(deepEqual([], []));

assert(!deepEqual([], [1]));

// TODO test objects, arrays, numbers, booleans, and strings
// TODO test throwing for unsuported types

module.exports = Promise.resolve();
