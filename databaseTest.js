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

test("column name shouldn't be empty", () => {
  assertThrows(() => new Table("test", { "": "INT" }));
});

test("column name shouldn't start with non-letter", () => {
  assertThrows(() => new Table("test", { "3": "INT" }));
  assertThrows(() => new Table("test", { "#": "INT" }));
  assertThrows(() => new Table("test", { "_": "INT" }));
})

test("column name can have numbers and underscores", () => {
  new Table("test", { q3_: "INT" });
})

test("column name shouldn't have non-word characters", () => {
  assertThrows(() => new Table("test", { "a-": "INT" }));
})
