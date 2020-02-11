"use strict";

// TODO make this file's name consistent with the rest of the tests

const { assert, deepEqual, assertThrows } = require("./helpers.js");

assert(deepEqual(123.456, 123.456));
assert(deepEqual("abc", "abc"));
assert(deepEqual(true, true));
assert(deepEqual([1, "2"], [1, "2"]));
assert(deepEqual({ a: [false, 8], b1: "ee" }, { a: [false, 8], b1: "ee" }));

assert(!deepEqual(4, 4.1));
assert(!deepEqual("ABC", "abc"));
assert(!deepEqual(true, false));
assert(!deepEqual(["1", 2], [1, 2]))
assert(!deepEqual({a: [1], b: true}, {a: [1], b1: true}))

// Unsupported types
assertThrows(() => deepEqual(null, null));
assertThrows(() => deepEqual(undefined, undefined))
assertThrows(() =>deepEqual(() => {}, () => {}))
assertThrows(() => deepEqual(Symbol(1), Symbol(1)))
// TODO uncomment when big ints become available
// assertThrows(deepEqual(1n, 1n))
