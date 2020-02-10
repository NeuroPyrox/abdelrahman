"use strict";

const {
  assert,
  assertThrows,
  assertRejects,
  isEmptyArray,
  range,
  arraysOfObjectsAreEqual
} = require("./helpers.js");
const { Table } = require("./database.js");

// We don't test trivial type errors here because typeTest.js handles that
// and it'd be testing whether a dependency works

(async () => {
  const table = new Table("test", { x: "INT", y: "TEXT" });

  // Ways that you can screw up table initialization
  assertThrows(
    () => new Table("test", { x: "INT", y: "TEXT" }),
    "can't make two tables with the same name" // This limitation prevents async errors
  );
  assertThrows(
    () => new Table("@#$", { x: "INT", y: "TEXT" }),
    "name must be sanitized"
  );
  assertThrows(
    () => new Table("test2", { $x: "INT", $y: "TEXT" }),
    "column names must be sanitized"
  );
  assertThrows(
    () => new Table("test3", { x: "IDK", y: "IDK" }),
    "column types must be sanitized"
  );
  assertThrows(() => new Table("test4", {}), "must have at least one column");

  // Remember, we defined table at the top of this function
  const initialData = await table.getAll();
  assert(isEmptyArray(initialData));

  const setTo = [
    {
      x: 1,
      y: "abc"
    },
    {
      x: 2,
      y: "def"
    }
  ];
  await table.setAll(setTo);
  const gotten = await table.getAll();
  assert(arraysOfObjectsAreEqual(setTo, gotten));

  // Ways you can screw up setAll's input
  const wrongColumnType = [{ x: 1, y: 2 }];
  const missingColumn = [{x: 1}]
  const extraColumn = [{x: 1, y: "abc", z: true}]
  await assertRejects(table.setAll(wrongColumnType));
  await assertRejects(table.setAll(missingColumn));
  await assertRejects(table.setAll(extraColumn));

  await table.reset();
  const afterResetting = await table.getAll();
  assert(isEmptyArray(afterResetting));
})();
