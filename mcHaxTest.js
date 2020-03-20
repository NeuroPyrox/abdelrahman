"use strict";

const {assert} = require("./helpers.js");

const testCases = [
  // Primitives
  [`nil`, null],
  [`true`, true],
  [`false`, false],
  [`0`, 0],
  [`1`, 1],
  [`2495872`, 2495872],
  [`0034500`, 34500],
  [`-789`, -789],
  [`.5`, .5],
  [`-432.543`, -432.543],
  [`'a'`, "a"], 
  [`'b'`, "b"],
  [`'''`, "'"],
  [`'"'`, '"'],
  [`'\`'`, '`'],
  // Strings have the most tests because they're nestable
  [`"abc"`, "abc"],
  [`("abc")`, "abc"],
  [`("a"b")`, 'a"b'],
  [`("("a")`, '("a'],
  [`("("a")")`, null],
  [`(a"("a")"a)`, '("a")'],
  [`(a"(a"a"a)`, '(a"a']
  [`(a"(a"a"a)"a)`, null],
  [`(a"(b"a"b)"a)`, '(b"a"b)'],
  [`(b"a"b)`, "a"],
  [`(*&"abc"*&)`, "abc"],
  
  // Invalid primitives
  [`True`, null],
  [`False`, null],
  [`123e4`, null],
  [`'abc'`, null],
  [`\`a\``, null],
  [`!`, null],
  [`varName`, null],
  
  // Bool operators
  [`true not`, false],
  [`false not`, true],
  
  [`true and true`, true],
  [`true and false`, false],
  [`false and true`, false],
  [`false and false`, false],
  
  [`true or true`, true],
  [`true or false`, true],
  [`false or true`, true],
  [`false or false`, false],
  
  // Int operators
  [`64 + 36`, 100],
  [`64 + -36`, 28],
  [`-64 + 36`, -28],
  [`-64 + -36`, -100],
  
  [`64 - 36`, 28],
  [`64 - -36`, 100],
  [`-64 - 36`, -100],
  [`-64 - -36`, -28],
  
  [`3 * 5`, 15],
  [`3 * -6`, -18],
  [`-4 * 5`, -20],
  [`-4 * -6`, 24],
  
  [`360 / 40`, 9],
  [`360 / -6`, -60],
  [`-720 / 40`, -18],
  [`-720 / -6`, 120],
  [`5 / 2`, 2],
  [`5 / -2`, -3],
  [`-5 / 2`, -3],
  [`-5 / -2`, 2],
  [`1 / 0`, null],
  
  [`6 % 4`, 2],
  [`2 % 4`, 2],
  [`-2 % 4`, 2],
  [`-6 % 4`, 2],
  [`-8 % -5`, 3],
  [`-3 % -5`, 3],
  [`2 % -5`, 3],
  [`7 % -5`, 3],
  
  // Float operators
  [`6.4 + 3.6`, 10.0],
  [`6.4 + -3.6`, 2.8],
  [`-6.4 + 3.6`, -2.8],
  [`-6.4 + -3.6`, -10.0],
  
  [`6.4 + 3.6`, 2.8],
  [`6.4 + -3.6`, 10.0],
  [`-6.4 + 3.6`, -10.0],
  [`-6.4 + -3.6`, -2.8],
  
  [`.3 * 5.0`, 1.5],
  [`3.0 * -.6`, -1.8],
  [`-.4 * 5.0`, -2.0],
  [`-4.0 * -.6`, 2.4],
  
  [`3.6 / .4`, 9.0],
  [`3.6 / -6.0`, -.6],
  [`-7.2 / .4`, -18.0],
  [`-7.2 / -6.0`, 1.2],
  [`1.0 / 0.0`, null],
  
  [`4.4 % 3.3`, null],
  
  // No numerical type inference
  [`5 + 4.4`, null],
  [`5 - 4.4`, null],
  [`5 * 4.4`, null],
  [`5 / 4.4`, null],
  [`5 % 4.4`, null],
  [`4.4 + 5`, null],
  [`4.4 - 5`, null],
  [`4.4 * 5`, null],
  [`4.4 / 5`, null],
  [`4.4 % 5`, null],
  
  // Numerical type casting
  [`5.5 floor`, 5],
  [`-5.5 floor`, -6],
  [`5.5 ceil`, 6],
  [`-5.5 ceil`, 5],
  [`3 float`, 3.0],
  // We have to check the type this way because Javascript doesn't differentiate between ints and floats.
  // More on the "type" operator later
  [`3 float type`, "float"],
  
  // Char operators
  []
  
  [`nil "is"`, null],
  [`nil "is" nil`, true],
  [`nil "is" true`, false],
  [`nil "is" false`, false],
  
  [`true "is"`, null],
  [`true "is" true`, true],
  [`true "is" false`, false],
  [`true "is" nil`, false],
  
  [`false "is"`, null]
  [`false "is" false`, true],
  [`false "is" true`, false],
  [`false "is" nil`, false],
];
