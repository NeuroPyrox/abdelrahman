"use strict";

const { assertThrows } = require("./helpers.js");
const T = require("./type.js");

let t = T.choice(true, 2);
t.validate(true);
t.validate(2);
assertThrows(() => t.validate(false));
assertThrows(() => t.validate("3"));

t = T.type("boolean");
t.validate(true);
t.validate(false);
assertThrows(() => t.validate(1));
assertThrows(() => T.type("not a type"));

t = T.int;
t.validate(0);
t.validate(1);
t.validate(-1);
t.validate(1.000000000000000001);
assertThrows(() => t.validate(1.5));
assertThrows(() => t.validate(NaN));
assertThrows(() => t.validate(Infinity));
assertThrows(() => t.validate(-Infinity));
assertThrows(() => t.validate("1"));

t = T.regex(/^hi$/);
t.validate("hi");
assertThrows(() => t.validate("hello"));
assertThrows(() => t.validate(123));
assertThrows(() => T.regex(123));

t = T.array(T.choice(1, 2, 3));
t.validate([1, 2, 3, 2, 1]);
t.validate([]);
assertThrows(() => t.validate([4]));
assertThrows(() => t.validate("abc"));
assertThrows(() => T.array("not a type"));

t = T.object({ a: T.type("number"), b: T.type("string") });
t.validate({ a: 5, b: "abc" });
assertThrows(() => t.validate({ a: 5, b: 5 }));
assertThrows(() => t.validate({ a: 5, c: "abc" }));
assertThrows(() => t.validate({ a: 5 }));
assertThrows(() => t.validate("not an object"));
assertThrows(() => T.object({ a: "not a type" }));
assertThrows(() => T.object("not an object"));

t = T.map(T.regex(/^a+$/), T.choice(1, 2));
t.validate({});
t.validate({ a: 1 });
t.validate({ a: 1, aa: 2 });
assertThrows(() => t.validate({ b: 1 }));
assertThrows(() => t.validate({ a: 5 }));
assertThrows(() => t.validate([1, 2]));
assertThrows(() => t.validate(null));
assertThrows(() => T.map(T.regex(/^a+$/), { validate: 1 }));
assertThrows(() => T.map(T.regex(/^a+$/), "abc"));
assertThrows(() => T.map("abc", T.choice(1, 2)));
assertThrows(() => T.map());
