"use strict";

const T = require("./type.js");

T.is(1).validate(1);
T.is(1).invalidate(2);

T.type("object").validate({ a: 1 });
T.type("object").invalidate(1);

T.regex(/^hi$/).validate("hi");
T.regex(/^hi$/).invalidate("hello");

T.choice(1, 2, 3).validate(3);
T.choice(1, 2, 3).invalidate(4);

T.and(T.choice(1, 2), T.choice(2, 3)).validate(2);
T.and(T.choice(1, 2), T.choice(2, 3)).invalidate(1);

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
