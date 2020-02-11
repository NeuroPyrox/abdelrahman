"use strict";

// TODO upload this as a separate module to GitHub

const {assert} = require("./helpers.js");

class Mutex {
  constructor() {
    this.unlock = Promise.resolve();
  }

  async do(func) {
    let done;
    const unlockNext = new Promise((resolve, reject) => {
      done = resolve;
    })
    const unlockPrev = this.unlock;
    this.unlock = unlockPrev.then(() => unlockNext);
    await unlockPrev;
    const result = await func();
    done();
    return result;
  }
}

module.exports = Mutex;
