"use strict";

// TODO show failiing tests at end
// TODO await test result from one file before moving onto the next

const { promisify } = require("./asyncHelpers.js");
const fs = require("fs");

const getFiles = async path =>
  promisify(callback => fs.readdir(path, callback));

const getTestFiles = async path => {
  const files = await getFiles(path);
  return files.filter(fileName => fileName.endsWith("Test.js"))
}

getTestFiles(__dirname).then(fileNames => {
  for (const fileName of fileNames) {
    // TODO make these return async test functions
    require(`./${fileName}`);
  }
})

// TODO make this return an async test function
require("./main/orderTest.js");
