"use strict";

// TODO once I move a bunch of functions to this file, make sure they all take promises as args instead of async functions
// TODO rename to promiseHelpers.js

const promiseMultiple = executor => {
  return new Promise(function(resolve, reject) {
    try {
      executor((...args) => resolve(args));
    } catch (err) {
      reject(err);
    }
  });
}

// I prefer this promisifier because I couldn't get util.promisify or bluebird to detect certain errors
// As a bonus, it has the same clean syntax as "new Promise(resolve => ...)"
const promisify = async executor => {
  const [err, result] = await promiseMultiple(executor);
  if (err !== null) {
    throw Error(err);
  }
  return result;
};

module.exports = {
  promisify
}
