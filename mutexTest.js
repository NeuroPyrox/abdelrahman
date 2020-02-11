"use strict";

const {
  assert,
  waitForever,
  outerResolve,
  timeout,
  assertRejects
} = require("./helpers.js");
const Mutex = require("./mutex.js");

const test = async () => {
  const mutex = new Mutex();
  
  const [promise, resolve] = outerResolve();
  // Will resolve when the mutex is unlocked
  const derivedPromise = mutex.do(() => promise);
  // Unlocks the mutex
  resolve();
  await timeout(derivedPromise, 200);
  
  const [promise1, resolve1] = outerResolve();
  const [promise2, resolve2] = outerResolve();
  mutex.do(() => promise1);
  // promise1 blocks resolve2 from running
  mutex.do(resolve2);
  await assertRejects(timeout(promise2, 200));
  // Unlocks the mutex, allowing resolve2 to run
  resolve1();
  await timeout(promise2, 200);
  
  mutex.do(waitForever);
  const neverResolves = mutex.do(() => {});
  await assertRejects(timeout(neverResolves, 200));
}

test();
