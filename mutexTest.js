"use strict";

const {
  test,
  assert,
  waitForever,
  outerResolve,
  assertResolves
} = require("./helpers.js");
const Mutex = require("./mutex.js");

test("should run once", async () => {
  const [promise, resolve] = outerResolve();
  const derivedPromise = new Mutex().do(() => promise);
  resolve();
  await assertResolves(derivedPromise, 200);
});

test("should not run while waiting", async () => {
  const mutex = new Mutex();
  mutex.do(waitForever);
  mutex.do(() => {
    throw Error();
  });
});

test("should run after waiting", async () => {
  const [promise1, resolve1] = outerResolve();
  const [promise2, resolve2] = outerResolve();
  const mutex = new Mutex();
  mutex.do(() => promise1);
  mutex.do(resolve2);
  resolve1();
  await assertResolves(promise2, 200);
});
