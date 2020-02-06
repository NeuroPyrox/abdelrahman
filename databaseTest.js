"use strict";

const {
  assert,
  assertThrows,
  isEmptyArray,
  range,
  arraysAreEqual
} = require("./helpers.js");
const { Table } = require("./database.js");

const test = async (name, testFunction) => {
  try {
    await testFunction();
  } catch (err) {
    console.log("Failed test:", name);
    console.error(err);
    return;
  }
  console.log("Passed test:", name);
};

test("create table", () => {
  new Table("test0", { someColumn: "INT" });
});

test("invalid column type", () => {
  assertThrows(() => new Table("test1", { someColumn: "2refudcoj4" }));
});

test("invalid column name", () => {
  assertThrows(() => new Table("test2", { "3": "INT" }));
});

test("invalid table name", () => {
  assertThrows(() => new Table("qojf42839*(*)", { someColumn: "INT" }));
});

// TODO uncomment these once I get the mutex working

// test("get all from new table", async () => {
//   const table = new Table("test3", { someColumns: "INT" });
//   const rows = await table.getAll();
//   assert(isEmptyArray(rows));
// });

// test("set all", async () => {
//   const table = new Table("test4", { x2: "INT" });
//   const expected = range(100).map(x => ({ x2: x * x }));
//   await table.setAll(expected);
//   const actual = await table.getAll();
//   assert(arraysAreEqual(expected, actual));
// });
