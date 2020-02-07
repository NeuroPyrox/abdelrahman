"use strict";

const { assert, catchError } = require("./helpers.js");
const T = require("./type.js");

const throws = (type, testCases) => {
  for (const [value, errorMessage] of testCases) {
    const err = catchError(() => type.validate(value));
    assert(
      err.message === errorMessage,
      `Error message should have been:\n"${errorMessage}"\nbut was:\n"${err.message}"`
    );
  }
};

let type = T.is(1);
type.validate(1);
throws(type, [[0, "0 is not 1"], ["j", "j is not 1"]]);

type = T.type("number");
type.validate(1);
throws(type, [[true, "true is not a number"]]);

// Didn't get this test to pass yet
type = T.and(T.type("boolean"), T.is(true));
type.validate(true);
throws(type, [[0, "0 is not a boolean"], [false, "false is not true"]]);

// type = T.regex(/^hi$/);
// type.validate("hi");
// throws(type, [
//   [1, "1 is not a string"],
//   ["hello", "hello does not match /^hi$/"]
// ]);

T.choice(1, 2, 3).validate(3);
T.choice(1, 2, 3).invalidate(4);

T.tuple(T.type("number"), T.type("boolean")).validate([1, true]);
T.tuple(T.type("number"), T.type("boolean")).invalidate([1, true, true]);
T.tuple(T.type("number"), T.type("boolean")).invalidate([1, 1]);

T.array(T.type("number")).validate([1, 2, 3]);
T.array(T.type("number")).invalidate([1, 2, true]);

T.map(T.choice("a", "b"), T.type("number")).validate({ a: 1 });
T.map(T.choice("a", "b"), T.type("number")).invalidate({ z: 1 });
T.map(T.choice("a", "b"), T.type("number")).invalidate({ a: "1" });

T.object({ a: T.type("string"), b: T.type("number") }).validate({
  a: "1",
  b: 2
});
T.object({ a: T.type("string"), b: T.type("number") }).invalidate({
  a: "1",
  b: "2"
});
T.object({ a: T.type("string"), b: T.type("number") }).invalidate({
  a: "1"
});
T.object({ a: T.type("string"), b: T.type("number") }).invalidate({
  a: "1",
  b: 2,
  c: 3
});
