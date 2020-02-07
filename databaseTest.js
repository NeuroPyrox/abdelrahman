"use strict";

const {
  assert,
  assertThrows,
  assertRejects,
  isEmptyArray,
  range,
  arraysOfObjectsAreEqual,
  test
} = require("./helpers.js");
const { Table } = require("./database.js");

test("create table", () => {
  new Table("test0", { someColumn: "INT" });
});

test("can't make two with same name", async () => {
  new Table("test5", { x2: "INT" });
  assertThrows(() => new Table("test5", { x2: "INT" }));
});

test("get all from new table", async () => {
  const table = new Table("test3", { someColumns: "INT" });
  const rows = await table.getAll();
  assert(isEmptyArray(rows));
});

// TODO uncomment once the type module works

// test("set all", async () => {
//   const table = new Table("test4", { x2: "INT" });
//   const expected = range(100).map(x => ({ x2: x * x }));
//   await table.setAll(expected);
//   const actual = await table.getAll();
//   assert(arraysOfObjectsAreEqual(expected, actual));
// });
