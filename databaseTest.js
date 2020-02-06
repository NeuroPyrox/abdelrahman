"use strict";

const { Table } = require("./database.js");

const test = (name, testFunction) => {
  console.log("Testing", name);
  testFunction();
  console.log("Passed!");
};

const assertThrows = testFunction => {
  try {
    testFunction();
  } catch (err) {
    return;
  }
  throw Error("Didn't throw");
};

test("create table", () => {
  new Table("test", { someColumn: "INT" });
});

test("invalid column type", () => {
  assertThrows(() => new Table("test", { someColumn: "2refudcoj4" }));
});
