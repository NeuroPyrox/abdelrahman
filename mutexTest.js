"use strict";

const { test, assert, wait } = require("./helpers.js");
const Mutex = require("./mutex.js");

// WARNING I'm suspicious of these tests because they fail
// when the difference in waiting times is 20 milliseconds or less,
// but the fishy part is that they fail randomly

test("should run once", async () => {
  let ran = false;
  await new Mutex().do(() => {
    ran = true;
  });
  assert(ran);
});

test("should not run while waiting", async () => {
  const mutex = new Mutex();
  mutex.do(async () => wait(100));
  let ran = false;
  mutex.do(() => {
    ran = true;
  });
  await wait(1);
  assert(!ran);
});

test("should run after waiting", async () => {
  const mutex = new Mutex();
  mutex.do(async () => wait(1));
  let ran = false;
  mutex.do(() => {
    ran = true;
  });
  await wait(100);
  assert(ran);
});
