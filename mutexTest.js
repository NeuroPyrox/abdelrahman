"use strict";

const { test, assert, wait } = require("./helpers.js");
const Mutex = require("./mutex.js");

test("should run once", async () => {
  let ran = false;
  await new Mutex().do(() => {
    ran = true;
  });
  assert(ran);
});

test("should not run while waiting", async () => {
  const mutex = new Mutex();
  mutex.do(async () => wait(2));
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
  await wait(20);
  assert(ran);
});
