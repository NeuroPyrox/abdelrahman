"use strict";

const { promisify } = require("./asyncHelpers.js");
const fs = require("fs");

const getFilesInDir = async dir =>
  promisify(callback => fs.readdir(dir, callback));

const getTestFilesInDir = async dir => {
  const files = await getFilesInDir(dir);
  return files
    .filter(fileName => fileName.endsWith("Test.js"))
    .map(fileName => `${dir}/${fileName}`);
};

const getTestFiles = async () => {
  const paths = await getTestFilesInDir(__dirname);
  return paths.concat(await getTestFilesInDir(__dirname + "/main"));
};

getTestFiles().then(async filePaths => {
  console.log("Testing files:");
  for (const filePath of filePaths) {
    console.log(filePath);
    await require(filePath);
  }
  console.log("All tests passed!");
});
